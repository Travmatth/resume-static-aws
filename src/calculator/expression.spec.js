/* @flow */
import { expect, assert } from 'chai'
import { describe, it, beforeEach } from 'mocha'

import Expression from './expression'
import operations from './operations'

describe('Expression', () => {
  describe('translateFromInfix', () => {
    let expr, infix
    
    beforeEach(() => {
      expr = new Expression(operations)
      infix = []
    });

    it('should work', () => {
      const postfix = '3 4 2 x 1 5 - 2 3 ^ ^ / +' 
      // expr.infix = ['(', 3, 'x', 4, ')', '/', 2, '+', '(', 1, ' - ', 3, ')']        
      expr.infix = [3, '+', 4, 'x', 2, '/', '(', 1, '-', 5, ')', '^', 2, '^', 3]        
      
      expr.translateFromInfix()
      expect(expr.getStatement()).to.equal(postfix)
    });
  });

  describe('update', () => {
    let expr
    beforeEach(() => {
      expr = new Expression(operations)
    });

    it('pushes numbers to []', () => {
      expr.update(9)
      expect(expr.getStatement()).to.equal('9')
    });

    it('pushes ( to []', () => {
      expr.update('(')
      expect(expr.getStatement()).to.equal('(')
    });

    it('throws when pushing ) to []', () => {
      expect( _ => expr.update(')')).to.throw(Error);
    });

    it('appends numbers to [number]', () => {
      expr.infix.push(3)
      expr.update(9)
      expect(expr.getStatement()).to.equal('39')
    });

    it('throws when pushing ( to [number]', () => {
      expr.infix.push(3)
      expect( _ => expr.update('(')).to.throw(Error);
    });

    //DERSIRED BEHAVIOR
    // it('throws when pushing ) to [number]', () => {
    //   expr.infix.push(3)
    //   expect( _ => expr.update(')')).to.throw(Error);
    // });

    it('pushes numbers to [number, string]', () => {
      expr.infix.push(3)
      expr.infix.push('+')
      expr.update(9)
      expect(expr.getStatement()).to.equal('3 + 9')
    });

    it('pushes ( to [number, string]', () => {
      expr.infix.push(3)
      expr.infix.push('+')
      expr.update('(')
      expect(expr.getStatement()).to.equal('3 + (')
    });

    it('throws when pushing ) to [number, string]', () => {
      expr.infix.push(3)
      expr.infix.push('+')
      expect( _ => expr.update(')')).to.throw(Error);
    });

    it('throws when pushing string to []', () => {
      expect( _ => expr.update('+')).to.throw(Error);
    });

    it('throws when pushing string to [string]', () => {
      expr.infix.push('+')
      expect( _ => expr.update('+')).to.throw(Error);
    });

    it('throws when pushing string to [number, string]', () => {
      expr.infix.push(9)
      expr.infix.push('+')
      expect( _ => expr.update('+')).to.throw(Error);
    });
  });

  describe('Compute', () => {
    let expr
    beforeEach(function () {
      expr = new Expression(operations)
    });

    it('1 + 1 should work', () => {
      // assert.equal(-1, [1,2,3].indexOf(4));
      expr.infix.push(1)
      expr.infix.push('+')
      expr.infix.push(1)
      expr.compute()
      expect(expr.getStatement()).to.equal('2')
    });

    it('2 x 3 should work', () => {
      // assert.equal(-1, [1,2,3].indexOf(4));
      expr.infix.push(2)
      expr.infix.push('x')
      expr.infix.push(3)
      expr.compute()
      expect(expr.getStatement()).to.equal('6')
    });

    it('4 / 2 should work', () => {
      // assert.equal(-1, [1,2,3].indexOf(4));
      expr.infix.push(4)
      expr.infix.push('/')
      expr.infix.push(2)
      expr.compute()
      expect(expr.getStatement()).to.equal('2')
    });

    it('4 - 2 should work', () => {
      // assert.equal(-1, [1,2,3].indexOf(4));
      expr.infix.push(4)
      expr.infix.push('-')
      expr.infix.push(2)
      expr.compute()
      expect(expr.getStatement()).to.equal('2')
    });

    it('6 / 3 x 4 - 6 + 5 should work', () => {
      // assert.equal(-1, [1,2,3].indexOf(4));
      expr.infix.push(6)
      expr.infix.push('/')
      expr.infix.push(3)
      expr.infix.push('x')
      expr.infix.push(4)
      expr.infix.push('-')
      expr.infix.push(6)
      expr.infix.push('+')
      expr.infix.push(5)
      expr.compute()
      expect(expr.getStatement()).to.equal('7')
    });
  });
});

describe.skip('Array', function() {
  describe('#indexOf()', function() {
    it('should return -1 when the value is not present', function() {
      // assert.equal(-1, [1,2,3].indexOf(4));
    });
  });
});