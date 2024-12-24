const request = require("supertest");
const app = require("../../app");
const { mongoConnect, mongoDisconnect } = require("../../services/mongo");

describe("Test Launches API", () => {
  beforeAll(async () => {
    await mongoConnect();
  });

  afterAll(async () => {
    await mongoDisconnect();
  });

  describe("Test GET /launches", () => {
    test("should respond with 200 success", async () => {
      const response = await request(app)
        .get("/launches")
        .expect(200)
        .expect("Content-Type", /json/);
    });
  });

  describe("Test POST /launches", () => {
    const completeLaunchData = {
      mission: "ZTM155",
      rocket: "ZTM Experimental IS1",
      target: "Kepler-62 f",
      launchDate: "January 17, 2025",
    };

    const launchDataWithoutDate = {
      mission: "ZTM155",
      rocket: "ZTM Experimental IS1",
      target: "Kepler-62 f",
    };

    const launchDataWithInvalidDate = {
      mission: "ZTM155",
      rocket: "ZTM Experimental IS1",
      target: "Kepler-186 f",
      launchDate: "Invalid Date",
    };

    test("should respond with 201 created", async () => {
      const response = await request(app)
        .post("/launches")
        .send(completeLaunchData)
        .expect(201)
        .expect("Content-Type", /json/);

      const requestDate = new Date(completeLaunchData.launchDate).valueOf();
      const responseDate = new Date(response.body.launchDate).valueOf();
      expect(responseDate).toBe(requestDate);

      expect(response.body).toMatchObject(launchDataWithoutDate);
    });

    test("should catch missing required properties", async () => {
      const response = await request(app)
        .post("/launches")
        .send(launchDataWithoutDate)
        .expect(422)
        .expect("Content-Type", /json/);

      expect(response.body).toStrictEqual({
        error: "Some of the fields are missing",
      });
    });

    test("should catch invalid dates", async () => {
      const response = await request(app)
        .post("/launches")
        .send(launchDataWithInvalidDate)
        .expect(422)
        .expect("Content-Type", /json/);

      expect(response.body).toStrictEqual({
        error: "Invalid launch date",
      });
    });
  });
});
