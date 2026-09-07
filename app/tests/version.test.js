const request = require("supertest");
const app = require("../server");

describe("GET /version", () => {
  it("devrait retourner la version de l'API", async () => {
    const response = await
request(app).get("/version");
    expect(response.statusCode).toBe(200);
    expect(response.body.version).toBe("1.0.0");
  });
});