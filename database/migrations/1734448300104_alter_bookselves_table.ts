import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'bookselves'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.timestamp('schedule_at').nullable()
    })
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('schedule_at')
    })
  }
}
