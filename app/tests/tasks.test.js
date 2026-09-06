
const request = require("supertest");
const app = require("../server");

beforeAll(async () => {
  if (typeof app.waitUntilReady === "function") {
    await app.waitUntilReady();
  }
});

afterAll(async () => {
  if (app.pool && typeof app.pool.end === "function") {
    await app.pool.end();
  }
});

describe("GET /tasks", () => {
  it("devrait retourner une liste de tâches", async () => {
    const response = await request(app).get("/tasks");

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});
