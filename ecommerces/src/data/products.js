const image = (id) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=900&q=85`

const productRows = [
  ['Pine Floor Lamp', 'Lighting', 189, 8, 'photo-1507473885765-e6ed057f782c', 'Oak, linen, steel', 'H 148 × W 42 cm'],
  ['Morrow Table Lamp', 'Lighting', 96, 12, 'photo-1507473885765-e6ed057f782c', 'Powder-coated steel', 'H 36 × W 18 cm'],
  ['Terrace Wall Light', 'Lighting', 74, 17, 'photo-1513506003901-1e6a229e2d15', 'Brushed aluminum', 'H 17 × W 13 cm'],
  ['Halo Pendant', 'Lighting', 142, 5, 'photo-1540932239986-30128078f3c5', 'Rice paper, steel', 'Ø 52 cm'],
  ['Field Ceramic Vase', 'Homeware', 58, 19, 'photo-1610701596007-11502861dcfa', 'Stoneware', 'H 22 × W 18 cm'],
  ['Dune Serving Bowl', 'Homeware', 48, 23, 'photo-1603199506016-b9a594b593c0', 'Glazed stoneware', 'Ø 28 cm'],
  ['Ashwood Tray', 'Homeware', 42, 14, 'photo-1604335399105-a0c585fd81a1', 'Solid ash wood', 'L 38 × W 26 cm'],
  ['Linear Glass Set', 'Homeware', 36, 30, 'photo-1513558161293-cdaf765ed2fd', 'Mouth-blown glass', 'Set of 4, 280 ml'],
  ['Oak Side Chair', 'Furniture', 225, 6, 'photo-1503602642458-232111445657', 'Oak, natural cord', 'H 78 × W 47 × D 51 cm'],
  ['Lowline Stool', 'Furniture', 119, 11, 'photo-1555041469-a586c61ea9bc', 'Solid beech', 'H 45 × W 39 cm'],
  ['Moss Lounge Chair', 'Furniture', 480, 4, 'photo-1555041469-a586c61ea9bc', 'Oak, wool blend', 'H 76 × W 71 × D 78 cm'],
  ['River Bench', 'Furniture', 315, 7, 'photo-1567538096630-e0c55bd6374c', 'Solid oak', 'L 120 × W 35 × H 45 cm'],
  ['Woven Cotton Throw', 'Textiles', 69, 22, 'photo-1580301762395-2d6cfd7dc6a6', '100% cotton', '130 × 180 cm'],
  ['Clay Cushion Cover', 'Textiles', 34, 36, 'photo-1584100936595-c0654b55a2e2', '100% linen', '50 × 50 cm'],
  ['Loom Runner', 'Textiles', 52, 15, 'photo-1600210492486-724fe5c67fb0', 'Cotton and linen', '45 × 180 cm'],
  ['Merino Wool Rug', 'Textiles', 290, 9, 'photo-1575414003591-ece8d0416c7a', 'New Zealand wool', '160 × 230 cm'],
  ['Fold Desk Clock', 'Workspace', 54, 27, 'photo-1494438639946-1ebd1d20bf85', 'Aluminum, ABS', 'H 8 × W 12 cm'],
  ['Ledge Book Stand', 'Workspace', 46, 18, 'photo-1494438639946-1ebd1d20bf85', 'Solid oak', 'H 20 × W 25 cm'],
  ['Graph Paper Pad', 'Workspace', 18, 45, 'photo-1517841905240-472988babdf9', 'FSC paper', 'A5, set of 3'],
  ['Brass Pen Cup', 'Workspace', 31, 24, 'photo-1586953208448-b95a79798f07', 'Brushed brass', 'H 10 × Ø 8 cm'],
  ['Vale Mug', 'Kitchen', 27, 38, 'photo-1514228742587-6b1558fcca3d', 'Stoneware', '350 ml'],
  ['Hearth Carafe', 'Kitchen', 62, 12, 'photo-1544125945-f919b7e9b8d3', 'Borosilicate glass', '1.2 L'],
  ['Walnut Board', 'Kitchen', 84, 10, 'photo-1610701596007-11502861dcfa', 'American walnut', 'L 42 × W 24 cm'],
  ['Flax Apron', 'Kitchen', 49, 21, 'photo-1583845112203-454c9f3d9ab7', '100% linen', 'One size'],
  ['Sage Room Spray', 'Wellbeing', 29, 32, 'photo-1608248597279-f99d160bfcbc', 'Natural fragrance blend', '100 ml'],
  ['Quiet Hour Candle', 'Wellbeing', 38, 20, 'photo-1602874801006-e26e27d20f31', 'Soy wax, cotton wick', '45 hour burn'],
  ['Linen Eye Pillow', 'Wellbeing', 24, 41, 'photo-1544161515-4ab6ce6db874', 'Linen, flaxseed', '23 × 10 cm'],
  ['Stone Soap Dish', 'Wellbeing', 22, 25, 'photo-1600857544200-b2f666a9a2ec', 'Travertine', '12 × 9 cm'],
  ['Cedar Coat Hook', 'Homeware', 18, 50, 'photo-1586023492125-27b2c045efd7', 'Cedar wood', 'H 8 × W 5 cm'],
  ['Round Mirror', 'Homeware', 126, 9, 'photo-1618220179428-22790b461013', 'Oak, mirror glass', 'Ø 60 cm'],
  ['Cove Bedside Table', 'Furniture', 246, 5, 'photo-1558997519-83ea9252edf8', 'Oak veneer, solid oak', 'H 54 × W 42 × D 36 cm'],
  ['Paper Shade Table Lamp', 'Lighting', 116, 13, 'photo-1540932239986-30128078f3c5', 'Rice paper, steel', 'H 42 × Ø 30 cm'],
  ['Milled Wool Pillow', 'Textiles', 45, 26, 'photo-1505693416388-ac5ce068fe85', 'Wool blend, cotton', '45 × 45 cm'],
  ['Arc Bookend Pair', 'Workspace', 44, 16, 'photo-1589998059171-988d887df646', 'Powder-coated steel', 'H 16 × W 13 cm'],
  ['Dawn Espresso Cup', 'Kitchen', 19, 60, 'photo-1495474472287-4d71bcdd2085', 'Stoneware', '120 ml'],
  ['Nook Storage Basket', 'Homeware', 57, 18, 'photo-1594224457860-23c8e6f6df29', 'Seagrass', 'H 36 × Ø 38 cm'],
]

const descriptions = {
  Lighting: 'A well-made light with a warm, gentle finish. It brings useful light to the places you use every day.',
  Homeware: 'A practical piece for daily use, finished with simple lines and materials that age well.',
  Furniture: 'A sturdy, considered piece with a quiet profile that fits easily into everyday spaces.',
  Textiles: 'A soft, tactile layer made to bring a little warmth and comfort to your room.',
  Workspace: 'A useful desktop essential that keeps your work area calm and easy to use.',
  Kitchen: 'An everyday kitchen piece that is simple to use, easy to care for, and made to last.',
  Wellbeing: 'A small daily ritual for a slower, calmer moment at home.',
}

export const products = productRows.map(([name, category, price, stock, photo, material, size], index) => ({
  id: index + 1, name, category, price, stock, material, size, image: image(photo), description: descriptions[category],
}))
