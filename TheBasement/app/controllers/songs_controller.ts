import type { HttpContext } from '@adonisjs/core/http'
import Song from '#models/song'

export default class SongsController {
    async index({ view, request }: HttpContext) {
        const page = request.input('page', 1)
        const limit = 15

        const payload = request.only(['name'])

        // esse cara sabe buscar em Songs!
        const query = Song.query()

        if (payload.name && payload.name.length > 0) {
            query.where('name', 'like', `%${payload.name}%`)
        }

        const songs = await query.paginate(page, limit)
        const songsJson = songs.toJSON()

        // return songsJson
        return view.render('pages/songs/index', { songs, songsJson })
    }

    async show({ view, params }: HttpContext) {
        // busca um Song pelo id ou retorna um erro 404 caso não encontre
        const song = await Song.findOrFail(params.id)

        // renderiza a view Songs.show com o Song encontrado
        return view.render('pages/songs/show', { song })
    }
    
    async create({  }: HttpContext) {
        
    }
  }