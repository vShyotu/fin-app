import { rest } from "msw";
import { b64_to_utf8 } from "../utils/base64";

export const handlers = [
  rest.post("/login", (req, res, ctx) => {
    const authorizationHeader = req.headers.get("Authorization");

    if (!authorizationHeader) {
      return res(ctx.status(401));
    }

    const authorizationHeaderArgs = authorizationHeader.split(" ");

    if (authorizationHeaderArgs[0] !== "Basic") {
      return res(ctx.status(401));
    }

    const userpassBase64 = authorizationHeaderArgs[1];
    const [userBase64, passBase64] = userpassBase64.split(":");
    const user = b64_to_utf8(userBase64);
    const pass = b64_to_utf8(passBase64);

    if (user.toLowerCase() === "test" && pass === "Test123!") {
      return res(
        ctx.status(200),
        ctx.json({ accessToken: "12345", refreshToken: "ABCDE" })
      );
    }

    return res(ctx.status(401));
  }),
  rest.post("/user", (req, res, ctx) => {
    const { headers } = req;
    const authorizationHeader = headers.get("Authorization");

    const authorizationHeaderArgs = authorizationHeader.split(" ");
    if (authorizationHeaderArgs[0] !== "Bearer") {
      return res(ctx.status(401));
    }

    if (authorizationHeaderArgs[1] === "12345") {
      return res(ctx.status(200), ctx.json({ name: "Grant" }));
    }

    return res(ctx.status(401));
  }),
];
