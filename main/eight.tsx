"use client";
import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import type { Totals } from "@/main/first"; // reuse the shared Totals type

type ThirdProps = { onTotalsChange?: (t: Totals) => void };

const Eight: React.FC<ThirdProps> = ({ onTotalsChange }) => {
  const [calculations, setCalculations] = useState([
    { id: 1, x: "", y: "", quantity: "0" },
  ]);

  const addCalculation = () => {
    const newId =
      calculations.length === 0
        ? 1
        : Math.max(...calculations.map((c) => c.id)) + 1;
    setCalculations((prev) => [
      ...prev,
      { id: newId, x: "", y: "", quantity: "0" },
    ]);
  };

  const removeCalculation = (id: number) => {
    if (calculations.length > 1) {
      setCalculations((prev) => prev.filter((c) => c.id !== id));
    }
  };

  const handleXChange = (
    id: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const v = e.target.value;
    if (v === "" || (Number(v) >= 0 && Number(v) <= 99)) {
      setCalculations((prev) =>
        prev.map((c) => (c.id === id ? { ...c, x: v } : c))
      );
    }
  };

  const handleYChange = (
    id: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const v = e.target.value;
    if (v === "" || (Number(v) >= 0 && Number(v) <= 99)) {
      setCalculations((prev) =>
        prev.map((c) => (c.id === id ? { ...c, y: v } : c))
      );
    }
  };

  const handleQuantityChange = (
    id: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const v = e.target.value;
    if (v === "" || Number(v) >= 0) {
      setCalculations((prev) =>
        prev.map((c) => (c.id === id ? { ...c, quantity: v } : c))
      );
    }
  };

  // ---------- Third model (adjust as needed) ----------
  // Example differences from First:
  // - gr uses different weights
  // - mek multiplies quantity by 3
  // - basePrice has a different fixed cost
  const getResults = (c: { x: string; y: string; quantity: string }) => {
    const x = c.x === "" ? 0 : Number(c.x);
    const y = c.y === "" ? 0 : Number(c.y);
    const quantity = c.quantity === "" ? 0 : Number(c.quantity);

    const gr = x * 10 + y * 7;
    const kv = x * y;
    const mek = quantity * 2;
    const basePrice = gr * 55 + kv * 52 + 700;
    const price = basePrice * quantity;

    return { gr, kv, mek, price };
  };

  const totals: Totals = useMemo(() => {
    return calculations.reduce(
      (tot, c) => {
        const r = getResults(c);
        const quantity = c.quantity === "" ? 0 : Number(c.quantity);
        return {
          totalGr: r.gr * quantity + tot.totalGr,
          totalKv: r.kv * quantity + tot.totalKv,
          totalMek: tot.totalMek + r.mek,
          totalPrice: tot.totalPrice + r.price,
          totalQuantity: tot.totalQuantity + quantity,
        };
      },
      { totalGr: 0, totalKv: 0, totalMek: 0, totalPrice: 0, totalQuantity: 0 }
    );
  }, [calculations]);

  const { totalGr, totalKv, totalMek, totalPrice } = totals;
  useEffect(() => {
    onTotalsChange?.(totals);
  }, [totalGr, totalKv, totalMek, totalPrice, onTotalsChange, totals]);

  return (
    <div className="p-4">
      {calculations.map((c, i) => {
        const r = getResults(c);
        const quantity = Number(c.quantity) || 0;

        return (
          <div key={c.id} className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-lg">
                გამოთვლა {i + 1} (Third)
              </h3>
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
                className="w-16 h-10 text-center border rounded p-2"
              />
              <div className="flex flex-col items-center">
                <Image
                  src="/8.png"
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

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">რაოდ:</label>
              <input
                type="number"
                value={c.quantity}
                onChange={(e) => handleQuantityChange(c.id, e)}
                placeholder="რაოდენობა"
                className="w-24 text-center border rounded p-2"
                min="0"
              />
            </div>

            <div className="bg-gray-50 dark:bg-white p-4 rounded border dark:border-gray-200 dark:text-gray-900 w-full sm:w-[580px] min-w-[330px] ml-2">
              <div className="mb-2">
                გრ სრული: {r.gr * quantity}, 1 ცალი - {r.gr}
              </div>
              <div className="mb-2">
                კვ სრული: {(r.kv * quantity).toFixed(2)}, 1 ცალი - კვ:{" "}
                {r.kv.toFixed(2)}
              </div>
              <div className="mb-2">
                რაოდ: {c.quantity === "" ? 0 : Number(c.quantity)}
              </div>
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
        <div className="bg-gray-50 dark:bg-white p-4 rounded border dark:border-gray-200 dark:text-gray-900 w-full sm:w-[580px] min-w-[330px] ml-2">
          <h4 className="font-bold text-lg mb-3 text-blue-800">
            მთლიანი (Third):
          </h4>
          <div className="mb-2">მთლიანი გრ: {totals.totalGr}</div>
          <div className="mb-2">მთლიანი კვ: {totals.totalKv.toFixed(2)}</div>
          <div className="mb-2">მთლიანი რაოდ: {totals.totalQuantity}</div>
          <div className="mb-2">მთლიანი მექ: {totals.totalMek}</div>
          <div>მთლიანი ფასი: {totals.totalPrice} $</div>
        </div>
      )}
    </div>
  );
};

export default Eight;
