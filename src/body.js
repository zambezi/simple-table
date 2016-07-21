import { select } from 'd3-selection'

export function createBody() {

  function body(s) {
    s.each(bodyEach)
  }

  return body

  function bodyEach(d, i) {
    select(this).text('I am a table body')
  }
}
