"use client";
import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import type { Totals } from "@/main/first"; // same shared type (or copy it here)

type SecondProps = {
  onTotalsChange?: (t: Totals) => void;
};

const Second: React.FC<SecondProps> = ({ onTotalsChange }) => {
  const [calculations, setCalculations] = useState([{ id: 1, x: "", y: "" }]);

  /* ───────── helpers (unchanged) ───────── */
  const addCalculation = () => {
    const newId =
      calculations.length === 0
        ? 1
        : Math.max(...calculations.map((c) => c.id)) + 1;
    setCalculations([...calculations, { id: newId, x: "", y: "" }]);
  };

  const removeCalculation = (id: number) => {
    if (calculations.length > 1) {
      setCalculations(calculations.filter((c) => c.id !== id));
    }
  };

  const handleXChange = (
    id: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const v = e.target.value;
    if (v === "" || (Number(v) >= 0 && Number(v) <= 99)) {
      setCalculations(
        calculations.map((c) => (c.id === id ? { ...c, x: v } : c))
      );
    }
  };

  const handleYChange = (
    id: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const v = e.target.value;
    if (v === "" || (Number(v) >= 0 && Number(v) <= 99)) {
      setCalculations(
        calculations.map((c) => (c.id === id ? { ...c, y: v } : c))
      );
    }
  };

  const getResults = (c: { x: string; y: string }) => {
    const x = c.x === "" ? 0 : Number(c.x);
    const y = c.y === "" ? 0 : Number(c.y);
    const gr = x * 7 + y * 4; // <-- your formula
    const kv = x * y;
    const mek = 2;
    const price = gr * 55 + kv * 52 + 700;
    return { gr, kv, mek, price };
  };

  /* ───────── totals (memoised) ───────── */
  const totals: Totals = useMemo(() => {
    return calculations.reduce(
      (tot, c) => {
        const r = getResults(c);
        return {
          totalGr: tot.totalGr + r.gr,
          totalKv: tot.totalKv + r.kv,
          totalMek: tot.totalMek + r.mek,
          totalPrice: tot.totalPrice + r.price,
        };
      },
      { totalGr: 0, totalKv: 0, totalMek: 0, totalPrice: 0 }
    );
  }, [calculations]);

  /* ───────── notify parent only when values change ───────── */
  const { totalGr, totalKv, totalMek, totalPrice } = totals;
  useEffect(() => {
    onTotalsChange?.(totals);
  }, [totalGr, totalKv, totalMek, totalPrice, onTotalsChange]);

  /* ───────── UI (unchanged) ───────── */
  return (
    <div className="p-4">
      {calculations.map((c, i) => {
        const r = getResults(c);

        return (
          <div key={c.id} className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-lg">გამოთვლა {i + 1}</h3>
              {calculations.length > 1 && (
                <button
                  onClick={() => removeCalculation(c.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  ✕
                </button>
              )}
            </div>

            <div className="flex gap-4 mb-6">
              <input
                type="number"
                value={c.x}
                onChange={(e) => handleXChange(c.id, e)}
                placeholder="x"
                className="w-16 h-16 text-center border rounded p-2"
              />

              <div className="flex flex-col items-center">
                <Image
                  src="/1.png"
                  alt="Image"
                  width={500}
                  height={300}
                  priority
                />
                <input
                  type="number"
                  value={c.y}
                  onChange={(e) => handleYChange(c.id, e)}
                  placeholder="y"
                  className="w-16 mt-2 text-center border rounded p-2"
                />
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded border w-[580px] ml-2">
              <div className="mb-2">გრ: {r.gr}</div>
              <div className="mb-2">კვ: {r.kv.toFixed(2)}</div>
              <div className="mb-2">მექ: {r.mek}</div>
              <div>ფასი: {r.price} $</div>
            </div>
          </div>
        );
      })}

      <button
        onClick={addCalculation}
        className="bg-blue-500 text-white px-6 py-2 rounded mb-6"
      >
        + დამატება
      </button>

      {calculations.length > 1 && (
        <div className="bg-blue-50 p-4 rounded border w-[580px] ml-2 border-blue-200">
          <h4 className="font-bold text-lg mb-3 text-blue-800">მთლიანი:</h4>
          <div className="mb-2">მთლიანი გრ: {totals.totalGr}</div>
          <div className="mb-2">მთლიანი კვ: {totals.totalKv.toFixed(2)}</div>
          <div className="mb-2">მთლიანი მექ: {totals.totalMek}</div>
          <div>მთლიანი ფასი: {totals.totalPrice} $</div>
        </div>
      )}
    </div>
  );
};

export default Second;
