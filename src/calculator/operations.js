export const operations: Object = { 
  'x': {
    precedence: 3,
    associativity: 'left',
    perform: (a, b) => a * b,
  },

  '/': { 
    precedence: 3,
    associativity: 'left',
    perform: (a, b) => a / b,
  },

  '+': {
    precedence: 2,
    associativity: 'left',
    perform: (a, b) => a + b
  },

  '-': {
    precedence: 2,
    associativity: 'left',
    perform: (a, b) => a - b
  },

  '^': {
    precedence: 4,
    associativity: 'right',
    perform: (a, b) => Math.pow(a, b)
  },
}