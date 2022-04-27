import { app, sequelize } from '../express'
import request from "supertest"

describe("E2E test for customer", () => {

    // Cada rodada
    beforeEach(async() => {
        await sequelize.sync({ force: true});
    });

    // Após acabar a rodada
    afterAll(async() => {
        await sequelize.close();
    })

    it("should create a customer", async() => {
        const response = await request(app)
            .post("/customer")
            .send({
                name: "John",
                address: {
                    street: "Street",
                    city: "City",
                    number: 123,
                    zip: "12345",
                },
            });
            
        expect(response.status).toBe(200);
        expect(response.body.name).toBe("John");
        expect(response.body.address.street).toBe("Street");
        expect(response.body.address.city).toBe("City");
        expect(response.body.address.number).toBe(123);
        expect(response.body.address.zip).toBe("12345");
    });

    it("should not create a customer", async() => {
        const response = await request(app)
            .post("/customer")
            .send({
                name: "John",
            });

        expect(response.status).toBe(500);
    });

    it("should list all customer", async() => {
        const response = await request(app)
            .post("/customer")
            .send({
                name: "John",
                address: {
                    street: "Street",
                    city: "City",
                    number: 123,
                    zip: "12345",
                },
            });
            
        expect(response.status).toBe(200);

        const response2 = await request(app)
            .post("/customer")
            .send({
                name: "Jane",
                address: {
                    street: "Street 2",
                    city: "City 2",
                    number: 1234,
                    zip: "12344",
                },
            });
            
        expect(response2.status).toBe(200);

        const listReponse = await request(app).get("/customer").send();
        
        expect(listReponse.status).toBe(200);
        expect(listReponse.body.customers.length).toBe(2);
        
        const customer = listReponse.body.customers[0];
        expect(customer.name).toBe("John");
        expect(customer.address.street).toBe("Street");

        const customer2 = listReponse.body.customers[1];
        expect(customer2.name).toBe("Jane");
        expect(customer2.address.street).toBe("Street 2");
    });

});