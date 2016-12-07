/* @flow */
import { expect, assert } from 'chai'
import { describe, it, beforeEach } from 'mocha'

import Expression from './expression'
import operations from './operations'
import { Str, Num } from './CalcPrimitives'

describe('Expression', () => {
  describe('translateFromInfix', () => {
    let expr, infix
    
    beforeEach(() => {
      expr = new Expression(operations)
      infix = []
    });

    it('( 3 x 4 ) / 2 + ( 1  -  3 ) should translate', () => {
      const postfix = '3 4 2 x 1 5 - 2 3 ^ ^ / +' 
      expr.infix = [3, '+', 4, 'x', 2, '/', '(', 1, '-', 5, ')', '^', 2, '^', 3]        
      
      const transformedExpr = expr.translateFromInfix()
      expect(transformedExpr.map(tok => tok.value).join(' ')).to.equal(postfix)
    });
  });

  describe.only('update', () => {
    let expr
    beforeEach(() => {
      expr = new Expression(operations)
    });

    it('pushes numbers to []', () => {
      expr.update(new Num(9))
      expect(expr.getStatement()).to.equal('9')
    });

    it('pushes ( to []', () => {
      expr.update(Str('('))
      expect(expr.getStatement()).to.equal('(')
    });

    it('throws when pushing ) to []', () => {
      expect( _ => expr.update(Str(')'))).to.throw(Error);
    });

    it('appends numbers to [number]', () => {
      expr.update(new Num(3))
      expr.update(new Num(9))
      expect(expr.getStatement()).to.equal('39')
    });

    it('throws when pushing ( to [number]', () => {
      expr.update(new Num(3))
      expect( _ => expr.update(Str('('))).to.throw(Error);
    });

    //DERSIRED BEHAVIOR
    // it('throws when pushing ) to [number]', () => {
    //   expr.update(new Num(3))
    //   expect( _ => expr.update(Str(')'))).to.throw(Error);
    // });

    it('pushes numbers to [number, string]', () => {
      expr.update(new Num(3))
      expr.update(Str('+'))
      expr.update(new Num(9))
      expect(expr.getStatement()).to.equal('3 + 9')
    });

    it('pushes ( to [number, string]', () => {
      expr.update(new Num(3))
      expr.update(Str('+'))
      expr.update(Str('('))
      expect(expr.getStatement()).to.equal('3 + (')
    });

    it('throws when pushing ) to [number, string]', () => {
      expr.update(new Num(3))
      expr.update(Str('+'))
      expect( _ => expr.update(Str(')'))).to.throw(Error);
    });

    it('throws when pushing string to []', () => {
      expect( _ => expr.update(Str('+')).)to.throw(Error);
    });

    it('throws when pushing string to [string]', () => {
      expr.update(Str('+'))
      expect( _ => expr.update(Str('+')).)to.throw(Error);
    });

    it('throws when pushing string to [number, string]', () => {
      expr.update(new Num(9))
      expr.update(Str('+'))
      expect( _ => expr.update(Str('+')).)to.throw(Error);
    });

    it('allows pushing op to ) ', () => {
      expr.update(Str('('))
      expr.update(new Num(9))
      expr.update(Str('-'))
      expr.update(new Num(3))
      expr.update(Str(')'))
      expr.update(Str('/'))
      expr.update(new Num(3))
      expect(expr.getStatement()).to.equal('( 9 - 3 ) / 3')
    });

    it('decimals can be entered', () => {
      expr.update(new Num(9))
      expr.update(Str('.'))
      expr.update(new Num(3))
      expr.update(new Num(3))
      expect(expr.infix[0].value).to.equal(9.33)
    });

    it('decimals can be deleted', () => {
      expr.update(new Num(9))
      expr.update(Str('.'))
      expr.update(new Num(3))
      expr.update(new Num(3))
      expr.clear()
      expect(expr.getStatement()).to.equal('9.3')
    });

    it('decimal can be deleted', () => {
      expr.update(new Num(9))
      expr.update(Str('.'))
      expr.clear()
      expect(expr.getStatement()).to.equal('9')
    });
  });

  describe('Compute', () => {
    let expr
    beforeEach(function () {
      expr = new Expression(operations)
    });

    it('1 + 1 should work', () => {
      // assert.equal(-1, [1,2,3].indexOf(4));
      expr.update(new Num(1))
      expr.update(Str('+'))
      expr.update(new Num(1))
      expr.compute()
      expect(expr.getStatement()).to.equal('2')
    });

    it('2 x 3 should work', () => {
      // assert.equal(-1, [1,2,3].indexOf(4));
      expr.update(new Num(2))
      expr.update(Str('x'))
      expr.update(new Num(3))
      expr.compute()
      expect(expr.getStatement()).to.equal('6')
    });

    it('4 / 2 should work', () => {
      // assert.equal(-1, [1,2,3].indexOf(4));
      expr.update(new Num(4))
      expr.update(Str('/'))
      expr.update(new Num(2)
      expr.compute()
      expect(expr.getStatement()).to.equal('2')
    });

    it('4 - 2 should work', () => {
      // assert.equal(-1, [1,2,3].indexOf(4));
      expr.update(new Num(4))
      expr.update(Str('-'))
      expr.update(new Num(2)
      expr.compute()
      expect(expr.getStatement()).to.equal('2')
    });

    it('6 / 3 x 4 - 6 + 5 should work', () => {
      // assert.equal(-1, [1,2,3].indexOf(4));
      expr.update(new Num(6))
      expr.update(Str('/'))
      expr.update(new Num(3))
      expr.update(Str('x'))
      expr.update(new Num(4))
      expr.update(Str('-'))
      expr.update(new Num(6))
      expr.update(Str('+'))
      expr.update(new Num(5))
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