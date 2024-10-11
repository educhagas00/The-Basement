import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Song from '#models/song'


export default class extends BaseSeeder {
  async run() {
    const options = {
      method: 'GET',
      headers: {
        Authorization: 'Bearer BQD3Jc_AQCP0tn3nbzTQQnADS4f3lRx_zW0RtR0CY-WDrUqcOsswBtHVkkQ56P7NztTFCFsdYYmEhVXWUFfu232ls2HcXa6vmvNpgapvbEgLh_1s4G4'
      } // o token de acesso dura 1 hora! fazer o curl pelo terminal para pegar o token
    };

    const songIds = ['0VjIjW4GlUZAMYd2vXMi3b', '1Es7AUAhQvapIcoh3qMKDL', '3KyKxJ4P3pVCgaZwaq2rUC', '1sOW4PuG5X3Ie3EXUhAopJ', '2SLwbpExuoBDZBpjfefCtV']

    for (const songId of songIds) {
      try {
        const response = await fetch(`https://api.spotify.com/v1/tracks/${songId}`, options)

        if (!response.ok) {
          console.error(`Failed to fetch song with ID ${songId}: ${response.statusText}`)
          continue
        }

        const songData:any = await response.json()

        // cria um novo song usando os dados da response e salva no banco de dados
        const song = new Song()
        song.songId = songData.id
        song.name = songData.name
        song.price = Math.random() * 100 // numero aleatorio
        song.description = songData.description || 'No description available'
        song.duration = songData.duration_ms / 1000 // Convertendo de milissegundos para segundos
        song.releaseDate = new Date(songData.album.release_date)
        // song.genreId = 1 // Defina um valor padrão ou ajuste conforme necessário
        // song.albumId = 1 // Defina um valor padrão ou ajuste conforme necessário

        await song.save()
      } catch (error) {
        console.error(`Error fetching song with ID ${songId}:`, error)
      }
    }
  }
}