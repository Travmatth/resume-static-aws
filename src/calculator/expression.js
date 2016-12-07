/* @flow */

import BinaryTree from '../common/BinaryTree'
import { operations } from './operations'
import { Num, Str } from './CalcPrimitives'

export default class Expression {
  infix: Array<glyph>
  window: Array<glyph>
  operators: Object

  constructor() {
    this.infix = [];
    this.window = [];
    this.operators = operations;
  }

  getStatement(): string {
    return this.infix.map(tok => tok.value).join(' ');
  }

  clear(): void {
    if (this.infix.length > 0) {
      const last = this.infix[this.infix.length - 1]

      //If glyph is a number && is a single number, then just erase it
      if (last && last.kind === 'number' && !last.value.almostEmpty()) {
        this.infix[-1] = last.value.erase()

      //If glyph is a number not almost empty || string erase last value
      } else {
        this.infix.pop()
      }
    }
  }

  delete(): void {
    if (this.infix.length > 0) this.infix = [];
  }

  compute(): void {
    let node
    const translation = this.translateFromInfix();

    if (translation) {
      node = new BinaryTree().createTreeFromPostfix(translation, operations);
      this.infix = [node.evaluate()];
    }
  }

  /* updates postfix with the value user enters */
  update(char: glyph): void {
    const statementLength = this.infix.length - 1
    const last = this.infix[statementLength]

    switch (typeof char) {
      case 'string':
          switch (char) {

          // pushes . to [number]
          // throws when pushing to (, ), or op
          case '.': 
            if (!last || last.kind === 'string')
              throw new Error('Illegal syntax')
            if (last && last.kind === 'number') 
              this.infix[statementLength].value.isDecimal = true
            return

          // pushes ( to [], [number, string]
          // throws when pushing ( to [number]
          case '(': 
            if (last && typeof last === typeof Num)
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
          // throws when pushing op to [], (, or other op
          default:
            if (!last || 
              (last && typeof last === 'string' && last !== ')')) {
              throw new Error('Illegal syntax')
            }

            this.infix.push(char)
            return
        }

      // appends numbers to [number]
      // pushes numbers to [], [number, string]
      default:
        if (last && last.kind === 'number') {
          this.infix[statementLength].value.alter(char)
        } else {
          this.infix.push(char)
        }

        return
    }
  }

  /* Expression -> RPN:
   * 
   * Shunting-yard algorithm
   * Translated from:
   * https://en.wikipedia.org/wiki/Shunting-yard_algorithm
   *
   * https://github.com/brettshollenberger/shunting-yard-algorithm
   * http://toddgerspacher.blogspot.com/2013/01/shunting-yard-algorithm.html
   * http://eddmann.com/posts/shunting-yard-implementation-in-java/
   * https://rosettacode.org/wiki/Parsing/Shunting-yard_algorithm#JavaScript
   * https://unnikked.ga/the-shunting-yard-algorithm-36191ea795d9#.6nr5ampoi
   * http://scanftree.com/Data_Structure/prefix-postfix-infix-online-converter
   *
   * Limitations:
   * Does not handle f(x)'s: sin, cos, etc.
   */
  translateFromInfix(): Array<glyph> {
    const stack: Array<glyph> = []
    const queue: Array<glyph> = []
    const peek = stack => stack[stack.length - 1]
    const ops = this.operators
     
    // While there are tokens to be read: Read a token
    this.infix.map(tok => tok.value).map((token: glyph): void => {

      //   If the token is a number: Add token to the result stack
      if (typeof token === 'number')  queue.push(token) 


      //   If the token is an operator:
      if (typeof token === 'string' && token in ops) {
        let o2 = peek(stack)

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

      // If the token is a left parenthesis Push token onto operators stack
      if (typeof token === 'string' && token === '(') stack.push(token)

      // If the token is a right parenthesis:
      if (typeof token === 'string' && token === ')') {

        // While the token at the top of the stack is not a left parenthesis:
        while (stack.length > 0 && typeof peek(stack) === 'string' && peek(stack) !== '(') {
          const temp = stack.pop();
          // Pop token from operator stack and push it onto the result stack
          queue.push(temp);
        }

        // Pop the left parenthesis, but do not put it onto the result stack
        if (stack.length > 0 && typeof peek(stack) === 'string' && peek(stack) === '(') {
          stack.pop();
        } else {
          throw new Error('Unrecognized object in stack: ');
        }
      }
    })

    // While the operators stack is not empty:
    //   Pop operator and push it onto the result stack
    while (stack.length > 0) queue.push(stack.pop())

    // this.infix = queue
    return queue
  }
}