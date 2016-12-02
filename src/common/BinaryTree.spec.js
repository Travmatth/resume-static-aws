/* @flow */
import { expect, assert } from 'chai'
import { describe, it, beforeEach } from 'mocha'

import BinaryTree from './BinaryTree'
import { operations } from '../calculator/operations'

describe('BinaryTree', () => {
  describe('should work', () => {
    let tree, postfix
    
    beforeEach(() => {
      tree = new BinaryTree()
    });

    it('createTreeFromPostfix should create tree ', () => {
      // const postfix = [3, 'x', 4, 2, '/', 1, 3, 'z', '+'] 
      const postfix = [3, 4, 'x', 2, '/', 1, 3, '-', '+']
      const root = tree.createTreeFromPostfix(postfix, operations)
      expect(root.evaluate()).to.equal(4)
    });
  });
});

// describe('Array', function() {
//   describe('#indexOf()', function() {
//     it('should return -1 when the value is not present', function() {
//       assert.equal(-1, [1,2,3].indexOf(4));
//     });
//   });
// });