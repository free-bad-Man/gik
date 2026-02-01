declare global {
  interface Window {
    ym: (id: number, method: string, ...args: any[]) => void;
  }
}

export {};
