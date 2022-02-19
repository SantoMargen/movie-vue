const request = require("supertest");
const app = require("../app");
const { createToken } = require("../helpers/jwt");
const { Genre, User, Movie, Customer, Bookmark } = require("../models");

const tokenAdmin =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJjdXN0b21lckBtYWlsLmNvbSIsInJvbGUiOiJDdXN0b21lciIsImlhdCI6MTYzNjYwMDA0Mn0.GRv8_z4yM5VKtwJk5bTa7NOvMaIvaOhNpqMCbwHOcvs";
const tokenCustomer =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJjdXN0b21lckBtYWlsLmNvbSIsInJvbGUiOiJDdXN0b21lciIsImlhdCI6MTYzNjYwMDA0Mn0.GRv8_z4yM5VKtwJk5bTa7NOvMaIvaOhNpqMCbwHOcvs";
beforeAll(async () => {
  try {
    //  seed data user
    const user = [
      {
        username: "user",
        email: "user@mail.com",
        password: "password",
        role: "Admin",
        phoneNumber: "111333",
        address: "Address",
      },
      {
        username: "user2",
        email: "user2@mail.com",
        password: "password",
        role: "Admin",
        phoneNumber: "111333",
        address: "Address",
      },
    ];
    user.forEach((el) => {
      el.createdAt = new Date();
      el.updatedAt = new Date();
    });
    const admin = await User.bulkCreate(user);

    // seed data genre
    const genres = require("../Db/genre.json");
    genres.forEach((el) => {
      el.createdAt = new Date();
      el.updatedAt = new Date();
    });
    await Genre.bulkCreate(genres);

    // seed data movie
    const movies = require("../Db/movies.json");
    movies.forEach((el) => {
      delete el.id;
      el.createdAt = new Date();
      el.updatedAt = new Date();
    });
    await Movie.bulkCreate(movies);

    // seed data Customer
    const customers = [
      {
        username: "customer",
        email: "customer@mail.com",
        password: "password",
        role: "Customer",
        phoneNumber: "111333",
        address: "Address",
      },
      {
        username: "customer2",
        email: "customer2@mail.com",
        password: "password",
        role: "Customer",
        phoneNumber: "111333",
        address: "Address",
      },
    ];
    customers.forEach((el) => {
      el.createdAt = new Date();
      el.updatedAt = new Date();
    });

    // seed data Bookmark
    const bookmarks = require("../Db/bookmark.json");
    bookmarks.forEach((el) => {
      el.createdAt = new Date();
      el.updatedAt = new Date();
    });
    await Bookmark.bulkCreate(bookmarks);
  } catch (err) {
    console.log(err);
  }
});

afterAll(async () => {
  try {
    await Genre.destroy({
      truncate: true,
      cascade: true,
      restartIdentity: true,
    });
    await User.destroy({
      truncate: true,
      cascade: true,
      restartIdentity: true,
    });
    await Movie.destroy({
      truncate: true,
      cascade: true,
      restartIdentity: true,
    });
    await Customer.destroy({
      truncate: true,
      cascade: true,
      restartIdentity: true,
    });
    await Bokkmark.destroy({
      truncate: true,
      cascade: true,
      restartIdentity: true,
    });
  } catch (err) {}
});

describe("GET /customer/bookmarks", () => {
  test("Get all Bookmark", async () => {
    const response = await request(app).get("/customer/bookmarks").set({
      access_token: tokenCustomer,
    });
    const { status, body } = response;
    expect(status).toBe(200);
    expect(body).toEqual(expect.any(Array));
  });

  test("Add movie to Bookmar by  movieId", async () => {
    const response = await request(app).post("/customer/bookmarks/1").set({
      access_token: tokenCustomer,
    });
    const { status, body } = response;
    expect(status).toBe(201);
    expect(body).toEqual(expect.any(Object));
  });

  test("Filed add movie to Bookmar because movie not found in database", async () => {
    const response = await request(app).post("/customer/bookmarks/50").set({
      access_token: tokenCustomer,
    });
    const { status, body } = response;
    expect(status).toBe(404);
    expect(body).toBe("message", "movie not found");
  });

  test("Filed get Bookmar not logged in", async () => {
    const response = await request(app).post("/customer/bookmarks");
    const { status, body } = response;
    expect(status).toBe(401);
    expect(body.message).toBe("please login first");
  });

  test("Filed get Bookmar token invalid", async () => {
    const response = await request(app).post("/customer/bookmarks").set({
      access_token: tokenAdmin,
    });
    const { status, body } = response;
    expect(status).toBe(401);
    expect(body.message).toBe("please login first");
  });
});
