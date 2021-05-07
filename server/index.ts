import express from "express";
import { db } from "./database/controller";

import homeRoutes from "./routes/home";
import planRoutes from "./routes/plan";
import userRoutes from "./routes/user";

// ================================================== 

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(express.static(__dirname + "/public"));

app.use("/", userRoutes);
app.use("/home", homeRoutes);
app.use("/plan", planRoutes);

// ================================================== 

const PORT = process.env.PORT || 8000;
db.connect()
  .then(() =>
    app.listen(PORT, () => console.log("Listening in port: " + PORT))
  )
  .catch((error: Error) => console.log(error));

// ================================================== 

