import { jwtDecode } from "jwt-decode";

export const getRequestHeader = (
  event: any,
  field: string,
  source: string = "appsync"
): string => {
  let result = "";

  if (source === "appsync") result = event.request.headers[field];
  else if (source === "apiGateway") result = event.headers[field];
  else if (source === "lambda") result = event.headers[field];

  return result;
};

export const getDecodedToken = (event: any) => {
  const token = getAuthToken(event);

  return jwtDecode(token);
};

export const getAuthToken = (event: any) => {
  let token: string;

  const authorizationHeader =
    event?.headers?.Authorization ||
    event?.headers?.authorization ||
    event?.request?.headers?.Authorization ||
    event?.request?.headers?.authorization;

  if (authorizationHeader.includes("Bearer"))
    token = authorizationHeader.split("Bearer")[1];
  else token = authorizationHeader;

  // Cleanup white space
  token = token.replace(" ", "");

  return token;
};

export const sendHTTPSuccess = (body: any) => {
  return createResponse(200, body);
};

export const sendHTTPError = (body: any, code: number = 500) => {
  return createResponse(code, body);
};

const createResponse = (statusCode: number, body: any) => {
  const response = {
    statusCode: statusCode,
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
    },
  };
  return response;
};
