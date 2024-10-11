import Product from '#models/product'
import type { HttpContext } from '@adonisjs/core/http'

export default class ProductsController {

    async index({ view, request }: HttpContext) {
        const page = request.input('page', 1)
        const limit = 10

        const payload = request.only(['name'])

        // esse cara sabe buscar em produtos!
        const query = Product.query()

        if (payload.name && payload.name.length > 0) {
            query.where('name', 'like', `%${payload.name}%`)
        }

        const products = await query.paginate(page, limit)

        return view.render('pages/products/index', { products })
    }

    async store({ request, response }: HttpContext) {
        // pega os dados do formulário
        const payload = request.only(['name', 'price', 'description', 'duration', 'release_date'])

        // cria um novo produto usando os dados do formulário e salva no banco de dados
        const product = await Product.create(payload)

        // retorna o produto criado
        return response.redirect().toRoute('products.show', { id: product.id })
    }

    async create({ view }: HttpContext) {
        // renderiza a view products.create
        return view.render('pages/products/create')
    }

    async show({ view, params }: HttpContext) {
        // busca um produto pelo id ou retorna um erro 404 caso não encontre
        const product = await Product.findOrFail(params.id)

        // renderiza a view products.show com o produto encontrado
        return view.render('pages/products/show', { product })
    }

    async search({ view, request }: HttpContext) {
        const name = request.input('name')
        let products: Product[] = []

        const query = Product.query()

        if(name) {
            products = await query.where('name', 'like', `%${name}%`)
        }

        return view.render('pages/products/search', { products })
    }

    async update({ params, request, response }: HttpContext) {
        // busca um produto pelo id ou retorna um erro 404 caso não encontre
        const product = await Product.findOrFail(params.id)

        // pega os dados do formulário
        const payload = request.only(['name', 'price', 'description'])

        // atualiza o produto com os dados do formulário
        product.merge(payload)

        // salva o produto no banco de dados
        await product.save()

        // retorna o produto atualizado
        return response.redirect().toRoute('products.show', { id: product.id })
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