/* @flow */
import { expect, assert } from 'chai'
import { describe, it, beforeEach } from 'mocha'

import LogicUnit from './LogicUnit'

describe.only('LogicUnit', () => {
  let expr, infix
    
  beforeEach(() => {
      expr = new LogicUnit()
      infix = []
  });

  describe('update', () => {
    it('decimals can be entered', () => {
      expr.update('9')
      expr.update('.')
      expr.update('3')
      expr.update('3')
      expect(expr.expression[0]).to.equal('9.33')
    });

    it('decimals can be deleted', () => {
      expr.update('9')
      expr.update('.')
      expr.update('3')
      expr.update('3')
      expr.clear()
      expect(expr.getExpression()).to.equal('9.3')
    });

    it('decimal can be deleted', () => {
      expr.update('9')
      expr.update('.')
      expr.clear()
      expect(expr.getExpression()).to.equal('9')
    });
  });

  describe('Compute', () => {
    it('1 + 1 should work', () => {
      expr.update('1')
      expr.update('+')
      expr.update('1')
      expr.compute()
      expect(expr.getExpression()).to.equal('2')
    });

    it('2 * 3 should work', () => {
      expr.update('2')
      expr.update('*')
      expr.update('3')
      expr.compute()
      expect(expr.getExpression()).to.equal('6')
    });

    it('4 / 2 should work', () => {
      expr.update('4')
      expr.update('/')
      expr.update('2')
      expr.compute()
      expect(expr.getExpression()).to.equal('2')
    });

    it('4 - 2 should work', () => {
      expr.update('4')
      expr.update('-')
      expr.update('2')
      expr.compute()
      expect(expr.getExpression()).to.equal('2')
    });

    it('6 / 3 * (4 - 6) + 5 should work', () => {
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
      expect(expr.getExpression()).to.equal('1')
    });

    it('symbols can be entered', () => {
      const expected = ['2.718', '3.14', '0.693']
      expr.update('E')
      expr.update('PI')
      expr.update('LN2')
      expect(expr.expression).to.eql(expected)
    })
  });

  describe('functions should work', () => {
    it('SIN should compute correctly', () => {
      expr.update('SIN')
      expr.update('0')
      expr.update(')')
      expr.compute()
      expect(expr.getExpression()).to.equal('0')
    })

    it('COS should compute correctly', () => {
      expr.update('COS')
      expr.update('0')
      expr.update(')')
      expr.compute()
      expect(expr.getExpression()).to.equal('1')
    })

    it('TAN should compute correctly', () => {
      expr.update('TAN')
      expr.update('1')
      expr.update(')')
      expr.compute()
      expect(expr.getExpression()).to.equal('1.55741')
    })

    it('LOG should compute correctly', () => {
      expr.update('LOG')
      expr.update('1')
      expr.update(')')
      expr.compute()
      expect(expr.getExpression()).to.equal('0')
    })
  });
});

describe.skip('Array', function() {
  describe('#indexOf()', function() {
    it('should return -1 when the value is not present', function() {
      // assert.equal(-1, [1,2,3].indexOf(4));
    });
  });
});