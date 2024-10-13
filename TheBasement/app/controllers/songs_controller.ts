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

    async store({ request, response }: HttpContext) {
        // pega os dados do formulário
        const payload = request.only(['songId'])

        const options = {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${process.env.SPOTIFY_ACCESS_TOKEN}`
            }
        }

        const res = await fetch(`https://api.spotify.com/v1/tracks/${payload.songId}`, options)

        const songData: any = await res.json()

        // cria um novo song usando os dados do formulário e salva no banco de dados
        const song = new Song()
        song.songId = songData.id
        song.name = songData.name
        song.price = parseFloat((50 + Math.random() * 50).toFixed(2)) // numero aleatorio de 50 a 100 com 2 casas decimais
        song.duration = parseFloat((songData.duration_ms / 60000).toFixed(2)) // Convertendo de milissegundos para segundos
        song.releaseDate = songData.album.release_date

        await song.save()

        // retorna o produto criado
        return response.redirect().toRoute('songs.show', { id: song.id })
    }

    // cria música no banco de dados a partir da API do Spotify
    async addTrack({ view }: HttpContext) {
        console.log('addTrack method called')
        return view.render('pages/songs/addTrack')
    }

    async show({ view, params }: HttpContext) {
        // busca um Song pelo id ou retorna um erro 404 caso não encontre
        const song = await Song.findOrFail(params.id)

        // renderiza a view Songs.show com o Song encontrado
        return view.render('pages/songs/show', { song })
    }
}