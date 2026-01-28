export interface Property {
  id: string
  title: string
  price: number
  area: number
  imageUrl: string
  bedrooms: number
  location: string
}

export const properties: Property[] = [
  {
    id: '1',
    title: 'Современная вилла с бассейном',
    price: 12500000,
    area: 280,
    bedrooms: 4,
    location: 'Пхукет',
    imageUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop',
  },
  {
    id: '2',
    title: 'Уютная квартира в центре',
    price: 3200000,
    area: 65,
    bedrooms: 2,
    location: 'Бангкок',
    imageUrl: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop',
  },
  {
    id: '3',
    title: 'Пентхаус с видом на море',
    price: 18900000,
    area: 320,
    bedrooms: 5,
    location: 'Паттайя',
    imageUrl: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop',
  },
  {
    id: '4',
    title: 'Студия рядом с пляжем',
    price: 1850000,
    area: 35,
    bedrooms: 1,
    location: 'Самуи',
    imageUrl: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop',
  },
  {
    id: '5',
    title: 'Семейный дом с садом',
    price: 8500000,
    area: 180,
    bedrooms: 3,
    location: 'Чиангмай',
    imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop',
  },
  {
    id: '6',
    title: 'Элитные апартаменты премиум класса с панорамным видом на океан и современным дизайном интерьера',
    price: 25000000,
    area: 420,
    bedrooms: 6,
    location: 'Пхукет',
    imageUrl: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop',
  },
  {
    id: '7',
    title: 'Вилла с видом на море',
    price: 15000000,
    area: 350,
    bedrooms: 4,
    location: 'Пхукет',
    imageUrl: 'https://images.unsplash.com/photo-1600585152915-d208bec867a1?w=800&h=600&fit=crop',
  },
  {
    id: '8',
    title: 'Дом у пляжа Банг Тао',
    price: 22000000,
    area: 420,
    bedrooms: 5,
    location: 'Пхукет',
    imageUrl: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&h=600&fit=crop',
  },
]
