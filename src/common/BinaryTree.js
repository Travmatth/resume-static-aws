/* Build BinaryTree w/ generics 
 * @flow
 */
type method = { precedence: number, perform: Function }

type Kind = number|method 

export class Node {
  kind: Kind
  left: Node
  right: Node

  constructor(value: number|method) {
    this.value = value
  }

  evaluate(): number {
    if (typeof this.value === 'number') return this.value
    return this.value(this.left.evaluate(), this.right.evaluate())
  }
}

export default class BinaryTree<T,U> {
  // evaluationFunctions: { [name: string]: Function }
  root: ?Node

  constructor(ops) {
    this.operators = ops
  }

  createTreeFromPostfix(expr: glyph[]): void|Error {
    /* 
     * RPN -> BinaryTree
     *
     * The evaluation of the tree takes place by reading the postfix expression 
     * one symbol at a time. If the symbol is an operand, one-node tree is 
     * created and a pointer is pushed onto a stack. If the symbol is an 
     * operator, the pointers are popped to two trees T1 and T2 from the stack 
     * and a new tree whose root is the operator and whose left and right 
     * children point to T2 and T1 respectively is formed . A pointer to this 
     * new tree is then pushed to the Stack.[4]
     *
     * https://en.wikipedia.org/wiki/Binary_expression_tree#Construction_of_an_expression_tree
     */
     const stack: Array<Node> = []
     expr.forEach(element => {
      if (typeof element === 'number') {
        stack.push(new Node(element))
      } else {
        const node = new Node(this.operators[expr].perform)
        node.left = stack.pop()
        node.right  = stack.pop()
        stack.push(node)
      }
     })

     this.root = stack.pop()
  }

  evaluate(): number|Error {
    if (root) return this.root.evaluate()
    else throw new Error('No root found on binary tree')
  }
}