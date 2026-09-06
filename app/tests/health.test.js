const request = require("supertest");
const app = require("../server");

describe("GET/health", () => {
  it("devrait retourner le statut OK", async () => {
    const response = await
request(app).get("/health");

    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe("OK");
});
});