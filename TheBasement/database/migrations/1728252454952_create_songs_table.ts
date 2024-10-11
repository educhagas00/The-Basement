import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'songs'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.integer('song_id').notNullable()
      table.string('name').notNullable()
      table.decimal('price').notNullable()
      table.text('description').notNullable()
      table.integer('duration').notNullable()
      table.date('release_date').notNullable()
      table.integer('genre_id').notNullable()
      table.integer('album_id').notNullable()

      table.primary(['id', 'song_id'])

      table.foreign('genre_id').references('id').inTable('genres')
      table.foreign('album_id').references('id').inTable('albums')

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}