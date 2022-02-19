const request = require("supertest");
const app = require("../app");
const { Customer } = require("../models");

beforeAll(async () => {
  await Customer.create({
    username: "customer",
    email: "customer@mail.com",
    password: "password",
    role: "Customer",
    phoneNumber: "111333",
    address: "Address",
  });
});

afterAll(async () => {
  await Customer.destroy({
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });
});

describe("POST /customer/login", () => {
  test("Success Login return access_token", async () => {
    const payload = {
      email: "customer@mail.com",
      password: "password",
    };
    const response = await request(app).post("/customer/login").send(payload);
    const { body, status } = response;
    expect(status).toBe(200);
    expect(body).toEqual(expect.any(Object));
    expect(body).toHaveProperty("access_token");
  });

  test("Fail Login with wrog Password", async () => {
    const payload = {
      email: "customer@mail.com",
      password: "wrongPassword",
    };
    const response = await request(app).post("/customer/login").send(payload);
    const { body, status } = response;
    expect(status).toBe(401);
    expect(body).toEqual(expect.any(Object));
    expect(body).toHaveProperty("message", "Invalid Email/Password");
  });

  test("Fail Login with wrog Email", async () => {
    const payload = {
      email: "user@mail.com",
      password: "password",
    };
    const response = await request(app).post("/customer/login").send(payload);
    const { body, status } = response;
    expect(status).toBe(401);
    expect(body).toEqual(expect.any(Object));
    expect(body).toHaveProperty("message", "Invalid Email/Password");
  });
});
