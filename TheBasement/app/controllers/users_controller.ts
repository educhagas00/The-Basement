import User from '#models/user'
import { createUserValidator } from '#validators/user'
import type { HttpContext } from '@adonisjs/core/http'

export default class UsersController {
    
    async index({ view }: HttpContext) {
    }
    

    async create({ view }: HttpContext) { 
        return view.render('pages/users/create')
    }

    async store({ request, response }: HttpContext) {
        const payload = await request.validateUsing(createUserValidator)

        console.log(payload)

        const user = new User()
        user.merge(payload)

        await user.save()

        return response.redirect().toRoute('auth.create')
    }


    
}