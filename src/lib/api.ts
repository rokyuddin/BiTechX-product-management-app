const API_BASE = "https://api.bitechx.com";
const PRODUCTS_API = "https://api.bitechx.com/products";
const CATEGORIES_API = "https://api.bitechx.com/categories";
const AUTH_API = `${API_BASE}/auth`;

export const apiClient = {
  async auth(email: string) {
    const res = await fetch(AUTH_API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    console.log(res);
    if (!res.ok) throw new Error("Authentication failed");
    return res.json();
  },

  async getProducts(token: string, page: number = 1, search: string = "") {
    const params = new URLSearchParams({ page: page.toString() });
    if (search) params.append("search", search);

    const res = await fetch(`${PRODUCTS_API}?${params}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error("Failed to fetch products");
    return res.json();
  },

  async getProduct(token: string, id: string) {
    const res = await fetch(`${PRODUCTS_API}/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error("Failed to fetch product");
    return res.json();
  },

  async createProduct(token: string, data: Partial<any>) {
    const res = await fetch(PRODUCTS_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || "Failed to create product");
    }
    return res.json();
  },

  async updateProduct(token: string, id: string, data: Partial<any>) {
    const res = await fetch(`${PRODUCTS_API}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || "Failed to update product");
    }
    return res.json();
  },

  async deleteProduct(token: string, id: string) {
    const res = await fetch(`${PRODUCTS_API}/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error("Failed to delete product");
    return res.json();
  },

  async getCategories(token: string) {
    const res = await fetch(CATEGORIES_API, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error("Failed to fetch categories");
    return res.json();
  },
};
