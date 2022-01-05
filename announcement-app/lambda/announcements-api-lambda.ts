import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { DocumentClient } from "aws-sdk/clients/dynamodb";

const dynamoDB = new DocumentClient();

const ANNOUNCEMENT_APP_TABLE_NAME = process.env
  .ANNOUNCEMENT_APP_TABLE as string;
const pk = "announcement";

function getErrorResponse(statusCode: number, errorMessage: string) {
  return { statusCode, body: JSON.stringify({ message: errorMessage }) };
}

async function getAnnouncements(): Promise<APIGatewayProxyResult> {
  const params: DocumentClient.QueryInput = {
    TableName: ANNOUNCEMENT_APP_TABLE_NAME,
    KeyConditionExpression: "pk = :pk",
    ExpressionAttributeValues: { ":pk": pk },
    ProjectionExpression: "sk, publishedAt, author, announcement",
    ScanIndexForward: false,
    Limit: 10,
  };
  try {
    const data = await dynamoDB.query(params).promise();
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
  const { author, announcement } = requestBody;

  if (!author || !announcement) {
    return getErrorResponse(
      400,
      "'author' and 'announcement' fields are required!"
    );
  } else if (author.length > 100) {
    return getErrorResponse(
      400,
      "Author's name shouldn't be longer than 100 chars"
    );
  } else if (announcement.length > 200) {
    return getErrorResponse(
      400,
      "Announcement shouldn't be longer than 200 chars"
    );
  }

  const dt = new Date();

  const timestamp = dt.getTime();
  const ttl = Math.floor(timestamp / 1000);
  const publishedAt = dt.toISOString().slice(0, 19).replace("T", " ");

  try {
    const params = {
      TableName: ANNOUNCEMENT_APP_TABLE_NAME,
      Item: {
        pk,
        sk: timestamp,
        ttl,
        publishedAt,
        author,
        announcement,
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
