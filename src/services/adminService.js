/**
 * services/adminService.js
 *
 * Client API service for HAMAR Admin Dashboard operations.
 * Handles authenticated requests to admin endpoints with token headers
 * and reports API failures instead of substituting fabricated admin data.
 */

const API_URL = import.meta.env.VITE_API_URL  
 

/**
 * Helper to build auth headers
 */
const getAuthHeaders = (token) => {
  const headers = { 'Content-Type': 'application/json' }
  if (token) {
    headers.Authorization = `Bearer ${token}`
  }
  return headers
}

async function readResponse(response, fallbackMessage) {
  const json = await response.json().catch(() => ({}))
  if (!response.ok || json.success === false) {
    throw new Error(json.message || fallbackMessage)
  }
  return json.data ?? json
}

function queryString(params) {
  const query = new URLSearchParams()
  Object.entries(params).forEach(([key, value]) => {
    if (value && value !== 'all') query.set(key, value)
  })
  return query.toString()
}

// ─── Dashboard Analytics ─────────────────────────────────────────────────────

export async function fetchDashboardStats(token) {
  const response = await fetch(`${API_URL}/admin/dashboard/stats`, { headers: getAuthHeaders(token) })
  return readResponse(response, 'Could not load dashboard statistics.')
}

export async function fetchAdminProducts(params = {}, token) {
  const query = queryString(params)
  const response = await fetch(`${API_URL}/products${query ? `?${query}` : ''}`, { headers: getAuthHeaders(token) })
  const data = await readResponse(response, 'Could not load products.')
  return Array.isArray(data) ? data : data.products || []
}

export async function fetchAdminCategories(token) {
  const response = await fetch(`${API_URL}/categories`, { headers: getAuthHeaders(token) })
  const data = await readResponse(response, 'Could not load categories.')
  return Array.isArray(data) ? data : data.categories || []
}

export async function fetchAdminBrands(token) {
  const response = await fetch(`${API_URL}/brands`, { headers: getAuthHeaders(token) })
  const data = await readResponse(response, 'Could not load brands.')
  return Array.isArray(data) ? data : data.brands || []
}

// ─── Orders Management ───────────────────────────────────────────────────────

export async function fetchAdminOrders(params = {}, token) {
  const query = queryString(params)
  const response = await fetch(`${API_URL}/admin/orders${query ? `?${query}` : ''}`, { headers: getAuthHeaders(token) })
  return readResponse(response, 'Could not load orders.')
}

export async function fetchAdminOrderById(id, token) {
  const response = await fetch(`${API_URL}/admin/orders/${id}`, { headers: getAuthHeaders(token) })
  return readResponse(response, 'Could not load this order.')
}

export async function updateOrderStatus(id, statusPayload, token) {
  const res = await fetch(`${API_URL}/admin/orders/${id}/status`, {
    method: 'PUT',
    headers: getAuthHeaders(token),
    body: JSON.stringify(statusPayload),
  })
  const json = await res.json()
  if (!res.ok || !json.success) {
    throw new Error(json.message || 'Failed to update order status')
  }
  return json.data
}

export async function deleteOrder(id, token) {
  const res = await fetch(`${API_URL}/admin/orders/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders(token),
  })
  const json = await res.json()
  if (!res.ok || !json.success) {
    throw new Error(json.message || 'Failed to delete order')
  }
  return true
}

// ─── Products CRUD ───────────────────────────────────────────────────────────

export async function createProduct(payload, token) {
  const res = await fetch(`${API_URL}/products`, {
    method: 'POST',
    headers: getAuthHeaders(token),
    body: JSON.stringify(payload),
  })
  const json = await res.json()
  if (!res.ok || !json.success) {
    throw new Error(json.message || 'Failed to create product')
  }
  return json.data
}

export async function updateProduct(id, payload, token) {
  const res = await fetch(`${API_URL}/products/${id}`, {
    method: 'PUT',
    headers: getAuthHeaders(token),
    body: JSON.stringify(payload),
  })
  const json = await res.json()
  if (!res.ok || !json.success) {
    throw new Error(json.message || 'Failed to update product')
  }
  return json.data
}

export async function deleteProduct(id, token) {
  const res = await fetch(`${API_URL}/products/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders(token),
  })
  const json = await res.json()
  if (!res.ok || !json.success) {
    throw new Error(json.message || 'Failed to delete product')
  }
  return true
}

// ─── Categories CRUD ─────────────────────────────────────────────────────────

export async function createCategory(payload, token) {
  const res = await fetch(`${API_URL}/categories`, {
    method: 'POST',
    headers: getAuthHeaders(token),
    body: JSON.stringify(payload),
  })
  const json = await res.json()
  if (!res.ok || !json.success) {
    throw new Error(json.message || 'Failed to create category')
  }
  return json.data
}

export async function updateCategory(id, payload, token) {
  const res = await fetch(`${API_URL}/categories/${id}`, {
    method: 'PUT',
    headers: getAuthHeaders(token),
    body: JSON.stringify(payload),
  })
  const json = await res.json()
  if (!res.ok || !json.success) {
    throw new Error(json.message || 'Failed to update category')
  }
  return json.data
}

export async function deleteCategory(id, token) {
  const res = await fetch(`${API_URL}/categories/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders(token),
  })
  const json = await res.json()
  if (!res.ok || !json.success) {
    throw new Error(json.message || 'Failed to delete category')
  }
  return true
}

// ─── Brands CRUD ─────────────────────────────────────────────────────────────

export async function createBrand(payload, token) {
  const res = await fetch(`${API_URL}/brands`, {
    method: 'POST',
    headers: getAuthHeaders(token),
    body: JSON.stringify(payload),
  })
  const json = await res.json()
  if (!res.ok || !json.success) {
    throw new Error(json.message || 'Failed to create brand')
  }
  return json.data
}

export async function updateBrand(id, payload, token) {
  const res = await fetch(`${API_URL}/brands/${id}`, {
    method: 'PUT',
    headers: getAuthHeaders(token),
    body: JSON.stringify(payload),
  })
  const json = await res.json()
  if (!res.ok || !json.success) {
    throw new Error(json.message || 'Failed to update brand')
  }
  return json.data
}

export async function deleteBrand(id, token) {
  const res = await fetch(`${API_URL}/brands/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders(token),
  })
  const json = await res.json()
  if (!res.ok || !json.success) {
    throw new Error(json.message || 'Failed to delete brand')
  }
  return true
}

// ─── Customers Management ────────────────────────────────────────────────────

export async function fetchCustomers(params = {}, token) {
  const query = queryString(params)
  const response = await fetch(`${API_URL}/admin/customers${query ? `?${query}` : ''}`, { headers: getAuthHeaders(token) })
  return readResponse(response, 'Could not load customers.')
}

export async function updateCustomerStatus(id, isActive, token) {
  const res = await fetch(`${API_URL}/admin/customers/${id}/status`, {
    method: 'PUT',
    headers: getAuthHeaders(token),
    body: JSON.stringify({ isActive }),
  })
  const json = await res.json()
  if (!res.ok || !json.success) {
    throw new Error(json.message || 'Failed to update customer status')
  }
  return json.data
}
