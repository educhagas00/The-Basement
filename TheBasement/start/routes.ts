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
        
        // renderiza tela de busca de música
        router.get('/search/:info?', [SongsController, 'searchTrack']).as('search')
        // mostra uma música pelo nome
        // router.get('/showbyname/:name?', [SongsController, 'showTrackByName']).as('showname')
        // mostra uma música pelo id
        router.get('/showbyid/:id?', [SongsController, 'showTrackById']).as('showid')

        // lista todas as músicas
        router.get('/:page?', [SongsController, 'index']).as('index')

        // cria uma música no banco de dados a partir da API do Spotify
        router.post('/', [SongsController, 'store']).as('store')

        router.get('/albums/index/uiuiui', [SongsController, 'indexAlbum']).as('albums')
        router.get('/albums/show/:id?', [SongsController, 'albumId']).as('albumid')
    })
    .prefix('songs')
    .as('songs')