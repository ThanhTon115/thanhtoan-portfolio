export const extractSubRoute = (routeName: string, prefix: string): string =>
  routeName.replace(`/${prefix}/`, "");
