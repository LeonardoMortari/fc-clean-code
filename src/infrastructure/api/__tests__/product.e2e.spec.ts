import { app, sequelize } from '../express'
import request from 'supertest'

describe("E2E test for product", () => {

    // Cada rodada
    beforeEach(async() => {
        await sequelize.sync({ force: true});
    });

    // Após acabar todos
    afterAll(async() => {
        await sequelize.close();
    })

    it("should create a product", async() => {
        const response = await request(app)
        .post("/product")
        .send({
            id: "123",
            name: "Product 1",
            price: 112.5,
        });

        expect(response.status).toBe(200);
        expect(response.body.id).toBe("123");
        expect(response.body.name).toBe("Product 1");
        expect(response.body.price).toBe(112.5);
    });

    it("should not create a product", async() => {
        const response = await request(app)
        .post("/product")
        .send({
            id: "123",
            name: "Product 1",
        });

        expect(response.status).toBe(500);
    });

    it("should list a product", async() => {
        const product1 = await request(app)
        .post("/product")
        .send({
            id: "123",
            name: "Product 1",
            price: 112.5,
        });

        expect(product1.status).toBe(200);
      
        const product2 = await request(app)
        .post("/product")
        .send({
            id: "456",
            name: "Product 2",
            price: 147.5,
        });

        expect(product2.status).toBe(200);
      
        const listReponse = await request(app).get("/product").send();

        expect(listReponse.status).toBe(200);
        
        expect(listReponse.body.products[0].id).toBe("123");
        expect(listReponse.body.products[0].name).toBe("Product 1");
        expect(listReponse.body.products[0].price).toBe(112.5);

        expect(listReponse.body.products[1].id).toBe("456");
        expect(listReponse.body.products[1].name).toBe("Product 2");
        expect(listReponse.body.products[1].price).toBe(147.5);

    });

});