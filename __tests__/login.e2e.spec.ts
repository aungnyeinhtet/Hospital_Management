import { genSaltSync, hash } from "bcrypt";
import app from "src/app";
import prisma from "src/lib/prisma";
import { HttpStatus } from "src/nsw/types/http-status";
import request from "supertest";

describe("LoginController", () => {
  const loginEndpoint = "/api/login";

  const mockUser = {
    name: "Name",
    phone: "09671161193",
    password: "password",
  };

  beforeAll(async () => {
    await prisma.patient.deleteMany();

    await prisma.patient.create({
      data: {
        name: mockUser.name,
        phone: mockUser.phone,
        password: await hash(mockUser.password, genSaltSync(12)),
      },
    });
  });

  afterAll(async () => {
    await prisma.patient.deleteMany();
    await prisma.$disconnect();
  });

  describe("login", () => {
    it("should throw error if payload is not provided", async () => {
      await request(app)
        .post(loginEndpoint)
        .set("Accept", "application/json")
        .send({
          phone: "",
          password: "",
        })
        .expect(HttpStatus.BAD_REQUEST);
    });

    it("should throw error if user not found with phone number", async () => {
      await request(app)
        .post(loginEndpoint)
        .set("Accept", "application/json")
        .send({
          phone: "0445214",
          password: "password",
        })
        .expect(HttpStatus.NOT_FOUND);
    });

    it("should throw error if invalid password", async () => {
      await request(app)
        .post(loginEndpoint)
        .set("Accept", "application/json")
        .send({
          phone: mockUser.phone,
          password: "dddddddd",
        })
        .expect(HttpStatus.BAD_REQUEST);
    });

    it("should be able to login with valid payload", async () => {
      await request(app)
        .post(loginEndpoint)
        .set("Accept", "application/json")
        .send({
          phone: mockUser.phone,
          password: mockUser.password,
        })
        .expect(HttpStatus.OK);
    });
  });
});
