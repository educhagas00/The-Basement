/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'

const UsersController = () => import('#controllers/users_controller')
const SignUpController = () => import('#controllers/sign_up_controller')
const ProductsController = () => import('#controllers/products_controller')
const MoviesController = () => import('#controllers/movies_controller')
const SongsController = ()=> import('#controllers/songs_controller')

router
    .group(() => {
        router.get('/', [UsersController, 'index']).as('index')
        router.get('/:id', [UsersController, 'show']).where('id', router.matchers.number()).as('show')
        router.post('/', [UsersController, 'create']).as('create')
    })
    .prefix('users')
    .as('users')

router
    .group(() => {
        router.get('/', [SignUpController, 'index']).as('index')
        router.get('/:email', [SignUpController, 'show']).as('show')
        router.post('/', [SignUpController, 'store']).as('create') // Processa os dados do formulário
    })
    .prefix('signup')
    .as('signup')

router
    .group(() => {
        router.get('/', [ProductsController, 'index']).as('index')
        router.get('/new', [ProductsController, 'create']).as('create')
        router.get('/search/:name?', [ProductsController, 'search']).as('search')
        router.get('/:id', [ProductsController, 'show']).as('show')

        router.post('/', [ProductsController, 'store']).as('store')

        router.delete('/:id', [ProductsController, 'destroy']).as('destroy')

        router.patch('/:id', [ProductsController, 'update']).as('update')
    })
    .prefix('products')
    .as('products')

router
    .group(() => {
        router.get('/:page?', [MoviesController, 'index']).as('index')
        router.get('/findbyid/:id', [MoviesController, 'show']).as('show')
    })
    .prefix('movies')
    .as('movies')

router
    .group(() => {
        // cria uma música (redireciona para a tela de criação)
        // cuidado para o .index não capturar essa rota!!! (estava pegando como :page?)
        router.get('/addTrack', [SongsController, 'addTrack']).as('addtrack')
        // lista todas as músicas
        router.get('/:page?', [SongsController, 'index']).as('index')
        // mostra uma música pelo id
        router.get('/findbyid/:id', [SongsController, 'show']).as('show')

        // cria uma música no banco de dados a partir da API do Spotify
        router.post('/', [SongsController, 'store']).as('store')
    })
    .prefix('songs')
    .as('songs')