import User from '#models/user'
import { createUserValidator, updateUserValidator } from '#validators/user'
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

    async update({ auth, request, response }: HttpContext) {

        const user = await auth.getUserOrFail()

        //console.log(username.username)

        const payload = await request.validateUsing(updateUserValidator);

        try {
            await User.verifyCredentials(user.email, payload.password)
        } catch {
            return response.badRequest('Senha incorreta')
        }

        if(payload.username) {
            user.username = payload.username
        }
        if(payload.firstName) {
            user.firstName = payload.firstName
        }
        if(payload.lastName) {
            user.lastName = payload.lastName
        }

        user.save()

        await user.save()

        return response.redirect().toRoute('albums.index')
        
    }

    async updateUser({ view }: HttpContext) {
        return view.render('pages/users/updateUser')
    }
}