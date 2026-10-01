import { APP } from "./config";

export function formatMoney(value: number | null | undefined) {
  return new Intl.NumberFormat(APP.locale, {
    style: "currency",
    currency: APP.moneda,
    maximumFractionDigits: 0,
  }).format(value ?? 0);
}

export function formatNumber(value: number | null | undefined) {
  return new Intl.NumberFormat(APP.locale).format(value ?? 0);
}

export function formatDate(value: string | Date | null | undefined) {
  if (!value) return "—";
  return new Intl.DateTimeFormat(APP.locale, {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}
