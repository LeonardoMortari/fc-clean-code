import { ListProductUseCase } from "./list.product.usecase";

const product1 = {
    id: "123",
    name: "Product 1",
    price: 35.75,
}

const product2 = {
    id: "456",
    name: "Product 2",
    price: 88.90,
}

const mockRepository = () => {
    return {
        create: jest.fn(),
        update: jest.fn(),
        find: jest.fn(),
        findAll: jest.fn().mockReturnValue(Promise.resolve([product1, product2])),
    }
}

describe("Unit test for list product use case", () => {
    it("should list a product", async() => {
        const productRepository = mockRepository();
        const productUseCase = new ListProductUseCase(productRepository);

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

        const products = await productUseCase.execute({});

        expect(output.length).toBe(2);
        expect(products.products[0].id).toBe(output[0].id);
        expect(products.products[0].name).toBe(output[0].name);
        expect(products.products[0].price).toBe(output[0].price);

        expect(products.products[1].id).toBe(output[1].id);
        expect(products.products[1].name).toBe(output[1].name);
        expect(products.products[1].price).toBe(output[1].price);
    });
});