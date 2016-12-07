/* BinaryTree
 *
 * Notes:
 * https://en.wikipedia.org/wiki/Binary_tree#Nodes_and_references
 * https://en.wikipedia.org/wiki/Binary_expression_tree#Construction_of_an_expression_tree
 * 
 *
 * @flow
 */

import { operations } from '../calculator/operations'

export class Node {
  /* Mark as covariant, i.e. read-only
   * because evaluate called recursively, 
   * https://flowtype.org/blog/2016/10/04/Property-Variance.html
   */  
  +evaluate: () => number;
}

export class Leaf extends Node {
  value: number;

  constructor(value: number) {
    super();
    this.value = value;
  }

  evaluate(): number {
    return this.value;
  }
}

export class Branch extends Node {
  compute: (a: number, b: number) => number;
  left: Node;
  right: Node;
  
  constructor(compute: (a: number, b: number) => number, left: Node, right: Node) {
    super();
    this.compute = compute;
    this.left = left;
    this.right = right;
  }

  evaluate(): number {
    const left = this.left.evaluate()
    const right = this.right.evaluate()
    return this.compute(left, right)
  }
}

export default class BinaryTree<T,U> {
  operators: Object

  constructor() {
  }

  createTreeFromPostfix(expr: glyph[], operators: Object): Node {
    if (expr.length < 3) {
      console.log('expr', expr)
      return new Leaf(0)
      // throw new Error('Postfix Expression must be three or more characters')
    } 

    const stack: Array<Node> = []

    expr.forEach(element => {

      if (typeof element === 'number') {
        const leaf = new Leaf(element)
        stack.push(leaf)
      } else {
        const right = stack.pop()
        const left = stack.pop()
        const action = operators[element].perform
        const node = new Branch(action, left, right)
        stack.push(node)
      }
    })

    const root = stack.pop()
    return root
  }
}