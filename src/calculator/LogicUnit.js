/* @flow */

import arithmetic from './Arithmetic'

export default class LogicUnit {
  expression: Array<string>;

  constructor() {
    this.expression = [];
    this.constants = new Set(['3.14', '2.718', '0.693'])
  }

  getExpression(): string {
    return this.expression.join(' ');
  }

  clear(): void {
    const last = this.expression[this.expression.length - 1] 
    //If last string is number, truncate number
    if (last && last.length > 1)
      this.expression[this.expression.length - 1] = this.expression[this.expression.length - 1].slice(0, -1)

    //If last string is number, truncate string
    else if (this.expression && this.expression.length > 1)
      this.expression[this.expression.length - 1] = last.slice(0, -1)
  }

  delete(): void {
    if (this.expression.length > 0) 
      this.expression = [];
  }

  compute(): void|string {
    try {
      const result = arithmetic.parse(this.expression.join(' '))
      const parsed = parseFloat(result).toFixed(5).replace(/\.?0+$/, '')
      this.expression = [parsed]
    } catch(thrown) {
      console.error(thrown)
      return 'Error'
    }
  }

  /* updates postfix with the value user enters */
  update(char: string): void {
    const last = this.expression[this.expression.length - 1]

    if (this.expression.length === 0) this.expression.push(char)

    else if (typeof parseFloat(char) === 'number') {
      if (typeof parseFloat(last) === 'number') {
        if (!this.constants.has(last)) {
          console.log('here', last)
          console.log('here', typeof char)
          this.expression[this.expression.length - 1] = `${last}${char}`
        } else this.expression.push(char)
      } else {
        this.expression.push(char)
      }

    } else {
      switch (char) {
        case '.': 
          this.expression[-1] = `${last}.`
          break

        case 'E':
          console.log('here', char);
          this.expression.push('2.718')
          break

        case 'PI':
          this.expression.push('3.14')
          break

        case 'LN2':
          this.expression.push('0.693')
          break

        case 'RAND':
          break

        default:
          this.expression.push(char)
          break
      }
    }
  }
}