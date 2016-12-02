/* BinaryTree
 *
 * @flow
 */

import { operations } from '../calculator/operations'

export class Node {
  /* Need to mark as covariant, i.e. read-only
   * https://flowtype.org/blog/2016/10/04/Property-Variance.html
   */  
  +evaluate: () => number
}

export class Leaf extends Node {
  value: number

  constructor(value: number) {
    super()
    this.value = value
  }

  evaluate(): number {
    return this.value
  }
}

export class Branch extends Node {
  compute: processTree
  left: Node
  right: Node
  
  constructor(compute: processTree, left: Node, right: Node) {
    super()
    this.compute = compute
    this.left = left
    this.right = right
  }

  evaluate(): number {
    const left = this.left.evaluate()
    const right = this.right.evaluate()
    return this.compute(left, right)
  }
}

export default class BinaryTree<T,U> {
  operators: Operations

  constructor() {
  }

  createTreeFromPostfix(expr: glyph[], operators): Node {
    if (expr.length < 3) {
      console.log('expr', expr)
      return
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