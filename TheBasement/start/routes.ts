/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import AlbumsController from '#controllers/albums_controller'
import router from '@adonisjs/core/services/router'

const UsersController = () => import('#controllers/users_controller')
const AuthController = () => import('#controllers/auth_controller')
const ProductsController = () => import('#controllers/products_controller')
const MoviesController = () => import('#controllers/movies_controller')
const SongsController = () => import('#controllers/songs_controller')


router
    .group(() => {
        //router.get('/', [UsersController, 'index']).as('index')
        //router.get('/:id', [UsersController, 'show']).where('id', router.matchers.number()).as('show')

        router.get('/register', [UsersController, 'create']).as('create')
        router.post('/users', [UsersController, 'store']).as('store')
    })
    .prefix('users')
    .as('users')

router
    .group(() => {

        router.get('/register', [AuthController, 'create']).as('create')

        router.get('/login', [AuthController, 'create']).as('login')
        router.post('/login', [AuthController, 'store']).as('store')
        router.get('/logout', [AuthController, 'destroy']).as('destroy')
    })
    .prefix('auth')
    .as('auth')

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
        router.get('/addMovie', [MoviesController, 'addMovie']).as('addmovie')
        router.get('/updateMovie', [MoviesController, 'updateMovie']).as('updatemovie')
        router.get('/deleteMovie', [MoviesController, 'deleteMovie']).as('deletemovie')

        router.get('/:page?', [MoviesController, 'index']).as('index')
        router.get('/show/movieId/:movieId?', [MoviesController, 'movieId']).as('movieid')

        router.patch('/update', [MoviesController, 'update']).as('update')
        router.delete('/delete', [MoviesController, 'destroy']).as('destroy')
        router.post('/', [MoviesController, 'storeMovie']).as('store')
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


    })
    .prefix('songs')
    .as('songs')

router
    .group(() => {      
        //renderiza telas
        router.get('/addAlbum', [AlbumsController, 'addAlbum']).as('addalbum')
        router.get('/updateAlbum', [AlbumsController, 'updateAlbum']).as('updatealbum')
        router.get('/deleteAlbum', [AlbumsController, 'deleteAlbum']).as('deletealbum')

        router.get('/search/:page?', [AlbumsController, 'searchAlbum']).as('search')

        router.get('/show/albumId/:albumId?', [AlbumsController, 'albumId']).as('albumid')
        router.get('/:page?', [AlbumsController, 'indexAlbum']).as('index')

        // logica
        router.patch('/update', [AlbumsController, 'update']).as('update')
        router.delete('/delete', [AlbumsController, 'destroy']).as('destroy')
        router.post('/', [AlbumsController, 'storeAlbum']).as('store')
    })
    .prefix('albums')
    .as('albums')    