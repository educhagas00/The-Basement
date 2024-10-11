import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Movie extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare movieId: number

  @column()
  declare title: string
  
  @column()
  declare description: string

  @column()
  declare price: number

  @column()
  declare budget: number

  @column()
  declare revenue: number 

  @column()
  declare runtime: number

  @column()
  declare releaseDate: DateTime

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}