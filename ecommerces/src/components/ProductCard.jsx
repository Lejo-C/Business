import ProductVisual from './ProductVisual'

export default function ProductCard({ product, onViewProduct, onAddToCart, onBuyNow }) {
  return <article className="product-card">
    <button className="product-image-button" onClick={() => onViewProduct(product)} aria-label={`View ${product.name}`}><ProductVisual product={product} /><span className="quick-view">View details</span></button>
    <div className="product-card-body"><p className="product-card-meta">{product.category}</p><h3><button onClick={() => onViewProduct(product)}>{product.name}</button></h3><div className="product-card-bottom"><span className="price">${product.price}</span><div><button className="add-button" onClick={() => onAddToCart(product)}>Add to cart</button><button className="add-button" onClick={() => onBuyNow(product)} style={{ marginLeft: 5 }}>Buy now</button></div></div></div>
  </article>
}
