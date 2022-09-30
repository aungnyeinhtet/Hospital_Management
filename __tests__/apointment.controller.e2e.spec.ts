import { genSaltSync, hash } from "bcrypt";
import { Express } from "express";
import request from "supertest";
import { createApp } from "../src/app";
import prisma from "../src/lib/prisma";
import { HttpStatus } from "../src/nsw/types/http-status";

describe("AppointmentController", () => {
  let app: Express;
  const appointmentEnpoint = "/api/appointments";
  const loginEnpoint = "/api/login";
  let accessToken: string;

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

    const { body } = await request(app)
      .post(loginEnpoint)
      .set("Accept", "application/json")
      .send({
        phone: mockUser.phone,
        password: mockUser.password,
      })
      .expect(HttpStatus.OK);

    accessToken = body.data.accessToken;
  });

  afterAll(async () => {
    await prisma.patient.deleteMany();
    await prisma.$disconnect();
  });

  describe("findMany", () => {
    it("should throw Unauthorized error if user is not login", async () => {
      await request(app)
        .get(appointmentEnpoint)
        .set("Accept", "application/json")
        .set("Authorization", "")
        .expect(HttpStatus.UNAUTHORIZED);
    });

    it("should return list of auth user appointments", async () => {
      const { body } = await request(app)
        .get(appointmentEnpoint)
        .set("Accept", "application/json")
        .set("Authorization", `Bearer ${accessToken}`)
        .expect(HttpStatus.OK);

      console.log(body);
      expect(body.data).toBeDefined();
    });
  });
});
