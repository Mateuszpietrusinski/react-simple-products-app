export interface Product {
    id: string;
    title: string;
    thumbnail: string;
    category: string;
    price: number;
    description: string;
}

export interface IResponseProducts {
    products: Product[]
    total: number;
    skip: number;
    limit: number;
}