/* @flow */
import { expect } from 'chai'
import Expression from './expression'
import { describe, it, beforeEach } from 'mocha'

describe('Expression', () => {
  describe.skip('update', () => {
    let expr
    beforeEach(function () {
      expr = new Expression()
    });

    it('pushes numbers to []', () => {
      expr.update(9)
      expect(expr.getStatement()).to.equal('9')
    });

    it('pushes numbers to [number]', () => {
      expr.statement.push(3)
      expr.update(9)
      expect(expr.getStatement()).to.equal('39')
    });

    it('pushes numbers to [number, string]', () => {
      expr.statement.push(3)
      expr.statement.push('+')
      expr.update(9)
      expect(expr.getStatement()).to.equal('3 + 9')
    });

    it('throws when pushing string to []', () => {
      expect(_ => expr.update('+')).to.throw(Error);
    });

    it('throws when pushing string to [string]', () => {
      expr.statement.push('+')
      expect(_ => expr.update('+')).to.throw(Error);
    });

    it('throws when pushing string to [number, string]', () => {
      expr.statement.push(9)
      expr.statement.push('+')
      expect(_ => expr.update('+')).to.throw(Error);
    });
  });

  describe('Compute', () => {
    let expr
    beforeEach(function () {
      expr = new Expression()
    });

    it('1 + 1 should work', () => {
      // assert.equal(-1, [1,2,3].indexOf(4));
      expr.statement.push(1)
      expr.statement.push('+')
      expr.statement.push(1)
      expr.compute()
      expect(expr.getStatement()).to.equal('2')
    });

    it('2 x 3 should work', () => {
      // assert.equal(-1, [1,2,3].indexOf(4));
      expr.statement.push(2)
      expr.statement.push('x')
      expr.statement.push(3)
      expr.compute()
      expect(expr.getStatement()).to.equal('6')
    });

    it('4 / 2 should work', () => {
      // assert.equal(-1, [1,2,3].indexOf(4));
      expr.statement.push(4)
      expr.statement.push('/')
      expr.statement.push(2)
      expr.compute()
      expect(expr.getStatement()).to.equal('2')
    });

    it('6 / 3 x 4 - 6 + 5 should work', () => {
      // assert.equal(-1, [1,2,3].indexOf(4));
      expr.statement.push(9)
      expr.statement.push('/')
      expr.statement.push(8)
      expr.statement.push('x')
      expr.statement.push(7)
      expr.statement.push('+')
      expr.statement.push(6)
      expr.statement.push('-')
      expr.statement.push('5')
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