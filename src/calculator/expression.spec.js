/* @flow */
import test from 'ava'

import LogicUnit from './LogicUnit'

let expr, infix

test.beforeEach('LogicUnit', t => {
  expr = new LogicUnit()
  infix = []
});

//UPDATING
test('decimals can be entered', t => {
  expr.update('9')
  expr.update('.')
  expr.update('3')
  expr.update('3')
  t.is(expr.expression[0], '9.33')
});

test('decimals can be deleted', t => {
  expr.update('9')
  expr.update('.')
  expr.update('3')
  expr.update('3')
  expr.clear()
  t.is(expr.getExpression(), '9.3')
});

test('decimal can be deleted', t => {
  expr.update('9')
  expr.update('.')
  expr.clear()
  t.is(expr.getExpression(), '9')
});

//ARITHMETIC
test('1 + 1 should work', t => {
  expr.update('1')
  expr.update('+')
  expr.update('1')
  expr.compute()
  t.is(expr.getExpression(), '2')
});

test('2 * 3 should work', t => {
  expr.update('2')
  expr.update('*')
  expr.update('3')
  expr.compute()
  t.is(expr.getExpression(), '6')
});

test('4 / 2 should work', t => {
  expr.update('4')
  expr.update('/')
  expr.update('2')
  expr.compute()
  t.is(expr.getExpression(), '2')
});

test('4 - 2 should work', t => {
  expr.update('4')
  expr.update('-')
  expr.update('2')
  expr.compute()
  t.is(expr.getExpression(), '2')
});

test('6 / 3 * (4 - 6) + 5 should work', t => {
  expr.update('6')
  expr.update('/')
  expr.update('3')
  expr.update('*')
  expr.update('(')
  expr.update('4')
  expr.update('-')
  expr.update('6')
  expr.update(')')
  expr.update('+')
  expr.update('5')
  expr.compute()
  t.is(expr.getExpression(), '1')
});

//FUNCTIONS
test('symbols can be entered', t => {
  const expected = ['2.718', '3.14', '0.693']
  expr.update('E')
  expr.update('PI')
  expr.update('LN2')
  (expr.expression).to.eql(expected)
})

test('SIN should compute correctly', t => {
  expr.update('SIN')
  expr.update('0')
  expr.update(')')
  expr.compute()
  t.is(expr.getExpression(), '0')
})

test('COS should compute correctly', t => {
  expr.update('COS')
  expr.update('0')
  expr.update(')')
  expr.compute()
  t.is(expr.getExpression(), '1')
})

test('TAN should compute correctly', t => {
  expr.update('TAN')
  expr.update('1')
  expr.update(')')
  expr.compute()
  t.is(expr.getExpression(), '1.55741')
})

test('LOG should compute correctly', t => {
  expr.update('LOG')
  expr.update('1')
  expr.update(')')
  expr.compute()
  t.is(expr.getExpression(), '0')
})
