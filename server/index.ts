import express from "express";
import cors from "cors";

import { db } from "./database/controller";

import planRoutes from "./routes/plan";
import userRoutes from "./routes/user";

// ================================================== 

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(express.static(__dirname + "/public"));

app.use(cors());

app.use("/", userRoutes);
app.use("/plan", planRoutes);

// ================================================== 

const PORT = process.env.PORT || 8000;
db.connect()
  .then(() =>
    app.listen(PORT, () => console.log("Listening in port: " + PORT))
  )
  .catch((error: Error) => console.log(error));

// ================================================== 

