import Product from '#models/product'
import type { HttpContext } from '@adonisjs/core/http'

export default class ProductsController {

    async index({ request }: HttpContext) {
        const page = request.input('page', 1)
        const limit = 10

        const payload = request.only(['name'])

        const query = Product.query()

        if (payload.name && payload.name.length > 0) {
            query.where('name', 'like', `%${payload.name}%`)
        }

        const products = await query.paginate(page, limit)

        return products
    }

    async store({ request }: HttpContext) {
        // pega os dados do formulário
        const payload = request.only(['name', 'price', 'description'])

        // cria um novo produto usando os dados do formulário e salva no banco de dados
        const product = await Product.create(payload)

        // retorna o produto criado
        return product
    }

    async show({ params }: HttpContext) {
        // busca um produto pelo id ou retorna um erro 404 caso não encontre
        const product = await Product.findOrFail(params.id)

        // retorna o produto encontrado
        return product
    }

    async update({ params, request }: HttpContext) {
        // busca um produto pelo id ou retorna um erro 404 caso não encontre
        const product = await Product.findOrFail(params.id)

        // pega os dados do formulário
        const payload = request.only(['name', 'price', 'description'])

        // atualiza o produto com os dados do formulário
        product.merge(payload)

        // salva o produto no banco de dados
        await product.save()

        // retorna o produto atualizado
        return product
    }

    async destroy({ params }: HttpContext) {
        // busca um produto pelo id ou retorna um erro 404 caso não encontre
        const product = await Product.findOrFail(params.id)

        // deleta o produto
        await product.delete()

        // retorna uma mensagem de sucesso
        return { message: `Product ${params.id} deleted` }
    }
}