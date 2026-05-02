#!/usr/bin/env python3
import pandas as pd
import json

# Read Excel file
excel_file = '/Users/firdaus/Desktop/SENARAI BB.xlsx'
df = pd.read_excel(excel_file)

# Print column names to verify structure
print("=== COLUMN NAMES ===")
print(df.columns.tolist())
print("\n=== FIRST 5 ROWS ===")
print(df.head())
print("\n=== DATA INFO ===")
print(f"Total rows: {len(df)}")
print(f"Total columns: {len(df.columns)}")

# Print sample data
print("\n=== SAMPLE PRODUCT ===")
if len(df) > 0:
    print(df.iloc[0].to_dict())

# Convert to JSON format
products = []
for index, row in df.iterrows():
    product = {
        'id': str(row.iloc[0]) if pd.notna(row.iloc[0]) else f"P{index+1}",  # Column A: Kod Product
        'name': str(row.iloc[1]) if pd.notna(row.iloc[1]) else "",  # Column B: Nama Product (English)
        'nameChinese': str(row.iloc[2]) if pd.notna(row.iloc[2]) else "",  # Column C: Nama China
        'price': float(row.iloc[3]) if pd.notna(row.iloc[3]) else 0,  # Column D: Harga (RM)
        'category': str(row.iloc[4]) if pd.notna(row.iloc[4]) else "",  # Column E: Kategori
        'imageOriginal': str(row.iloc[5]) if pd.notna(row.iloc[5]) else "",  # Column F: Link Gambar (original)
        'videoOriginal': str(row.iloc[6]) if pd.notna(row.iloc[6]) else "",  # Column G: Link Video (original)
        'purchaseLink': str(row.iloc[7]) if pd.notna(row.iloc[7]) else "",  # Column H: Link Product (take.app)
        'image': str(row.iloc[8]) if pd.notna(row.iloc[8]) else "",  # Column I: Link Gambar CF
        'video': str(row.iloc[9]) if pd.notna(row.iloc[9]) else "",  # Column J: Link Video CF
    }
    products.append(product)

# Save to JSON file
output_file = '/Users/firdaus/bmfireworks.com-source/bearboom_products.json'
with open(output_file, 'w', encoding='utf-8') as f:
    json.dump(products, f, ensure_ascii=False, indent=2)

print(f"\n✅ Converted {len(products)} products to JSON")
print(f"📁 Saved to: {output_file}")

# Statistics
products_with_images = sum(1 for p in products if p['image'])
products_with_videos = sum(1 for p in products if p['video'])
categories = list(set(p['category'] for p in products if p['category']))

print(f"\n=== STATISTICS ===")
print(f"Total products: {len(products)}")
print(f"Products with images: {products_with_images}")
print(f"Products with videos: {products_with_videos}")
print(f"Categories: {len(categories)}")
print(f"Category list: {', '.join(sorted(categories))}")
