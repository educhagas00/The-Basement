import User from '#models/user'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    let user = new User()

    user.username = 'educhagas00'
    user.firstName = 'Eduardo'
    user.lastName = 'Super Poderoso'
    user.email = 'dudu@gmail.com'
    user.password = 'admin'
    user.role = true

    await user.save()

    user = new User()

    user.username = 'vmigu'
    user.firstName = 'Victor'
    user.lastName = 'Miguel'
    user.email = 'vmigu@gmail.com'
    user.password = 'user'
    user.role = true

    await user.save()
  }
}