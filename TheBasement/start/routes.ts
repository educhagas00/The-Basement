/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import UsersController from '#controllers/users_controller'
import SignUpController from '#controllers/sign_up_controller'

import router from '@adonisjs/core/services/router'
import ProductsController from '#controllers/products.controller'
import MoviesController from '#controllers/movies_controller'

router
    .group(() => {
        router.get('/', [UsersController, 'index']).as('index')
        router.get('/:id', [UsersController, 'show']).where('id', router.matchers.number()).as('show')
        router.post('/', [UsersController, 'create']).as('create')
    })
    .prefix('users')
    .as('users')


//rotas de signup

router.get('/signup', [SignUpController, 'index'])
router.post('/signup', [SignUpController, 'store']) // Processa os dados do formulário

// rotas de produtos 
router.get('/products', [ProductsController, 'index']).as('products.index')
router.get('/products/:id', [ProductsController, 'show']).as('products.show')
router.post('/products', [ProductsController, 'store']).as('products.store')
router.delete('/products/:id', [ProductsController, 'destroy']).as('products.destroy')
router.patch('/products/:id', [ProductsController, 'patch']).as('products.patch')

router.get('/movies', [MoviesController, 'index']).as('movies.index') // oi


