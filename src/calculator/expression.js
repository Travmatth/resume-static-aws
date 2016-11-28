/*
 * Expression -> RPN:
 * 
 * Shunting-yard algorithm
 * Translated from:
 * https://en.wikipedia.org/wiki/Shunting-yard_algorithm
 *
 * @flow
 */

import BinaryTree from '../common/BinaryTree'

export default class Expression {
  postfix: glyph[]
  infix: glyph[]
  tree: BinaryTree<glyph>

  constructor() {
    const { add, subtract, multiply, divide, } = Math
    this.postfix = []
    this.infix = []
    this.tree = new BinaryTree({
      '+': add,
      '-': subtract,
      'x': multiply,
      '/': divide,
    })
  }

  /* remove last value from postfix */
  clear(): void {
    if (this.infix.length > 0) {
      this.infix = this.infix.slice(0, -1)
    }
  }

  /* delete infix */
  delete(): void {
    if (this.infix.length > 0) {
      this.infix = []
    }
  }

  /* updates postfix with the value user entered */
  update(glyph: string|number): void|Error {
    // Glyphs can be a string (push onto postfix)
    // or number (append to last num if appl, or just push onto postfix)
    const statementLength = this.infix.length - 1
    const last = this.infix[statementLength]
    const lastType = typeof last === 'number'
    const glyphType = typeof glyph === 'number'
    const shouldContinueAddingNumber = glyphType && lastType 
    const shouldAddSymbolToStatement = !glyphType && lastType 
    const shouldAddNumberToStatement = glyphType && !lastType 

    if (shouldContinueAddingNumber) {
      if (typeof last === 'number') // type checking needed by flow 
        this.infix[statementLength] = last * 10 + glyph
    } else if (shouldAddSymbolToStatement || shouldAddNumberToStatement) {
      this.infix.push(glyph)
    } else {
      // if (glyphType === 'string' && lastType === 'string')
      throw Error(`ParseError: Illegal character combination: ${JSON.stringify(this.infix)} doesn't accept: ${glyph}`)
    }
  }

  compute(): void|Error {
    this.translateFromInfix()
    this.calculateAnswer()
  }

  this.calculateAnswer() {
    this.tree.createFromPostFix(this.postfix)
    this.infix = this.tree.evaluate()
  }

  translateFromInfix(): void|Error {
    const operators = { '*': 3, '/': 3, '+': 2, '−': 2, }
    const peek: glyph[] => glyph = stack => stack[stack.length - 1]
    const stack = []
    const queue = []

    // Read a token.
    // const token: ?glyph = infix.unshift()
    const rpnState: { stack: glyph[], queue: glyph[] } = {
      stack: [],
      queue: [],
    }

    this.infix.reduce(token, state => {
      const { stack, queue } = state

      // If the token is a number, then push it to the output queue.
      if (typeof token === 'number') state queue.push(token) 

      // If the token is an operator, o1, then:
      if (typeof token === 'string') stack.push(token) { 
        let o1 = token

        // while there is an operator token o2, at the top of the operator stack and either
          // o1 is left-associative and its precedence is less than or equal to that of o2, or
          // N/A: o1 is right associative, and has precedence less than that of o2,
        while(peek(stack) in operators && operators[o1] >= operators[peek(stack)]) {

            // pop o2 off the operator stack, onto the output queue;
            queue.push(stack.pop())
        }

        // at the end of iteration push o1 onto the operator stack.
        stack.push(token)
      }

      // If the token is a left parenthesis (i.e. "("), then push it onto the stack.
      if (typeof token === 'string' && token === '(') stack.push(token)

      // If the token is a right parenthesis (i.e. ")"):
      if (typeof token === 'string' && token === ')') {
        // Until the token at the top of the stack is a left parenthesis, pop operators off the stack onto the output queue.
        let glyph, isGlyph, parenFound
        do {
          glyph = stack.pop()
          // Only needed bc I don't know how to check type === string|number directly
          isGlyph = typeof glyph === 'string' || typeof glyph === 'string'
          parenFound = isGlyph && glyph === '(' 

          if (!parenFound) queue.push(glyph)
        } while (!parenFound)

        // Pop the left parenthesis from the stack, but not onto the output queue.
        if (typeof glyph === 'string' && glyph !== '(') 
          stack.pop() 

        // If the stack runs out without finding a left parenthesis, then there are mismatched parentheses.
        if (typeof glyph === undefined) 
          throw new Error('Mismatched Parentheses') 
      }
    }, rpnState)

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
