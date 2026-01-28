'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'

/**
 * Error Boundary для обработки ошибок в приложении
 * Клиентский компонент для обработки ошибок
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Application error:', error)
  }, [error])

  return (
    <div className="container mx-auto flex min-h-screen flex-col items-center justify-center px-4">
      <div className="text-center">
        <h1 className="font-display text-4xl font-bold text-foreground">
          Что-то пошло не так
        </h1>
        <p className="mt-4 text-muted-foreground">
          Произошла ошибка при загрузке страницы
        </p>
        {error.digest && (
          <p className="mt-2 text-sm text-muted-foreground">
            Код ошибки: {error.digest}
          </p>
        )}
        <Button onClick={reset} className="mt-6">
          Попробовать снова
        </Button>
      </div>
    </div>
  )
}
