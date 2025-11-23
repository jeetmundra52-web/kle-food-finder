export interface MenuItem {
    id: number;
    name: string;
    category: string;
    price: number;
    isVeg: boolean;
    description?: string;
}

export interface Outlet {
    id: number | string;
    name: string;
    description: string;
    image: string;
    rating: number;
    deliveryTime: string;
    priceRange: string;
    type: string;
    isVeg: boolean;
    isOpen: boolean;
    menu?: MenuItem[];
}
