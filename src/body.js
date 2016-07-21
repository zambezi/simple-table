import { select } from 'd3-selection'
import { createBodyLayout } from './body-layout'
import _ from 'underscore'

export function createBody() {
  const layout = createBodyLayout()

  function body(s) {
    s.each(bodyEach)
  }

  return body

  function bodyEach(d, i) {
    const rows = layout(d)
        , target = select(this)
        , tBody = target.selectAll('tbody')
            .data([ 1 ])
            .enter()
            .append('tbody')

        , rowUpdate = tBody
              .selectAll('tr')
              .data(rows)

        , rowEnter = rowUpdate.enter().append('tr')
        , rowExit = rowUpdate.exit().remove()

        , cellUpdate = rowEnter
            .merge(rowUpdate)
            .selectAll('td')
            .data((d) => d)

        , cellEnter = cellUpdate.enter().append('td')
        , cellExit = cellUpdate.exit().remove()

    cellEnter.merge(cellUpdate).text(cellText)
  }

  function cellText(cell) {
    return (cell.column.format || String)(cellValue(cell))
  }

  function cellValue(cell) {
    return _.isUndefined(cell.value) ? '' : cell.value
  }
}
