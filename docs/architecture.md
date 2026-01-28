# PPA Phuket Project Architecture

## Overview

The project is a Next.js 16 application for displaying a catalog of real estate properties with currency switching capability. The application uses App Router, server components for SSR, and client components for interactivity.

## Technology Stack

- **Next.js 16** - React framework with App Router
- **TypeScript** - typed JavaScript (strict mode)
- **Tailwind CSS** - utility-first CSS framework
- **Shadcn UI** - UI components based on Radix UI
- **Bun** - package manager and runtime
- **Lucide React** - icon library

## Project Structure

**Important**: The structure follows Next.js 16 App Router recommendations for scalable projects:
- `components/` at root level - shared reusable application components
  - Application components (Header, PropertyCard, CurrencySelect, PriceDisplay) - in root `components/`
  - `components/ui/` - reusable UI library components (Shadcn UI)
- `lib/` at root level - for shared utilities used throughout the application
- `data/` at root level - for static data and application constants
- `app/` - only for routing files (page.tsx, layout.tsx, error.tsx, etc.)
- Separation of server (`lib/cookies.ts`) and client (`lib/cookies-client.ts`) functions

**Scaling**: As the project grows, components specific to particular features/routes can be placed inside `app/[feature]/components/` for colocation. Shared components remain in root `components/`.

```
PPA Phuket/
├── app/                          # App Router directory
│   ├── error.tsx                # Error Boundary (client component)
│   ├── loading.tsx              # Loading UI (server component)
│   ├── not-found.tsx            # 404 page (server component)
│   ├── layout.tsx               # Root layout with metadata and fonts
│   ├── page.tsx                 # Main page with property list
│   └── globals.css              # Global styles and CSS variables
├── components/                   # Reusable components (root level)
│   ├── Header.tsx               # Server component header
│   ├── CurrencySelect.tsx       # Client component for currency selection
│   ├── PropertyCard.tsx          # Property card component
│   ├── PriceDisplay.tsx          # Price display component
│   └── ui/                       # Shadcn UI components (library)
│       ├── button.tsx            # Button component
│       ├── card.tsx              # Card component
│       ├── select.tsx            # Select component
│       └── skeleton.tsx          # Skeleton component for loading states
├── lib/                          # Utilities and helper functions (root level)
│   ├── currency.ts              # Currency and exchange rate handling
│   ├── cookies.ts               # Server-side cookie functions
│   ├── cookies-client.ts        # Client-side cookie functions
│   └── utils.ts                 # Helper functions (cn)
├── data/                         # Application data (root level)
│   └── properties.ts            # Hardcoded property data
├── public/                       # Static files
├── package.json                  # Dependencies and scripts
├── tsconfig.json                # TypeScript configuration
├── tailwind.config.ts           # Tailwind CSS configuration
├── next.config.js               # Next.js configuration
├── Dockerfile                   # Docker configuration
├── docker-compose.yml          # Docker Compose configuration
└── README.md                    # Setup instructions
```

## Next.js 16 App Router Compliance

### Special Convention Files

#### `app/error.tsx`
- **Type**: Client component (`'use client'`)
- **Purpose**: Error Boundary for error handling
- **Functionality**:
  - Catches errors in child components
  - Displays error user interface
  - Provides retry button (`reset()`)
  - Logs errors to console

#### `app/loading.tsx`
- **Type**: Server component
- **Purpose**: Loading UI during data loading
- **Functionality**:
  - Automatically displayed when navigating between pages
  - Shows skeleton loader for cards
  - Improves UX during loading

#### `app/not-found.tsx`
- **Type**: Server component
- **Purpose**: 404 page for non-existent routes
- **Functionality**:
  - Displayed when accessing non-existent route
  - Provides link to home page
  - 404 error user interface

## Component Architecture

### Rendering Types

#### Dynamic SSR (Server-Side Rendering)
- **page.tsx**: Uses `async` function to get cookies
- Rendered on server on each request
- Supports dynamic data (cookies)

#### Server Components (default)
- All components without `'use client'` are server components
- Rendered on server
- No access to browser APIs
- Smaller bundle size

#### Client Components
- Components with `'use client'` directive
- Rendered on client
- Have access to browser APIs and React hooks
- Used only when necessary

### Server Components

#### `app/layout.tsx`
- **Rendering type**: Server Component (SSR)
- **Purpose**: Root layout of the application
- **Functionality**:
  - Font loading via `next/font/google` (Inter, Playfair Display)
  - Setting CSS variables for fonts
  - Rendering Header and children
  - Page metadata
- **Principles**: KISS - simple structure, single responsibility

#### `app/page.tsx`
- **Rendering type**: Dynamic SSR (async function)
- **Purpose**: Main page with property list
- **Functionality**:
  - Getting selected currency from cookies (server-side)
  - Rendering header and card grid
  - Passing currency to each card
- **Principles**: 
  - SSR for cookie support without flickering
  - DRY - reusing PropertyCard components

#### `components/Header.tsx`
- **Rendering type**: Server Component (SSR, async)
- **Purpose**: Header with currency selector
- **Functionality**:
  - Getting current currency from cookies (server-side)
  - Displaying logo and title
  - Rendering CurrencySelect with initial value
  - Sticky positioning with backdrop blur
- **Principles**: 
  - Single Responsibility - only header logic
  - SSR for getting cookies on server

### Client Components

#### `components/CurrencySelect.tsx`
- **Rendering type**: Client Component (`'use client'`)
- **Purpose**: Dropdown for currency selection
- **Functionality**:
  - Displaying current currency
  - Handling currency change
  - Saving selection to cookies (client-side)
  - Updating page via `router.refresh()` for SSR

**Key features**:
- Uses `'use client'` directive (required for interactivity)
- Saves currency to cookies via `setCurrencyCookie()`
- Calls `router.refresh()` to update server components
- Uses `useRouter` hook (only in client components)
- **Principles**: 
  - Single Responsibility - only currency selection
  - Minimal client code (only where necessary)
- **Optimistic UI**: Updates local state immediately while router.refresh() is in progress

#### `components/PropertyCard.tsx`
- **Rendering type**: Server Component (SSR)
- **Purpose**: Real estate property card
- **Functionality**:
  - Displaying image with gradient
  - Showing city over image (MapPin)
  - Displaying title (truncated to 2 lines)
  - Showing features (bedrooms, area)
  - Displaying price in selected currency

**Key features**:
- Uses Next.js Image for image optimization
- Hover effects (scale, translate-y, shadow)
- Gradient over image for text readability
- Flexbox layout to push price to bottom
- `line-clamp-2` for truncating long titles
- **Principles**: 
  - DRY - reusable component
  - KISS - simple structure, clear logic
  - Single Responsibility - only card display

#### `components/PriceDisplay.tsx`
- **Rendering type**: Server Component (SSR)
- **Purpose**: Price display with formatting
- **Functionality**:
  - Converting price from THB to selected currency
  - Formatting with currency symbol using Intl.NumberFormat
  - Support for custom classes
- **Principles**: 
  - DRY - reusable component for price display
  - Single Responsibility - only price formatting and display
  - Pure function - no side effects, only data transformation

## Data Handling

### `data/properties.ts`

Property interface:
```typescript
interface Property {
  id: string
  title: string
  price: number        // Price in THB
  area: number         // Area in m²
  bedrooms: number     // Number of bedrooms
  location: string     // City/location
  imageUrl: string     // Image URL
}
```

### `lib/currency.ts`

**Functions**:
- `convertCurrency(priceInThb, targetCurrency)` - price conversion
- `formatPrice(price, currency)` - formatting with currency symbol using Intl.NumberFormat

**Constants**:
- `CURRENCY_RATES` - exchange rates (THB, USD, EUR, RUB)
- `CURRENCY_CODES` - currency codes for Intl.NumberFormat

### `lib/cookies.ts` and `lib/cookies-client.ts`

**Separation of server and client functions**:

- `cookies.ts` (server-side):
  - `getCurrencyFromCookies()` - getting currency from cookies on server
  - Uses `next/headers` API

- `cookies-client.ts` (client-side):
  - `setCurrencyCookie()` - setting currency in cookies on client
  - Uses `document.cookie` API
  - Marked with `'use client'` directive

## Currency Handling

### Currency Persistence Mechanism

1. **On page load**:
   - Server components `Header` and `page.tsx` get currency from cookies via `getCurrencyFromCookies()`
   - If cookie doesn't exist, default value `THB` is used
   - Page is rendered with correct currency on server

2. **On currency change**:
   - Client component `CurrencySelect` saves selection to cookies via `setCurrencyCookie()`
   - `router.refresh()` is called to update server components
   - Page re-renders with new currency without full reload

3. **SSR without flickering**:
   - Since server knows selected currency from cookies, there's no hydration with default value
   - Prices are displayed correctly from first render

## Styling

### Color Scheme

Defined in `app/globals.css` via CSS variables:
- Warm color palette (golden tones for primary)
- Dark theme support
- Using HSL values for flexibility

### Fonts

- **Playfair Display** - for headings (display font)
- **Inter** - for body text (body font)
- Loaded via `next/font/google` for optimization

### Tailwind CSS

Configuration in `tailwind.config.ts`:
- Custom colors via CSS variables
- Custom fonts (display, body)
- Animations (fade-in, accordion)
- Dark mode support

### Card Components

**Card structure**:
```
Card (flex flex-col h-full)
├── Image Container (aspect-[4/3])
│   ├── Image (Next.js Image)
│   ├── Gradient Overlay
│   └── Location Badge (MapPin + text)
└── CardContent (flex flex-col flex-1)
    ├── Title (line-clamp-2)
    └── Bottom Section (mt-auto)
        ├── Features (bedrooms, area)
        └── Price (with top separator)
```

**Key styles**:
- `h-full flex flex-col` on Card - stretches to full height
- `flex-1 flex-col` on CardContent - takes available space
- `mt-auto` on bottom block - pushes to bottom
- `line-clamp-2` on title - truncates to 2 lines
- `aspect-[4/3]` on image - fixed aspect ratio

## Image Optimization

### Next.js Image

- Uses `Image` component from `next/image`
- Automatic optimization and lazy loading
- Responsive sizes for different screens
- Allowed domains configured in `next.config.js`:
  - `images.unsplash.com`

## Docker Configuration

### Dockerfile

Multi-stage build:
1. **deps** - dependency installation via bun
2. **builder** - application build
3. **runner** - production image with minimal dependencies

Uses `oven/bun:latest` image for all stages.

### docker-compose.yml

Simple configuration for running container on port 3000.

## Design Principles

### SOLID Principles

1. **Single Responsibility Principle (SRP)**
   - Each component has single responsibility
   - `PriceDisplay` - only price display
   - `CurrencySelect` - only currency selection
   - `PropertyCard` - only card display
   - Separation of server and client functions (cookies.ts / cookies-client.ts)

2. **Open/Closed Principle (OCP)**
   - Components open for extension via props
   - `PriceDisplay` accepts `className` for customization
   - Currency types easily extensible via enum

3. **Liskov Substitution Principle (LSP)**
   - Property and Currency interfaces provide contracts
   - Components work with any data matching interfaces

4. **Interface Segregation Principle (ISP)**
   - Narrow interfaces (PropertyCardProps, PriceDisplayProps)
   - Components receive only necessary props

5. **Dependency Inversion Principle (DIP)**
   - Components depend on abstractions (interfaces, types)
   - Utilities isolated and reusable

### DRY (Don't Repeat Yourself)

- Component reuse (`PropertyCard`, `PriceDisplay`)
- Shared utilities (`currency.ts`, `utils.ts`)
- Unified price formatting logic
- Shared styles via Tailwind classes

### KISS (Keep It Simple, Stupid)

- Simple project structure
- Minimal abstractions
- Clear component hierarchy
- Straightforward logic without unnecessary complexity

## Implementation Features

### SSR without Flickering

- Using cookies instead of localStorage for SSR
- Server components get currency at rendering stage
- No hydration with default value
- Dynamic SSR for cookie support

### Type Safety

- Strict TypeScript typing (`strict: true`)
- Types for currencies (`Currency`)
- Interfaces for data (`Property`)
- Typed props for all components

### Performance

- Server components by default (smaller bundle)
- Client components only where necessary (interactivity)
- Image optimization via Next.js Image
- Lazy loading images
- Loading states for improved UX

### Accessibility

- Semantic HTML markup
- Alt text for images
- Proper heading structure
- Error boundaries for error handling
- 404 page for non-existent routes

## Data Flow

### Page Load

```
1. Browser Request
   ↓
2. Next.js Server
   ├── Header gets currency from cookies
   ├── page.tsx gets currency from cookies
   └── Rendering with correct currency
   ↓
3. HTML Response (with correct prices)
   ↓
4. Hydration (only client components)
```

### Currency Change

```
1. User selects currency in CurrencySelect
   ↓
2. setCurrencyCookie() saves to cookies
   ↓
3. router.refresh() updates server components
   ↓
4. Server components get new currency from cookies
   ↓
5. Re-render with new prices (without full reload)
```

## Dependencies

### Core
- `next@16` - Next.js framework
- `react@18` - React library
- `react-dom@18` - React DOM

### UI Components
- `@radix-ui/react-select` - Select component
- `@radix-ui/react-slot` - Slot component for Button
- `lucide-react` - Icons
- `tailwindcss-animate` - Animations for Tailwind

### Utilities
- `class-variance-authority` - Class management
- `clsx` - Conditional classes
- `tailwind-merge` - Tailwind class merging

## Configuration Files

### `next.config.js`
- `output: 'standalone'` - for Docker
- `images.remotePatterns` - allowed image domains

### `tsconfig.json`
- `strict: true` - TypeScript strict mode
- `paths` - import aliases (`@/*`)

### `tailwind.config.ts`
- Custom colors, fonts, animations
- Dark mode support
- `tailwindcss-animate` plugin

## Run Commands

### Development
```bash
bun install && bun dev
```

### Production
```bash
bun run build && bun run start
```

### Docker
```bash
docker-compose up
```

## Future Improvements

1. Adding filters by price, area, number of bedrooms
2. Pagination or infinite scroll
3. Property detail page
4. Search by title/location
5. Property sorting
6. Integration with real API instead of hardcoded data
