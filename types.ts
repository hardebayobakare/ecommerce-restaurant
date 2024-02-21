export interface Billboard {
    id: string;
    label: string;
    imageUrl: string;
    isMainMenu: boolean;
}

export interface Category {
    id: string;
    name: string;
    billboard: Billboard
}

export interface Product {
    id: string;
    category: Category;
    name: String;
    isFeatured: boolean;
    images: Image[];
    sizePrices: SizePrice[];
}

export interface SizePrice {
    id: string;
    price: string;
    size: Size;
}

export interface Size {
    id: string;
    name: string;
    value: string;
}

export interface Image {
    id: string;
    url: string;
}

export interface Restaurant {
    id: string;
    name: string;
}