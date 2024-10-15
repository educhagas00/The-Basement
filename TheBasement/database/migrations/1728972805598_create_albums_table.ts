import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'albums'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.integer('album_id').notNullable()
      table.string('name').notNullable()
      table.decimal('price').notNullable()
      table.float('duration').notNullable()
      table.timestamp('release_date').notNullable()

      table.string('cover_path').notNullable()

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}