export interface Billboard {
    id: string;
    label: string;
    imageUrl: string;
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
    price: string;
    isFeatured: boolean;
    size: Size;
    images: Image[];
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