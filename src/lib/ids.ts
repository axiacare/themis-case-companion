export function genCaseProtocol(): string {
  const d = new Date();
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `THE-${yyyy}${mm}${dd}-${rand}`;
}

export function genTeamRecord(teamId: string): string {
  const yyyy = new Date().getFullYear();
  const seq = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `${teamId}-${yyyy}-${seq}`;
}