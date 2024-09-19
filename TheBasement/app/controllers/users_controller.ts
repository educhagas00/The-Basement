import type { HttpContext } from '@adonisjs/core/http'

let sequence = 2

const users = [
    {
        id: 1,
        name: 'Victor',
        email: 'v@teste.com',
    },
    {
        id: 2,
        name: 'Eduardo',
        email: 'edu@teste.com',
    },
]

export default class UsersController {
    
    index() {
        return users
    }

    show({ params, response }: HttpContext) {
        
        const id = params.id

        // n funciona
        // if (id == null) {
        //     response.status(400)
        //     return { message: 'id required' }
        // }

        for (const user of users) {
            if (user.id === id) {
                response.status(200)
                return user
            }
        }

        response.status(404)

        return { message: 'not found' }
    }

    create({ request, response }: HttpContext) {

        // pega apenas os parâmetros desejados do request
        const newUser = request.only(['name', 'email'])

        sequence += 1

        users.push({
            id: sequence,
            ...newUser,
            // açúcar sintático para:
            // name: newUser.name
            // email: newUser.email
        })

        response.status(200)
        return { message: 'foi'}
        // return response.redirect().toRoute('users.show', { id: sequence })
    }
}