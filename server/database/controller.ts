import mongoose from "mongoose";
import { CONNECTION_URL } from "../secret";
import { User, Plan } from "./models";

// ==================================================  

type DBObj = {
  id?: string,
  name?: string,
  email?: string,
  planList?: Array<string>,

  desc?: string,
  start?: Date,
  end?: Date
};

// ==================================================  

async function connect() {
  return await mongoose.connect(CONNECTION_URL, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  });
}

async function findOne(schema: string, prop: any) {
  if (schema === "user" && prop) {
    return await User.findOne(prop);
  }

  if (schema === "plan" && prop) {
    return await Plan.findOne(prop);
  }

  throw(new Error("Received wrong schema"));
}

async function findAll(planList: Array<string>) {
  return await Plan.find().where('id').in(planList);
}

async function create(schema: string, data: DBObj) {
  if (schema === "user") {
    return await User.create([data], { runValidators: true });
  }

  if (schema === "plan") {
    return await Plan.create([data], { runValidators: true });
  }

  throw(new Error("Received wrong schema"));
}

async function update(schema: string, data: DBObj) {
  if (schema === "user") {
    return await User.findOneAndUpdate({ _id: data.id }, data, { runValidators: true });
  }

  if (schema === "plan") {
    return await Plan.findOneAndUpdate({ id: data.id }, data, { runValidators: true });
  }

  throw(new Error("Received wrong schema"));
}

async function del(schema: string, id: string) {
  if (schema === "user") {
    return await User.findOneAndDelete({ id }, { runValidators: true });
  }

  if (schema === "plan") {
    return await Plan.findOneAndDelete({ id }, { runValidators: true });
  }

  throw(new Error("Received wrong schema"));
}

export const db = {
  connect,
  findOne,
  findAll,
  create,
  update,
  delete: del,
};

// ==================================================  

