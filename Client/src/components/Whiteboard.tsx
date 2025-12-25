import React, { useRef, useState, useEffect } from "react";
import { Button } from "./ui/Button";
import { Eraser, Pencil, Trash2, Undo } from "lucide-react";

export const Whiteboard = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState("#000000");
  const [tool, setTool] = useState<"pencil" | "eraser">("pencil");

  // Initialize Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.lineWidth = 3;
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, canvas.width, canvas.height); // White background
      }
    }
  }, []);

  const startDrawing = (e: React.MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.beginPath();
    ctx.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    setIsDrawing(true);
  };

  const draw = (e: React.MouseEvent) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.strokeStyle = tool === "eraser" ? "#ffffff" : color;
    ctx.lineWidth = tool === "eraser" ? 20 : 3;
    ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
    }
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-xl overflow-hidden border border-gray-200">
      {/* Toolbar */}
      <div className="p-2 border-b border-gray-200 flex items-center justify-between bg-gray-50">
        <div className="flex gap-2">
          <button
            onClick={() => setTool("pencil")}
            className={`p-2 rounded hover:bg-gray-200 ${
              tool === "pencil"
                ? "bg-white shadow-sm text-primary"
                : "text-gray-500"
            }`}
          >
            <Pencil size={18} />
          </button>
          <button
            onClick={() => setTool("eraser")}
            className={`p-2 rounded hover:bg-gray-200 ${
              tool === "eraser"
                ? "bg-white shadow-sm text-primary"
                : "text-gray-500"
            }`}
          >
            <Eraser size={18} />
          </button>

          <div className="w-px h-6 bg-gray-300 mx-1"></div>

          <div className="flex items-center gap-1">
            {["#000000", "#EF4444", "#3B82F6", "#10B981"].map((c) => (
              <button
                key={c}
                onClick={() => {
                  setColor(c);
                  setTool("pencil");
                }}
                className={`w-5 h-5 rounded-full border border-gray-200 ${
                  color === c && tool === "pencil"
                    ? "ring-2 ring-offset-1 ring-gray-400"
                    : ""
                }`}
                style={{ backgroundColor: c }}
              />
            ))}
          </div>
        </div>

        <button
          onClick={clearCanvas}
          className="p-2 text-red-500 hover:bg-red-50 rounded"
        >
          <Trash2 size={18} />
        </button>
      </div>

      {/* Canvas Area */}
      <div className="flex-1 relative cursor-crosshair">
        <canvas
          ref={canvasRef}
          className="w-full h-full block"
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
        />
      </div>
    </div>
  );
};
