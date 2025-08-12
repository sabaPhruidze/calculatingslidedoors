"use client";
import React, { useCallback, useMemo, useState } from "react";
import First, { Totals } from "@/main/first";
import Second from "@/main/second";
import Third from "@/main/third";
import Fourth from "@/main/fourth";
import Five from "@/main/five";
import Six from "@/main/six";
import Seven from "@/main/seven";
import Eight from "@/main/eight";
import Nine from "@/main/nine";
import Ten from "@/main/ten";

export default function Home() {
  const [firstTotals, setFirstTotals] = useState<Totals | null>(null);
  const [secondTotals, setSecondTotals] = useState<Totals | null>(null);
  const [thirdTotals, setThirdTotals] = useState<Totals | null>(null);
  const [fourthTotals, setFourthTotals] = useState<Totals | null>(null);
  const [fifthTotals, setFifthTotals] = useState<Totals | null>(null);
  const [sixthTotals, setSixthTotals] = useState<Totals | null>(null);
  const [seventhTotals, setSeventhTotals] = useState<Totals | null>(null);
  const [eighthTotals, setEighthTotals] = useState<Totals | null>(null);
  const [ninthTotals, setNinthTotals] = useState<Totals | null>(null);
  const [tenthTotals, setTenthTotals] = useState<Totals | null>(null);

  const handleFirstTotals = useCallback((t: Totals) => setFirstTotals(t), []);
  const handleSecondTotals = useCallback((t: Totals) => setSecondTotals(t), []);
  const handleThirdTotals = useCallback((t: Totals) => setThirdTotals(t), []);
  const handleFourthTotals = useCallback((t: Totals) => setFourthTotals(t), []);
  const handleFifthTotals = useCallback((t: Totals) => setFifthTotals(t), []);
  const handleSixthTotals = useCallback((t: Totals) => setSixthTotals(t), []);
  const handleSeventhTotals = useCallback(
    (t: Totals) => setSeventhTotals(t),
    []
  );
  const handleEighthTotals = useCallback((t: Totals) => setEighthTotals(t), []);
  const handleNinthTotals = useCallback((t: Totals) => setNinthTotals(t), []);
  const handleTenthTotals = useCallback((t: Totals) => setTenthTotals(t), []);

  const grand = useMemo(() => {
    if (
      !firstTotals ||
      !secondTotals ||
      !thirdTotals ||
      !fourthTotals ||
      !fifthTotals ||
      !sixthTotals ||
      !seventhTotals ||
      !eighthTotals ||
      !ninthTotals ||
      !tenthTotals
    ) {
      return null;
    }
    return {
      totalGr:
        firstTotals.totalGr +
        secondTotals.totalGr +
        thirdTotals.totalGr +
        fourthTotals.totalGr +
        fifthTotals.totalGr +
        sixthTotals.totalGr +
        seventhTotals.totalGr +
        eighthTotals.totalGr +
        ninthTotals.totalGr +
        tenthTotals.totalGr,
      totalKv:
        firstTotals.totalKv +
        secondTotals.totalKv +
        thirdTotals.totalKv +
        fourthTotals.totalKv +
        fifthTotals.totalKv +
        sixthTotals.totalKv +
        seventhTotals.totalKv +
        eighthTotals.totalKv +
        ninthTotals.totalKv +
        tenthTotals.totalKv,
      totalMek:
        firstTotals.totalMek +
        secondTotals.totalMek +
        thirdTotals.totalMek +
        fourthTotals.totalMek +
        fifthTotals.totalMek +
        sixthTotals.totalMek +
        seventhTotals.totalMek +
        eighthTotals.totalMek +
        ninthTotals.totalMek +
        tenthTotals.totalMek,
      totalPrice:
        firstTotals.totalPrice +
        secondTotals.totalPrice +
        thirdTotals.totalPrice +
        fourthTotals.totalPrice +
        fifthTotals.totalPrice +
        sixthTotals.totalPrice +
        seventhTotals.totalPrice +
        eighthTotals.totalPrice +
        ninthTotals.totalPrice +
        tenthTotals.totalPrice,
    };
  }, [
    firstTotals,
    secondTotals,
    thirdTotals,
    fourthTotals,
    fifthTotals,
    sixthTotals,
    seventhTotals,
    eighthTotals,
    ninthTotals,
    tenthTotals,
  ]);

  return (
    <div className="space-y-8 p-4">
      <First onTotalsChange={handleFirstTotals} />
      <Six onTotalsChange={handleSixthTotals} />
      <Second onTotalsChange={handleSecondTotals} />
      <Seven onTotalsChange={handleSeventhTotals} />
      <Third onTotalsChange={handleThirdTotals} />
      <Eight onTotalsChange={handleEighthTotals} />
      <Fourth onTotalsChange={handleFourthTotals} />
      <Nine onTotalsChange={handleNinthTotals} />
      <Five onTotalsChange={handleFifthTotals} />
      <Ten onTotalsChange={handleTenthTotals} />

      {grand && (
        <div className="border p-4 rounded bg-green-50">
          <h2 className="font-bold mb-2 text-lg">
            ჯამური მონაცემები (1+2+3+4+5+6+7+8+9+10)
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
