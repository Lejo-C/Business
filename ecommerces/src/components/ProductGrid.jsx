import ProductCard from './ProductCard'
import { products } from '../data/products'

const categories = ['All', ...new Set(products.map((product) => product.category))]

export default function ProductGrid({ products: visibleProducts, category, onCategoryChange, onViewProduct, onAddToCart, onBuyNow, search }) {
  return <section className="catalog">
    <div className="catalog-intro"><div><p className="eyebrow">The autumn edit</p><h1>Useful things for a considered home.</h1><p>Small-batch furniture, homeware, and everyday essentials made from honest materials.</p></div><span className="catalog-count">36 considered pieces</span></div>
    <div className="catalog-controls"><div className="category-pills">{categories.map((item) => <button key={item} className={`category-pill ${category === item ? 'active' : ''}`} onClick={() => onCategoryChange(item)}>{item}</button>)}</div><span className="results-label">{visibleProducts.length} {visibleProducts.length === 1 ? 'item' : 'items'} {search && `for “${search}”`}</span></div>
    <div className="product-grid">{visibleProducts.length ? visibleProducts.map((product) => <ProductCard key={product.id} product={product} onViewProduct={onViewProduct} onAddToCart={onAddToCart} onBuyNow={onBuyNow} />) : <div className="empty-products"><strong>No products found.</strong><br />Try a different search or category.<br /><button className="secondary-button" onClick={() => onCategoryChange('All')}>Show all products</button></div>}</div>
  </section>
}
