import { BaseSchema } from '@adonisjs/lucid/schema'

// ordem das migrations importa. para isso, usamos um timestamp local que da a ordem de execução da migration

export default class extends BaseSchema {
  protected tableName = 'products'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      // falar pra migration que existe um campo chamado name que é um var char
      table.string('name')

      table.decimal('price').notNullable()
      table.text('description').notNullable()

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}