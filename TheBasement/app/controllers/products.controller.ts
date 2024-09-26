import Product from '#models/product'
import type { HttpContext } from '@adonisjs/core/http'


export default class ProductsController {

    async index() {
        const data = await fetch('https://fakestoreapi.com/products')

        // é preciso passar para json
        const products = await data.json()

        return products
    }

    //mostrar produto especifico
    async show({params}: HttpContext) {

        const product = await Product.findOrFail(params.id) // achar pelo id

        return product
    }

    async store({ request }: HttpContext) { 

        const payload = request.only(['name']) // se eu digitar outra coisa, corta

        const product = await Product.create(payload)

        return product
    }

    // atualizar
    async patch({params, request}: HttpContext) {
        const product = await Product.findOrFail(params.id)

        const payload = await request.only(['name'])
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