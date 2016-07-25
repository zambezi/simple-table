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
        , row = tBody.enter().append('tbody')
            .merge(tBody)
            .selectAll('tr')
            .data((d) => d)
        , cell = row.enter().append('tr')
              .on('click', onClick)
            .merge(row)
              .classed('is-selected', isSelected)
            .selectAll('td')
            .data((d) => d)

    cell.enter().append('td')
      .merge(cell)
        .text(cellText)

    cell.exit().remove()

    row.exit().remove()
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
