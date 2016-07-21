import { select } from 'd3-selection'

export function createSimpleTable() {

  function table(s) {
    select(s.node()).text('I am a simple table')
  }

  return table
}

export function createTableBody() {
  return 2
}
