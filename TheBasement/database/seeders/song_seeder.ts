import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Song from '#models/song'
import dotenv from 'dotenv'
dotenv.config()

export default class extends BaseSeeder {
  async run() {
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${process.env.SPOTIFY_ACCESS_TOKEN}`
      } // o token de acesso (lá no .env) dura 1 hora! fazer o curl pelo terminal para pegar o token
    };

    const albumIds = ['2nLOHgzXzwFEpl62zAgCEC', '6YlDIxqEjvY63ffH6AwCjd', '5EbpxRwbbpCJUepbqVTZ1U', '3iPSVi54hsacKKl1xIR2eH', '2ANVost0y2y52ema1E9xAZ', '3cN3mENkACWuRCDOuQUtfw']

    const songIds = []

    for (const albumId of albumIds) {
      try {
        const response: any = await fetch(`https://api.spotify.com/v1/albums/${albumId}/tracks`, options)

        if (!response.ok) {
          console.error(`Failed to fetch album with ID ${albumId}: ${response.statusText}`)
          continue
        }

        // adiciona os ids das músicas do álbum à lista de ids de músicas
        songIds.push(...(await response.json()).items.map((item: any) => item.id))
      }
      
      catch (error) {
        console.error(`Error fetching album with ID ${albumId}:`, error)
      }
    }
    
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
        song.price = parseFloat((50 + Math.random() * 50).toFixed(2)) // numero aleatorio de 50 a 100 com 2 casas decimais
        song.duration = parseFloat((songData.duration_ms / 60000).toFixed(2)) // Convertendo de milissegundos para segundos
        song.releaseDate = songData.album.release_date
        // song.genreId = 1 // Defina um valor padrão ou ajuste conforme necessário
        // define o albumId como o id do album do song
        song.albumId = songData.album.id

        song.coverPath = songData.album.images[0].url

        await song.save()
      }
      
      catch (error) {
        console.error(`Error fetching song with ID ${songId}:`, error)
      }
    }
  }
}