## Hospital Management System

### Table of Contents

- Overview
- Installation and Setup Server
- API Endpoints

#### Overview

Hospital Managment system , build with NodeJS (Express), MongoDB(Database), and Prima (ORM)

#### Installation and Setup Server

```bash
git@github.com:naysw/Hospital_Management.git
```

```bash
cd your project folder
```

```bash
yarn install

or

npm install
```

Copy `.env.example` to `.env`

```bash
cp .env.example .env
```

Then open `.env` file and replace with your database crenditials on DATABASE_URL and ACCESS_TOKEN_SECRET

```bash

DATABASE_URL="mongodb+srv://<user>:<password>@cluster0.no10c.mongodb.net/hospital_management?retryWrites=true&w=majority"

ACCESS_TOKEN_SECRET=


```

once everything setup correctly, you can start application by running

```bash
yarn dev

or

npm run dev
```

By default development server will up and running on `PORT` `:4000`, you can change what ever you want

To be able to use demo data, `doctors`, `hospital`, `patients`, and `specilist` and any others, you will nee to run followind command.

Before run this command, please make sure your databse is connected successfully.

To push data model to mongo db, run

```bash
yarn prisma db push

or

npm run prisma db push
```

After database has been successfully push, you can now able to run seed command

```bash
yarn prisma db seed

or

npm run prisma db seed
```

#### API Endpoints

To perform api request, you will required to have valid authenticate accessToken, we use `JWT` here, If you follow above step to seed dummy data, you can start login with following `patient` or you can register with valid Myanmar phone number.

```bash
phone: "09671161193"
password: "password"
```

## (1) Login

Required Body

| Name     | Type   | Description                | Mandatory |
| -------- | ------ | -------------------------- | --------- |
| phone    | String | valid Myanmar phone number | Yes       |
| password | String | password                   | Yes       |

```bash

  POST /api/login
  content-type: application/json

  // body
  {
      "phone": "09671161193" ,
      "password": "password"
  }
```

Response payload will include , `accessToken` that you will need to attach to `Authorization` header on every request that required te be authenticated.

```bash
{
    "data": {
        "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MzM3MTQyYWY1NWFmMGZlOWM1NjYxMTAiLCJpYXQiOjE2NjQ1OTMzNzUsImV4cCI6MTY2NDYwMDU3NX0.pKaFBuOWsu8XJHuirQxP4GaaIkCEYdOFc_uOKwtEL8Q",
        "type": "Bearer",
        "expiredAt": "2h"
    }
}

```

## (2) Doctors

To make a booking appointment, you need to have at least one doctor created in your database

- (2.1)
  This endpoint will return a list of doctor that we created from seeding dummy data
  `GET /api/doctors`

Avaliable Params

| Name | Type   | Description                                      | Mandatory |
| ---- | ------ | ------------------------------------------------ | --------- |
| take | Number | you can specify how many record you want to take | No        |
| skip | Number | you can specify how many record you want to skip | No        |

Example

```bash

// Request

POST {{BASE_URL}}/api/doctors
content-type: application/json


// Response Payload

{
    "data": [
        {
            "id": "6337142af55af0fe9c56610e",
            "name": "Dr.John Doe",
            "degree": "M.B.B.S",
            "startedAt": null,
            "biography": "Vel id tempora aliquam. Esse temporibus explicabo. Molestias itaque accusantium et doloribus quia quaerat in.",
            "address": "003 Abagail Ports",
            "createdAt": "2022-09-30T16:07:06.214Z",
            "updatedAt": "2022-09-30T16:07:06.214Z",
            "specialistId": "6336621bf710ac1f2ed76a8e",
            "specialist": {
                "id": "6336621bf710ac1f2ed76a8e",
                "name": "အထွေထွေရောဂါ",
                "createdAt": "2022-09-30T16:07:05.336Z",
                "updatedAt": "2022-09-30T16:07:05.336Z"
            }
        },
        {
            "id": "6337142af55af0fe9c56610f",
            "name": "Dr.Two",
            "degree": "M.B.B.S",
            "startedAt": null,
            "biography": "Sed deserunt et qui qui et eos. Laboriosam ipsa quis odit distinctio impedit. Dolorem nemo reiciendis dolore ad dicta. Animi dolores impedit qui ducimus magni perferendis. Aliquam earum nihil maiores officiis tenetur. Nulla et eum quaerat et.",
            "address": "10430 Labadie Expressway",
            "createdAt": "2022-09-30T16:07:06.493Z",
            "updatedAt": "2022-09-30T16:07:06.493Z",
            "specialistId": "63366231f710ac1f2ed76a8f",
            "specialist": {
                "id": "63366231f710ac1f2ed76a8f",
                "name": "နှလုံးရော အထူးကု",
                "createdAt": "2022-09-30T16:07:05.558Z",
                "updatedAt": "2022-09-30T16:07:05.558Z"
            }
        }
    ]
}

```

- (2.2) Create new Doctor
  `POST /api/doctors`
  the endpoint to handle create new doctor, Noted: you must be authenticated, if not, you will received `Unauthorized` Exception

Required Payload

| Name         | Type               | Description                                                                                                                                                             | Mandatory |
| ------------ | ------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- |
| name         | String             | Doctor name                                                                                                                                                             | Yes       |
| specialistId | String, (ObjectId) | specialistId that doctor specialize, should be valid ObjectId, you can find one specilist on dummy data `_data/specilists.ts` or from your database that newaly created | Yes       |
| degree       | String             | doctor degree                                                                                                                                                           | No        |
| biography    | String             | short description about doctor                                                                                                                                          | No        |
| address      | String             | address                                                                                                                                                                 | No        |

Example

```bash
// Request
POST {{BASE_URL}}/api/doctors
// headers
content-type: application/json
Authorization: "Bearer {{ accessToken}}"

// body
{
    "name": "New Doctor",
    "specialistId": "63366261f710ac1f2ed76a91"
}

// Response

{
    "data": {
        "id": "6337b1bfba3e7f101195895f",
        "name": "New Doctor",
        "degree": null,
        "startedAt": null,
        "biography": null,
        "address": null,
        "createdAt": "2022-10-01T03:19:27.949Z",
        "updatedAt": "2022-10-01T03:19:27.949Z",
        "specialistId": "63366261f710ac1f2ed76a91",
        "specialist": {
            "id": "63366261f710ac1f2ed76a91",
            "name": "နား ၊ နှာခေါင်း ၊ လည်ချောင်း",
            "createdAt": "2022-09-30T16:07:06.002Z",
            "updatedAt": "2022-09-30T16:07:06.002Z"
        }
    }
}
```

- (2.3) Update Doctor
  `POST /api/doctors`
  the endpoint to handle update doctor, Noted: you must be authenticated, if not, you will received `Unauthorized` Exception

Optional Payload

| Name         | Type               | Description                                                                                                                                                             | Mandatory |
| ------------ | ------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- |
| name         | String             | Doctor name                                                                                                                                                             | No        |
| specialistId | String, (ObjectId) | specialistId that doctor specialize, should be valid ObjectId, you can find one specilist on dummy data `_data/specilists.ts` or from your database that newaly created | No        |
| degree       | String             | doctor degree                                                                                                                                                           | No        |
| biography    | String             | short description about doctor                                                                                                                                          | No        |
| address      | String             | address                                                                                                                                                                 | No        |

```bash

// Request
PATCH {{BASE_URL}}/api/doctors/6337b1bfba3e7f101195895f
// headers
content-type: application/json
Authorization: "Bearer {{ accessToken}}"

// body
{
    "name": "Update Doctor"
}


// Response

{
    "data": {
        "id": "6337b1bfba3e7f101195895f",
        "name": "Update Doctor",
        "degree": null,
        "startedAt": null,
        "biography": null,
        "address": null,
        "createdAt": "2022-10-01T03:19:27.949Z",
        "updatedAt": "2022-10-01T03:19:27.949Z",
        "specialistId": "63366261f710ac1f2ed76a91",
        "specialist": {
            "id": "63366261f710ac1f2ed76a91",
            "name": "နား ၊ နှာခေါင်း ၊ လည်ချောင်း",
            "createdAt": "2022-09-30T16:07:06.002Z",
            "updatedAt": "2022-09-30T16:07:06.002Z"
        }
    }
}

```

- (2.4) Delete Doctor
  `DELETE /api/doctors/:id`

```bash
// Request

PATCH {{BASE_URL}}/api/doctors/6337b1bfba3e7f101195895f
// headers
content-type: application/json
Authorization: "Bearer {{ accessToken}}"


// Response

{
    "message": "Doctor with id 6337b1bfba3e7f101195895f deleted successfully"
}
```

## (3) Appointments

Once you have at least one doctor in you database, you can now start make an appointment with that doctor as a patient

- (3.1) List Appointments
  This endpoint will return only list of auth patient's `appointments`

`GET /api/appointments`

Avaliable Params

| Name | Type   | Description                                      | Mandatory |
| ---- | ------ | ------------------------------------------------ | --------- |
| take | Number | you can specify how many record you want to take | No        |
| skip | Number | you can specify how many record you want to skip | No        |

Example

```bash
// Request

GET {{BASE_URL}}/api/appointments
    ?take=1
content-type: application/json

// Response

{
    "data": [
        {
            "id": "63371da3f9a09ad9d6ecf2c3",
            "status": "CANCELLED",
            "consultationType": "VIDEO",
            "reason": "Ill",
            "from": "2022-09-30T17:44:18.561Z",
            "to": "2022-10-01T16:44:18.561Z",
            "tokenNumber": 1,
            "createdAt": "2022-09-30T16:47:30.717Z",
            "updatedAt": "2022-09-30T16:47:30.717Z",
            "patientId": "6337142af55af0fe9c566110",
            "doctorId": "6337142af55af0fe9c56610e",
            "doctor": {
                "id": "6337142af55af0fe9c56610e",
                "name": "Dr.John Doe",
                "degree": "M.B.B.S",
                "startedAt": null,
                "biography": "Vel id tempora aliquam. Esse temporibus explicabo. Molestias itaque accusantium et doloribus quia quaerat in.",
                "address": "003 Abagail Ports",
                "createdAt": "2022-09-30T16:07:06.214Z",
                "updatedAt": "2022-09-30T16:07:06.214Z",
                "specialistId": "6336621bf710ac1f2ed76a8e"
            }
        }
    ]
}

```

- (3.2) Create new Appointment

`POST /api/appointments`
this end point will handle to create new appointment with doctor

Body Payload

| Name             | Type   | Description                                                                         | Mandatory |
| ---------------- | ------ | ----------------------------------------------------------------------------------- | --------- |
| consultationType | String | only allow VIDEO or VOICE                                                           | Yes       |
| reason           | String | some description of the appointment                                                 | Yes       |
| from             | Date   | Start date of the appontment schedule, should be valid date and not eairer than now | Yes       |
| to               | Date   | End date of the appontment schedule, should be valid date and not less than `from`  | Yes       |
| doctorId         | String | Valid doctor id that try to book for                                                | Yes       |

Example

```bash


// Request

POST {{BASE_URL}}/api/appointments
// headers
content-type: application/json
Authorization: "Bearer {{ accessToken}}"

// body

{
    "consultationType": "VIDEO",
    "reason": "fsfd",
    "from": "2022-10-01T04:37:41.296Z",
    "to": "2022-10-01T05:37:41.296Z",
    "doctorId": "6337b1b5ba3e7f101195895e"
}

// Response

{
    "data": {
        "id": "6337b650ba3e7f1011958960",
        "status": "ACTIVE",
        "consultationType": "VIDEO",
        "reason": "fsfd",
        "from": "2022-10-01T04:37:41.296Z",
        "to": "2022-10-01T05:37:41.296Z",
        "tokenNumber": 1,
        "createdAt": "2022-10-01T03:38:56.160Z",
        "updatedAt": "2022-10-01T03:38:56.160Z",
        "patientId": "6337142af55af0fe9c566110",
        "doctorId": "6337b1b5ba3e7f101195895e",
        "patient": {
            "id": "6337142af55af0fe9c566110",
            "name": "Patient One",
            "phone": "09671161193",
            "password": "$2b$12$gnoOk66xA9sX3hF6b.qHTOveU3VMDaj6mtCkxZ2TlBIVTLW3V6Ova",
            "dateOfBirth": null,
            "gender": "MALE",
            "regionId": null,
            "city": "Richardson",
            "createdAt": "2022-09-30T16:07:06.990Z",
            "updatedAt": "2022-09-30T16:07:06.990Z"
        },
        "doctor": {
            "id": "6337b1b5ba3e7f101195895e",
            "name": "09671161193",
            "degree": null,
            "startedAt": null,
            "biography": null,
            "address": null,
            "createdAt": "2022-10-01T03:19:17.579Z",
            "updatedAt": "2022-10-01T03:19:17.579Z",
            "specialistId": "63366261f710ac1f2ed76a91"
        }
    }
}

```

- (3.3) Update Appointment

`PATCH /api/appointments/:id`
this end point will handle to update appointment from given id

Body Payload

| Name             | Type   | Description                                                                         | Mandatory |
| ---------------- | ------ | ----------------------------------------------------------------------------------- | --------- |
| consultationType | String | only allow VIDEO or VOICE                                                           | No        |
| from             | Date   | Start date of the appontment schedule, should be valid date and not eairer than now | No        |
| to               | Date   | End date of the appontment schedule, should be valid date and not less than `from`  | No        |

Example

```bash

// Request

PATCH {{BASE_URL}}/api/appointments/6337b650ba3e7f1011958960
// headers
content-type: application/json
Authorization: "Bearer {{ accessToken}}"

// body
{
    "consultationType": "VIDEO",
    "from": "2022-10-02T04:37:41.296Z" // we just change date,
    "to": "2022-10-02T05:37:41.296Z"
}

// Response

{
    "data": {
        "id": "6337b650ba3e7f1011958960",
        "status": "ACTIVE",
        "consultationType": "VIDEO",
        "reason": "fsfd",
        "from": "2022-10-02T04:37:41.296Z",
        "to": "2022-10-02T05:37:41.296Z",
        "tokenNumber": 1,
        "createdAt": "2022-10-01T03:38:56.160Z",
        "updatedAt": "2022-10-01T03:38:56.160Z",
        "patientId": "6337142af55af0fe9c566110",
        "doctorId": "6337b1b5ba3e7f101195895e",
        "doctor": {
            "id": "6337b1b5ba3e7f101195895e",
            "name": "09671161193",
            "degree": null,
            "startedAt": null,
            "biography": null,
            "address": null,
            "createdAt": "2022-10-01T03:19:17.579Z",
            "updatedAt": "2022-10-01T03:19:17.579Z",
            "specialistId": "63366261f710ac1f2ed76a91"
        },
        "patient": {
            "id": "6337142af55af0fe9c566110",
            "name": "Patient One",
            "phone": "09671161193",
            "password": "$2b$12$gnoOk66xA9sX3hF6b.qHTOveU3VMDaj6mtCkxZ2TlBIVTLW3V6Ova",
            "dateOfBirth": null,
            "gender": "MALE",
            "regionId": null,
            "city": "Richardson",
            "createdAt": "2022-09-30T16:07:06.990Z",
            "updatedAt": "2022-09-30T16:07:06.990Z"
        }
    }
}

```

- (3.4) Cancel Appointment
  `PATCH /api/appointments/:id/cancel`
  This endpoint will handle to cancel appointment

Example

```bash
// Request

PATCH {{BASE_URL}}/api/appointments/6337b650ba3e7f1011958960/cancel
// headers
content-type: application/json
Authorization: "Bearer {{ accessToken}}"


// Response

{
    "data": {
        "id": "6337b650ba3e7f1011958960",
        "status": "CANCELLED",
        "consultationType": "VIDEO",
        "reason": "fsfd",
        "from": "2022-10-02T04:37:41.296Z",
        "to": "2022-10-02T05:37:41.296Z",
        "tokenNumber": 1,
        "createdAt": "2022-10-01T03:38:56.160Z",
        "updatedAt": "2022-10-01T03:38:56.160Z",
        "patientId": "6337142af55af0fe9c566110",
        "doctorId": "6337b1b5ba3e7f101195895e",
        "doctor": {
            "id": "6337b1b5ba3e7f101195895e",
            "name": "09671161193",
            "degree": null,
            "startedAt": null,
            "biography": null,
            "address": null,
            "createdAt": "2022-10-01T03:19:17.579Z",
            "updatedAt": "2022-10-01T03:19:17.579Z",
            "specialistId": "63366261f710ac1f2ed76a91"
        },
        "patient": {
            "id": "6337142af55af0fe9c566110",
            "name": "Patient One",
            "phone": "09671161193",
            "password": "$2b$12$gnoOk66xA9sX3hF6b.qHTOveU3VMDaj6mtCkxZ2TlBIVTLW3V6Ova",
            "dateOfBirth": null,
            "gender": "MALE",
            "regionId": null,
            "city": "Richardson",
            "createdAt": "2022-09-30T16:07:06.990Z",
            "updatedAt": "2022-09-30T16:07:06.990Z"
        }
    },
    "message": "You appointment has been cancel successfully"
}

```

- (3.5) Delete Appointments
  `DELETE /api/appointmets/:id`

```bash
// Request

PATCH {{BASE_URL}}/api/appointmets/6337b650ba3e7f1011958960
// headers
content-type: application/json
Authorization: "Bearer {{ accessToken}}"


// Response

{
    "message": "Appointment with id 6337b650ba3e7f1011958960 deleted successfully"
}
```

## (4) Others CRUD Entities

Here some other CRUD , REST full api endpoint that we can play arround.

- Hospitals ("api/hospitals")
- Patients ("api/patients")

Note: If you found any bugs, please contact me via email or issuce box. Thanks
