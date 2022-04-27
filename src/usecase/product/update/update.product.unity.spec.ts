import Product from "../../../domain/product/entity/product";
import UpdateProducUseCase from "./update.product.usecase";

const product = new Product("123", "Coca cola 350ml", 4.00);

const input = {
    id: "123",
    name: "Coca Cola 2l",
    price: 7.99,
}

const mockRepository = () => {
    return {
        update: jest.fn(),
        create: jest.fn(),
        find: jest.fn().mockReturnValue(Promise.resolve(product)),
        findAll: jest.fn(),
    }
}

describe("Test unity update a product", () => {

    it("shoul update a product", async() => {
        const productRepository = mockRepository();
        const productUseCase = new UpdateProducUseCase(productRepository);

        const output = await productUseCase.execute(input);

        expect(output).toEqual(input);
    });

    it("should an error when name is missing", async() => {
        const productRepository = mockRepository();
        const productUseCase = new UpdateProducUseCase(productRepository);

        input.name = "";

        await expect(productUseCase.execute(input)).rejects.toThrow(
            "Name is required"
        );
    });

    it("should an error when price is less than zero", async() => {
        const productRepository = mockRepository();
        const productUseCase = new UpdateProducUseCase(productRepository);

        input.name = "Coca Cola 2l";
        input.price = -10;

        await expect(productUseCase.execute(input)).rejects.toThrow(
            "Price must be greater than zero"
        );
    });

});