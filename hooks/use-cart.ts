import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware"; 

import { Product } from "@/types";
import toast from "react-hot-toast";

interface CartStore {
    items: Product[];
    addItem: (data: Product) => void;
    removeItem: (id: string, size: string) => void;
    removeAll: () => void;
};

const useCart = create(
    persist<CartStore>((set, get) => ({
        items: [],
        addItem: (data: Product) => {
            const currentItems = get().items;
            const existingItemIndex = currentItems.findIndex((item) => item.id === data.id && item.sizePrices[0].size === data.sizePrices[0].size);

            if (existingItemIndex !== -1) {
                // If item already exists, increase its quantity by 1
                const updatedItems = [...currentItems];
                updatedItems[existingItemIndex].sizePrices[0].quantity += 1;
                set({ items: updatedItems });
                toast.success("Quantity increased");
            } else {
                // If item doesn't exist, add it to the cart
                set({items: [...get().items, data]});
                toast.success("Item added to cart");
            }

            // set({items: [...get().items, data]});
            // toast.success("Item added to cart");
        },

        removeItem: (id: string, size: string) => {
            const currentItems = get().items;
            
            // Find the index of the item with the specified ID and size
            const indexToRemove = currentItems.findIndex((item) => item.id === id && item.sizePrices[0].id === size);
        
            if (indexToRemove !== -1) {
                // If the item is found, remove it from the items array
                const updatedItems = [...currentItems.slice(0, indexToRemove), ...currentItems.slice(indexToRemove + 1)];
                set({ items: updatedItems });
                toast.success("Item removed");
            } else {
                toast.error("Item not found in cart");
            }
        },
        

        removeAll: () => set({items: []}),
    }), {
        name: "cart-storage",
        storage: createJSONStorage(() => localStorage)
    })
)

export default useCart;

