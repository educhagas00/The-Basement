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
    
    const response = await fetch('https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=pt-BR-US&page=1&sort_by=popularity.desc', options)
    const moviesList:any = await response.json()
    
    for(const movieData of moviesList.results) { 
      const movie = new Movie()
      movie.movieId = movieData.id
      movie.title = movieData.title
      movie.description = movieData.overview
      await movie.save()
    }
    
  }
}