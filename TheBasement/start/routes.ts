/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import MoviesController from '#controllers/movies_controller'
import SongsController from '#controllers/songs_controller'
import router from '@adonisjs/core/services/router'

const UsersController = () => import('#controllers/users_controller')
const SignUpController = () => import('#controllers/sign_up_controller')
const ProductsController = () => import('#controllers/products_controller')

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
        router.get('/', [ProductsController, 'index']).as('products.index')
        router.get('/:id', [ProductsController, 'show']).as('products.show')
        router.post('/', [ProductsController, 'store']).as('products.store')
        router.delete('/:id', [ProductsController, 'destroy']).as('products.destroy')
        router.patch('/:id', [ProductsController, 'update']).as('products.update')
    })
    .prefix('products')
    .as('products')

router
    .group(() => {
        router.get('/', [MoviesController, 'index']).as('movies.index')
        router.get('/:id', 'MoviesController.show').as('movies.show')
        router.post('/', 'MoviesController.store').as('movies.store')
    })
    .prefix('movies')
    .as('movies')

router
    .group(() => {
        router.get('/', [SongsController, 'index']).as('songs.index')
    })