export default function OrderSuccess({ open, onClose }) {
  if (!open) return null
  return <div className="modal-overlay"><section className="success-modal" role="dialog" aria-modal="true" aria-labelledby="success-title"><div className="success-mark">✓</div><h2 id="success-title">Order placed</h2><p>Thank you. We’ll send your order confirmation and delivery updates by email.</p><button className="primary-button" onClick={onClose}>Continue shopping</button></section></div>
}
