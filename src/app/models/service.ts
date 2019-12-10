export const services = ['A', 'B', 'C', 'D'] as const;

export type Service = typeof services[number];
