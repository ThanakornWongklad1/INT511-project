import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'bookselves'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.enum('status', ['borrow', 'request', 'return']).defaultTo('borrow')
      table.timestamp('deleted_at').nullable()
    })
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('status')
      table.dropColumn('deleted_at')
    })
  }
}
