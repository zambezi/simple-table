import _ from 'underscore'

export function defaultColumns(d) {
  const firstRow = _.find(d, (r) => !_.isUndefined(r)) || {}

  return (
    _.isObject(firstRow)
  ? Object.keys(firstRow).map(createDefaultColumn)
  : [ { format: String } ]
  )

  function createDefaultColumn(key) {
    return { key: key }
  }
}
