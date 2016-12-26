/* @flow */
import LogicUnit from './LogicUnit'

('LogicUnit', () => {
  let expr, infix
    
  (() => {
      expr = new LogicUnit()
      infix = []
  });

  ('update', () => {
    ('decimals can be entered', () => {
      expr.update('9')
      expr.update('.')
      expr.update('3')
      expr.update('3')
      (expr.expression[0]).to.equal('9.33')
    });

    ('decimals can be deleted', () => {
      expr.update('9')
      expr.update('.')
      expr.update('3')
      expr.update('3')
      expr.clear()
      (expr.getExpression()).to.equal('9.3')
    });

    ('decimal can be deleted', () => {
      expr.update('9')
      expr.update('.')
      expr.clear()
      (expr.getExpression()).to.equal('9')
    });
  });

  ('Compute', () => {
    ('1 + 1 should work', () => {
      expr.update('1')
      expr.update('+')
      expr.update('1')
      expr.compute()
      (expr.getExpression()).to.equal('2')
    });

    ('2 * 3 should work', () => {
      expr.update('2')
      expr.update('*')
      expr.update('3')
      expr.compute()
      (expr.getExpression()).to.equal('6')
    });

    ('4 / 2 should work', () => {
      expr.update('4')
      expr.update('/')
      expr.update('2')
      expr.compute()
      (expr.getExpression()).to.equal('2')
    });

    ('4 - 2 should work', () => {
      expr.update('4')
      expr.update('-')
      expr.update('2')
      expr.compute()
      (expr.getExpression()).to.equal('2')
    });

    ('6 / 3 * (4 - 6) + 5 should work', () => {
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
      (expr.getExpression()).to.equal('1')
    });

    ('symbols can be entered', () => {
      const expected = ['2.718', '3.14', '0.693']
      expr.update('E')
      expr.update('PI')
      expr.update('LN2')
      (expr.expression).to.eql(expected)
    })
  });

  ('functions should work', () => {
    ('SIN should compute correctly', () => {
      expr.update('SIN')
      expr.update('0')
      expr.update(')')
      expr.compute()
      (expr.getExpression()).to.equal('0')
    })

    ('COS should compute correctly', () => {
      expr.update('COS')
      expr.update('0')
      expr.update(')')
      expr.compute()
      (expr.getExpression()).to.equal('1')
    })

    ('TAN should compute correctly', () => {
      expr.update('TAN')
      expr.update('1')
      expr.update(')')
      expr.compute()
      (expr.getExpression()).to.equal('1.55741')
    })

    ('LOG should compute correctly', () => {
      expr.update('LOG')
      expr.update('1')
      expr.update(')')
      expr.compute()
      (expr.getExpression()).to.equal('0')
    })
  });
});

.skip('Array', function() {
  ('#indexOf()', function() {
    ('should return -1 when the value is not present', function() {
      // .equal(-1, [1,2,3].indexOf(4));
    });
  });
});