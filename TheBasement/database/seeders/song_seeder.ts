/* eslint-disable @unicorn/no-await-expression-member */
/* eslint-disable @unicorn/prefer-number-properties */
import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Song from '#models/song'
import dotenv from 'dotenv'
import db from '@adonisjs/lucid/services/db'
dotenv.config()

export default class extends BaseSeeder {
  async run() {
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${process.env.SPOTIFY_ACCESS_TOKEN}`,
      }, // o token de acesso (lá no .env) dura 1 hora! fazer o curl pelo terminal para pegar o token
    }

    // realiza consulta na tabela de álbuns e armazena os ids dos álbuns em um array
    const albumIds: any[] = (await db.from('albums').select('album_id')).map(
      (album: any) => album.album_id
    )
    // console.log(albumIds)

    const songIds = []

    for (const albumId of albumIds) {
      try {
        const response: any = await fetch(
          `https://api.spotify.com/v1/albums/${albumId}/tracks`,
          options
        )

        if (!response.ok) {
          console.error(`Failed to fetch album with ID ${albumId}: ${response.statusText}`)
          continue
        }

        // adiciona os ids das músicas do álbum à lista de ids de músicas
        songIds.push(...(await response.json()).items.map((item: any) => item.id))
      } catch (error) {
        console.error(`Error fetching album with ID ${albumId}:`, error)
      }
    }

    console.log(songIds)

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
      } catch (error) {
        console.error(`Error fetching song with ID ${songId}:`, error)
      }
    }
  }
}
