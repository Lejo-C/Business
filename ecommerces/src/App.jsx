import { useMemo, useState } from 'react'
import { products } from './data/products'
import Header from './components/Header'
import ProductGrid from './components/ProductGrid'
import ProductDetails from './components/ProductDetails'
import CartPage from './components/CartPage'
import CheckoutModal from './components/CheckoutModal'
import OrderSuccess from './components/OrderSuccess'
import './App.css'

function App() {
  const [page, setPage] = useState('shop')
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [cart, setCart] = useState([])
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [checkoutOpen, setCheckoutOpen] = useState(false)
  const [orderComplete, setOrderComplete] = useState(false)

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0)
  const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0)
  const visibleProducts = useMemo(() => {
    const term = search.trim().toLowerCase()
    return products.filter((product) => {
      const matchesSearch = !term || [product.name, product.category, product.description].join(' ').toLowerCase().includes(term)
      return matchesSearch && (category === 'All' || product.category === category)
    })
  }, [search, category])

  const addToCart = (product) => setCart((items) => {
    const existing = items.find((item) => item.id === product.id)
    if (existing) return items.map((item) => item.id === product.id ? { ...item, quantity: Math.min(item.quantity + 1, product.stock) } : item)
    return [...items, { ...product, quantity: 1 }]
  })
  const updateQuantity = (id, change) => setCart((items) => items.map((item) => item.id === id ? { ...item, quantity: item.quantity + change } : item).filter((item) => item.quantity > 0))
  const viewProduct = (product) => { setSelectedProduct(product); setPage('product'); window.scrollTo({ top: 0, behavior: 'smooth' }) }
  const buyNow = (product) => { if (product) addToCart(product); setCheckoutOpen(true) }
  const completeOrder = () => { setCheckoutOpen(false); setOrderComplete(true); setCart([]) }
  const goToShop = () => { setPage('shop'); setSelectedProduct(null); setCategory('All'); window.scrollTo({ top: 0, behavior: 'smooth' }) }

  return <div className="app-shell">
    <Header cartCount={cartCount} currentPage={page} onNavigate={setPage} onBrandClick={goToShop} search={search} onSearchChange={setSearch} />
    <main>
      {page === 'shop' && <ProductGrid products={visibleProducts} category={category} onCategoryChange={setCategory} onViewProduct={viewProduct} onAddToCart={addToCart} onBuyNow={buyNow} search={search} />}
      {page === 'product' && selectedProduct && <ProductDetails product={selectedProduct} onBack={goToShop} onAddToCart={addToCart} onBuyNow={buyNow} />}
      {page === 'cart' && <CartPage cart={cart} onUpdateQuantity={updateQuantity} onContinueShopping={goToShop} onCheckout={() => setCheckoutOpen(true)} />}
    </main>
    <CheckoutModal open={checkoutOpen} cart={cart} total={cartTotal} onClose={() => setCheckoutOpen(false)} onComplete={completeOrder} />
    <OrderSuccess open={orderComplete} onClose={() => { setOrderComplete(false); goToShop() }} />
  </div>
}

export default App
