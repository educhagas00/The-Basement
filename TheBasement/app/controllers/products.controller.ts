import Product from '#models/product'
import type { HttpContext } from '@adonisjs/core/http'


export default class ProductsController {

    async index( {request}: HttpContext) {
        // select * from users -> guarda em array (vlw vlw falou)
        //const products = await Product.all()

        const page = request.input('page', 1)
        const limit = 5

        const payload = request.only(['name'])
        // fazer uma filtragem para buscar todos os produtos que tenham o nome igual ao que foi passado

        const query = Product.query()

        if(payload.name && payload.name.length > 0) {
            query.where('name', 'like', `%${payload.name}%`)

        }

        const products = await query.paginate(page, limit)
        return products
    }

    //mostrar produto especifico
    async show({params}: HttpContext) {

        const product = await Product.findOrFail(params.id) // achar pelo id

        return product
    }

    async store({ request }: HttpContext) { 

        const payload = request.only(['name', 'price', 'description']) // se eu digitar outra coisa, corta

        const product = await Product.create(payload)

        return product
    }

    // atualizar
    async patch({params, request}: HttpContext) {
        const product = await Product.findOrFail(params.id)

        const payload = await request.only(['name', 'price', 'description'])
        product.merge(payload)

        await product.save()

        return product
    }

    //delete
    async destroy({ params }: HttpContext) {

        const product = await Product.findOrFail(params.id)

        await product.delete()

        return { sucess:` ${params.id} removido` }
    }
}