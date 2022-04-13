const dev = process.env.NODE_ENV !== 'production';

const server = dev ? 'http://localhost:3001' : 'https://theserver.com';

export async function request(url) {
  const response = await fetch(`${server}/api/${url}`);
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return await response.json();
};

export default request;
