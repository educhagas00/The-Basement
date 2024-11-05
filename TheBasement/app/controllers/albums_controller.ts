import type { HttpContext } from '@adonisjs/core/http'
import Album from '#models/album'
import Song from '#models/song'
import db from '@adonisjs/lucid/services/db'
import dotenv from 'dotenv'
dotenv.config()

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

    // busca um Album pelo id
    async albumId({ view, params }: HttpContext) {
        // busca um Album pelo id ou retorna um erro 404 caso não encontre
        const album = await db.from('albums').where('albums.album_id', params.albumId).first()

        //const album = await Album.findOrFail(params.album_id)
        
        if (!album) {
            return view.render('errors/not_found')
        }

        // busca as músicas do Album
        const songs = await db.from('songs').join('albums', 'songs.album_id', 'albums.album_id').where('albums.album_id', params.albumId).select('songs.*')

        // renderiza a view com o Album encontrado
        return view.render('pages/albums/showAlbum', { album, songs })
    }

    // busca um álbum pelo nome
    async searchAlbum({ view, request }: HttpContext) {
        const page = request.input('page', 1)
        const limit = 16

        const payload = request.only(['name'])
        
        // busca os álbuns com paginação
        const query = Album.query()

        if (payload.name && payload.name.length > 0) {
            query.where('name', 'like', `%${payload.name}%`)
        }

        //await query.where('name', 'like', `%${payload.name}%`)

        const albums = await query.paginate(page, limit)
        const albumsJson = albums.toJSON()

        // return songsJson
        return view.render('pages/albums/searchAlbum', { albums , albumsJson })
    }

    // cria álbum no banco de dados a partir da API do Spotify
    async storeAlbum({ request, response }: HttpContext) { 


        const options = {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${process.env.SPOTIFY_ACCESS_TOKEN}`
            }
        }

        const url = request.input('albumId')

        const match = url.match(/album\/([a-zA-Z0-9]+)(\?|$)/)
        const payload = match ? match[1] : null

        const res = await fetch(`https://api.spotify.com/v1/albums/${payload}`, options) 
        
        const albumData: any = await res.json()

        // cria um novo album usando os dados do formulário e salva no banco de dados
        const album = new Album()
        album.albumId = albumData.id
        album.name = albumData.name
        album.releaseDate = albumData.release_date

        album.price = parseFloat((50 + Math.random() * 50).toFixed(2)) 

        let duration = 0
        albumData.tracks.items.forEach((track: any) => {
            duration += track.duration_ms
        })

        album.duration = parseFloat((duration / 60000).toFixed(2)) 
        
        album.coverPath = albumData.images[0].url

        await album.save()

        // agora é preciso puxar as músicas do álbum e salvar no banco de dados

        const res_songs: any = await fetch(`https://api.spotify.com/v1/albums/${payload}/tracks`, options)

        const songIds = []

        songIds.push(...(await res_songs.json()).items.map((item: any) => item.id))

        for (const songId of songIds) {
            try {
              const response = await fetch(`https://api.spotify.com/v1/tracks/${songId}`, options)
      
              if (!response.ok) {
                console.error(`Failed to fetch song with ID ${songId}: ${response.statusText}`)
                continue
              }
      
              const songData: any = await response.json()
      
              // cria um novo song usando os dados da response e salva no banco de dados
              const song = new Song()
              song.songId = songData.id
              song.name = songData.name
              song.duration = parseFloat((songData.duration_ms / 60000).toFixed(2)) // Convertendo de milissegundos para segundos
              // song.genreId = 1 // Defina um valor padrão ou ajuste conforme necessário
              // define o albumId como o id do album do song
              song.albumId = songData.album.id
      
              await song.save()
            }
            catch (error) {
              console.error(`Error fetching song with ID ${songId}:`, error)
            }
        }

        return response.redirect(`albums/show/albumId/${albumData.id}`)
    }

    async addAlbum({ view }: HttpContext) {
        return view.render('pages/albums/addAlbum')
    }

    async update({ view, request, response }: HttpContext) {

        const album = await Album.findOrFail(request.input('albumId'))

        const data = request.only(['name', 'price', 'duration'])

        if (!album) {
            return view.render('pages/errors/404')
        }

        if(data.name) {
            album.name = data.name
        }
        if(data.price) {
            album.price = data.price
        }
        if(data.duration) {
            album.duration = data.duration
        }

        await album.save()

        return response.redirect().toRoute('albums.albumid', { albumId: album.albumId })
    }

    async updateAlbum({ view }: HttpContext) { 
        return view.render('pages/albums/updateAlbum')
    }

    async destroy({view, request, response }: HttpContext) { 

        const album = await Album.findOrFail(request.input('albumId'))

        if (!album) {
            return view.render('pages/errors/404')
        }

        await album.delete()

        return response.redirect().toRoute('albums.index')
    }

    async deleteAlbum({ view }: HttpContext) { 
        return view.render('pages/albums/deleteAlbum')
    }

}