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

import operations from './operations'
import BinaryTree from '../common/BinaryTree'

export default class Expression {
  type Char = '(' | ')' | 'x' | '/' | '+' | '-' | number

  postfix: Array<glyph>
  infix: Array<glyph>

  constructor() {
    this.postfix = []
    this.infix = []
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

  compute(): void|Error {
    const translation = this.translateFromInfix()

    if (translation) {
      const answer = new BinaryTree()
        .createTreeFromPostfix(translation, operations)
        .evaluate()
      this.infix = answer
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
            if (last || typeof last === 'string') 
              throw new Error('Illegal syntax')
            this.infix.push(char)
            return

          // pushes op to [number]
          // throws when pushing op to [], [string]
          default:
            if (!last || (last && typeof last === 'string') 
              throw new Error('Illegal syntax')
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

  translateFromInfix(): void|Error {
    type State = { stack: Array<glyph>, queue: Array<glyph> }

    const peek: glyph[] => glyph = stack => stack[stack.length - 1]
    const stack: Array<glyph> = []
    const queue: Array<glyph> = []

    const state: State = { stack, queue, }

    // Read a token.
    this.infix.reduce((state: State, token: glyph): State => {
      const { stack, queue } = state

      // If the token is a number, then push it to the output queue.
      if (typeof token === 'number') 
        queue.push(token) 

      // If the token is an operator, o1, then:
      if (typeof token === 'string' && token !== ')') { 

        // while there is an operator token o2, at the top of the operator stack and either
          // token  is left-associative and its precedence is less than or equal to that of o2, or
          // N/A: token  is right associative, and has precedence less than that of o2,
        while(peek(stack) in this.operators && this.operators[token].precedence >= this.operators[peek(stack)].precedence) {

            // pop o2 off the operator stack, onto the output queue;
            queue.push(stack.pop())
        }

        // at the end of iteration push o1 onto the operator stack.
        stack.push(token)
      }

      // If the token is a left parenthesis (i.e. "("), then push it onto the stack.
      if (typeof token === 'string' && token === '(') 
        stack.push(token)

      // If the token is a right parenthesis (i.e. ")"):
      if (typeof token === 'string' && token === ')') {

        // Until the token at the top of the stack is a left parenthesis, pop this.operators off the stack onto the output queue.
        let glyph, isGlyph, leftParenFound

        do {
          glyph = stack.pop()
          leftParenFound = typeof glyph === 'string' && glyph === '(' 
          if (!leftParenFound) 
            queue.push(glyph)
        } while (!leftParenFound)

        // Pop the left parenthesis from the stack, but not onto the output queue.
        if (typeof glyph === 'string' && glyph !== ')') 
          stack.pop() 

        // If the stack runs out without finding a left parenthesis, then there are mismatched parentheses.
        if (typeof glyph === undefined) 
          throw new Error('Mismatched Parentheses') 
      }

      return state
    }, state)

    // When there are no more tokens to read:
    // While there are still operator tokens in the stack:
    let remainingTokens = stack.length > 0

    while (remainingTokens) {
      const tok = stack.pop()

      // If the operator token on the top of the stack is a parenthesis, then there are mismatched parentheses.
      if (typeof tok === 'string' && (tok === '(' || tok === ')'))
        throw new Error('Mismatched Parentheses') 

      // Pop the operator onto the output queue.
      queue.push(tok)
      remainingTokens = stack.length
    }

    this.postfix = queue
  }
}
