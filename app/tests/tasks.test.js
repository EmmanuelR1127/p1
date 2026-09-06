
const request = require("supertest");
const app = require("../server");

describe("GET/tasks", () => {
  it("devrait retourner une liste de tâches", async () => {
    const response = await
request(app).get("/tasks");

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
});
});
