import type { HttpContext } from '@adonisjs/core/http'
import Album from '#models/album'
import db from '@adonisjs/lucid/services/db'

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
        const album = await db.from('albums').where('album_id', params.albumId).first()
        if (!album) {
            return view.render('pages/errors/404')
        }

        // busca as músicas do Album
        const songs = await db.from('songs').join('albums', 'songs.album_id', 'albums.album_id').where('albums.album_id', params.albumId).select('songs.*')

        // renderiza a view com o Album encontrado
        return view.render('pages/albums/showAlbum', { album, songs })
    }
}