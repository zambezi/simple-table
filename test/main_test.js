import { createSimpleTable, createTableBody } from '../src/main'
import { strictEqual } from 'assert'

describe('createTable', () => {
  it('basic test', () => {
      createSimpleTable()
      strictEqual(0, 0)
  })
  it('test dependency', () => {
      strictEqual(createTableBody(), 2)
  })
})
