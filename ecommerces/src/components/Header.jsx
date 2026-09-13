import { CartIcon, SearchIcon } from './Icons'

export default function Header({ cartCount, currentPage, onNavigate, onBrandClick, search, onSearchChange }) {
  return <header className="site-header"><div className="header-inner">
    <button className="brand" onClick={onBrandClick} aria-label="Go to shop"><span className="brand-mark">N</span>Northfield</button>
    <nav className="nav-links" aria-label="Primary navigation"><button className={`nav-link ${currentPage === 'shop' ? 'active' : ''}`} onClick={() => onNavigate('shop')}>Shop</button><button className={`nav-link ${currentPage === 'cart' ? 'active' : ''}`} onClick={() => onNavigate('cart')}>Cart</button></nav>
    <label className="header-search" aria-label="Search products"><SearchIcon /><input value={search} onChange={(event) => { onSearchChange(event.target.value); if (currentPage !== 'shop') onNavigate('shop') }} placeholder="Search the collection" /></label>
    <button className="cart-button" onClick={() => onNavigate('cart')} aria-label={`Open cart with ${cartCount} items`}><CartIcon />{cartCount > 0 && <span className="cart-badge">{cartCount}</span>}</button>
  </div></header>
}
