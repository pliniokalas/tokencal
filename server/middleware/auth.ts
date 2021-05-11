import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../secret";

// ================================================== 

export async function auth(req: any, res: any, next: any) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw(new Error("Request is missing authorization header"));
    }

    const token = authHeader.split(" ")[1];
    const decodedToken = jwt.verify(token, TOKEN_SECRET as string);
    const { userId } = decodedToken as { userId: string }; 

    if (req.body.userId && req.body.userId !== userId) {
      throw(new Error("Unauthorized"));
    } 

    next();

  } catch (error) {
    console.log(error);
    return res.status(401).json({ error: error.message });
  }
}
