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

    async update({ auth, view, request, response }: HttpContext) {

        const user = await auth.getUserOrFail()

        //console.log(username.username)

        const data = request.only(['username', 'firstName', 'lastName'])

        if (!user) {
            return view.render('pages/errors/404')
        }

        if(data.username) {
            user.username = data.username
        }
        if(data.firstName) {
            user.firstName = data.firstName
        }
        if(data.lastName) {
            user.lastName = data.lastName
        }

        user.save()

        await user.save()

        return response.redirect().toRoute('albums.index')
        
    }

    async updateUser({ view }: HttpContext) {
        return view.render('pages/users/updateUser')
    }


    
}