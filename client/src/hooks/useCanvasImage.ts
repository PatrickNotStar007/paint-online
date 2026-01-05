import axios from "axios";
import { useEffect } from "react";
import canvasState from "../store/canvasState.ts";

export const useCanvasImage = (
  canvasRef: React.RefObject<HTMLCanvasElement | null>,
  sessionId: string | undefined
) => {
  useEffect(() => {
    if (!canvasRef || !sessionId) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    canvasState.setCanvas(canvas);

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    try {
      axios
        .get(`http://localhost:5000/image?id=${sessionId}`)
        .then((response) => {
          const img = new Image();
          img.src = response.data;
          img.onload = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          };
        });
    } catch (e) {
      console.log("Ошибка получения изображения:", e);
    }
  }, [canvasRef.current, sessionId]);

  const saveImage = () => {
    const canvas = canvasRef.current;
    if (!canvas) throw Error("Не удалось получить канвас");
    if (!canvasRef || !sessionId) return;
    try {
      axios
        .post(`http://localhost:5000/image?id=${sessionId}`, {
          img: canvas.toDataURL(),
        })
        .then((response) => console.log(response.data));
    } catch (e) {
      console.log("Ошибка сохранения изображения:", e);
    }
  };

  return { saveImage };
};
