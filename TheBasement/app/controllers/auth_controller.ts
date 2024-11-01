import type { HttpContext } from '@adonisjs/core/http'

export default class AuthController {
    async login({ view }: HttpContext) {
        // return view.render('auth/login')
        return view.render('pages/users/signup')
    }
}