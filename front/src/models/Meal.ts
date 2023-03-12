export const mealTypes: Record<string, string> = {
  breakfast: '🥐 Petit déjeuner',
  lunch: '🍲 Déjeuner',
  dinner: '🥗 Dîner',
  snack: '🍪 En-cas',
}

export interface IMeal {
  id: number
  name: string
}
