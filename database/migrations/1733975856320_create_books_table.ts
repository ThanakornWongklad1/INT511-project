import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'books'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').unique().primary()
      table.string('image', 255).notNullable().unique()
      table.string('title', 100).notNullable().unique()
      table.string('author', 100).notNullable()
      table.string('description', 500).notNullable()
      table.integer('quantity').notNullable()
      table.string('category', 100).notNullable()
      table.timestamp('created_at').defaultTo(this.now())
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
