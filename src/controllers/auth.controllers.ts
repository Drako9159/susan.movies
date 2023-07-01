import { loginAdmin } from "../middleware/handleJWT";
import { getHash, getSalt } from "../utils/handleCrypt";
import handleError from "../utils/handleError";
import { Request, Response } from "express";
import axios from "axios";

export async function cryptController(
  req: Request,
  res: Response
): Promise<Response> {
  try {
    async function api() {
      const url =
        "https://delivery443.akamai-video-content.com/hls2/01/10511/5d51sf99lji8_l/index-v1-a1.m3u8?t=GSUyauSqoLJLvSpBbqCVhGO9meIJnp663YTDgrUwNRQ&s=1688236069&e=10800&f=52555631&srv=sto220&client=189.193.230.248&asn=13999";
      const url2 =
        "https://delivery117.akamai-video-content.com/hls2/01/12407/7kumnlsjz9f8_n/index-v1-a1.m3u8?t=SLdkxCXbCLOJM4VqtyzrMI4u784rwc0tcTokpKFLJh8&s=1688236107&e=10800&f=65121570&srv=sto152&client=189.193.230.248&asn=13999";
      // try {
      //   const response = await axios.get(url2);

      //   if(response.status === 200) console.log("pass", response.status)
      //   if(response.status !== 200) console.log("error", response.status)

      // } catch (error) {
      //   // console.error("Error:", error);
      //   console.log("Error", error.status)

      // }
      const response = await axios
        .get(url)
        .then((res) => console.log(res.status))
        .catch((res) => console.log(res.response.status));
    }
    api();

    const { value }: any = req.body;
    if (!value) return handleError(res, "VALUE_IS_REQUIRED", 400);

    const salt: string = await getSalt(12);
    const hash: string = await getHash(value, salt);
    return res.send({ hash: hash });
  } catch (error) {
    return handleError(res, "ERROR_GENERATING_HASH", 500);
  }
}

export async function loginController(
  req: Request,
  res: Response
): Promise<Response> {
  try {
    const { user, password }: any = req.body;
    if (!user || !password) return handleError(res, "NOT_PAYLOAD_DATA", 400);
    if (!(await loginAdmin(user, password)))
      return handleError(res, "USER_UNAUTHORIZED", 401);
    const token: string | boolean = await loginAdmin(user, password);
    return (
      res
        .cookie("token", token)
        // .header("Access-Control-Allow-Origin", "*")
        .header("Access-Control-Allow-Credentials", `${true}`)
        .header("Content-Type", "application/json; charset=utf-8")
        .header("authorization", `${token}`)
        .send({ token: token })
    );
  } catch (error) {
    return handleError(res, "ERROR_LOGIN_USER", 500);
  }
}
