import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { DocumentClient } from "aws-sdk/clients/dynamodb";

const dynamoDB = new DocumentClient();

const getErrorResponse = (errorMessage: string) => {
  return { statusCode: 500, body: JSON.stringify({ message: errorMessage }) };
};

export async function getAnnouncements(): Promise<APIGatewayProxyResult> {
  const params: DocumentClient.ScanInput = {
    TableName: process.env.ANNOUNCEMENT_APP_TABLE as string,
  };
  try {
    const data = await dynamoDB.scan(params).promise();
    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (err) {
    console.log(err);
    return getErrorResponse(err as string);
  }
}

export function addAnnouncement(): APIGatewayProxyResult {
  return {
    statusCode: 201,
    body: "Adding announcement to DynamoDB...",
  };
}

export async function handler(
  event: APIGatewayProxyEvent,
  {} // context
): Promise<APIGatewayProxyResult> {
  // GET request
  if (event.httpMethod == "GET") {
    return getAnnouncements();
  }

  // POST request
  else if (event.httpMethod == "POST") {
    return addAnnouncement();
  }

  // OTHER METHODS
  else {
    return {
      statusCode: 405,
      body: "Method not allowed or missing from the event!",
    };
  }
}
