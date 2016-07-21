import { select } from 'd3-selection'
import { createBodyLayout } from './body-layout'
import _ from 'underscore'

export function createBody() {
  const layout = createBodyLayout()

  let selected = []

  function body(s) {
    s.each(bodyEach)
  }

  body.selected = function(value) {
    if (!arguments.length) return selected
    selected = value
    return body
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
              .classed('is-selected', isSelected)
            .selectAll('td')
            .data((d) => d)

        , cellEnter = cellUpdate.enter().append('td')
        , cellExit = cellUpdate.exit().remove()

    cellEnter.merge(cellUpdate).text(cellText)
  }

  function isSelected(d) {
    return selected.indexOf(d.row) >= 0
  }

  function cellText(cell) {
    return (cell.column.format || String)(cellValue(cell))
  }

  function cellValue(cell) {
    return _.isUndefined(cell.value) ? '' : cell.value
  }
}
