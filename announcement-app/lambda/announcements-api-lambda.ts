import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

const getErrorResponse = (errorMessage: string) => {
  return { statusCode: 500, body: JSON.stringify({ message: errorMessage }) };
};

export function getAnnouncements(): APIGatewayProxyResult {
  return {
    statusCode: 200,
    body: "Getting announcements from DynamoDB...",
  };
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
