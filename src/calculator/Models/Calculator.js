/* @flow */

import { arithmetic } from '../Parser';
import { rand } from 'common/js/utils';

const operators = new Set(['+', '-', '*', '/', '^']);
const constants = { E: '2.718', PI: '3.14', LN2: '0.693' };

export default class Calculator {
  expression: Array<string>;

  constructor() {
    this.expression = [];
  }

  getExpression(): string {
    return this.expression.join(' ');
  }

  clear(): void {
    const len = this.expression.length - 1;
    const last = this.expression[len];

    // If last char, replace with empty string
    if (this.expression.length === 1) this.expression = [''];

    // If last char is digit in decimal pos, drop digit
    // If last char is decimal on integer, drop drop decimal
    if (last && last.length > 1) {
      this.expression[len] = last.slice(0, -1);
    } else if (this.expression && this.expression.length > 1) {
      // If last char is integer, drop integer
      // If last char is symbol, drop symbol
      this.expression = this.expression.slice(0, -1);
    }
  }

  delete(): void {
    if (this.expression.length > 0) this.expression = [];
  }

  compute(): void {
    const result = arithmetic.parse(this.expression.join(' '));
    const parsed = parseFloat(result).toFixed(5).replace(/\.?0+$/, '');
    this.expression = [parsed];
  }

  /* updates postfix with the value user enters */
  update(char: string): void {
    const last = this.expression[this.expression.length - 1];

    // If user entered number, determine if it should be appended to last
    // number or should it be entered as a discrete number in expression
    if (parseFloat(char) || char === '0') {
      if (parseFloat(last)) {
        this.expression.length === 0
          ? this.expression.push(char)
          : (this.expression[this.expression.length - 1] = `${last}${char}`);
      } else {
        this.expression.push(char);
      }

      // If string is entered, it can be: function | constant | decimal
      // Constants are added as a number, functions & decimals as a string
    } else {
      switch (char) {
        case '.':
          if (this.expression.length > 0)
            this.expression[this.expression.length - 1] = `${last}.`;
          break;

        case 'RAND':
          this.expression.push(rand(9));
          break;

        default:
          if (char in constants) {
            this.expression.push(constants[char]);
          } else if (char === '(' || char === ')') {
            this.expression.push(char);
          } else {
            this.expression.push(!operators.has(char) ? `${char}(` : char);
          }

          break;
      }
    }
  }
}
