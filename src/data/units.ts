export const unitTypes = [
  "Economy",
  "Premium",
  "Business",
  "First",
  "Capsules",
];

export const unitConfig = {
  Economy: { prefix: "E", maxUnits: 123 },
  Premium: { prefix: "P", maxUnits: 98 },
  Business: { prefix: "B", maxUnits: 20 },
  First: { prefix: "F", maxUnits: 10 },
  Capsules: { prefix: "C", maxUnits: 50 },
};

export function generateUnitNumber(unitType: string): string {
  const config = unitConfig[unitType as keyof typeof unitConfig];
  if (!config) return "E001";

  const number = Math.floor(Math.random() * config.maxUnits) + 1;
  return `${config.prefix}${String(number).padStart(3, "0")}`;
}
