import { select } from 'd3-selection'

export function createHeader() {
  let columns

  function header(s) {
    s.each(headerEach)
  }

  header.columns = function(value) {
    if (!arguments.length) return columns
    columns = value
    return header
  }

  return header

  function headerEach(d, i) {
    const target = select(this)
        , tHead = target.selectAll('thead')
            .data([ columns ])
        , row = tHead.select('tr')
        , cell = tHead.enter().insert('thead').append('tr')
            .merge(row)
            .selectAll('th')
            .data((d) => d)

    cell.enter().append('th')
      .merge(cell)
        .text((d) => d.label)

    cell.exit().remove()

    tHead.exit().remove()
  }
}
