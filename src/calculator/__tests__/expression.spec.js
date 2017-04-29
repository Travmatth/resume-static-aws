/* @flow */
import { LogicUnit } from '../Models';

let expr, infix;

beforeEach('LogicUnit', () => {
  expr = new LogicUnit();
  infix = [];
});

//UPDATING
test('decimals can be entered', () => {
  expr.update('9');
  expr.update('.');
  expr.update('3');
  expr.update('3');
  expect(expr.expression[0]).toBe('9.33');
});

test('decimals can be deleted', () => {
  expr.update('9');
  expr.update('.');
  expr.update('3');
  expr.update('3');
  expr.clear();
  expect(expr.getExpression()).toBe('9.3');
});

test('decimal can be deleted', () => {
  expr.update('9');
  expr.update('.');
  expr.clear();
  expect(expr.getExpression()).toBe('9');
});

//ARITHMETIC
test('1 + 1 should work', () => {
  expr.update('1');
  expr.update('+');
  expr.update('1');
  expr.compute();
  expect(expr.getExpression()).toBe('2');
});

test('2 * 3 should work', () => {
  expr.update('2');
  expr.update('*');
  expr.update('3');
  expr.compute();
  expect(expr.getExpression()).toBe('6');
});

test('4 / 2 should work', () => {
  expr.update('4');
  expr.update('/');
  expr.update('2');
  expr.compute();
  expect(expr.getExpression()).toBe('2');
});

test('4 - 2 should work', () => {
  expr.update('4');
  expr.update('-');
  expr.update('2');
  expr.compute();
  expect(expr.getExpression()).toBe('2');
});

test('6 / 3 * (4 - 6) + 5 should work', () => {
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
test('E symbol can be entered', async () => {
  const expected = ['2.718'];
  expr.update('E');
  expect(expr.expression[0]).toBe(expected[0]);
});

test('PI symbol can be entered', async () => {
  const expected = ['3.14'];
  expr.update('PI');
  expect(expr.expression[0]).toBe(expected[0]);
});

test('LN2 symbol can be entered', async () => {
  const expected = ['0.693'];
  expr.update('LN2');
  expect(expr.expression[0]).toBe(expected[0]);
});

test('SIN should compute correctly', () => {
  expr.update('SIN');
  expr.update('0');
  expr.update(')');
  expr.compute();
  expect(expr.getExpression()).toBe('0');
});

test('COS should compute correctly', () => {
  expr.update('COS');
  expr.update('0');
  expr.update(')');
  expr.compute();
  expect(expr.getExpression()).toBe('1');
});

test('TAN should compute correctly', () => {
  expr.update('TAN');
  expr.update('1');
  expr.update(')');
  expr.compute();
  expect(expr.getExpression()).toBe('1.55741');
});

test('LOG should compute correctly', () => {
  expr.update('LOG');
  expr.update('1');
  expr.update(')');
  expr.compute();
  expect(expr.getExpression()).toBe('0');
});
