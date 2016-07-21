import { defaultColumns } from './default-columns'

export function createBodyLayout() {
  var columns
    , generatedColumns = []

  function layout(d) {
    if (!columns) generatedColumns = defaultColumns(d)
    return (d || []).reduce(toRows, [])
  }

  layout.columns = function(value) {
    if (!arguments.length) return columns || generatedColumns
    columns = value
    return layout
  }

  return layout

  function toRows(rows, row) {
    var cells = (columns || generatedColumns).reduce(makeCell, [])

    cells.row = row
    rows.push(cells)
    return rows

    function makeCell(cells, column) {
      cells.push(
        {
          row: row
        , column: column
        , value: column.key ? row[column.key] : row
        }
      )
      return cells
    }
  }
}
