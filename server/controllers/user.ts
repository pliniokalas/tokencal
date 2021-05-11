import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { TOKEN_SECRET } from "../secret";
import { db } from "../database/controller";
import { IUser } from "../database/models";

// ================================================== 

export function getLanding(req: any, res: any) {
  return res.status(200).end();
}

type RegisterBody = {
  name: string,
  email: string,
  password: string
}

export async function register(req: { body: RegisterBody }, res: any) {
  const { name, email, password } = req.body;

  try {
    const newUser = { 
      id: `user-${email}-${+(new Date())}`,
      name,
      email,
      password: await bcrypt.hash(password, 10), 
      planList: [], 
    }

    await db.create("user", newUser);
    login({ body: { email, password } }, res);
    // return res.status(200).json({ plans: [], planList: [], userId: resp._id });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

type LoginBody = {
  email: string,
  password: string
}

export async function login(req: { body: LoginBody }, res: any) {
  const { email, password } = req.body;

  try {
    const user = <IUser> (await db.findOne("user", { email }));

    if (!user) {
      throw(new Error("User not found!"));
    }

    if (! await bcrypt.compare(password, user.password)) {
      throw(new Error("Wrong password!"));
    }

    const token = jwt.sign({ userId: user._id }, TOKEN_SECRET as string);

    const plans = await db.findAll(user.planList);
    return res.status(200).json({ 
      planList: user.planList, 
      plans,
      name: user.name,
      userId: user._id,
      token
    });

  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
}
