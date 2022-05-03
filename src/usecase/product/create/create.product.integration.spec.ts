import { Sequelize } from "sequelize-typescript";
import Notification from "../../../domain/@shared/notification/notification";
import Product from "../../../domain/product/entity/product";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import CreateProductUseCase from "./create.product.usecase";

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

    it("should create a product", async() => {

        const productRepository = new ProductRepository();

        const product = new Product("123", "Vinho Pérgola 1l", 21.47);
        await productRepository.create(product);

        const productResult = await productRepository.find(product.id);

       expect(product).toEqual(productResult);

    });

});