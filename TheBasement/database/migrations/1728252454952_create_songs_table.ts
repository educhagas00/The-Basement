import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'songs'

  async up() {
    this.schema.createTable(this.tableName, (table) => {

      table.string('song_id').notNullable()
      table.string('name').notNullable()
      table.float('duration').notNullable()
      // table.integer('genre_id').notNullable()
      table.string('album_id').notNullable()

      table.timestamp('created_at')
      table.timestamp('updated_at')

      table.primary(['song_id'])

      // table.foreign('genre_id').references('id').inTable('genres')

      table.foreign('album_id').references('album_id').inTable('albums').onDelete('CASCADE')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}