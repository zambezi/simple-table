import { select } from 'd3-selection'

export function createBody() {

  function body(s) {
    s.each(bodyEach)
  }

  return body

  function bodyEach(d, i) {
    const rows = d
        , rowUpdate = select(this).selectAll('li').data(rows)

    rowUpdate.enter().append('li').text((d) => JSON.stringify(d))
  }
}
