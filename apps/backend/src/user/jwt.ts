import { createHmac } from "node:crypto";

const JWT_SECRET = process.env.JWT_HMAC_SECRET;
if (!JWT_SECRET) {
  throw new Error("JWT secret not set. check your env vars");
}

export function makeJWT({
  id,
  name,
  role,
}: {
  id: string;
  name: string;
  role: "user" | "expert";
}) {
  const jwtHeader = {
    typ: "JWT",
    alg: "HS256",
  };

  const base64JwtHeader = Buffer.from(JSON.stringify(jwtHeader)).toString(
    "base64url",
  );

  const issuedAt = Math.floor(Date.now() / 1000);
  const jwtPayload = {
    sub: id,
    iat: issuedAt,
    exp: issuedAt + 15 * 60,
    name,
    role,
  };

  const base64JwtPayload = Buffer.from(JSON.stringify(jwtPayload)).toString(
    "base64url",
  );

  const jwtData = `${base64JwtHeader}.${base64JwtPayload}`;

  const base64JwtSignature = createHmac("sha256", JWT_SECRET as string)
    .update(jwtData)
    .digest("base64url");

  return `${jwtData}.${base64JwtSignature}`;
}
