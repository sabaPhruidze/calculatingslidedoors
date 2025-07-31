"use client";
import React, { useState } from "react";
import Image from "next/image";

const First = () => {
  const [x, setX] = useState("");
  const [y, setY] = useState("");

  // Handle input validation
  const handleXChange = (e: any) => {
    const value = e.target.value;
    if (value === "" || (Number(value) >= 0 && Number(value) <= 99)) {
      setX(value);
    }
  };

  const handleYChange = (e: any) => {
    const value = e.target.value;
    if (value === "" || (Number(value) >= 0 && Number(value) <= 99)) {
      setY(value);
    }
  };

  // Calculate formulas (use 0 if empty)
  const xValue = x === "" ? 0 : Number(x);
  const yValue = y === "" ? 0 : Number(y);
  const gr = xValue * 5 + yValue * 3;
  const kv = xValue * yValue;
  const mek = 1;
  const price = gr * 55 + kv * 52 + 350;

  return (
    <div className="p-4">
      <div className="flex flex-row items-center gap-4 mb-6">
        {/* left-side editable number (0-99) */}
        <input
          type="number"
          value={x}
          onChange={handleXChange}
          placeholder="x"
          className="w-16 text-center border rounded p-2"
        />

        {/* image + bottom-centered editable number */}
        <div className="flex flex-col items-center">
          <Image
            src="/1.png"
            alt="Description of image"
            width={500}
            height={300}
            priority
          />

          <input
            type="number"
            value={y}
            onChange={handleYChange}
            placeholder="y"
            className="w-16 mt-2 text-center border rounded p-2"
          />
        </div>
      </div>

      {/* Calculations display */}
      <div className="bg-gray-50 p-4 rounded border w-[580px] ml-2">
        <div className="mb-2">
          <span className="font-semibold">გრ:</span> {gr}
        </div>
        <div className="mb-2">
          <span className="font-semibold">კვ:</span> {kv.toFixed(2)}
        </div>
        <div className="mb-2">
          <span className="font-semibold">მექ:</span> {mek}
        </div>
        <div>
          <span className="font-semibold ">ფასი:</span> {price} <span>$</span>
        </div>
      </div>
    </div>
  );
};

export default First;
