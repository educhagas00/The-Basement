import Product from '#models/product'
import type { HttpContext } from '@adonisjs/core/http'

export default class ProductsController {
    async index() {
        const data = await fetch('https://fakestoreapi.com/products')

        const products = data.json()

        return products
    }

    async show({ params }: HttpContext) {
        
    }
}