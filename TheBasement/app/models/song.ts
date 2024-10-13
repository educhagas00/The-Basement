import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Song extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column({ columnName: 'song_id' })
  declare songId: number

  @column()
  declare name: string

  @column()
  declare price: number

  @column()
  declare duration: number

  @column({ columnName: 'release_date' })
  declare releaseDate: DateTime

  // @column({ columnName: 'genre_id' })
  // declare genreId: number

  // @column()
  // declare albumId: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}