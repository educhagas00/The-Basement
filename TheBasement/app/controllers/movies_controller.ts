//import type { HttpContext } from '@adonisjs/core/http'
import Movie from "#models/movie";


export default class MoviesController {

  async index() { 
      
    return await Movie.all()

  }
}