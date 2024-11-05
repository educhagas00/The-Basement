import type { HttpContext } from '@adonisjs/core/http'

export default class AuthController {
    async login({ view }: HttpContext) {
        return view.render('pages/auth/login')
    }
}