export const YANDEX_METRIKA_ID = Number(process.env.NEXT_PUBLIC_YANDEX_METRIKA_ID);

export function metrikaHit(url: string) {
  if (typeof window !== "undefined" && window.ym && YANDEX_METRIKA_ID) {
    window.ym(YANDEX_METRIKA_ID, "hit", url);
  }
}

export function metrikaReachGoal(targetName: string, params?: any) {
  if (typeof window !== "undefined" && window.ym && YANDEX_METRIKA_ID) {
    window.ym(YANDEX_METRIKA_ID, "reachGoal", targetName, params);
  }
}
