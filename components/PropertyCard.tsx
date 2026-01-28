import Image from 'next/image'
import { MapPin, Bed, Maximize } from 'lucide-react'
import { type Currency } from '@/lib/currency'
import { type Property } from '@/data/properties'
import { PriceDisplay } from '@/components/PriceDisplay'
import { Card, CardContent } from '@/components/ui/card'

interface PropertyCardProps {
  property: Property
  currency: Currency
  index: number
}

/**
 * Компонент карточки объекта недвижимости
 * 
 * Рендеринг: Server Component (SSR)
 * - Рендерится на сервере
 * - Использует Next.js Image для оптимизации
 * - Принимает валюту как prop от родительского серверного компонента
 */
export function PropertyCard({ property, currency, index }: PropertyCardProps) {
  return (
    <Card
      className="group flex h-full flex-col overflow-hidden border-border bg-card transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={property.imageUrl}
          alt={property.title}
          fill
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent" />
        <div className="absolute bottom-3 left-3 right-3">
          <div className="flex items-center gap-1.5 text-white/90">
            <MapPin className="h-3.5 w-3.5" />
            <span className="text-sm font-medium">{property.location}</span>
          </div>
        </div>
      </div>
      <CardContent className="flex flex-1 flex-col p-4">
        <h3 className="font-display text-lg font-semibold leading-tight text-card-foreground line-clamp-2">
          {property.title}
        </h3>

        <div className="mt-auto">
          <div className="mt-3 flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <Bed className="h-4 w-4" />
              <span>{property.bedrooms} спальни</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Maximize className="h-4 w-4" />
              <span>{property.area} м²</span>
            </div>
          </div>

          <div className="mt-4 border-t border-border pt-3">
            <PriceDisplay
              priceInThb={property.price}
              currency={currency}
              className="text-xl font-display font-bold text-primary"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
