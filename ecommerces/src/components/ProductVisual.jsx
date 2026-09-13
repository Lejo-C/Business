const forest = '#1f4b42'
const clay = '#ca6f4d'
const paper = '#fffefa'
const ink = '#1d2925'

function Lamp({ floor = false, pendant = false, wall = false }) {
  if (pendant) return <><path d="M150 24v60" stroke={ink} strokeWidth="6" /><path d="M95 86h110l-18 60h-74z" fill={forest} /><path d="M107 146h86" stroke={clay} strokeWidth="7" strokeLinecap="round" /></>
  if (wall) return <><circle cx="92" cy="122" r="24" fill={clay} /><path d="M92 122h56l27 24" stroke={ink} strokeWidth="8" strokeLinecap="round" /><path d="M177 128h42l-18 49h-41z" fill={forest} /></>
  if (floor) return <><path d="M129 205h44M151 204V86" stroke={ink} strokeWidth="8" strokeLinecap="round" /><path d="M103 88h96l-16 56h-64z" fill={forest} /><path d="M92 210h116" stroke={clay} strokeWidth="7" strokeLinecap="round" /></>
  return <><path d="M150 174v35M111 210h78" stroke={ink} strokeWidth="8" strokeLinecap="round" /><path d="M105 98h90l-14 64h-62z" fill={forest} /><path d="M128 162h44" stroke={clay} strokeWidth="7" /></>
}

function Vase() { return <><path d="M125 56h50v45c0 19 29 31 29 68 0 28-21 45-54 45s-54-17-54-45c0-37 29-49 29-68z" fill={clay} /><path d="M125 100h50" stroke={paper} strokeWidth="7" /><path d="M117 214h66" stroke={ink} strokeWidth="7" strokeLinecap="round" /></> }
function Bowl() { return <><path d="M78 120h144c-8 55-35 78-72 78s-64-23-72-78z" fill={clay} /><path d="M78 120h144" stroke={ink} strokeWidth="7" /><path d="M115 207h70" stroke={ink} strokeWidth="7" strokeLinecap="round" /></> }
function Tray() { return <><rect x="72" y="105" width="156" height="96" rx="12" fill={forest} /><rect x="91" y="124" width="118" height="57" rx="6" fill={paper} /><circle cx="104" cy="153" r="7" fill={clay} /><circle cx="196" cy="153" r="7" fill={clay} /></> }
function Glasses() { return <><path d="M92 90h40l-5 101H97zM168 76h40l-5 115h-30z" fill={paper} stroke={forest} strokeWidth="7" /><path d="M102 116h20M178 106h20" stroke={clay} strokeWidth="7" /></> }
function Chair({ lounge = false }) { return lounge ? <><path d="M83 91h75v68H83z" fill={clay} /><path d="M158 118h59v48h-59z" fill={forest} /><path d="M94 166v47m104-47v47" stroke={ink} strokeWidth="8" /><path d="M93 92l-20-43M166 118l31-40" stroke={ink} strokeWidth="8" strokeLinecap="round" /></> : <><path d="M109 70h74v77h-74z" fill={forest} /><path d="M101 150h90" stroke={clay} strokeWidth="10" strokeLinecap="round" /><path d="M111 151l-13 62m76-62 13 62" stroke={ink} strokeWidth="8" /></> }
function Stool() { return <><rect x="93" y="99" width="114" height="28" rx="10" fill={clay} /><path d="M111 128l-16 82m94-82 16 82" stroke={ink} strokeWidth="9" strokeLinecap="round" /><path d="M95 211h110" stroke={forest} strokeWidth="7" /></> }
function Bench() { return <><rect x="62" y="115" width="176" height="34" rx="5" fill={clay} /><path d="M84 151l-13 58m158-58 13 58" stroke={ink} strokeWidth="9" /><path d="M63 210h174" stroke={forest} strokeWidth="7" /></> }
function Textile({ rug = false, runner = false }) { return rug ? <><rect x="64" y="65" width="172" height="150" rx="14" fill={clay} /><path d="M83 96h134M83 125h134M83 154h134M83 183h134" stroke={paper} strokeWidth="5" /></> : <><rect x={runner ? 45 : 85} y={runner ? 100 : 64} width={runner ? 210 : 130} height={runner ? 54 : 150} rx="12" fill={forest} /><path d={runner ? 'M67 117h166m-166 20h166' : 'M107 86h86m-86 27h86m-86 27h86m-86 27h86'} stroke={clay} strokeWidth="5" /><path d={runner ? 'M45 155h210' : 'M85 215h130'} stroke={ink} strokeWidth="6" /></> }
function Clock() { return <><circle cx="150" cy="132" r="70" fill={paper} stroke={forest} strokeWidth="9" /><path d="M150 90v43l31 20" stroke={clay} strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" /><path d="M91 67l-18-19m136 19 18-19" stroke={ink} strokeWidth="8" strokeLinecap="round" /></> }
function Book({ stand = false, paper = false }) { return paper ? <><rect x="92" y="55" width="116" height="152" rx="7" fill={paper} stroke={forest} strokeWidth="7" /><path d="M119 92h63m-63 25h63m-63 25h63m-63 25h42" stroke={clay} strokeWidth="6" strokeLinecap="round" /><path d="M111 207h78" stroke={ink} strokeWidth="7" /></> : <><path d="M73 95l76 20 77-20v105l-77 21-76-21z" fill={stand ? clay : forest} /><path d="M149 115v106" stroke={paper} strokeWidth="5" /><path d="M95 128l34 9m74-9-34 9" stroke={paper} strokeWidth="5" /></> }
function PenCup() { return <><path d="M103 95h94l-10 110h-74z" fill={clay} /><path d="M120 95V49m30 46V40m30 55V58" stroke={ink} strokeWidth="8" strokeLinecap="round" /><path d="M105 205h90" stroke={forest} strokeWidth="7" /></> }
function Mug({ carafe = false, cup = false }) { return carafe ? <><path d="M120 58h60l-8 44 34 43v56H94v-56l34-43z" fill={paper} stroke={forest} strokeWidth="7" /><path d="M112 151h76" stroke={clay} strokeWidth="18" /></> : <><path d="M89 99h100v85c0 17-13 28-30 28h-40c-17 0-30-11-30-28z" fill={cup ? clay : forest} /><path d="M189 118h25c17 0 19 52-9 52h-16" fill="none" stroke={ink} strokeWidth="8" /><path d="M110 125h56" stroke={paper} strokeWidth="6" /></> }
function Board() { return <><rect x="79" y="65" width="142" height="151" rx="14" fill={clay} /><circle cx="190" cy="92" r="9" fill={paper} /><path d="M99 190h88" stroke={paper} strokeWidth="6" /></> }
function Apron() { return <><path d="M111 61h78l14 42-21 115h-64L97 103z" fill={forest} /><path d="M112 85c0 25 76 25 76 0M118 150h64" fill="none" stroke={clay} strokeWidth="7" /><path d="M112 61c0 31-31 22-38 51m115-51c0 31 31 22 38 51" fill="none" stroke={ink} strokeWidth="7" /></> }
function Bottle({ candle = false, soap = false }) { return soap ? <><rect x="89" y="103" width="122" height="90" rx="28" fill={clay} /><path d="M112 132h76" stroke={paper} strokeWidth="6" /><path d="M105 205h90" stroke={forest} strokeWidth="7" /></> : candle ? <><rect x="99" y="92" width="102" height="113" rx="10" fill={clay} /><path d="M150 81c-20-19 0-42 0-42s20 23 0 42z" fill={forest} /><path d="M119 126h62" stroke={paper} strokeWidth="6" /></> : <><rect x="105" y="86" width="90" height="122" rx="10" fill={forest} /><rect x="123" y="56" width="54" height="35" rx="5" fill={clay} /><path d="M150 50v22" stroke={ink} strokeWidth="7" /><path d="M122 132h56" stroke={paper} strokeWidth="6" /></> }
function Basket() { return <><path d="M81 101h138l-12 106H93z" fill={clay} /><path d="M101 101c0-49 98-49 98 0" fill="none" stroke={forest} strokeWidth="8" /><path d="M100 126h100m-96 24h92m-88 24h84" stroke={paper} strokeWidth="5" /></> }
function Mirror() { return <><circle cx="150" cy="129" r="74" fill={paper} stroke={clay} strokeWidth="13" /><path d="M97 178c24 14 64 17 104-8" fill="none" stroke={forest} strokeWidth="6" strokeLinecap="round" /></> }
function Hook() { return <><path d="M150 55v79c0 43-61 40-61 0 0-27 38-27 38-5" fill="none" stroke={forest} strokeWidth="14" strokeLinecap="round" /><circle cx="150" cy="55" r="16" fill={clay} /></> }

function drawing(product) {
  const name = product.name.toLowerCase()
  if (name.includes('floor lamp')) return <Lamp floor />
  if (name.includes('table lamp')) return <Lamp />
  if (name.includes('wall light')) return <Lamp wall />
  if (name.includes('pendant')) return <Lamp pendant />
  if (name.includes('vase')) return <Vase />
  if (name.includes('bowl')) return <Bowl />
  if (name.includes('tray')) return <Tray />
  if (name.includes('glass')) return <Glasses />
  if (name.includes('chair')) return <Chair lounge={name.includes('lounge')} />
  if (name.includes('stool')) return <Stool />
  if (name.includes('bench')) return <Bench />
  if (name.includes('bedside')) return <Book stand />
  if (name.includes('throw') || name.includes('pillow') || name.includes('cushion')) return <Textile />
  if (name.includes('runner')) return <Textile runner />
  if (name.includes('rug')) return <Textile rug />
  if (name.includes('clock')) return <Clock />
  if (name.includes('book stand') || name.includes('bookend')) return <Book stand />
  if (name.includes('paper')) return <Book paper />
  if (name.includes('pen')) return <PenCup />
  if (name.includes('mug') || name.includes('espresso')) return <Mug cup={name.includes('espresso')} />
  if (name.includes('carafe')) return <Mug carafe />
  if (name.includes('board')) return <Board />
  if (name.includes('apron')) return <Apron />
  if (name.includes('spray')) return <Bottle />
  if (name.includes('candle')) return <Bottle candle />
  if (name.includes('soap')) return <Bottle soap />
  if (name.includes('basket')) return <Basket />
  if (name.includes('mirror')) return <Mirror />
  if (name.includes('hook')) return <Hook />
  return <Vase />
}

export default function ProductVisual({ product, size = 'card' }) {
  return <div className={`product-visual product-visual--${size}`} aria-label={`${product.name} product illustration`} role="img"><svg viewBox="0 0 300 250" aria-hidden="true">{drawing(product)}</svg><span className="visual-caption">{product.category}</span></div>
}
