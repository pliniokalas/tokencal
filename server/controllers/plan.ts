import { db } from "../database/controller";

// ================================================== 

type CreateBody = {
  name: string,
  desc: string,
  start: Date,
  end: Date,
  userId: string,
  planList: Array<string>
};

export async function createPlan(req: { body: CreateBody }, res: any) {
  const { name, desc, start, end, userId, planList } = req.body;

  const newPlan = { 
    id: `plan-${name}-${+(new Date())}`,
    name,
    desc,
    start,
    end
  };

  const user = {
    id: userId,
    planList: planList.concat(newPlan.id)
  };

  try {
    await db.update("user", user);
    await db.create("plan", newPlan);
    return res.status(201).end();

  } catch (error) {
    return res.status(409).json({ error: error.message });
  }
}

type TPlan = {
  id: string,
  name: string,
  desc: string,
  start: Date,
  end: Date,
};

export async function updatePlan(req: { body: TPlan }, res: any) {
  try {
    await db.update("plan", req.body);
    return res.status(200).end();

  } catch (error) {
    return res.status(409).json({ error: error.message });
  }
}

type DeleteBody = {
  planId: string,
  userId: string,
  planList: Array<string>,
}

export async function deletePlan(req: { body: DeleteBody }, res: any) {
  const { planId, userId, planList } = req.body;
  const user = {
    id: userId,
    planList: planList.filter(item => item !== planId)
  } 

  try {
    await db.delete("plan", planId);
    await db.update("user", user);
    res.status(200).end();

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
