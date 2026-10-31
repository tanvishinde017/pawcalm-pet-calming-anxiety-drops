/**
 * API client for PawCalm frontend.
 * Connects to the Express backend via NEXT_PUBLIC_API_URL.
 * Never exposes backend credentials - only the public API base URL lives here.
 */
const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

async function request(path, options = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  });

  let data;
  try {
    data = await res.json();
  } catch {
    data = {};
  }

  if (!res.ok) {
    throw new Error(data.message || `Request failed with status ${res.status}`);
  }

  return data;
}

export const api = {
  // GET /api/products?category=&featured=&minPrice=&maxPrice=&search=
  getProducts: (params = {}) => {
    const qs = new URLSearchParams(params).toString();
    return request(`/products${qs ? '?' + qs : ''}`);
  },

  // GET /api/products/:id
  getProduct: (id) => request(`/products/${id}`),

  // POST /api/contact
  submitContact: (body) =>
    request('/contact', {
      method: 'POST',
      body: JSON.stringify(body),
    }),
};

export default api;
