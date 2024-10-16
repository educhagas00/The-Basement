import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'songs'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.string('song_id').notNullable()
      table.string('name').notNullable()
      table.decimal('price').notNullable()
      table.float('duration').notNullable()
      table.timestamp('release_date').notNullable()
      // table.integer('genre_id').notNullable()
      table.string('album_id').notNullable()

      table.primary(['id', 'song_id'])

      // table.foreign('genre_id').references('id').inTable('genres')

      table.foreign('album_id').references('id').inTable('albums')

      table.string('cover_path').notNullable()

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}