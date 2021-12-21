import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { DocumentClient } from "aws-sdk/clients/dynamodb";

const dynamoDB = new DocumentClient();
const ANNOUNCEMENT_APP_TABLE_NAME = process.env
  .ANNOUNCEMENT_APP_TABLE as string;

function getErrorResponse(statusCode: number, errorMessage: string) {
  return { statusCode, body: JSON.stringify({ message: errorMessage }) };
}

async function getAnnouncements(): Promise<APIGatewayProxyResult> {
  const params: DocumentClient.ScanInput = {
    TableName: ANNOUNCEMENT_APP_TABLE_NAME,
  };
  try {
    const data = await dynamoDB.scan(params).promise();
    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (err) {
    console.log(err);
    return getErrorResponse(500, err as string);
  }
}

async function addAnnouncement(
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> {
  const requestBody = JSON.parse(event.body as string);
  const { author, text } = requestBody;

  if (!author || !text) {
    return getErrorResponse(400, "'author' and 'text' fields are required!");
  } else if (author.length > 100) {
    return getErrorResponse(
      400,
      "Author's name shouldn't be longer than 100 chars"
    );
  } else if (text.length > 200) {
    return getErrorResponse(
      400,
      "Announcement shouldn't be longer than 200 chars"
    );
  }

  const dtUTC = new Date().toISOString().slice(0, 19).replace("T", " ");

  try {
    const params = {
      TableName: ANNOUNCEMENT_APP_TABLE_NAME,
      Item: {
        id: Date.now(),
        publishedAt: dtUTC,
        author,
        text,
      },
    };
    await dynamoDB.put(params).promise();
    return {
      statusCode: 201,
      body: JSON.stringify(params.Item),
    };
  } catch (err) {
    console.log(err);
    return getErrorResponse(500, err as string);
  }
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
    return addAnnouncement(event);
  }

  // OTHER METHODS
  else {
    return {
      statusCode: 405,
      body: "Method not allowed or missing from the event!",
    };
  }
}
