import type { Unit } from "@/types/product";

export function toBanglaNumber(value: number | string) {
  const digits = "০১২৩৪৫৬৭৮৯";

  return String(value).replace(/\d/g, (digit) => {
    return digits[Number(digit)];
  });
}

export function formatPrice(value: number) {
  const formattedPrice = value.toLocaleString("en-US");

  return `${toBanglaNumber(formattedPrice)} টাকা`;
}

export function formatPercentage(value: number) {
  return toBanglaNumber(Math.abs(value));
}

export function getUnitLabel(unit: Unit) {
  const unitLabels: Record<Unit, string> = {
    kg: "প্রতি কেজি",
    litre: "প্রতি লিটার",
    dozen: "প্রতি ডজন",
    piece: "প্রতি পিস",
  };

  return unitLabels[unit] ?? unit;
}

export function changeClass(dir: string) {
  return dir === "up"
    ? "text-red-600 bg-red-50"
    : "text-green-700 bg-green-50";
}
