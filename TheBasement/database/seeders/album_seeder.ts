import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Album from '#models/album'
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

    const albumIds = ['2nLOHgzXzwFEpl62zAgCEC', '5zi7WsKlIiUXv09tbGLKsE', '48D1hRORqJq52qsnUYZX56' , '3nUNxSh2szhmN7iifAKv5i', '1bt6q2SruMsBtcerNVtpZB', '4LH4d3cOWNNsVw41Gqt2kv', '1VW1MFNstaJuygaoTPkdCk' ,
    '6YlDIxqEjvY63ffH6AwCjd', '3iPSVi54hsacKKl1xIR2eH', '2ANVost0y2y52ema1E9xAZ', '4xwx0x7k6c5VuThz5qVqmV', '3AQgdwMNCiN7awXch5fAaG', '0JwHz5SSvpYWuuCNbtYZoV']
    
    for (const albumId of albumIds) {
      try {
        const response: any = await fetch(`https://api.spotify.com/v1/albums/${albumId}/tracks`, options)

        if (!response.ok) {
          console.error(`Failed to fetch album with ID ${albumId}: ${response.statusText}`)
          continue
        }

        const albumData: any = await response.json()

        const album = new Album()
        album.albumId = albumData.id
        album.name = albumData.name
        album.price = parseFloat((50 + Math.random() * 50).toFixed(2)) // numero aleatorio de 50 a 100 com 2 casas decimais
        album.duration = parseFloat((albumData.duration_ms / 60000).toFixed(2)) // Convertendo de milissegundos para segundos
        album.releaseDate = albumData.album.release_date

        album.coverPath = albumData.album.images[0].url

        await album.save()
      }
      catch (error) {
        console.error(`Error fetching album with ID ${albumId}:`, error)
      }


    }
  }
}