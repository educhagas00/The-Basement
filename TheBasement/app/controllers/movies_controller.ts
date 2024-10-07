import type { HttpContext } from '@adonisjs/core/http'

const usersData = [
    { email: 'user1@example.com', senha: 'password1' },
    { email: 'user2@example.com', senha: 'password2' }
];

const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNDM2ZDBlOTliYzMzYWU0NTlhYmNlMjdhZWJhOTNiNiIsIm5iZiI6MTcyODI0MjU5MC4xOTc2MDksInN1YiI6IjY2ZmRkMzljOWViZWExOTAwNmY3YjY0OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.gU0cLBQnxLCb5dyfWjyyqaWXCldtcxIUUTsWmTjWwto'
    }
};

export default class MoviesController {

    public async index({ request }: HttpContext) {
        // return view.render('movies')

        const moviesList = await fetch('https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=pt-BR&page=1&sort_by=popularity.desc&year=2023', options)
        .then(response => response.json())
        // .then(response => console.log(response))
        .catch(err => console.error(err));

        return moviesList
    }

    show({ params, response }: HttpContext) {
        const email = params.email

        for (const user of usersData) {
            if (user.email === email) {
                response.status(200)
                return user
            }
        }

        response.status(404)

        return { message: 'not found' }
    }

    public async store({ request, response }: HttpContext) {
        const newSignUp = request.only(['email', 'senha'])
    
        usersData.push({
            ...newSignUp
        })
    
        response.status(200)
        return { message: 'foi'}
    }
}