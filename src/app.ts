import "dotenv/config";

import express, { NextFunction, Request, Response } from "express";
import logger from "morgan";
import mongoose from "mongoose";
import createHttpError from "http-errors";
import { CustomError } from "./types";

import postRouter from "./routes/post_routes";

const app = express();

const mongo_uri = process.env.MONGO_URI;
const port = process.env.PORT || 5000;

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/posts", postRouter);

// catch 404 and forward to error handler
app.all("*", (req: Request, res: Response, next: NextFunction) => {
  next(createHttpError(404));
});

// error handler

app.use(function (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  // set locals, only providing error in development

  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.status(err.status || 500).json({ message: err.message });
});

async function main() {
  try {
    await mongoose.connect(mongo_uri!);
    app.listen(port, () => console.log(`server running on port:${port}`));
  } catch (error) {
    console.log(error);
  }
}
main();
