export const URLs = {
  COMPONENTS_TYPES: `component/all-types`,
  BUILD_FLOW: `flow/build`,
  BUILD_FLOW_STREAM_RESP: `flow/build/stream`,
} as const;

export function getURL(key: keyof typeof URLs, params: any = {}) {
  let url = URLs[key];
  Object.keys(params).forEach((key) => (url += `/${params[key]}`));
  return `${url.toString()}`;
}

export type URLsType = typeof URLs;
