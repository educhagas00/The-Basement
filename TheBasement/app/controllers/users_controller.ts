import type { HttpContext } from '@adonisjs/core/http'

export default class UsersController {
    
    async index({ view }: HttpContext) {
    }
    

    async create({ view }: HttpContext) { 
        return view.render('pages/users/create')
    }

    async store({ request }: HttpContext) {
    }


    
}