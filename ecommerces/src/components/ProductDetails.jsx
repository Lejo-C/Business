import { ArrowLeft } from './Icons'
import ProductVisual from './ProductVisual'

export default function ProductDetails({ product, onBack, onAddToCart, onBuyNow }) {
  return <section className="details-page"><button className="back-button" onClick={onBack}><ArrowLeft /> Back to collection</button><div className="product-details"><div className="detail-image-wrap"><ProductVisual product={product} size="detail" /></div><div className="detail-info"><p className="detail-category">{product.category}</p><h1>{product.name}</h1><p className="detail-price">${product.price}</p><p className="detail-description">{product.description}</p><ul className="details-list"><li><strong>Material</strong>{product.material}</li><li><strong>Dimensions</strong>{product.size}</li><li><strong>Dispatch</strong>Ships in 1–2 business days</li><li><strong>Returns</strong>30-day returns</li></ul><p className="stock">In stock · {product.stock} available</p><div className="action-row"><button className="secondary-button" onClick={() => onAddToCart(product)}>Add to cart</button><button className="primary-button" onClick={() => onBuyNow(product)}>Buy now</button></div></div></div></section>
}
