import { handler } from "../lambda/announcements-api-lambda";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { DocumentClient } from "aws-sdk/clients/dynamodb";

// mock dynamodb DocumentClient

const dynamoDBResult = "DynamoDB result";
const dynamoDBResultMock = {
  promise() {
    return Promise.resolve(dynamoDBResult);
  },
};

jest.mock("aws-sdk/clients/dynamodb", () => {
  return {
    DocumentClient: jest.fn(() => {
      return {
        query: jest.fn(() => {
          return dynamoDBResultMock;
        }),
        put: jest.fn(() => {
          return dynamoDBResultMock;
        }),
      };
    }),
  };
});

const envMocks = {
  ANNOUNCEMENT_APP_TABLE: "announcement-app-table",
};

beforeEach(() => {
  process.env = envMocks;
});

describe("Announcements API lambda returns correct results for GET requests", () => {
  afterAll(() => {
    jest.clearAllMocks();
  });

  it("Lambda Returns Correct Body and Status Code", async () => {
    // Arrange & Act

    const expectedResult: APIGatewayProxyResult = {
      body: JSON.stringify(dynamoDBResult),
      statusCode: 200,
    };

    const event: APIGatewayProxyEvent = { httpMethod: "GET" } as any;
    const actualResult = await handler(event, {});

    // Assert
    expect(actualResult).toEqual(expectedResult);
  });

  it("DocumentClient is Called Once", () => {
    // Assert
    expect(DocumentClient).toHaveBeenCalledTimes(1);
  });
});

describe("Announcements API lambda returns correct results for POST requests", () => {
  it("Lambda Returns Correct Body and Status Code", async () => {
    // Arrange & Act
    const event: APIGatewayProxyEvent = {
      httpMethod: "POST",
      body: '{ "author": "Adam Clark", "text": "Announcement" }',
    } as any;
    const actualResult = await handler(event, {});

    // Assert
    expect(actualResult.statusCode).toEqual(201);
    expect(JSON.parse(actualResult.body)).toMatchObject({
      author: "Adam Clark",
    });
    expect(JSON.parse(actualResult.body)).toMatchObject({
      text: "Announcement",
    });
  });
  it("Lambda Returns Correct Body and Status Code if 'author' value too long", async () => {
    // Arrange & Act
    const event: APIGatewayProxyEvent = {
      httpMethod: "POST",
      body: `{ "author": "${"#".repeat(101)}", "text": "Announcement" }`,
    } as any;
    const actualResult = await handler(event, {});

    // Assert
    expect(actualResult.statusCode).toEqual(400);
    expect(actualResult.body).toEqual(
      '{"message":"Author\'s name shouldn\'t be longer than 100 chars"}'
    );
  });
  it("Lambda Returns Correct Body and Status Code if 'text' value too long", async () => {
    // Arrange & Act
    const event: APIGatewayProxyEvent = {
      httpMethod: "POST",
      body: `{ "author": "Adam Clark", "text": "${"#".repeat(201)}" }`,
    } as any;
    const actualResult = await handler(event, {});

    // Assert
    expect(actualResult.statusCode).toEqual(400);
    expect(actualResult.body).toEqual(
      '{"message":"Announcement shouldn\'t be longer than 200 chars"}'
    );
  });
  it("Lambda Returns Correct Body and Status Code if there are no 'author' or 'text' Fields", async () => {
    // Arrange & Act
    const event: APIGatewayProxyEvent = {
      httpMethod: "POST",
      body: `{"text": "Announcement" }`,
    } as any;
    const actualResult = await handler(event, {});

    // Assert
    expect(actualResult.statusCode).toEqual(400);
    expect(actualResult.body).toEqual(
      "{\"message\":\"'author' and 'text' fields are required!\"}"
    );
  });
});

describe("Announcements API lambda returns correct results for wrong or not defined http method", () => {
  it("Lambda Returns Correct Body and Status Code for Methods Other than GET and POST", async () => {
    // Arrange & Act
    const expectedResult: APIGatewayProxyResult = {
      body: "Method not allowed or missing from the event!",
      statusCode: 405,
    };

    const event: APIGatewayProxyEvent = { httpMethod: "DELETE" } as any;
    const actualResult = await handler(event, {});

    // Assert
    expect(actualResult).toEqual(expectedResult);
  });
  it("Lambda Returns Correct Body and Status Code if HTTP Method not Defined", async () => {
    // Arrange & Act
    const expectedResult: APIGatewayProxyResult = {
      body: "Method not allowed or missing from the event!",
      statusCode: 405,
    };

    const event: APIGatewayProxyEvent = {} as any;
    const actualResult = await handler(event, {});

    // Assert
    expect(actualResult).toEqual(expectedResult);
  });
});
