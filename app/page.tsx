"use client";
import React, { useCallback, useMemo, useState } from "react";
import First, { Totals } from "@/main/first";
import Second from "@/main/second";
import Third from "@/main/third";
import Fourth from "@/main/fourth";
import Five from "@/main/five";

export default function Home() {
  const [firstTotals, setFirstTotals] = useState<Totals | null>(null);
  const [secondTotals, setSecondTotals] = useState<Totals | null>(null);
  const [thirdTotals, setThirdTotals] = useState<Totals | null>(null);
  const [fourthTotals, setFourthTotals] = useState<Totals | null>(null);
  const [fifthTotals, setFifthTotals] = useState<Totals | null>(null);

  const handleFirstTotals = useCallback((t: Totals) => setFirstTotals(t), []);
  const handleSecondTotals = useCallback((t: Totals) => setSecondTotals(t), []);
  const handleThirdTotals = useCallback((t: Totals) => setThirdTotals(t), []);
  const handleFourthTotals = useCallback((t: Totals) => setFourthTotals(t), []);
  const handleFifthTotals = useCallback((t: Totals) => setFifthTotals(t), []);

  const grand = useMemo(() => {
    if (
      !firstTotals ||
      !secondTotals ||
      !thirdTotals ||
      !fourthTotals ||
      !fifthTotals
    ) {
      return null;
    }
    return {
      totalGr:
        firstTotals.totalGr +
        secondTotals.totalGr +
        thirdTotals.totalGr +
        fourthTotals.totalGr +
        fifthTotals.totalGr,
      totalKv:
        firstTotals.totalKv +
        secondTotals.totalKv +
        thirdTotals.totalKv +
        fourthTotals.totalKv +
        fifthTotals.totalKv,
      totalMek:
        firstTotals.totalMek +
        secondTotals.totalMek +
        thirdTotals.totalMek +
        fourthTotals.totalMek +
        fifthTotals.totalMek,
      totalPrice:
        firstTotals.totalPrice +
        secondTotals.totalPrice +
        thirdTotals.totalPrice +
        fourthTotals.totalPrice +
        fifthTotals.totalPrice,
    };
  }, [firstTotals, secondTotals, thirdTotals, fourthTotals, fifthTotals]);

  return (
    <div className="space-y-8 p-4">
      <First onTotalsChange={handleFirstTotals} />
      <Second onTotalsChange={handleSecondTotals} />
      <Third onTotalsChange={handleThirdTotals} />
      <Fourth onTotalsChange={handleFourthTotals} />
      <Five onTotalsChange={handleFifthTotals} />

      {grand && (
        <div className="border p-4 rounded bg-green-50">
          <h2 className="font-bold mb-2 text-lg">
            ჯამური მონაცემები (1+2+3+4+5)
          </h2>
          <p>გრ: {grand.totalGr}</p>
          <p>კვ: {grand.totalKv.toFixed(2)}</p>
          <p>მექ: {grand.totalMek}</p>
          <p>ფასი: {grand.totalPrice} $</p>
        </div>
      )}
    </div>
  );
}
