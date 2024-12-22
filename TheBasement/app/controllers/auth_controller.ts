// import authConfig from '#config/auth'
import User from '#models/user'
import { createAuthValidator } from '#validators/auth'
import type { HttpContext } from '@adonisjs/core/http'

export default class AuthController {
  async create({ view }: HttpContext) {
    return view.render('pages/auth/login')
  }

  async store({ request, response, auth }: HttpContext) {
    const payload = await request.validateUsing(createAuthValidator)

    const user = await User.verifyCredentials(payload.email, payload.password)

    await auth.use('web').login(user) // auth eh uma classe que se extende pelo httpcontext

    return response.redirect().toRoute('albums.index')
  }

  async destroy({ response, auth }: HttpContext) {
    await auth.use('web').logout()
    return response.redirect().toRoute('albums.index')
  }
}
