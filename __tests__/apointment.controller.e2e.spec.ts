import { ConsultationType } from "@prisma/client";
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

  const mockAppointment = {
    consultationType: ConsultationType.VIDEO,
    reason: "Sick",
    from: new Date(Date.now()),
    to: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
    doctorId: "6337142af55af0fe9c56610e",
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

  describe("findMany [GET]", () => {
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

  describe("create [POST]", () => {
    it("should throw Unauthorized error if user is not login", async () => {
      await request(app)
        .post(appointmentEnpoint)
        .set("Accept", "application/json")
        .set("Authorization", "")
        .expect(HttpStatus.UNAUTHORIZED);
    });

    it("should throw error if required fileds are not provided", async () => {
      await request(app)
        .post(appointmentEnpoint)
        .set("Accept", "application/json")
        .set("Authorization", `Bearer ${accessToken}`)
        .send({
          consultationType: "",
          reason: "",
          from: "",
          to: "",
          doctorId: "",
        })
        .expect(HttpStatus.BAD_REQUEST);
    });

    it("should throw error if consultationType is not valid enum", async () => {
      await request(app)
        .post(appointmentEnpoint)
        .set("Accept", "application/json")
        .set("Authorization", `Bearer ${accessToken}`)
        .send({
          consultationType: "Randon",
          reason: mockAppointment.reason,
          from: mockAppointment.from,
          to: mockAppointment.to,
          doctorId: mockAppointment.doctorId,
        })
        .expect(HttpStatus.BAD_REQUEST);
    });

    it("should throw NotFound error if dotor not exists with doctorId", async () => {
      const { body } = await request(app)
        .post(appointmentEnpoint)
        .set("Accept", "application/json")
        .set("Authorization", `Bearer ${accessToken}`)
        .send({
          consultationType: mockAppointment.consultationType,
          reason: mockAppointment.reason,
          from: mockAppointment.from,
          to: mockAppointment.to,
          doctorId: "6337142af55af0fe9c56610b",
        })
        .expect(HttpStatus.NOT_FOUND);

      console.log(body);
    });

    it.skip("should be create new appointment", async () => {
      const { body } = await request(app)
        .post(appointmentEnpoint)
        .set("Accept", "application/json")
        .set("Authorization", `Bearer ${accessToken}`)
        .send(mockAppointment)
        .expect(HttpStatus.CREATED);

      console.log(body);

      expect(body.data.consultationType).toBe(mockAppointment.consultationType);
      expect(body.data.reason).toBe(mockAppointment.reason);
      expect(body.data.from).toBe(mockAppointment.from);
      expect(body.data.to).toBe(mockAppointment.to);
    });
  });
});
