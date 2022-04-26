import { Sequelize } from "sequelize-typescript";
import Product from "../../../domain/product/entity/product";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import { ListProductUseCase } from "./list.product.usecase";

describe("Test find product use case", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
        })

        await sequelize.addModels([ProductModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("should find a product", async() => {
        const productRepository = new ProductRepository();
        const useCase = new ListProductUseCase(productRepository);

        const product1 = new Product("123", "Product 1", 29.80);
        const product2 = new Product("456", "Product 2", 47.90);

        await productRepository.create(product1);
        await productRepository.create(product2);

        const output = [
            {
                id: product1.id,
                name: product1.name,
                price: product1.price,
            },
            {
                id: product2.id,
                name: product2.name,
                price: product2.price,
            }
        ];
        const products = await useCase.execute({});

        expect(output.length).toBe(2);
        expect(products.products[0].id).toBe(output[0].id);
        expect(products.products[0].name).toBe(output[0].name);
        expect(products.products[0].price).toBe(output[0].price);

        expect(products.products[1].id).toBe(output[1].id);
        expect(products.products[1].name).toBe(output[1].name);
        expect(products.products[1].price).toBe(output[1].price);
    });

});