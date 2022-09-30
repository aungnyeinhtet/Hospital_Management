import { genSaltSync, hash } from "bcrypt";
import { Express } from "express";
import request from "supertest";
import { createApp } from "../src/app";
import prisma from "../src/lib/prisma";
import { HttpStatus } from "../src/nsw/types/http-status";

describe("LoginController", () => {
  let app: Express;
  const loginEndpoint = "/api/login";

  const mockUser = {
    name: "Name",
    phone: "09671161193",
    password: "password",
  };

  beforeAll(async () => {
    app = createApp();
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
      const { body } = await request(app)
        .post(loginEndpoint)
        .set("Accept", "application/json")
        .send({
          phone: "",
          password: "",
        })
        .expect(HttpStatus.BAD_REQUEST);

      console.log(body);
    });

    it("should throw error if user not found with phone number", async () => {
      const { body } = await request(app)
        .post(loginEndpoint)
        .set("Accept", "application/json")
        .send({
          phone: "0445214",
          password: "password",
        })
        .expect(HttpStatus.NOT_FOUND);

      console.log(body);
    });

    it("should throw error if invalid password", async () => {
      const { body } = await request(app)
        .post(loginEndpoint)
        .set("Accept", "application/json")
        .send({
          phone: mockUser.phone,
          password: "dddddddd",
        })
        .expect(HttpStatus.BAD_REQUEST);

      console.log(body);
    });

    it("should be able to login with valid payload", async () => {
      const { body } = await request(app)
        .post(loginEndpoint)
        .set("Accept", "application/json")
        .send({
          phone: mockUser.phone,
          password: mockUser.password,
        })
        .expect(HttpStatus.OK);

      console.log(body);
    });
  });
});
