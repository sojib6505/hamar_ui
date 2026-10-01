import { useCallback, useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Activity,
  ArrowUpRight,
  BadgeDollarSign,
  Boxes,
  Check,
  ChevronRight,
  CircleAlert,
  CirclePlus,
  KeyRound,
  Pencil,
  RefreshCw,
  Search,
  ShoppingBag,
  Trash2,
  Users,
  Wifi,
  WifiOff,
} from 'lucide-react'
import Modal from '@/components/ui/Modal'
import { useAuth } from '@/context/AuthContext'
import { useToast } from '@/context/ToastContext'
import {
  createBrand,
  createCategory,
  createProduct,
  deleteBrand,
  deleteCategory,
  deleteProduct,
  fetchAdminBrands,
  fetchAdminCategories,
  fetchAdminProducts,
  fetchAdminOrders,
  fetchAdminOrderById,
  fetchCustomers,
  fetchDashboardStats,
  updateBrand,
  updateCategory,
  updateOrderStatus,
  updateProduct,
} from '@/services/adminService'
import { auth, isFirebaseConfigured } from '@/config/firebase'

const currency = new Intl.NumberFormat('en-BD', { style: 'currency', currency: 'BDT', maximumFractionDigits: 0 })
const dateFormat = new Intl.DateTimeFormat('en-BD', { dateStyle: 'medium' })
const idOf = (item) => item?._id || item?.id
const valueOf = (value) => (value && typeof value === 'object' ? value.slug || value.name || value._id || value.id : value)

function PageHeading({ title, description, action }) {
  return (
    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div><h2 className="font-display text-2xl font-bold">{title}</h2><p className="mt-1 text-sm text-muted">{description}</p></div>
      {action}
    </div>
  )
}

function IconButton({ label, onClick, children, danger = false }) {
  return <button type="button" title={label} aria-label={label} onClick={onClick} className={`grid size-9 shrink-0 place-items-center rounded-md transition ${danger ? 'text-danger hover:bg-red-50' : 'text-muted hover:bg-surface hover:text-ink'}`}>{children}</button>
}

function SearchBox({ value, onChange, placeholder = 'Search' }) {
  return <label className="flex h-10 min-w-0 items-center gap-2 rounded-md border border-line bg-white px-3 text-muted focus-within:border-ink sm:w-72"><Search size={16} /><input value={value} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} className="min-w-0 flex-1 bg-transparent text-sm text-ink outline-none placeholder:text-muted" /></label>
}

function LoadMessage({ loading, error, onRetry, empty, children }) {
  if (loading) return <div className="flex min-h-52 flex-col items-center justify-center gap-3 text-sm text-muted"><RefreshCw size={20} className="animate-spin" />Loading admin data…</div>
  if (error) return <div className="flex min-h-52 flex-col items-center justify-center px-5 text-center"><CircleAlert size={25} className="text-danger" /><p className="mt-3 font-semibold">Could not load this data</p><p className="mt-1 max-w-lg text-sm text-muted">{error}</p><button onClick={onRetry} className="mt-4 text-sm font-semibold underline underline-offset-4">Try again</button></div>
  if (empty) return <div className="flex min-h-52 flex-col items-center justify-center text-center"><Boxes size={26} className="text-muted" /><p className="mt-3 font-semibold">Nothing here yet</p><p className="mt-1 text-sm text-muted">There are no matching records.</p></div>
  return children
}

function TableFrame({ children }) {
  return <div className="overflow-x-auto rounded-lg border border-line bg-white"><table className="w-full min-w-[680px] border-collapse text-left text-sm">{children}</table></div>
}

function TableHead({ children }) {
  return <thead className="bg-surface text-[11px] font-semibold uppercase tracking-wider text-muted"><tr>{children}</tr></thead>
}

function Th({ children, className = '' }) {
  return <th className={`whitespace-nowrap px-4 py-3 ${className}`}>{children}</th>
}

function Td({ children, className = '' }) {
  return <td className={`border-t border-line px-4 py-3.5 ${className}`}>{children}</td>
}

function StatusPill({ value }) {
  const normalized = String(value || 'unknown').toLowerCase()
  const classes = normalized === 'delivered' || normalized === 'paid' || normalized === 'active'
    ? 'bg-emerald-50 text-emerald-800'
    : normalized === 'cancelled' || normalized === 'inactive' || normalized === 'failed'
      ? 'bg-red-50 text-red-700'
      : normalized === 'shipped' || normalized === 'processing' || normalized === 'confirmed'
        ? 'bg-sky-50 text-sky-800'
        : 'bg-amber-50 text-amber-900'
  return <span className={`inline-flex rounded-sm px-2 py-1 text-xs font-medium capitalize ${classes}`}>{normalized.replaceAll('_', ' ')}</span>
}

function Field({ label, value, onChange, required = false, type = 'text', multiline = false, ...props }) {
  const classes = 'mt-1.5 w-full rounded-md border border-line bg-white px-3 py-2.5 text-sm outline-none focus:border-ink'
  return <label className="block text-sm font-medium">{label}{multiline ? <textarea required={required} value={value || ''} onChange={onChange} rows={3} className={`${classes} resize-y`} {...props} /> : <input required={required} type={type} value={value ?? ''} onChange={onChange} className={classes} {...props} />}</label>
}

function DeleteDialog({ record, label, busy, onClose, onConfirm }) {
  return <Modal open={Boolean(record)} onClose={onClose} title={`Delete ${label}`}>
    <p className="text-sm leading-6 text-muted">Delete <strong className="text-ink">{record?.name || record?.orderNumber || 'this record'}</strong>? This action cannot be undone.</p>
    <div className="mt-6 flex justify-end gap-2"><button onClick={onClose} className="rounded-md border border-line px-4 py-2 text-sm">Cancel</button><button disabled={busy} onClick={onConfirm} className="rounded-md bg-danger px-4 py-2 text-sm font-semibold text-white disabled:opacity-50">{busy ? 'Deleting…' : 'Delete'}</button></div>
  </Modal>
}

function StatCard({ title, value, detail, icon: Icon, accent = false }) {
  return <div className="border border-line bg-white p-5"><div className="flex items-start justify-between"><p className="text-sm text-muted">{title}</p><span className={`grid size-9 place-items-center ${accent ? 'bg-accent text-ink' : 'bg-surface text-ink'}`}><Icon size={18} /></span></div><p className="mt-5 font-display text-2xl font-bold">{value}</p>{detail && <p className="mt-1 text-xs text-muted">{detail}</p>}</div>
}

export function AdminDashboardPage() {
  const { token } = useAuth()
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const load = useCallback(async () => {
    setLoading(true)
    setError('')
    try { setData(await fetchDashboardStats(token)) } catch (err) { setError(err.message) } finally { setLoading(false) }
  }, [token])
  useEffect(() => { load() }, [load])
  const recentOrders = data?.recentOrders || data?.orders || []
  return <>
    <PageHeading title="Overview" description="Live store performance and recent activity." action={<button onClick={load} className="inline-flex h-10 items-center gap-2 rounded-md border border-line bg-white px-3 text-sm font-medium"><RefreshCw size={15} /> Refresh</button>} />
    <LoadMessage loading={loading} error={error} onRetry={load}>
      {data && <>
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard title="Revenue" value={currency.format(data.totalRevenue ?? data.revenue ?? 0)} detail="Reported by the backend" icon={BadgeDollarSign} accent />
          <StatCard title="Orders" value={data.totalOrders ?? 0} detail={`${data.pendingOrders ?? 0} pending`} icon={ShoppingBag} />
          <StatCard title="Products" value={data.totalProducts ?? 0} detail={`${data.outOfStockProducts ?? 0} out of stock`} icon={Boxes} />
          <StatCard title="Customers" value={data.totalCustomers ?? 0} detail="Registered customers" icon={Users} />
        </div>
        <section className="mt-7 border border-line bg-white">
          <div className="flex items-center justify-between border-b border-line px-5 py-4"><div><h3 className="font-display font-semibold">Recent orders</h3><p className="mt-1 text-xs text-muted">Latest updates from the store</p></div><Link to="/admin/orders" className="inline-flex items-center gap-1 text-sm font-semibold">All orders <ChevronRight size={16} /></Link></div>
          {recentOrders.length ? <TableFrame><TableHead><Th>Order</Th><Th>Customer</Th><Th>Date</Th><Th>Status</Th><Th className="text-right">Total</Th></TableHead><tbody>{recentOrders.slice(0, 6).map((order, index) => <tr key={idOf(order) || order.orderNumber || index}><Td className="font-semibold">{order.orderNumber || order.id || `#${idOf(order)}`}</Td><Td>{order.customer?.name || order.customerName || 'Customer'}<div className="mt-0.5 text-xs text-muted">{order.customer?.email || order.customerEmail || ''}</div></Td><Td>{formatDate(order.createdAt || order.date)}</Td><Td><StatusPill value={order.orderStatus || order.status} /></Td><Td className="text-right font-semibold">{currency.format(order.total ?? order.amount ?? 0)}</Td></tr>)}</tbody></TableFrame> : <div className="px-5 py-12 text-center text-sm text-muted">No recent orders returned by the API.</div>}
        </section>
        <div className="mt-4 grid gap-3 sm:grid-cols-2"><div className="flex items-center justify-between border border-line bg-white p-4"><span className="text-sm text-muted">Categories</span><span className="font-semibold">{data.totalCategories ?? '—'}</span></div><div className="flex items-center justify-between border border-line bg-white p-4"><span className="text-sm text-muted">Brands</span><span className="font-semibold">{data.totalBrands ?? '—'}</span></div></div>
      </>}
    </LoadMessage>
  </>
}

const productFields = [
  { key: 'name', label: 'Product name', required: true },
  { key: 'slug', label: 'Slug', required: true },
  { key: 'price', label: 'Price (BDT)', type: 'number', required: true },
  { key: 'brand', label: 'Brand', required: true },
  { key: 'category', label: 'Category' },
  { key: 'stock', label: 'Stock quantity', type: 'number' },
  { key: 'image', label: 'Image URL' },
  { key: 'shortDescription', label: 'Short description', multiline: true },
]

function CatalogForm({ kind, initial = {}, busy, onClose, onSubmit }) {
  const [form, setForm] = useState(() => ({ name: '', slug: '', description: '', image: '', ...initial }))
  const update = (key, value) => setForm((current) => ({ ...current, [key]: value }))
  const fields = kind === 'Product' ? productFields : [
    { key: 'name', label: `${kind} name`, required: true },
    { key: 'slug', label: 'Slug', required: true },
    { key: 'description', label: 'Description', multiline: true },
    { key: kind === 'Brand' ? 'logo' : 'image', label: kind === 'Brand' ? 'Logo URL' : 'Image URL' },
  ]
  const submit = (event) => {
    event.preventDefault()
    const payload = { ...form }
    if (kind === 'Product') {
      payload.price = Number(payload.price)
      payload.brandName = String(payload.brandName || payload.brand || '').trim()
      payload.stock = payload.stock === 'in-stock' || payload.stock === 'out-of-stock'
        ? payload.stock
        : Number(payload.stock) > 0 ? 'in-stock' : 'out-of-stock'
      if (!payload.images && payload.image) payload.images = [payload.image]
      delete payload.image
    }
    onSubmit(payload)
  }
  return <Modal open onClose={onClose} title={`${initial.name ? 'Edit' : 'Add'} ${kind}`} maxWidth="max-w-2xl">
    <form onSubmit={submit} className="space-y-4"><div className="grid gap-4 sm:grid-cols-2">{fields.map((field) => <div key={field.key} className={field.multiline ? 'sm:col-span-2' : ''}><Field label={field.label} required={field.required} type={field.type} multiline={field.multiline} value={form[field.key]} onChange={(event) => update(field.key, event.target.value)} /></div>)}</div><div className="flex justify-end gap-2 border-t border-line pt-4"><button type="button" onClick={onClose} className="rounded-md border border-line px-4 py-2 text-sm">Cancel</button><button disabled={busy} className="inline-flex items-center gap-2 rounded-md bg-ink px-4 py-2 text-sm font-semibold text-white disabled:opacity-50"><Check size={15} />{busy ? 'Saving…' : 'Save'}</button></div></form>
  </Modal>
}

function ProductPage() {
  const { token } = useAuth()
  const { showToast } = useToast()
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [search, setSearch] = useState('')
  const [editing, setEditing] = useState(null)
  const [deleting, setDeleting] = useState(null)
  const [busy, setBusy] = useState(false)
  const load = useCallback(async () => { setLoading(true); setError(''); try { setItems(await fetchAdminProducts({}, token)) } catch (err) { setError(err.message) } finally { setLoading(false) } }, [token])
  useEffect(() => { load() }, [load])
  const filtered = useMemo(() => items.filter((item) => `${item.name || ''} ${item.slug || ''} ${valueOf(item.brand) || ''} ${valueOf(item.category) || ''}`.toLowerCase().includes(search.toLowerCase())), [items, search])
  const save = async (payload) => {
    setBusy(true)
    try {
      const saved = editing?._id || editing?.id ? await updateProduct(idOf(editing), payload, token) : await createProduct(payload, token)
      setItems((all) => editing ? all.map((item) => idOf(item) === idOf(editing) ? { ...item, ...saved, ...payload } : item) : [saved || payload, ...all])
      showToast?.(`Product ${editing ? 'updated' : 'created'}`)
      setEditing(null)
    } catch (err) { showToast?.(err.message, 'error') } finally { setBusy(false) }
  }
  const remove = async () => {
    setBusy(true)
    try { await deleteProduct(idOf(deleting), token); setItems((all) => all.filter((item) => idOf(item) !== idOf(deleting))); showToast?.('Product deleted'); setDeleting(null) }
    catch (err) { showToast?.(err.message, 'error') } finally { setBusy(false) }
  }
  return <>
    <PageHeading title="Products" description="Manage your live product catalogue." action={<button onClick={() => setEditing({})} className="inline-flex h-10 items-center justify-center gap-2 rounded-md bg-accent px-4 text-sm font-semibold"><CirclePlus size={17} /> Add product</button>} />
    <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"><SearchBox value={search} onChange={setSearch} placeholder="Search products" /><span className="text-xs text-muted">{filtered.length} products</span></div>
    <LoadMessage loading={loading} error={error} onRetry={load} empty={!filtered.length && !search}>
      {filtered.length ? <TableFrame><TableHead><Th>Product</Th><Th>Category</Th><Th>Brand</Th><Th>Stock</Th><Th className="text-right">Price</Th><Th><span className="sr-only">Actions</span></Th></TableHead><tbody>{filtered.map((item) => <tr key={idOf(item)}><Td><div className="flex items-center gap-3"><img src={item.images?.[0] || item.image || ''} alt="" className="size-10 rounded-sm bg-surface object-cover" onError={(event) => { event.currentTarget.style.visibility = 'hidden' }} /><div className="min-w-0"><p className="max-w-64 truncate font-semibold">{item.name}</p><p className="max-w-64 truncate text-xs text-muted">{item.slug || idOf(item)}</p></div></div></Td><Td>{valueOf(item.category) || '—'}</Td><Td>{valueOf(item.brand) || '—'}</Td><Td><StatusPill value={Number(item.stock) > 0 || item.stock === 'in-stock' ? 'in stock' : 'out of stock'} /></Td><Td className="text-right font-semibold">{currency.format(item.price || 0)}</Td><Td><div className="flex justify-end"><IconButton label="Edit product" onClick={() => setEditing(item)}><Pencil size={16} /></IconButton><IconButton label="Delete product" danger onClick={() => setDeleting(item)}><Trash2 size={16} /></IconButton></div></Td></tr>)}</tbody></TableFrame> : !loading && !error && <div className="border border-line bg-white px-5 py-12 text-center text-sm text-muted">No products match “{search}”.</div>}
    </LoadMessage>
    {editing && <CatalogForm kind="Product" initial={editing} busy={busy} onClose={() => setEditing(null)} onSubmit={save} />}
    <DeleteDialog record={deleting} label="product" busy={busy} onClose={() => setDeleting(null)} onConfirm={remove} />
  </>
}

export function AdminProductsPage() { return <ProductPage /> }

function CatalogPage({ kind, loadItems, createItem, updateItem, deleteItem, loadProducts }) {
  const { token } = useAuth()
  const { showToast } = useToast()
  const [items, setItems] = useState([])
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [search, setSearch] = useState('')
  const [editing, setEditing] = useState(null)
  const [deleting, setDeleting] = useState(null)
  const [busy, setBusy] = useState(false)
  const load = useCallback(async () => {
    setLoading(true); setError('')
    try {
      const [catalog, productList] = await Promise.all([loadItems(token), loadProducts(token)])
      setItems(catalog)
      setProducts(productList)
    } catch (err) { setError(err.message) } finally { setLoading(false) }
  }, [loadItems, loadProducts, token])
  useEffect(() => { load() }, [load])
  const filtered = useMemo(() => items.filter((item) => `${item.name || ''} ${item.slug || ''}`.toLowerCase().includes(search.toLowerCase())), [items, search])
  const productCount = (item) => products.filter((product) => {
    const relation = valueOf(product[kind.toLowerCase()])
    return relation && [idOf(item), item.slug, item.name].filter(Boolean).some((value) => String(value).toLowerCase() === String(relation).toLowerCase())
  }).length
  const save = async (payload) => {
    setBusy(true)
    try {
      const saved = idOf(editing) ? await updateItem(idOf(editing), payload, token) : await createItem(payload, token)
      setItems((all) => editing ? all.map((item) => idOf(item) === idOf(editing) ? { ...item, ...saved, ...payload } : item) : [saved || payload, ...all])
      showToast?.(`${kind} ${editing ? 'updated' : 'created'}`)
      setEditing(null)
    } catch (err) { showToast?.(err.message, 'error') } finally { setBusy(false) }
  }
  const remove = async () => {
    setBusy(true)
    try { await deleteItem(idOf(deleting), token); setItems((all) => all.filter((item) => idOf(item) !== idOf(deleting))); showToast?.(`${kind} deleted`); setDeleting(null) }
    catch (err) { showToast?.(err.message, 'error') } finally { setBusy(false) }
  }
  return <>
    <PageHeading title={kind === 'Brand' ? 'Brands' : 'Categories'} description={`Manage ${kind.toLowerCase()} records and product associations.`} action={<button onClick={() => setEditing({})} className="inline-flex h-10 items-center justify-center gap-2 rounded-md bg-accent px-4 text-sm font-semibold"><CirclePlus size={17} /> Add {kind.toLowerCase()}</button>} />
    <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"><SearchBox value={search} onChange={setSearch} placeholder={`Search ${kind.toLowerCase()}s`} /><span className="text-xs text-muted">{filtered.length} {kind.toLowerCase()}s</span></div>
    <LoadMessage loading={loading} error={error} onRetry={load} empty={!filtered.length && !search}>
      {filtered.length ? <TableFrame><TableHead><Th>{kind}</Th><Th>Slug</Th><Th>Description</Th><Th className="text-right">Products</Th><Th><span className="sr-only">Actions</span></Th></TableHead><tbody>{filtered.map((item) => <tr key={idOf(item)}><Td><p className="font-semibold">{item.name}</p></Td><Td className="font-mono-tech text-xs">{item.slug || '—'}</Td><Td><p className="max-w-sm truncate text-muted">{item.description || item.tagline || '—'}</p></Td><Td className="text-right">{item.productCount ?? productCount(item)}</Td><Td><div className="flex justify-end"><IconButton label={`Edit ${kind.toLowerCase()}`} onClick={() => setEditing(item)}><Pencil size={16} /></IconButton><IconButton label={`Delete ${kind.toLowerCase()}`} danger onClick={() => setDeleting(item)}><Trash2 size={16} /></IconButton></div></Td></tr>)}</tbody></TableFrame> : !loading && !error && <div className="border border-line bg-white px-5 py-12 text-center text-sm text-muted">No results for “{search}”.</div>}
    </LoadMessage>
    {editing && <CatalogForm kind={kind} initial={editing} busy={busy} onClose={() => setEditing(null)} onSubmit={save} />}
    <DeleteDialog record={deleting} label={kind.toLowerCase()} busy={busy} onClose={() => setDeleting(null)} onConfirm={remove} />
  </>
}

export function AdminCategoriesPage() { return <CatalogPage kind="Category" loadItems={fetchAdminCategories} createItem={createCategory} updateItem={updateCategory} deleteItem={deleteCategory} loadProducts={fetchAdminProducts} /> }
export function AdminBrandsPage() { return <CatalogPage kind="Brand" loadItems={fetchAdminBrands} createItem={createBrand} updateItem={updateBrand} deleteItem={deleteBrand} loadProducts={fetchAdminProducts} /> }

function formatDate(value) {
  if (!value) return '—'
  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? '—' : dateFormat.format(date)
}

const ORDER_STATUSES = ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled']

export function AdminOrdersPage() {
  const { token } = useAuth()
  const { showToast } = useToast()
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [status, setStatus] = useState('all')
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState(null)
  const [detailLoading, setDetailLoading] = useState(false)
  const [nextStatus, setNextStatus] = useState('')
  const [busy, setBusy] = useState(false)
  const load = useCallback(async () => {
    setLoading(true); setError('')
    try { const data = await fetchAdminOrders({ status, search }, token); setOrders(Array.isArray(data) ? data : data.orders || []) }
    catch (err) { setError(err.message) } finally { setLoading(false) }
  }, [search, status, token])
  useEffect(() => { load() }, [load])
  const openOrder = async (order) => {
    setSelected(order); setNextStatus(order.orderStatus || order.status || 'pending'); setDetailLoading(true)
    try { setSelected(await fetchAdminOrderById(idOf(order), token) || order) }
    catch (err) { showToast?.(err.message, 'error') }
    finally { setDetailLoading(false) }
  }
  const saveStatus = async () => {
    setBusy(true)
    try {
      const updated = await updateOrderStatus(idOf(selected), { status: nextStatus, orderStatus: nextStatus }, token)
      setOrders((all) => all.map((order) => idOf(order) === idOf(selected) ? { ...order, ...updated, orderStatus: updated?.orderStatus || updated?.status || nextStatus } : order))
      setSelected((order) => ({ ...order, ...updated, orderStatus: updated?.orderStatus || updated?.status || nextStatus }))
      showToast?.('Order status updated')
    } catch (err) { showToast?.(err.message, 'error') } finally { setBusy(false) }
  }
  return <>
    <PageHeading title="Orders" description="Review customer orders and update fulfillment status." />
    <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"><SearchBox value={search} onChange={setSearch} placeholder="Search order or customer" /><select value={status} onChange={(event) => setStatus(event.target.value)} className="h-10 rounded-md border border-line bg-white px-3 text-sm"><option value="all">All statuses</option>{ORDER_STATUSES.map((value) => <option key={value} value={value}>{value.replaceAll('_', ' ')}</option>)}</select></div>
    <LoadMessage loading={loading} error={error} onRetry={load} empty={!orders.length}>
      {orders.length > 0 && <TableFrame><TableHead><Th>Order</Th><Th>Customer</Th><Th>Date</Th><Th>Status</Th><Th>Payment</Th><Th className="text-right">Total</Th><Th><span className="sr-only">Details</span></Th></TableHead><tbody>{orders.map((order) => <tr key={idOf(order)}><Td className="font-semibold">{order.orderNumber || `#${idOf(order)}`}</Td><Td>{order.customer?.name || order.customerName || '—'}<div className="text-xs text-muted">{order.customer?.email || order.customerEmail || ''}</div></Td><Td>{formatDate(order.createdAt)}</Td><Td><StatusPill value={order.orderStatus || order.status} /></Td><Td><StatusPill value={order.paymentStatus || order.paymentMethod} /></Td><Td className="text-right font-semibold">{currency.format(order.total ?? order.amount ?? 0)}</Td><Td><IconButton label="View order details" onClick={() => openOrder(order)}><ArrowUpRight size={17} /></IconButton></Td></tr>)}</tbody></TableFrame>}
    </LoadMessage>
    <Modal open={Boolean(selected)} onClose={() => setSelected(null)} title={`Order ${selected?.orderNumber || ''}`} maxWidth="max-w-2xl">
      {selected && <div className="space-y-5">{detailLoading && <p className="text-xs text-muted">Refreshing order details…</p>}<div className="grid gap-4 sm:grid-cols-2"><div><p className="text-xs uppercase text-muted">Customer</p><p className="mt-1 font-medium">{selected.customer?.name || selected.customerName || '—'}</p><p className="text-sm text-muted">{selected.customer?.email || selected.customerEmail || ''}</p><p className="text-sm text-muted">{selected.customer?.phone || ''}</p></div><div><p className="text-xs uppercase text-muted">Shipping address</p><p className="mt-1 text-sm">{selected.shippingAddress?.address || selected.shippingAddress?.street || '—'}</p><p className="text-sm text-muted">{[selected.shippingAddress?.city, selected.shippingAddress?.district].filter(Boolean).join(', ')}</p></div></div><div className="border-t border-line pt-4"><h4 className="font-semibold">Items</h4><div className="mt-2 divide-y divide-line">{(selected.items || []).map((item, index) => <div key={item._id || item.id || index} className="flex justify-between gap-3 py-2 text-sm"><span>{item.name || item.product?.name || 'Item'} × {item.quantity || 1}</span><span>{currency.format((item.price || 0) * (item.quantity || 1))}</span></div>)}</div></div><div className="flex items-end gap-3 border-t border-line pt-4"><label className="flex-1 text-sm font-medium">Order status<select value={nextStatus} onChange={(event) => setNextStatus(event.target.value)} className="mt-1.5 h-10 w-full rounded-md border border-line bg-white px-3">{ORDER_STATUSES.map((value) => <option key={value} value={value}>{value}</option>)}</select></label><button disabled={busy} onClick={saveStatus} className="h-10 rounded-md bg-ink px-4 text-sm font-semibold text-white disabled:opacity-50">{busy ? 'Saving…' : 'Update status'}</button></div><div className="text-right text-lg font-bold">Total {currency.format(selected.total || 0)}</div></div>}
    </Modal>
  </>
}

export function AdminCustomersPage() {
  const { token } = useAuth()
  const [customers, setCustomers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState(null)
  const load = useCallback(async () => {
    setLoading(true); setError('')
    try { const data = await fetchCustomers({ search }, token); setCustomers(Array.isArray(data) ? data : data.customers || []) }
    catch (err) { setError(err.message) } finally { setLoading(false) }
  }, [search, token])
  useEffect(() => { load() }, [load])
  return <>
    <PageHeading title="Customers" description="Customer contact details and account activity." />
    <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"><SearchBox value={search} onChange={setSearch} placeholder="Search name, email or phone" /><span className="text-xs text-muted">{customers.length} customers</span></div>
    <LoadMessage loading={loading} error={error} onRetry={load} empty={!customers.length}>
      {customers.length > 0 && <TableFrame><TableHead><Th>Customer</Th><Th>Phone</Th><Th>Joined</Th><Th>Orders</Th><Th>Status</Th><Th><span className="sr-only">Details</span></Th></TableHead><tbody>{customers.map((customer) => <tr key={idOf(customer)}><Td><p className="font-semibold">{customer.name || '—'}</p><p className="text-xs text-muted">{customer.email || '—'}</p></Td><Td>{customer.phone || '—'}</Td><Td>{formatDate(customer.createdAt || customer.joinedDate)}</Td><Td>{customer.orderCount ?? customer.ordersCount ?? '—'}</Td><Td>{customer.isActive == null ? '—' : <StatusPill value={customer.isActive ? 'active' : 'inactive'} />}</Td><Td><button onClick={() => setSelected(customer)} className="text-sm font-semibold underline underline-offset-4">View</button></Td></tr>)}</tbody></TableFrame>}
    </LoadMessage>
    <Modal open={Boolean(selected)} onClose={() => setSelected(null)} title="Customer information">
      {selected && <dl className="grid gap-4 sm:grid-cols-2">{[['Name', selected.name], ['Email', selected.email], ['Phone', selected.phone], ['Joined', formatDate(selected.createdAt || selected.joinedDate)], ['Orders', selected.orderCount ?? selected.ordersCount ?? '—'], ['Account status', selected.isActive == null ? 'Not provided by API' : selected.isActive ? 'Active' : 'Inactive']].map(([label, value]) => <div key={label}><dt className="text-xs uppercase text-muted">{label}</dt><dd className="mt-1 break-words text-sm font-medium">{value || '—'}</dd></div>)}</dl>}
    </Modal>
  </>
}

export function AdminSettingsPage() {
  const { token, currentUser, userProfile } = useAuth()
  const [apiState, setApiState] = useState('checking')
  const [apiError, setApiError] = useState('')
  useEffect(() => {
    let active = true
    fetchDashboardStats(token).then(() => { if (active) setApiState('connected') }).catch((error) => { if (active) { setApiState('unavailable'); setApiError(error.message) } })
    return () => { active = false }
  }, [token])
  return <>
    <PageHeading title="Settings" description="Administrator account and service connectivity." />
    <div className="grid gap-4 lg:grid-cols-2">
      <section className="border border-line bg-white"><div className="border-b border-line px-5 py-4"><h3 className="font-display font-semibold">Administrator profile</h3></div><dl className="grid gap-5 p-5 sm:grid-cols-2"><div><dt className="text-xs uppercase text-muted">Name</dt><dd className="mt-1 text-sm font-medium">{userProfile?.name || currentUser?.displayName || '—'}</dd></div><div><dt className="text-xs uppercase text-muted">Email</dt><dd className="mt-1 break-words text-sm font-medium">{currentUser?.email || '—'}</dd></div><div><dt className="text-xs uppercase text-muted">Role</dt><dd className="mt-1 text-sm font-medium">{userProfile?.role || '—'}</dd></div><div><dt className="text-xs uppercase text-muted">Authentication</dt><dd className="mt-1 text-sm font-medium">Firebase</dd></div></dl></section>
      <section className="border border-line bg-white"><div className="border-b border-line px-5 py-4"><h3 className="font-display font-semibold">System status</h3></div><div className="space-y-4 p-5"><div className="flex items-center justify-between gap-3"><div className="flex items-center gap-3"><span className="grid size-9 place-items-center bg-surface"><Activity size={17} /></span><div><p className="text-sm font-medium">HAMAR API</p><p className="text-xs text-muted">Authenticated dashboard endpoint</p></div></div><span className={`inline-flex items-center gap-1.5 text-xs font-semibold ${apiState === 'connected' ? 'text-emerald-700' : apiState === 'unavailable' ? 'text-danger' : 'text-muted'}`}>{apiState === 'connected' ? <Wifi size={15} /> : apiState === 'unavailable' ? <WifiOff size={15} /> : <RefreshCw size={14} className="animate-spin" />}{apiState}</span></div><div className="flex items-center justify-between gap-3 border-t border-line pt-4"><div className="flex items-center gap-3"><span className="grid size-9 place-items-center bg-surface"><KeyRound size={17} /></span><div><p className="text-sm font-medium">Firebase Authentication</p><p className="text-xs text-muted">Client configuration</p></div></div><StatusPill value={isFirebaseConfigured && auth ? 'active' : 'inactive'} /></div>{apiError && <p className="text-xs text-danger">{apiError}</p>}</div></section>
    </div>
  </>
}

