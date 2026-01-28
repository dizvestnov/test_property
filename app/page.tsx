import { getCurrencyFromCookies } from '@/lib/cookies'
import { properties } from '@/data/properties'
import { PropertyCard } from '@/components/PropertyCard'

/**
 * Main page with list of real estate properties
 * 
 * Rendering: Dynamic SSR
 * - Uses async to get cookies (dynamic data)
 * - Rendered on the server on each request
 * - Supports SSR without flickering thanks to cookies
 */
export default async function HomePage() {
  const currency = await getCurrencyFromCookies()

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h2 className="font-display text-2xl font-semibold text-foreground">
          Доступные объекты
        </h2>
        <p className="mt-1 text-muted-foreground">
          {properties.length} объектов недвижимости
        </p>
      </div>
      <div className="grid auto-rows-fr gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {properties.map((property, index) => (
          <PropertyCard
            key={property.id}
            property={property}
            currency={currency}
            index={index}
          />
        ))}
      </div>
    </main>
  )
}
