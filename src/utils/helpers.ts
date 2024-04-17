export function formatCurrency(value: any, currency = "USD") {
  return new Intl.NumberFormat("en", {
    style: "currency",
    currency,
  }).format(value);
}

export function formatDate(dateStr: any) {
  if (!dateStr || isNaN(new Date(dateStr).getTime())) {
    console.error("Invalid date string:", dateStr);
    return "Invalid Date";
  }
  return new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(dateStr));
}
