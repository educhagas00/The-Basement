import User from '#models/user'
import { createUserValidator } from '#validators/user'
import type { HttpContext } from '@adonisjs/core/http'

export default class UsersController {

    async create({ view }: HttpContext) { 
        return view.render('pages/users/register');
    }

    async store({ request, response }: HttpContext) {

        const data = request.all()
        console.log(data)

        const payload = await request.validateUsing(createUserValidator);
        console.log(payload)

        const user = new User()
        user.merge(payload)

        await user.save()

        return response.redirect().toRoute('auth.signin')
    }


    
}