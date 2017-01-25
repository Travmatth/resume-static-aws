/* @flow */

import test from 'ava'
import fetchMock from 'fetch-mock';
import { response, data } from './mockdata'
import { ResponseError } from '../common/utils'

/*
  Model under test
*/

import { 
} from './index'

import { serialize, } from '../common/utils'
import { } from '../common/api_keys';

/*
  Setup
*/

const url = ''

test.before(() => {
})

test.afterEach.always('after', t => {
  fetchMock.restore(); 
})

/*
  Test
*/

test('', async t => {
});
