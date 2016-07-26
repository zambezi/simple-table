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
    const row = select(this)
            .selectAll('thead tr')
            .data([ columns ])
        , cells = row.enter()
            .append('thead')
            .append('tr')
            .merge(row)
            .selectAll('th')
            .data((d) => d)

    cells.enter()
      .append('th')
      .merge(cells)
        .text((d) => d.label)
        .attr('class', (d) => d.className)

    cells.exit().remove()
  }
}
