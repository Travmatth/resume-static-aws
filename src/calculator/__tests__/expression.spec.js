/* @flow */
/* eslint-env jest */

import { Calculator } from '../Models';

let expr;

describe('Calculator Model', () => {
  beforeEach(() => {
    expr = new Calculator();
  });

  it('should be able to enter decimals', () => {
    expr.update('9');
    expr.update('.');
    expr.update('3');
    expr.update('3');
    expect(expr.expression[0]).toBe('9.33');
  });

  it('should remove digits from decimal position', () => {
    expr.update('9');
    expr.update('.');
    expr.update('3');
    expr.update('3');
    expr.clear();
    expect(expr.getExpression()).toBe('9.3');
  });

  it('should remove decimal from integers', () => {
    expr.update('9');
    expr.update('.');
    expr.clear();
    expect(expr.getExpression()).toBe('9');
  });

  it('should remove integers entirely', () => {
    expr.update('9');
    expr.clear();
    expect(expr.getExpression()).toBe('');
  });

  it('should remove symbol from expression', () => {
    expr.update('9');
    expr.update('+');
    expr.clear();
    expect(expr.getExpression()).toBe('9');
  });

  it('should drop digit from number', () => {
    expr.update('9');
    expr.update('+');
    expr.update('9');
    expr.update('9');
    expr.clear();
    expect(expr.getExpression()).toBe('9 + 9');
  });

  //ARITHMETIC
  it('1 + 1 should work', () => {
    expr.update('1');
    expr.update('+');
    expr.update('1');
    expr.compute();
    expect(expr.getExpression()).toBe('2');
  });

  it('2 * 3 should work', () => {
    expr.update('2');
    expr.update('*');
    expr.update('3');
    expr.compute();
    expect(expr.getExpression()).toBe('6');
  });

  it('4 / 2 should work', () => {
    expr.update('4');
    expr.update('/');
    expr.update('2');
    expr.compute();
    expect(expr.getExpression()).toBe('2');
  });

  it('4 - 2 should work', () => {
    expr.update('4');
    expr.update('-');
    expr.update('2');
    expr.compute();
    expect(expr.getExpression()).toBe('2');
  });

  it('3 ^ 3 should work', () => {
    expr.update('3');
    expr.update('^');
    expr.update('3');
    expr.compute();
    expect(expr.getExpression()).toBe('27');
  });

  it('6 / 3 * (4 - 6) + 5 should work', () => {
    expr.update('6');
    expr.update('/');
    expr.update('3');
    expr.update('*');
    expr.update('(');
    expr.update('4');
    expr.update('-');
    expr.update('6');
    expr.update(')');
    expr.update('+');
    expr.update('5');
    expr.compute();
    expect(expr.getExpression()).toBe('1');
  });

  //FUNCTIONS
  it('E symbol can be entered', async () => {
    const expected = ['2.718'];
    expr.update('E');
    expect(expr.expression[0]).toBe(expected[0]);
  });

  it('PI symbol can be entered', async () => {
    const expected = ['3.14'];
    expr.update('PI');
    expect(expr.expression[0]).toBe(expected[0]);
  });

  it('LN2 symbol can be entered', async () => {
    const expected = ['0.693'];
    expr.update('LN2');
    expect(expr.expression[0]).toBe(expected[0]);
  });

  it('SIN should compute correctly', () => {
    expr.update('SIN');
    expr.update('0');
    expr.update(')');
    expr.compute();
    expect(expr.getExpression()).toBe('0');
  });

  it('COS should compute correctly', () => {
    expr.update('COS');
    expr.update('0');
    expr.update(')');
    expr.compute();
    expect(expr.getExpression()).toBe('1');
  });

  it('TAN should compute correctly', () => {
    expr.update('TAN');
    expr.update('1');
    expr.update(')');
    expr.compute();
    expect(expr.getExpression()).toBe('1.55741');
  });

  it('LOG should compute correctly', () => {
    expr.update('LOG');
    expr.update('1');
    expr.update(')');
    expr.compute();
    expect(expr.getExpression()).toBe('0');
  });

  it('RAND should compute correctly', () => {
    expr.update('RAND');
    const rand = expr.getExpression();
    expect(!isNaN(rand)).toBe(true);
    expect(rand <= 10 && rand >= 0).toBe(true);
  });

  it('delete should clear internal state', () => {
    expr.update('1');
    expr.update('+');
    expr.delete();
    expect(expr.getExpression()).toBe('');
  });
});
