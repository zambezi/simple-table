import { version } from '../package.json'

export default { createTable: () => `create table ${version}` }
