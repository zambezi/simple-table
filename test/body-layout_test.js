import { createBodyLayout } from '../src/body-layout'
import { deepEqual, strictEqual } from 'assert'


describe('body layout', () => {
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
      , customColumns = [
          { key: 'name' }
        , { key: 'email' }
        , { key: 'address' }
        ]

  it('generates a cell array for each of the rows', () => {
    const layout = createBodyLayout()
        , cells = layout(rows)

    strictEqual(rows.length, cells.length)
  })

  it('generates an array of arrays of cell items from the rows with default columns', () => {
    const layout = createBodyLayout()
        , cells = layout(rows)

    strictEqual(cells[0].length, 4)
  })

  it('populates row and column on the cell items', () => {
    const layout = createBodyLayout().columns(customColumns)
        , cells = layout(rows)
        , firstCell = cells[0][0]

    strictEqual(firstCell.row, rows[0])
    strictEqual(firstCell.column, customColumns[0])
  })

  it('populates value on the cell items form the column configuration', () => {
    const layout = createBodyLayout().columns(customColumns)
        , cells = layout(rows)
        , firstCell = cells[0][0]
        , anotherCell = cells[1][1]

    strictEqual(firstCell.value, rows[0].name)
    strictEqual(anotherCell.value, rows[1].email)
  })

  it('populates value on the cell with the whole row if the column has no key', () => {
    const layout = createBodyLayout().columns([{ key: 'name' }, { label: 'Something else' }])
        , cells = layout(rows)
        , secondCell = cells[0][1]

    strictEqual(secondCell.value, rows[0])
  })

})
