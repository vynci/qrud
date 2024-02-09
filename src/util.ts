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
