import Product from "../../../domain/product/entity/product";
import CreateProductUseCase from "./create.product.usecase";

const input = {
    id: "123",
    name: "Coca Cola 350ml",
    price: 4.00,
}

const mockRepository = () => {
    return {
        create: jest.fn(),
        update: jest.fn(),
        find: jest.fn(),
        findAll: jest.fn(),
    }
}

describe("", () => {

    it("should create a product", async() => {

        const productRepository = mockRepository();
        const productUseCase = new CreateProductUseCase(productRepository);

        const output = await productUseCase.execute(input);

        expect(output).toEqual({
            id: input.id,
            name: input.name,
            price: input.price,
        });
    });

    it("should an error when name is missing", async() => {
        const productRepository = mockRepository();
        const productUseCase = new CreateProductUseCase(productRepository);

        input.name = "";

        await expect(productUseCase.execute(input)).rejects.toThrow(
            "Name is required"
        );
    });

    it("should an error when price is less than zero", async() => {
        const productRepository = mockRepository();
        const productUseCase = new CreateProductUseCase(productRepository);

        input.name = "Coca Cola 350ml";
        input.price = -10;

        await expect(productUseCase.execute(input)).rejects.toThrow(
            "Price must be greater than zero"
        );
    });

});