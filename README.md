# Недвижимость Пхукет

Мини-приложение для отображения списка объектов недвижимости с возможностью переключения валюты.

## Требования

- **Node.js** >= 20.0.0
- **Bun** >= 1.0.0

## Запуск проекта

### Разработка

```bash
bun install && bun dev
```

Приложение будет доступно по адресу [http://localhost:3000](http://localhost:3000)

### Production сборка

```bash
bun run build
bun run start
```

### Запуск через Docker

```bash
# Через Docker Compose
docker-compose up

# Или через Docker напрямую
docker build -t real-estate-app . && docker run -p 3000:3000 real-estate-app
```

## Документация

Подробная документация по архитектуре проекта доступна в [docs/architecture.md](./docs/architecture.md).
