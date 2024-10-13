import type { HttpContext } from '@adonisjs/core/http'
import Movie from "#models/movie";

export default class MoviesController {

  // GET /movies
  async index( { view, request }: HttpContext ) { 
      
    const page = request.input('page', 1)
    const limit = 5

    const payload = request.only(['title'])

    const query = Movie.query()

    if (payload.title && payload.title.length > 0) {
        query.where('title', 'like', `%${payload.title}%`)
    }

    const movie = await query.paginate(page, limit)
    const moviesJson = movie.toJSON()

    // return songsJson
    return view.render('pages/movies/index', { movie, moviesJson })

  }

  async show({ view, params }: HttpContext) {
    // busca um Song pelo id ou retorna um erro 404 caso não encontre
    const movie = await Movie.findOrFail(params.id)

    // renderiza a view Songs.show com o Song encontrado
    return view.render('pages/movies/show', { movie })
  }
}