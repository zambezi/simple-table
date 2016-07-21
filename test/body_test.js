import { createBody } from '../src/body'
import { strictEqual } from 'assert'

describe('createTable', () => {
  it('basic test', () => {
      createBody()
      strictEqual(0, 0)
  })
  it('test dependency', () => {
      strictEqual(createBody(), 2)
  })
})
