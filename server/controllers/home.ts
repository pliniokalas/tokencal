import { db } from "../database/controller";

// ================================================== 

export async function getHome(req: any, res: any) {
  try {
    await db.findOne("user", { id: "i dunno man" });
    return res.status(200).end();

  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
}
