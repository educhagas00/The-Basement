import User from '#models/user'
import { createUserValidator, updateUserValidator } from '#validators/user'
import type { HttpContext } from '@adonisjs/core/http'

export default class UsersController {

    async create({ view }: HttpContext) { 
        return view.render('pages/users/register');
    }

    async store({ request, response }: HttpContext) {

        // const data = request.all()
        // console.log(data)

        const payload = await request.validateUsing(createUserValidator);
        console.log(payload)

        const user = new User()
        user.merge(payload)

        await user.save()

        return response.redirect().toRoute('auth.signin')
    }

    async update({ auth, view, request, response }: HttpContext) {

        const user = auth.getUserOrFail()
        // console.log(user)
        if (!user) {
            return view.render('pages/errors/404')
        }

        const payload = await request.validateUsing(updateUserValidator);
        const { username, firstName, lastName } = payload;

        if (username) {
            user.username = username;
        }
        if (firstName) {
            user.firstName = firstName;
        }
        if (lastName) {
            user.lastName = lastName;
        }
        console.log(payload);

        user.save()

        await user.save()

        return response.redirect().toRoute('albums.index')
    }

    async updateUser({ view }: HttpContext) {
        return view.render('pages/users/updateUser')
    }


    
}