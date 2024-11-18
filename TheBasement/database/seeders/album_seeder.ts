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

    const albumIds = ['2nLOHgzXzwFEpl62zAgCEC', '5zi7WsKlIiUXv09tbGLKsE','0U28P0QVB1QRxpqp5IHOlH', '48D1hRORqJq52qsnUYZX56' , '3nUNxSh2szhmN7iifAKv5i', '1bt6q2SruMsBtcerNVtpZB', '4LH4d3cOWNNsVw41Gqt2kv', '1VW1MFNstaJuygaoTPkdCk' ,
    '6YlDIxqEjvY63ffH6AwCjd', '3iPSVi54hsacKKl1xIR2eH', '2ANVost0y2y52ema1E9xAZ', '75ol9OP8bJaRqzGimpFHDm' , '4xwx0x7k6c5VuThz5qVqmV', '3AQgdwMNCiN7awXch5fAaG', '0JwHz5SSvpYWuuCNbtYZoV',
    '5Dgqy4bBg09Rdw7CQM545s', '03gwRG5IvkStFnjPmgjElw','0ETFjACtuP2ADo6LFhL6HN','6FCzvataOZh68j8OKzOt9a','19bQiwEKhXUBJWY6oV3KZk','0l3vDkpxvfbKyDTdOHSZhk','1UcS2nqUhxrZjrBZ3tHk2N','2UJcKiJxNryhL050F5Z1Fk',
    '7otIoNh7kZgNoiNPauPaHU','6722nY178mLes49GPldnjj','2wnq5e000z2hT7qS2F8jZ5', '2tm3Ht61kqqRZtIYsBjxEj', '6uSnHSIBGKUiW1uKQLYZ7w', '3HZKOk1knxrUU3y5ZIOdbz', '5Y0p2XCgRRIjna91aQE8q7', '45ba6QAtNrdv6Ke4MFOKk9', '0ge5ZLyto8vFQrif125mtW' , '0I7bofr4iucY3LXUPKv9cz', '5Dbax7G8SWrP9xyzkOvy2F', '2jnV6ytZOmt71iEC5xHEYz', '1D3JNjKm7QRaHcIBzv0Xdn', '0lZRCf7prVEVVYjH5Im0TS', '1jWmEhn3ggaL6isoyLfwBn', '1zcm3UvHNHpseYOUfd0pna',
    '5z090LQztiqh13wYspQvKQ', '05DePtm7oQMdL3Uzw2Jmsc']
    
    for (const albumId of albumIds) {
      try {
        const response: any = await fetch(`https://api.spotify.com/v1/albums/${albumId}`, options)

        if (!response.ok) {
          console.error(`Failed to fetch album with ID ${albumId}: ${response.statusText}`)
          continue
        }

        const albumData: any = await response.json()

        const album = new Album()
        album.albumId = albumData.id
        album.name = albumData.name
        album.price = parseFloat((50 + Math.random() * 50).toFixed(2)) // numero aleatorio de 50 a 100 com 2 casas decimais
        let duration = 0
        albumData.tracks.items.forEach((track: any) => {
          duration += track.duration_ms
        })
        album.duration = parseFloat((duration / 60000).toFixed(2)) // duration em minutos
        album.releaseDate = albumData.release_date

        album.coverPath = albumData.images[0].url

        await album.save()
      }
      catch (error) {
        console.error(`Error fetching album with ID ${albumId}:`, error)
      }


    }
  }
}