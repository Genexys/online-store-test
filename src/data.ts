type characteristic = string | number | boolean;

export interface Product {
  id: number;
  title: string;
  src: string;
  description: string;
  price: number;
  amount: number;
  characteristic: Record<string, characteristic>;
}

const products: Product[] = [
  {
    id: 123,
    title: 'Product 1123',
    src: 'https://placehold.co/200x200',
    description: 'This is product 1123',
    price: 1000,
    amount: 0,
    characteristic: {
      color: 'red',
      coolness: true,
    },
  },
  {
    id: 1,
    title: 'Product 1',
    description: 'Et sunt irure nulla labore ipsum.',
    src: 'https://placehold.co/200x200',
    price: 100,
    amount: 0,
    characteristic: {
      color: 'red',
      coolness: false,
    },
  },
  {
    id: 2,
    title: 'Product 2',
    description: 'Et sunt irure nulla labore ipsum.',
    src: 'https://placehold.co/200x200',
    price: 200,
    amount: 0,
    characteristic: {
      color: 'green',
      coolness: true,
    },
  },
  {
    id: 3,
    title: 'Product 3',
    description: 'Et sunt irure nulla labore ipsum.',
    src: 'https://placehold.co/200x200',
    price: 300,
    amount: 0,
    characteristic: {
      color: 'blue',
      coolness: false,
    },
  },
];

export default products;
