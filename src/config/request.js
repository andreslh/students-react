// eslint-disable-next-line no-undef
const dev = process.env.NODE_ENV !== "production";

const server = dev ? "http://localhost:3001" : "https://theserver.com";

export async function request(
  url,
  config = {
    method: "GET",
    body: undefined,
  }
) {
  const { method, body } = config;
  const response = await fetch(`${server}/api/${url}`, {
    method,
    body,
  });
  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return response.status !== 204 ? await response.json() : response;
}

export default request;
