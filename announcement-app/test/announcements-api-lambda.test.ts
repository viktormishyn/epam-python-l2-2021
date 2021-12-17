import { handler } from "../lambda/announcements-api-lambda";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

describe("Announcements API lambda returns correct results for GET requests", () => {
  it("Lambda Returns Correct Body and Status Code", async () => {
    // Arrange & Act
    const expectedResult: APIGatewayProxyResult = {
      body: "Getting announcements from DynamoDB...",
      statusCode: 200,
    };

    const event: APIGatewayProxyEvent = { httpMethod: "GET" } as any;
    const actualResult = await handler(event, {});

    // Assert
    expect(actualResult).toEqual(expectedResult);
  });
});

describe("Announcements API lambda returns correct results for POST requests", () => {
  it("Lambda Returns Correct Body and Status Code", async () => {
    // Arrange & Act
    const expectedResult: APIGatewayProxyResult = {
      body: "Adding announcement to DynamoDB...",
      statusCode: 201,
    };

    const event: APIGatewayProxyEvent = { httpMethod: "POST" } as any;
    const actualResult = await handler(event, {});

    // Assert
    expect(actualResult).toEqual(expectedResult);
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
