const request = require("supertest");
const app = require("../app");
const { Customer } = require("../models");

afterAll(async () => {
  await Customer.destroy({
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });
});

describe("POST /customer/register", () => {
  test("Register success return id and email", async () => {
    const payload = {
      username: "customer",
      email: "customer@mail.com",
      password: "password",
      phoneNumber: "111333",
      address: "Address",
    };
    const response = await request(app)
      .post("/customer/register")
      .send(payload);
    const { body, status } = response;
    expect(status).toBe(201);
    expect(body).toEqual(expect.any(Object));
    expect(body).toHaveProperty("id");
    expect(body).toHaveProperty("email");
  });

  test("Register fail with empty Email", async () => {
    const payload = {
      username: "customer",
      password: "password",
      role: "Customer",
      phoneNumber: "111333",
      address: "Address",
    };
    const response = await request(app)
      .post("/customer/register")
      .send(payload);
    const { body, status } = response;
    expect(status).toBe(400);
    expect(body).toEqual(expect.any(Object));
    expect(body).toHaveProperty("message", "Email is required");
  });

  test("Register fail with email Format", async () => {
    const payload = {
      username: "customer",
      email: "customer1",
      password: "password",
      role: "Customer",
      phoneNumber: "111333",
      address: "Address",
    };
    const response = await request(app)
      .post("/customer/register")
      .send(payload);
    const { body, status } = response;
    expect(status).toBe(400);
    expect(body).toEqual(expect.any(Object));
    expect(body).toHaveProperty("message", "must be Email Format");
  });

  test("Register fail with Email null", async () => {
    const payload = {
      username: "customer",
      email: "",
      password: "password",
      role: "Customer",
      phoneNumber: "111333",
      address: "Address",
    };
    const response = await request(app)
      .post("/customer/register")
      .send(payload);
    const { body, status } = response;
    expect(status).toBe(400);
    expect(body).toEqual(expect.any(Object));
    expect(body).toHaveProperty("message", "Email is required");
  });

  test("Register fail with empty password", async () => {
    const payload = {
      username: "customer",
      email: "customer@mail.com",
      role: "Customer",
      phoneNumber: "111333",
      address: "Address",
    };
    const response = await request(app)
      .post("/customer/register")
      .send(payload);
    const { body, status } = response;
    expect(status).toBe(400);
    expect(body).toEqual(expect.any(Object));
    expect(body).toHaveProperty("message", "Password is required");
  });
  test("Register fail with password Null", async () => {
    const payload = {
      username: "customer",
      email: "customer@mail.com",
      password: "",
      role: "Customer",
      phoneNumber: "111333",
      address: "Address",
    };
    const response = await request(app)
      .post("/customer/register")
      .send(payload);
    const { body, status } = response;
    expect(status).toBe(400);
    expect(body).toEqual(expect.any(Object));
    expect(body).toHaveProperty("message", "Password is required");
  });

  test("Registerfail  with Unique Constrain", async () => {
    const payload = {
      username: "customer",
      email: "customer@mail.com",
      password: "password",
      role: "Customer",
      phoneNumber: "111333",
      address: "Address",
    };
    const response = await request(app)
      .post("/customer/register")
      .send(payload);
    const { body, status } = response;
    expect(status).toBe(400);
    expect(body).toEqual(expect.any(Object));
    expect(body).toHaveProperty("message", "username must be unique");
  });
});
