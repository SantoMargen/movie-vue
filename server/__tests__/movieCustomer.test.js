const request = require("supertest");
const app = require("../app");
const { Genre, User, Movie, Customer } = require("../models");

const ACCESS_TOKEN = "iniadalahaccess_token";

beforeAll(async () => {
  try {
    //  seed data user
    const users = [
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
      {
        username: "user3",
        email: "user3@mail.com",
        password: "password",
        role: "Admin",
        phoneNumber: "111333",
        address: "Address",
      },
    ];
    users.forEach((el) => {
      el.createdAt = new Date();
      el.updatedAt = new Date();
    });
    await User.bulkCreate(users);

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
        email: "Customer@mail.com",
        password: "password",
        role: "Customer",
        phoneNumber: "111333",
        address: "Address",
      },
      {
        username: "customer2",
        email: "Customer2@mail.com",
        password: "password",
        role: "Customer",
        phoneNumber: "111333",
        address: "Address",
      },
      {
        username: "custome3",
        email: "Customer3@mail.com",
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
    await Customer.bulkCreate(customers);
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
  } catch (err) {}
});

describe("GET /customer/movies", () => {
  test("Get movies without access token", async () => {
    const response = await request(app).get("/customer/movies");
    const { body, status } = response;
    expect(status).toBe(200);
    expect(body).toEqual(expect.any(Object));
    expect(body.movies).toHaveLength(8);
  });

  test("Get movies with access token", async () => {
    const response = await request(app)
      .get("/customer/movies")
      .set({ access_token: ACCESS_TOKEN });
    const { body, status } = response;

    expect(status).toBe(200);
    expect(body).toEqual(expect.any(Object));
    expect(body.movies).toHaveLength(8);
  });

  test("Get movies 1 query filter without access token", async () => {
    const response = await request(app)
      .get("/customer/movies")
      .query({ genreId: 2 });
    const { body, status } = response;

    expect(status).toBe(200);
    expect(body).toEqual(expect.any(Object));
    expect(body.movies).toHaveLength(8);
  });

  test("Get movies 1 query filter with access token", async () => {
    const response = await request(app)
      .get("/customer/movies")
      .set({ access_token: ACCESS_TOKEN })
      .query({ genreId: 2 });
    const { body, status } = response;

    expect(status).toBe(200);
    expect(body).toEqual(expect.any(Object));
    expect(body.movies).toHaveLength(8);
  });

  test("Get movies with  3 query filter without access token", async () => {
    const response = await request(app)
      .get("/customer/movies")
      .query({ genreId: 2, authorId: 2, title: "a" });
    const { body, status } = response;

    expect(status).toBe(200);
    expect(body).toEqual(expect.any(Object));
    expect(body.movies).toHaveLength(3);
  });

  test("Get movies 3 query filter with access token", async () => {
    const response = await request(app)
      .get("/customer/movies")
      .set({ access_token: ACCESS_TOKEN })
      .query({ genreId: 2, authorId: 2, title: "a" });
    const { body, status } = response;

    expect(status).toBe(200);
    expect(body).toEqual(expect.any(Object));
    expect(body.movies).toHaveLength(3);
  });

  test("Get movies with  3 query filter, page and size  without access token", async () => {
    const response = await request(app)
      .get("/customer/movies")
      .query({ genreId: 2, authorid: 1, title: "a", page: 1, size: 2 });
    const { body, status } = response;

    expect(status).toBe(200);
    expect(body).toEqual(expect.any(Object));
    expect(body).toHaveProperty("totalItems", expect.any(Number));
    expect(body).toHaveProperty("totalPages", expect.any(Number));
    expect(body).toHaveProperty("currentPage", expect.any(Number));
    expect(body.movies).toEqual(expect.any(Array));
  });

  test("Get movies with  3 query filter, page and size  with  access token", async () => {
    const response = await request(app)
      .get("/customer/movies")
      .set({ access_token: ACCESS_TOKEN })
      .query({ genreId: 2, authorid: 1, title: "a", page: 1, size: 2 });
    const { body, status } = response;

    expect(status).toBe(200);
    expect(body).toEqual(expect.any(Object));
    expect(body).toHaveProperty("totalItems", expect.any(Number));
    expect(body).toHaveProperty("totalPages", expect.any(Number));
    expect(body).toHaveProperty("currentPage", expect.any(Number));
    expect(body.movies).toEqual(expect.any(Array));
  });
});

describe("GET /customer/movies/:movieId", () => {
  test("Get movies with  movieId as params", async () => {
    const response = await request(app)
      .get("/customer/movies/5")
      .set({ access_token: ACCESS_TOKEN });
    const { body, status } = response;

    expect(status).toBe(200);
    expect(body).toEqual(expect.any(Object));
    expect(body).toHaveProperty("id", expect.any(Number));
    expect(body).toHaveProperty("title", expect.any(String));
    expect(body).toHaveProperty("synopsis", expect.any(String));
    expect(body).toHaveProperty("trailerUrl", expect.any(String));
    expect(body).toHaveProperty("imgUrl", expect.any(String));
    expect(body).toHaveProperty("rating", expect.any(Number));
    expect(body).toHaveProperty("status", expect.any(String));
    expect(body).toHaveProperty("authorId", expect.any(Number));
    expect(body).toHaveProperty("genreId", expect.any(Number));
    expect(body.Genre).toHaveProperty("name", expect.any(String));
    expect(body.User).toHaveProperty("username", expect.any(String));
  });

  test("Get movies with  movieId as params NotFound", async () => {
    const response = await request(app).get("/customer/movies/5s");
    const { body, status } = response;

    expect(status).toBe(404);
    expect(body).toEqual(expect.any(Object));
    expect(body).toHaveProperty("message", "Movie Not Found");
  });
});
