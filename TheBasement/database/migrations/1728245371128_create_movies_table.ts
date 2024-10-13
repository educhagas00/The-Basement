import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'movies'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.integer('movie_id').notNullable().unique()
      table.string('title').notNullable()
      table.text('description').notNullable()

      table.decimal('price').notNullable()

      table.integer('budget').notNullable()
      table.integer('revenue').notNullable()
      table.integer('runtime').notNullable()
      table.timestamp('release_date').notNullable()

      table.string('poster_path').notNullable()

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}