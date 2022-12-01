export function toFixed2(n: number): string {
  return (`${n}`.match(new RegExp(`^-?\\d+(?:\.\\d{0,2})?`)) as string[])[0];
}

export function getCurrencyPrice(data: any, currency: string): number {
  const price = parseFloat(data.bpi[currency].rate.replace(/,/g, "")).toFixed(
    2
  );
  return parseFloat(price);
}
