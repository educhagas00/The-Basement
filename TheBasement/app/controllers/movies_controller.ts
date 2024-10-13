//import type { HttpContext } from '@adonisjs/core/http'
import Movie from "#models/movie";


export default class MoviesController {

  // GET /movies
  async index() { 
      
    return await Movie.all()

  }
}