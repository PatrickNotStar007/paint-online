import fs from "fs";
import path from "path";

import type { Request, Response } from "express";

const currentDir = process.cwd();
const __dirname = path.join(currentDir);

const drawingController = {
  postImage(req: Request, res: Response) {
    const data = req.body.img.replace(`data:image/png;base64,`, "");

    fs.writeFileSync(
      path.resolve(__dirname, "files", `${req.query.id}.jpg`),
      data,
      "base64"
    );

    return res.status(200).json({ message: "Загружено" });
  },

  getImage(req: Request, res: Response) {
    // try {

    const file = fs.readFileSync(
      path.resolve(__dirname, "files", `${req.query.id}.jpg`)
    );
    const data = `data:image/png;base64,` + file.toString("base64");
    res.json(data);
    // } catch (e) {
    // console.log(e);
    // return res.status(500).json("error");
    // }
  },
};

export default drawingController;
