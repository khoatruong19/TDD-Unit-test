import { Account } from '../../app/server_app/model/AuthModel';
import { Reservation } from '../../app/server_app/model/ReservationModel';
import {
  HTTP_CODES,
  HTTP_METHODS,
} from '../../app/server_app/model/ServerModel';
import { Server } from '../../app/server_app/server/Server';
import { makeAwesomeRequest } from './utils/http_client';

describe('Server app intergration tests', () => {
  let server: Server;

  beforeAll(() => {
    server = new Server();
    server.startServer();
  });

  afterAll(() => {
    server.stopServer();
  });

  const someUser: Account = {
    id: '',
    userName: 'dfjkd',
    password: 'djfkld',
  };

  const someReservation: Reservation = {
    id: '',
    endDate: 'ajsdklhs',
    startDate: 'sdjlk;sd',
    room: 'sdjsdl',
    user: 'sjdshj',
  };

  it('should register new user', async () => {
    const result = await fetch('http://localhost:8080/register', {
      method: HTTP_METHODS.POST,
      body: JSON.stringify(someUser),
    });

    const resulltBody = await result.json();

    expect(result.status).toBe(HTTP_CODES.CREATED);
    expect(resulltBody.userId).toBeDefined();
  });

  it('should register new user with awesomeRequest', async () => {
    const result = await makeAwesomeRequest(
      {
        host: 'localhost',
        port: 8080,
        method: HTTP_METHODS.POST,
        path: '/register',
      },
      someUser
    );

    expect(result.statusCode).toBe(HTTP_CODES.CREATED);
    expect(result.body.userId).toBeDefined();
  });

  let token: string;
  it('should login a register user ', async () => {
    const result = await fetch('http://localhost:8080/login', {
      method: HTTP_METHODS.POST,
      body: JSON.stringify(someUser),
    });

    const resulltBody = await result.json();

    expect(result.status).toBe(HTTP_CODES.CREATED);
    expect(resulltBody.token).toBeDefined();
    token = resulltBody.token;
  });

  let reservationId: string;
  it('should create reservation if authorized ', async () => {
    const result = await fetch('http://localhost:8080/reservation', {
      method: HTTP_METHODS.POST,
      body: JSON.stringify(someReservation),
      headers: {
        authorization: token,
      },
    });

    const resulltBody = await result.json();

    expect(result.status).toBe(HTTP_CODES.CREATED);
    expect(resulltBody.reservationId).toBeDefined();
    reservationId = resulltBody.reservationId;
  });

  it('should get reservation if authorized ', async () => {
    const result = await fetch(
      `http://localhost:8080/reservation/${reservationId}`,
      {
        method: HTTP_METHODS.GET,
        headers: {
          authorization: token,
        },
      }
    );

    const resulltBody = await result.json();

    const expectedReservation = structuredClone(someReservation);
    expectedReservation.id = reservationId;

    expect(result.status).toBe(HTTP_CODES.OK);
    expect(resulltBody).toEqual(expectedReservation);
  });

  it('should create and retrive multiple reservations if authorized ', async () => {
    await fetch('http://localhost:8080/reservation', {
      method: HTTP_METHODS.POST,
      body: JSON.stringify(someReservation),
      headers: {
        authorization: token,
      },
    });
    await fetch('http://localhost:8080/reservation', {
      method: HTTP_METHODS.POST,
      body: JSON.stringify(someReservation),
      headers: {
        authorization: token,
      },
    });
    await fetch('http://localhost:8080/reservation', {
      method: HTTP_METHODS.POST,
      body: JSON.stringify(someReservation),
      headers: {
        authorization: token,
      },
    });

    const getAllResult = await fetch(`http://localhost:8080/reservation/all`, {
      method: HTTP_METHODS.GET,
      headers: {
        authorization: token,
      },
    });

    const resulltBody = await getAllResult.json();

    expect(getAllResult.status).toBe(HTTP_CODES.OK);
    expect(resulltBody.length).toBe(4);
  });

  it('should update reservation if authorized ', async () => {
    const updateResult = await fetch(
      `http://localhost:8080/reservation/${reservationId}`,
      {
        method: HTTP_METHODS.PUT,
        body: JSON.stringify({
          startDate: 'updated',
        }),
        headers: {
          authorization: token,
        },
      }
    );

    expect(updateResult.status).toBe(HTTP_CODES.OK);

    const result = await fetch(
      `http://localhost:8080/reservation/${reservationId}`,
      {
        method: HTTP_METHODS.GET,
        headers: {
          authorization: token,
        },
      }
    );

    const getRequestBody: Reservation = await result.json();

    expect(getRequestBody.startDate).toBe('updated');
  });

  it('should delete reservation if authorized ', async () => {
    const deleteResult = await fetch(
      `http://localhost:8080/reservation/${reservationId}`,
      {
        method: HTTP_METHODS.DELETE,
        body: JSON.stringify({
          startDate: 'updated',
        }),
        headers: {
          authorization: token,
        },
      }
    );

    expect(deleteResult.status).toBe(HTTP_CODES.OK);

    const result = await fetch(
      `http://localhost:8080/reservation/${reservationId}`,
      {
        method: HTTP_METHODS.GET,
        headers: {
          authorization: token,
        },
      }
    );

    const getRequestBody: Reservation = await result.json();

    expect(result.status).toBe(HTTP_CODES.NOT_fOUND);
  });
});
