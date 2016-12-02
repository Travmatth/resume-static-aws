/*
 * Expression -> RPN:
 * 
 * Shunting-yard algorithm
 * Translated from:
 * https://en.wikipedia.org/wiki/Shunting-yard_algorithm
 *
 * Limitations:
 * Does not handle f(x)'s: sin, cos, etc.
 *
 * @flow
 */

import BinaryTree from '../common/BinaryTree'
import { operations, Operations } from './operations'

type Char = '(' | ')' | 'x' | '/' | '+' | '-' | number

export default class Expression {

  infix: Array<glyph>
  window: Array<glyph>
  operators: Operations

  constructor() {
    this.infix = []
    this.window = []
    this.operators = operations
  }

  getStatement(): string {
    return this.infix.join(' ')
  }

  clear(): void {
    if (this.infix.length > 0) {
      this.infix = this.infix.slice(0, -1)
    }
  }

  delete(): void {
    if (this.infix.length > 0) {
      this.infix = []
    }
  }

  compute(): void {
    let node
    const translation = this.translateFromInfix()

    if (translation) {
      node = new BinaryTree().createTreeFromPostfix(translation, operations)
      this.infix = [node.evaluate()]
    }  
  }

  /* updates postfix with the value user enters */
  update(char: Char): Expression|Error {
    const statementLength = this.infix.length - 1
    const last = this.infix[statementLength]

    switch (typeof char) {
      case 'string':
        switch (char) {
          // pushes ( to [], [number, string]
          // throws when pushing ( to [number]
          case '(': 
            if (last && typeof last === 'number')
              throw new Error('Illegal syntax')
            this.infix.push(char)
            return

          // pushes ) to [number]
          // throws when pushing ) to [], [number, string]
          case ')':
            if (!last || typeof last === 'string')
              throw new Error('Illegal syntax')
            this.infix.push(char)
            return

          // pushes op to [number]
          // throws when pushing op to [], [string]
          default:
            if (!last || (last && typeof last === 'string')) {
              throw new Error('Illegal syntax')
            }
            this.infix.push(char)
            return
        }

      // appends numbers to [number]
      // pushes numbers to [], [number, string]
      default:
        if (last && typeof last === 'number') {
          const appended = `${this.infix[statementLength]}${char}`
          this.infix[statementLength] = parseFloat(appended)
        } else {
          this.infix.push(char)
        }

        return
    }
  }

  translateFromInfix(): Array<glyph> {

    const stack: Array<glyph> = []
    const queue: Array<glyph> = []
    const peek = stack => stack[stack.length - 1]
    const ops = this.operators
     
    // While there are tokens to be read: Read a token
    this.infix.map((token: glyph): void => {

      //   If the token is a number: Add token to the result stack
      if (typeof token === 'number')  queue.push(token) 


      //   If the token is an operator:
      if (typeof token === 'string' && token in ops) {
        let o2 = peek(stack)
        // o2 = peek(stack);
        // while operator token, o2, on top of the stack
        while (o2 && typeof o2 === 'string' && o2 in ops && ( 
          // and o1 is left-associative and its precedence is less than or equal to that of o2
          (ops[token].associativity === "left" && (ops[token].precedence <= ops[o2].precedence) ) || 
          // or o1 is right-associative and its precedence is less than that of o2
          (ops[token].associativity === "right" && (ops[token].precedence < ops[o2].precedence)) 
        )){
            queue.push(stack.pop())
            o2 = peek(stack)
        }

        // a.5.2 push token onto the stack.
        stack.push(token)
      }

      // If the token is a left parenthesis: Push token onto operators stack
      if (typeof token === 'string' && token === '(') stack.push(token)

      // If the token is a right parenthesis:
      if (typeof token === 'string' && token === ')') {
        // While the token at the top of the stack is not a left parenthesis:
        while (stack.length > 0 && typeof peek(stack) === 'string' && peek(stack) !== '(') {
          const temp = stack.pop()
          // Pop token from operator stack and push it onto the result stack
          queue.push(temp)
        }

        // Pop the left parenthesis, but do not put it onto the result stack
        if (stack.length > 0 && typeof peek(stack) === 'string' && peek(stack) === '(') {
          stack.pop()
        } else {
          throw new Error('Unrecognized object in stack: ')
        }
      }
    })

    // While the operators stack is not empty:
    //   Pop operator and push it onto the result stack
    while (stack.length > 0) {
      queue.push(stack.pop())
    }

    this.infix = queue
    return queue
  }
}