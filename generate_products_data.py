#!/usr/bin/env python3
import json
import re

# Function to remove emoji from text
def remove_emoji(text):
    # More comprehensive emoji removal including keycap number emoji
    # Remove variation selectors (VS-16) used in keycap sequences
    text = re.sub(r'[\uFE00-\uFE0F]', '', text)  # variation selectors
    text = re.sub(r'[\u20E3]', '', text)  # combining enclosing keycap

    # Remove emoji
    emoji_pattern = re.compile("["
        u"\U0001F600-\U0001F64F"  # emoticons
        u"\U0001F300-\U0001F5FF"  # symbols & pictographs
        u"\U0001F680-\U0001F6FF"  # transport & map symbols
        u"\U0001F1E0-\U0001F1FF"  # flags (iOS)
        u"\U00002500-\U00002BEF"  # chinese char
        u"\U00002702-\U000027B0"
        u"\U000024C2-\U0001F251"
        u"\U0001f926-\U0001f937"
        u"\U00010000-\U0010ffff"
        u"\u2640-\u2642"
        u"\u2600-\u2B55"
        u"\u200d"
        u"\u23cf"
        u"\u23e9"
        u"\u231a"
        u"\u3030"
        "]+", flags=re.UNICODE)

    result = emoji_pattern.sub(r'', text).strip()

    # Clean up any leftover combining characters
    result = re.sub(r'[\u0300-\u036F]', '', result)

    return result

# Read the JSON data
with open('bearboom_products.json', 'r', encoding='utf-8') as f:
    products_data = json.load(f)

# Remove exact duplicates - keep only unique products based on ID + name + price
seen = set()
unique_products = []
duplicates_removed = 0

for product in products_data:
    # Create unique key from ID, name, and price
    key = (product['id'], product['name'], product['price'])
    if key not in seen:
        seen.add(key)
        unique_products.append(product)
    else:
        duplicates_removed += 1

products_data = unique_products
print(f"ℹ️  Removed {duplicates_removed} exact duplicate products")
print(f"ℹ️  Unique products remaining: {len(products_data)}")

# Category mapping: uppercase to lowercase slug
category_mapping = {
    'FIRECRACKER': 'firecracker',
    'HANDHELD': 'handheld',
    'FOUNTAIN': 'fountain',
    'SINGLE FIREWORKS': 'single-fireworks',
    'MOLD FIREWORKS': 'mold-fireworks',
    'PAPERTUBE FIREWORKS': 'papertube-fireworks',
    'SUNLIGHT FIREWORK': 'sunlight-firework',
    'MAGIC STICK': 'magic-stick',
    'POP POP': 'pop-pop',
    'SNAP POPS': 'snap-pops',
    'SPINNER': 'spinner',
    'ROCKET': 'rocket',
    'SKYSHOW': 'skyshow',
    'PILI CRACKER': 'pili-cracker',
    'COMBO SET': 'combo-set',
    'FOUNTAIN+FIREWORKS': 'fountain-fireworks',
    '5INCH SERIES': '5inch-series',
    '6INCH SERIES': '6inch-series',
    '7INCH SERIES': '7inch-series',
    '8INCH SERIES': '8inch-series',
    '9INCH & ABOVE SERIES': '9inch-above-series',
    'SINGLE COLOR SERIES': 'single-color-series',
    'MONEY GOD SERIES': 'money-god-series',
    'TEDDY BOY SERIES': 'teddy-boy-series',
    'WOLF SERIES': 'wolf-series',
    'WINNING SERIES': 'winning-series',
    'AWARD WINNING': 'award-winning',
}

# Generate products.js
products_js = "export const products = [\n"

for product in products_data:
    category_slug = category_mapping.get(product['category'], product['category'].lower().replace(' ', '-'))

    # Remove emoji and escape quotes in strings
    name = remove_emoji(product['name'])
    # Remove leading number if it was part of number keycap emoji (e.g., "1️⃣")
    name = re.sub(r'^[0-9](?=[A-Z])', '', name).strip()
    name = name.replace("'", "\\'")

    name_chinese = remove_emoji(product['nameChinese']).replace("'", "\\'")

    products_js += f"  {{\n"
    products_js += f"    id: '{product['id']}',\n"
    products_js += f"    category: '{category_slug}',\n"
    products_js += f"    name: '{name}',\n"
    products_js += f"    nameChinese: '{name_chinese}',\n"
    products_js += f"    image: '{product['image']}',\n"

    if product['video']:
        products_js += f"    video: '{product['video']}',\n"

    products_js += f"    price: {product['price']},\n"
    products_js += f"    purchaseLink: '{product['purchaseLink']}',\n"
    products_js += f"    soldOut: false\n"
    products_js += f"  }},\n"

products_js += "];\n"

# Write products.js
with open('src/data/products.js', 'w', encoding='utf-8') as f:
    f.write(products_js)

print(f"✅ Generated products.js with {len(products_data)} products")

# Generate categories.js
categories = {}
for product in products_data:
    cat = product['category']
    if cat and cat not in categories:
        categories[cat] = category_mapping.get(cat, cat.lower().replace(' ', '-'))

categories_js = "export const categories = [\n"
categories_js += "  { id: 'all', name: 'All Products', nameChinese: '全部产品' },\n"

for cat_name, cat_id in sorted(categories.items()):
    # Create display name from uppercase category
    display_name = cat_name.title().replace('Pili', 'Pili')
    categories_js += f"  {{ id: '{cat_id}', name: '{display_name}', nameChinese: '{cat_name}' }},\n"

categories_js += "];\n"

# Write categories.js
with open('src/data/categories.js', 'w', encoding='utf-8') as f:
    f.write(categories_js)

print(f"✅ Generated categories.js with {len(categories) + 1} categories (including 'All')")

# Statistics
products_with_videos = sum(1 for p in products_data if p['video'])
print(f"\n=== SUMMARY ===")
print(f"Total products: {len(products_data)}")
print(f"Products with videos: {products_with_videos}")
print(f"Categories: {len(categories)}")
