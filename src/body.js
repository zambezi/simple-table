import { select } from 'd3-selection'
import { createBodyLayout } from './body-layout'

export function createBody() {
  const layout = createBodyLayout()

  function body(s) {
    s.each(bodyEach)
  }

  return body

  function bodyEach(d, i) {
    const rows = layout(d)
        , rowUpdate = select(this).selectAll('li').data(rows)

    rowUpdate.enter().append('li').text((d) => JSON.stringify(d))
  }
}
