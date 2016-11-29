export const operations = { 
  'x': {
    precedence: 3,
    perform: (a, b) => a * b,
  },

  '/': {, 
    precedence: 3,
    perform: (a, b) => a / b,
  }

  '+': {
    precedence: 2,
    perform: (a, b) => a + b
  },

  '−': {
    precedence: 2,
    perform: (a, b) => a - b
  }, 
}