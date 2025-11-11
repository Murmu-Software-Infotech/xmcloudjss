# Sitecore JSS Next.js Sample Application

Headless Sitecore SXA + Next.js implementation with **External Catalog Integration** and **Personalization**.

## 🎯 Features

### ✅ Multi-Page Headless SXA Site
- **Product Catalog Page** (`/products`): Filterable product listing with pagination
- **Product Detail Page** (`/products/[id]`): Complete product information with recommendations
- **SXA Component Architecture**: Reusable, datasource-driven components
- **Helix-Compliant Structure**: Foundation, Feature, and Project layers

### ✅ External Catalog Integration
- **Mock REST API** (`/api/products`): Complete product data endpoint
- **Product Service Layer** (`lib/services/productService.ts`): Abstracted external data integration
- **Filtering & Search**: Category, price range, and in-stock filtering
- **Real-time Updates**: Client-side filtering with server-side ISR caching

### ✅ Personalization Engine
- **User Context Tracking**: Unique user IDs, category preferences, purchase history
- **Personalization Rules**: New User, Returning Customer, Premium Buyer, Budget Conscious variants
- **Recommendations**: Smart product suggestions based on user context
- **Session Persistence**: LocalStorage-based personalization data

### ✅ Data Integration
- **GraphQL Support**: Product queries and schema integration
- **Server-Side Rendering**: ISR (Incremental Static Regeneration) for performance
- **API Endpoints**: RESTful product data endpoints
- **Type Safety**: Full TypeScript support

---

## 📂 Project Structure

```
src/
├── components/
│   ├── ProductCatalog.tsx           # Filterable catalog component
│   ├── ProductDetail.tsx            # Product detail component
│   └── graphql/ProductQueries.graphql # GraphQL queries
│
├── lib/
│   ├── services/
│   │   └── productService.ts        # External API integration
│   ├── page-props-factory/
│   │   └── product-page-props-factory.ts # Page data orchestration
│   └── config.ts
│
├── context/
│   ├── PersonalizationContext.tsx   # User personalization state
│   └── ThemeContext.tsx
│
└── pages/
    ├── products/
    │   ├── index.tsx                # Product catalog page
    │   └── [id].tsx                 # Product detail page
    └── api/
        └── products.ts              # Mock product API
```

---

## 🚀 Getting Started

### Installation
```bash
npm install
npm start
```

### Access the Application
- **Catalog**: http://localhost:3000/products
- **Example Product**: http://localhost:3000/products/prod-001
- **API**: http://localhost:3000/api/products

---

## 📖 Documentation

- **[PRODUCT_CATALOG_GUIDE.md](./PRODUCT_CATALOG_GUIDE.md)** - Complete implementation guide
- **[TESTING_GUIDE.md](./TESTING_GUIDE.md)** - Testing scenarios and verification steps

### Documentation Topics
- Helix Architecture Compliance
- SXA Design Patterns
- GraphQL Integration
- External API Integration
- Personalization Flow
- Performance Optimization
- SEO & Structured Data

---

## 🧪 Testing

### Quick Test
```bash
# 1. Browse to products
http://localhost:3000/products

# 2. Test filtering
- Select category
- Adjust price range
- Toggle in-stock filter

# 3. View product detail
- Click any product card
- Check recommendations

# 4. Test API
curl http://localhost:3000/api/products
curl http://localhost:3000/api/products?category=Electronics
curl http://localhost:3000/api/products?id=prod-001
```

### Full Testing Guide
See [TESTING_GUIDE.md](./TESTING_GUIDE.md) for:
- Helix Architecture Tests
- SXA Pattern Tests
- GraphQL Integration Tests
- External API Tests
- Personalization Tests
- Data Flow Tests
- Responsive Design Tests
- Automated Test Scripts

---

## 🔌 API Endpoints

### Products API
```
GET /api/products                    # All products
GET /api/products?id=prod-001        # Specific product
GET /api/products?action=categories  # All categories
GET /api/products?action=recommendations # Recommendations

# Filtering
GET /api/products?category=Electronics&inStock=true
GET /api/products?minPrice=50&maxPrice=200
```

---

## 🎨 Components

### ProductCatalog Component
Reusable catalog component with:
- Dynamic filtering (category, price, stock)
- Server-side and client-side pagination
- Product ratings display
- Responsive grid layout

```tsx
<ProductCatalog
  fields={{
    heading: { value: 'Featured Products' },
    showFilters: { value: 'true' },
    itemsPerPage: { value: '6' }
  }}
  products={products}
/>
```

### ProductDetail Component
Product detail component with:
- Full product information
- Personalized recommendations
- Add-to-cart functionality
- Breadcrumb navigation

---

## 🧠 Personalization

### User Context
```typescript
{
  userId: "user_abc123",
  category: "Electronics",
  previousPurchases: ["prod-001"],
  isNewUser: false,
  visitCount: 5
}
```

### Personalization Variants
- **new-user**: First-time visitors (≤2 visits)
- **returning-customer**: Loyal visitors (>5 visits)
- **premium**: Power buyers (>3 purchases)
- **budget**: Budget-conscious shoppers
- **standard**: Default variant

### Using Personalization
```typescript
const { data, addPurchase, getCurrentVariant } = usePersonalization();

// Track user actions
addPurchase('prod-001');

// Get personalization variant
const variant = getCurrentVariant(); // 'premium' | 'new-user' | etc.
```

---

## 📊 Mock Product Data

5 sample products included:
- Premium Headphones ($199.99)
- Wireless Mouse ($49.99)
- USB-C Cable ($19.99)
- Laptop Stand ($79.99)
- Mechanical Keyboard ($149.99)

To replace with real external API:
1. Update `EXTERNAL_API_BASE` in `productService.ts`
2. Replace mock implementation with real API calls
3. Maintain the same Product interface

---

## 🔄 Data Flow

```
User Request
    ↓
getServerSideProps (Next.js)
    ↓
Product Page Props Factory
    ↓
productService.ts (fetch products)
    ↓
Mock/External API
    ↓
ProductCatalog Component
    ↓
Client-side Filtering
    ↓
PersonalizationContext (track user)
    ↓
HTML Rendered Page
```

---

## ⚙️ Technology Stack

- **Framework**: Next.js 14
- **CMS**: Sitecore XM Cloud / Experience Platform
- **Rendering**: Sitecore JSS
- **UI**: Bootstrap 5 + React
- **State Management**: React Context API
- **GraphQL**: Apollo Client
- **Type Safety**: TypeScript
- **Data Fetching**: Server-side Rendering + ISR

---

## 📈 Performance

- **ISR**: Pages revalidate every 60 seconds
- **Pagination**: Reduces payload size
- **Client-side Filtering**: Immediate UI feedback
- **Memoization**: Optimized re-renders
- **Images**: Optimized with responsive design

---

## 🔒 SEO & Structured Data

- Meta tags (title, description, OG tags)
- Breadcrumb navigation
- Schema.org Product structured data
- Canonical URLs
- Automatic sitemap generation

---

## 🛠️ Development

### Available Scripts

```bash
npm start              # Start dev server with hot reload
npm run build          # Build for production
npm run next:start     # Start production server
npm run lint           # Run ESLint
npm run jss            # Run Sitecore JSS CLI
npm run scaffold       # Create new component
```

### Environment Variables

Create `.env.local`:
```
NEXT_PUBLIC_EXTERNAL_API_URL=http://localhost:3001/api
NEXT_PUBLIC_DISCONNECTED_GRAPHQL=http://localhost:3042/sitecore/api/graph/disconnected
```

---

## 📚 Learn More

### Official Documentation
- [Sitecore JSS (Experience Platform)](https://doc.sitecore.com/xp/en/developers/hd/22/sitecore-headless-development/sitecore-javascript-rendering-sdk--jss--for-next-js.html)
- [Sitecore JSS (XM Cloud)](https://doc.sitecore.com/xmc/en/developers/xm-cloud/sitecore-javascript-rendering-sdk--jss--for-next-js.html)
- [Next.js Documentation](https://nextjs.org/docs)
- [Helix Architecture](https://helix.sitecore.net/)
- [SXA Framework](https://doc.sitecore.com/sxa)

### Related Guides
- [PRODUCT_CATALOG_GUIDE.md](./PRODUCT_CATALOG_GUIDE.md)
- [TESTING_GUIDE.md](./TESTING_GUIDE.md)

---

## 🤝 Contributing

This is a reference implementation. To adapt for your project:

1. **Update Mock Data**: Replace products in `productService.ts`
2. **Connect Real API**: Update API base URL and implementation
3. **Customize Components**: Modify ProductCatalog/ProductDetail for your needs
4. **Extend Personalization**: Add additional rules and variants
5. **Add Features**: Cart, checkout, reviews, etc.

---

## 📝 License

Apache License 2.0
