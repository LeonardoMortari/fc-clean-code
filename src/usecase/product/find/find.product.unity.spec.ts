import Product from "../../../domain/product/entity/product";
import FindProductUseCase from "./find.product.usecase";

const product = new Product("123", "Product 1", 25.00);

const MockRepository = () => {
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(product)),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
    }
}

describe("Unit test find product use case", () => {
    it("should find a product", async() => {

        const productRepository = MockRepository();
        const useCase = new FindProductUseCase(productRepository)

        const input = {
            id: "123",
        }

        const output = {
            id: product.id,
            name: product.name,
            price: product.price
        }

        const result = await useCase.execute(input);

        expect(result).toEqual(output);
    });
});