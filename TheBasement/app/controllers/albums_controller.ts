import type { HttpContext } from '@adonisjs/core/http'
import Album from '#models/album'

export default class AlbumsController {

    async indexAlbum({ view, request }: HttpContext) {
        const page = request.input('page', 1)
        const limit = 16

        const payload = request.only(['name'])

        // esse cara sabe buscar em Albums!
        const query = Album.query()

        // se o campo name estiver preenchido, filtra pelo nome
        if (payload.name && payload.name.length > 0) {
            query.where('name', 'like', `%${payload.name}%`)
        }
        
        // busca os álbuns com paginação
        const albums = await query.paginate(page, limit)
        const albumsJson = albums.toJSON()

        // return songsJson
        return view.render('pages/albums/index', { albums, albumsJson })
    }

    async albumId({ view, params }: HttpContext) {
        // busca um Album pelo id ou retorna um erro 404 caso não encontre
        const album = await Album.findOrFail(params.id)

        // renderiza a view com o Album encontrado
        return view.render('pages/albums/showAlbum', { album })
    }
}