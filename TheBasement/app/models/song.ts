import { DateTime } from 'luxon'
import { column } from '@adonisjs/lucid/orm'
import Product from '#models/product'

export default class Song extends Product {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare music_genre: string


  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}