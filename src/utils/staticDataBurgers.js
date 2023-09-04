const today = new Date()
const threeHoursAgo = new Date(
  today.getFullYear(),
  today.getMonth(),
  today.getDate(),
  today.getHours() - 3,
  today.getMinutes() - 1,
  0
)
const yesterday = new Date(
  today.getFullYear(),
  today.getMonth(),
  today.getDate() - 1,
  today.getHours() - 3,
  today.getMinutes() + 20,
  0
)

const twoDaysAgo = new Date(
  today.getFullYear(),
  today.getMonth(),
  today.getDate() - 3,
  today.getHours() + 5,
  today.getMinutes() + 38
)

export const burgersData = [
  {
    id: crypto.randomUUID(),
    number: '#034535',
    title: 'Death Star Starship Main бургер',
    price: 480,
    date: today,
    status: 'Создан',
    items: [
      { image: '../image/bun.png', name: 'Флюоресцентная булка R2-D3', price: 988 },
      { image: '../image/филе.png', name: 'Филе Люминесцентного тетраодонтимформа', price: 988 },
      {
        image: '../image/кристаллы.png',
        name: 'Кристаллы марсианских альфа-сахаридов',
        price: 762
      },
      { image: '../image/кольца.png', name: 'Хрустящие минеральные кольца', price: 300 },
      {
        image: '../image/соус-галактический.png',
        name: 'Соус традиционный галактический',
        price: 15
      }
    ]
  },
  {
    id: crypto.randomUUID(),
    title: 'Interstellar бургер',
    number: '#034534',
    price: 560,
    date: threeHoursAgo,
    status: 'Готовится',
    items: [
      { image: '../image/bun.png', name: 'Флюоресцентная булка R2-D3', price: 988 },
      { image: '../image/филе.png', name: 'Филе Люминесцентного тетраодонтимформа', price: 988 },
      {
        image: '../image/кристаллы.png',
        name: 'Кристаллы марсианских альфа-сахаридов',
        price: 762
      },
      { image: '../image/кольца.png', name: 'Хрустящие минеральные кольца', price: 300 },
      {
        image: '../image/соус-галактический.png',
        name: 'Соус традиционный галактический',
        price: 15
      },
      { image: '../image/плоды.png', name: 'Плоды фалленианского дерева', price: 874 },
      { image: '../image/филе.png', name: 'Филе Люминесцентного тетраодонтимформа', price: 988 },
      { image: '../image/салат.png', name: 'Мини-салат Экзо-Плантаго', price: 4400 }
    ]
  },
  {
    id: crypto.randomUUID(),
    title: 'Black Hole Singularity острый бургер',
    number: '#034533',
    price: 510,
    date: yesterday,
    status: 'Отменен',
    items: [
      { image: '../image/bun.png', name: 'Флюоресцентная булка R2-D3', price: 988 },
      { image: '../image/филе.png', name: 'Филе Люминесцентного тетраодонтимформа', price: 988 },
      { image: '../image/плоды.png', name: 'Плоды фалленианского дерева', price: 874 },
      { image: '../image/кольца.png', name: 'Хрустящие минеральные кольца', price: 300 },
      { image: '../image/салат.png', name: 'Мини-салат Экзо-Плантаго', price: 4400 }
    ]
  },
  {
    id: crypto.randomUUID(),
    title: 'Supernova Infinity бургер',
    number: '#034532',
    price: 370,
    date: twoDaysAgo,
    status: 'Выполнен',
    items: [
      { image: '../image/bun.png', name: 'Флюоресцентная булка R2-D3', price: 988 },
      { image: '../image/филе.png', name: 'Филе Люминесцентного тетраодонтимформа', price: 988 },
      { image: '../image/плоды.png', name: 'Плоды фалленианского дерева', price: 874 }
    ]
  }
]
