import { select } from 'd3-selection'
import { rebind } from '@zambezi/d3-rebind'
import { dispatch as createDispatch } from 'd3-dispatch'
import { createBodyLayout } from './body-layout'
import _ from 'underscore'

export function createBody() {
  const layout = createBodyLayout()
    , dispatch = createDispatch('select')

  let selected = []

  function body(s) {
    s.each(bodyEach)
  }

  body.selected = function(value) {
    if (!arguments.length) return selected
    selected = value
    return body
  }

  return rebind(body, dispatch, 'on')

  function bodyEach(d, i) {
    const rows = layout(d)
        , target = select(this)
        , tBody = target.selectAll('tbody')
            .data([ rows ])
        , tBodyEnter = tBody.enter().append('tbody')
        , tBodyInstance = tBodyEnter.merge(tBody)

        , rowUpdate = tBodyInstance
              .selectAll('tr')
              .data((d) => d)

        , rowEnter = rowUpdate
            .enter()
            .append('tr')
              .on('click', onClick)
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

  function onClick(d) {
    dispatch.call('select', this, d.row)
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
