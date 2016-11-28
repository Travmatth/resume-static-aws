/* Build BinaryTree w/ generics 
 * @flow
 */
export default class BinaryTree<T,U> {
  evaluationFunctions: { [name: string]: Function }

  constructor(functions) {
    this.evaluationFunctions = functions
  }

  createTreeFromPostfix(expr: glyph[]): void {
    /* 
     * RPN -> BinaryTree
     *
     * The evaluation of the tree takes place by reading the postfix expression one 
     * symbol at a time. If the symbol is an operand, one-node tree is created and 
     * a pointer is pushed onto a stack. If the symbol is an operator, the pointers 
     * are popped to two trees T1 and T2 from the stack and a new tree whose root 
     * is the operator and whose left and right children point to T2 and T1 
     * respectively is formed . A pointer to this new tree is then pushed to 
     * the Stack.[4]
     *
     * https://en.wikipedia.org/wiki/Binary_expression_tree#Construction_of_an_expression_tree
     */
  }

  evaluate(): mixed {
    /* traverse tree and apply each evaluation fx again nodes
     * Traverse BinaryTree and compute a value 
     * NEEDED: RPN Translation BTDataStruct w/ traverse function
     * 
     */
  } 
}