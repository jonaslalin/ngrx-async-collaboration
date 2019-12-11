export const services = ['A', 'B', 'C', 'D'] as const;

export type Service = typeof services[number];

export function servicesReduce<T>(fn: (service: Service) => T) {
  return services.reduce(
    (res, service) => ({ ...res, [service]: fn(service) }),
    {}
  ) as { [S in Service]: T };
}
