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
    const filePath = path.resolve(__dirname, "files", `${req.query.id}.jpg`);

    if (!fs.existsSync(filePath)) {
      return res.send("");
    }

    const file = fs.readFileSync(filePath);
    const data = `data:image/png;base64,` + file.toString("base64");
    return res.json(data);
  },
};

export default drawingController;
