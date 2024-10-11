import type { HttpContext } from '@adonisjs/core/http'
import Song from '#models/song'

export default class SongsController {
    async index({ view, request }: HttpContext) {
        const page = request.input('page', 1)
        const limit = 10

        
    }
    
    async create({  }: HttpContext) {
        
    }
  }