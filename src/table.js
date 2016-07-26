import { select } from 'd3-selection'
import { rebind } from '@zambezi/d3-rebind'
import { createBody } from './body'
import { createHeader } from './header'

export function createTable() {
  const body = createBody()
      , header = createHeader()

  let columns
    , displayHeaders = true

  function table(s) {
    s.call(header.columns(columns))
        .call(body.columns(columns))
      .select('thead')
        .style('display', displayHeaders ? null : 'none')
  }

  table.columns = function(value) {
    if (!arguments.length) return columns
    columns = value
    return table
  }

  table.displayHeaders = function(value) {
    if (!arguments.length) return displayHeaders
    displayHeaders = value
    return table
  }

  return rebind(table, body, 'on', 'selected')
}
