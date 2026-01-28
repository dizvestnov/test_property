# Real Estate Phuket

Mini-application for displaying a list of real estate properties with currency switching capability.

## Requirements

- **Node.js** >= 20.0.0
- **Bun** >= 1.0.0

## Running the Project

### Development

```bash
bun install && bun dev
```

The application will be available at [http://localhost:3000](http://localhost:3000)

### Production Build

```bash
bun run build
bun run start
```

### Running with Docker

```bash
# Using Docker Compose
docker-compose up

# Or directly with Docker
docker build -t real-estate-app . && docker run -p 3000:3000 real-estate-app
```

## Documentation

Detailed project architecture documentation is available in [docs/architecture.md](./docs/architecture.md).
