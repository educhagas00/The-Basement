import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Song from '#models/song'


export default class extends BaseSeeder {
  async run() {
    // Write your database queries inside the run method
    const options = {
      method: 'POST',
      headers: {
        Authorization: 'Bearer BQCI2gnFHREZVbE_wohXJs_5F9a7DlzSOwRgKb9EsZQ4yhT0CwdhYRGnJGawyaDMrDb2zfNVbL-SXB3RvB7E51LbVClbKIMaJEEd-77xPl3Mdd7VB3M'
      } // o token de acesso dura 1 hora! fazer o curl pelo terminal para pegar o token
    };

    // chamo e armazeno a resposta da API no banco de dados
    const songIds = ['0VjIjW4GlUZAMYd2vXMi3b', '1Es7AUAhQvapIcoh3qMKDL', '3KyKxJ4P3pVCgaZwaq2rUC', '1sOW4PuG5X3Ie3EXUhAopJ', '2SLwbpExuoBDZBpjfefCtV']

    for(const songId of songIds) {
      const response = await fetch(`https://api.spotify.com/v1/tracks/${songId}`, options)
      const songData:any = await response.json()
      
      // cria um novo song usando os dados da response e salva no banco de dados
      const song = new Song()
      song.songId = songData.id
      song.name = songData.name
      song.price = Math.random() * 100 // numero aleatorio entre 0 e 100
      song.description = songData.album.name
      song.duration = songData.duration_ms / 1000 // passa para segundos
      song.releaseDate = songData.album.release_date
      song.genreId = 1
      song.albumId = 1

      await song.save()
    }
  }
}