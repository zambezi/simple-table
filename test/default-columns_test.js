import { defaultColumns } from '../src/default-columns'
import { deepEqual } from 'assert'

describe('default columns', () => {
  const rows = [
          {
            name: 'Álvaro'
          , email: 'alvaro@example.com'
          , address: { city: 'London' }
          , price: 234234.23433223
          }
        , {
            name: 'Ignacio'
          , email: 'ignacio@example.com'
          , address: { city: 'London' }
          , price: 111111.234234234
          }
        ]

  it('extracts the columns from the first defined row', () => {
    const expectation = [
            { key: 'name' },
            { key: 'email' },
            { key: 'address' },
            { key: 'price' },
          ]

    deepEqual(defaultColumns(rows), expectation)
    deepEqual(defaultColumns([undefined, ...rows]), expectation)
  })
})
