import { Schema, Document, Model, model } from "mongoose";

// Plan ===========================================

interface IPlan extends Document {
  id: string,
  name: string,
  desc: string,
  start: Date,
  end: Date
}

const planSchema: Schema = new Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  desc: { type: String, required: true },
  start: { type: Date, required: true },
  end: { type: Date, required: true }
});

export { IPlan };
export const Plan: Model<IPlan> = model("Plan", planSchema);

// User ===========================================

interface IUser extends Document {
  id: string,
  name: string,
  email: string,
  password: string,
  planList: Array<string>, 
};

const userSchema: Schema = new Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, match: /.+\@.+\..+/ },
  password: { type: String, required: true },
  planList: { type: Array, required: true },
});

export { IUser };
export const User: Model<IUser> = model("User", userSchema);
