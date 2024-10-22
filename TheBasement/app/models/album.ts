import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Album extends BaseModel {

  @column({ isPrimary: true, columnName: 'album_id' })
  declare albumId: string

  @column()
  declare name: string
  
  @column()
  declare price: number

  @column()
  declare duration: number

  @column({ columnName: 'release_date' })
  declare releaseDate: DateTime

  @column({ columnName: 'cover_path' })
  declare coverPath: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}