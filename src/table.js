import { select } from 'd3-selection'
import { rebind } from '@zambezi/d3-rebind'
import { createBody } from './body'
import { createHeader } from './header'

export function createTable() {
  const body = createBody()
      , header = createHeader()

  let columns
    , headers

  function table(s) {
    s.each(tableEach)
  }

  table.columns = function(value) {
    if (!arguments.length) return columns
    columns = value
    return table
  }

  table.headers = function(value) {
    if (!arguments.length) return headers
    headers = value
    return table
  }

  return rebind(table, body, 'on', 'selected')

  function tableEach(d, i) {
    const target = select(this)

    body.columns(columns)
    header.columns(headers ? columns : [])

    target.datum(d)
      .call(body)
      .call(header)
  }
}
