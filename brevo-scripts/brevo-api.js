const BREVO_ENDPOINT = `https://api.brevo.com/v3`;

async function execute({ method, path, query = null, body = null }) {
  const url = new URL(BREVO_ENDPOINT + path);
  if (query) url.search = new URLSearchParams(query).toString();
  console.log(url.href);
  const response = await fetch(url.href, {
    method: method,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'api-key': process.env.BREVO_API_KEY,
    },
    body: body ? JSON.stringify(body) : null,
  });

  console.log(response.status);
  try {
    if (response.text) {
      const body = await response.text();
      try {
        return JSON.parse(body);
      } catch (e) {
        return response;
      }
    }
  } catch (e) {
    console.error(e);
    console.log({
      extra: { url: `${BREVO_ENDPOINT}${path}`, method, path, query },
      level: 'error',
    });
  }
  return response;
}

const BrevoApi = {
  get: async (args) => execute({ ...args }),
  put: async (args) => execute({ method: 'PUT', ...args }),
  post: async (args) => execute({ method: 'POST', ...args }),
  remove: async (args) => execute({ method: 'DELETE', ...args }),
};

export default BrevoApi;
