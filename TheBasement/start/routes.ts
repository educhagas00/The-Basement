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

router
    .group(() => {
        router.get('/', [UsersController, 'index']).as('index')
        router.get('/:id', [UsersController, 'show']).where('id', router.matchers.number()).as('show')
        router.post('/', [UsersController, 'create']).as('create')
    })
    .prefix('users')
    .as('users')

router.get('/signup', [SignUpController, 'index'])
router.post('/signup', [SignUpController, 'store']) // Processa os dados do formulário