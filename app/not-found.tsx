import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Home } from 'lucide-react'

/**
 * 404 page for non-existent routes
 */
export default function NotFound() {
  return (
    <div className="container mx-auto flex min-h-screen flex-col items-center justify-center px-4">
      <div className="text-center">
        <h1 className="font-display text-6xl font-bold text-foreground">
          404
        </h1>
        <h2 className="mt-4 font-display text-2xl font-semibold text-foreground">
          Страница не найдена
        </h2>
        <p className="mt-4 text-muted-foreground">
          Запрашиваемая страница не существует
        </p>
        <Button asChild className="mt-6">
          <Link href="/">
            <Home className="mr-2 h-4 w-4" />
            Вернуться на главную
          </Link>
        </Button>
      </div>
    </div>
  )
}
