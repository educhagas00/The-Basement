import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Movie from "#models/movie";

export default class extends BaseSeeder {
  async run() {
    // Write your database queries inside the run method
    // chamo e armazeno a resposta da API no banco de dados

    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNDM2ZDBlOTliYzMzYWU0NTlhYmNlMjdhZWJhOTNiNiIsIm5iZiI6MTcyODI0MjU5MC4xOTc2MDksInN1YiI6IjY2ZmRkMzljOWViZWExOTAwNmY3YjY0OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.gU0cLBQnxLCb5dyfWjyyqaWXCldtcxIUUTsWmTjWwto'
      }
    };
    
    const movieIds = [693134,769, 414906, 339403 ,578, 9377, 680, 550,  274,  426,  27205,  105, 603 ,103, 185 ,  85,  149,  600,
       324857 ,  106646,  16869,  313369,  350, 77 ,98 ,11, 24428, 9502, 24, 694, 238, 115,557, 244786]


    for(const movieId of movieIds) {
      const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?language=pt-BR-US`, options)
      const movieData:any = await response.json()

      const movie = new Movie()
      movie.movieId = movieData.id
      movie.title = movieData.title
      movie.description = movieData.overview

      const price = parseFloat((50 + Math.random() * 50).toFixed(2)) // numero aleatorio entre 50 e 100
      movie.price = parseFloat(price.toFixed(2))

      movie.budget = movieData.budget
      movie.revenue = movieData.revenue
      movie.runtime = movieData.runtime
      movie.releaseDate = movieData.release_date
      movie.posterPath = movieData.poster_path

      await movie.save()
    }

  }
}