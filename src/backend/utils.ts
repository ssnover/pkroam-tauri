export function game_name_from_game_id(id: number): string {
  if (id === 0) {
    return "Pokemon Ruby";
  } else if (id === 1) {
    return "Pokemon Sapphire";
  } else if (id === 2) {
    return "Pokemon Emerald";
  } else if (id === 3) {
    return "Pokemon FireRed";
  } else if (id === 4) {
    return "Pokemon LeafGreen";
  } else {
    return "Unknown Game";
  }
}
