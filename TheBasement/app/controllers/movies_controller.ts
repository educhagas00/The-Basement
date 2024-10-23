import type { HttpContext } from '@adonisjs/core/http'
import Movie from "#models/movie";
import db from '@adonisjs/lucid/services/db';

export default class MoviesController {

  // GET /movies
  async index( { view, request }: HttpContext ) { 
      
    const page = request.input('page', 1)
    const limit = 12

    const payload = request.only(['title'])

    const query = Movie.query()

    if (payload.title && payload.title.length > 0) {
        query.where('title', 'like', `%${payload.title}%`)
    }

    const movies = await query.paginate(page, limit)
    const moviesJson = movies.toJSON()

    // return songsJson
    return view.render('pages/movies/index', { movies, moviesJson })

  }

  async movieId({ view, params }: HttpContext) {

    const movie = await db.from('movies').where('movies.movie_id', params.movieId).first()

    if (!movie) {
      return view.render('pages/errors/404')
    }

    // renderiza a view Movies.show com o Filme encontrado
    return view.render('pages/movies/showMovie', { movie })
  }

  async storeMovie({ request, response }: HttpContext) { 

    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNDM2ZDBlOTliYzMzYWU0NTlhYmNlMjdhZWJhOTNiNiIsIm5iZiI6MTcyODI0MjU5MC4xOTc2MDksInN1YiI6IjY2ZmRkMzljOWViZWExOTAwNmY3YjY0OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.gU0cLBQnxLCb5dyfWjyyqaWXCldtcxIUUTsWmTjWwto'
      }
    };
    
    const payload = request.input('movieId')

    const res = await fetch(`https://api.themoviedb.org/3/movie/${payload}?language=en-US`, options)

    const movieData:any = await res.json()

    const movie = new Movie()

    movie.movieId = movieData.id
    movie.title = movieData.title
    movie.description = movieData.overview
    const price = parseFloat((50 + Math.random() * 50).toFixed(2)) 
    movie.price = parseFloat(price.toFixed(2))
    movie.budget = movieData.budget
    movie.revenue = movieData.revenue
    movie.runtime = movieData.runtime
    movie.releaseDate = movieData.release_date
    movie.posterPath = movieData.poster_path

    await movie.save()

    return response.redirect().toRoute('movies.movieid', { movieId: movie.movieId })
  }

  async addMovie({ view }: HttpContext) { 
    return view.render('pages/movies/addMovie')
  }

  async update({view, request, response}: HttpContext) {

    const movie = await Movie.findOrFail(request.input('movieId'))

    const data = request.only(['title', 'price', 'runtime', 'description'])

    if (!movie) {
        return view.render('pages/errors/404')
    }

    if(data.title) {
        movie.title = data.title
    }
    if(data.price) {
        movie.price = data.price
    }
    if(data.runtime) {
        movie.runtime = data.runtime
    }

    await movie.save()

    return response.redirect().toRoute('movies.movieid', { movieId: movie.movieId })
  }

  async updateMovie({ view }: HttpContext) { 
    return view.render('pages/movies/updateMovie')
  }

}