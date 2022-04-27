import Product from "../../../domain/product/entity/product";
import ProductFactory from "../../../domain/product/factory/product.factory";
import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import { InputCreateProdutoDto, OutputCreateProductDto } from "./create.product.dto";

export default class CreateProductUseCase {
    productRepository: ProductRepositoryInterface;

    constructor(productRepository: ProductRepositoryInterface) {
        this.productRepository = productRepository;
    }

    async execute(input: InputCreateProdutoDto): Promise<OutputCreateProductDto> {
        const product = new Product(input.id, input.name, input.price);
        await this.productRepository.create(product);

        return {
            id: product.id,
            name: product.name,
            price: product.price,
        }

    }
}