"use client";

import { Product, Size, SizePrice } from "@/types";
import React, { useEffect, useState } from "react";
import Currency from "./ui/currency";
import Button from "./ui/button";
import { ShoppingCart } from "lucide-react";
import useCart from "@/hooks/use-cart";


interface InfoProps {
    data: Product;
}
const Info: React.FC<InfoProps> = ({
    data
}) => {
    const cart = useCart();

    const [selectedSizePrice, setSelectedSizePrice] = useState <SizePrice | null>(null);
    const [selectedSize, setSelectedSize] = useState<Size | null>(null);
    const [quantity, setQuantity] = useState<number>(1); 

    useEffect(() => {
        // Find the size price with the smallest price
        if (data.sizePrices.length === 1 || data.sizePrices[0].size.name === 'Not Applicable') {
            setSelectedSize(data.sizePrices[0]?.size || ''); // Set the default selected size to the only available size
            setSelectedSizePrice(data.sizePrices[0])
        } else {
            const smallestPriceSize = data.sizePrices.reduce((prev, current) => (prev.price < current.price ? prev : current));
            setSelectedSize(smallestPriceSize.size);
            setSelectedSizePrice(smallestPriceSize);
        }
    }, [data.sizePrices]);


    const createSizePrice = (size: Size, price: string, quantity: number): SizePrice => {
        const sizePrice: SizePrice = {
            id: '', 
            price: price,
            size: size,
            quantity: quantity
        };
        return sizePrice;
    };
    
    const onAddToCart = () => {
        const cartData = data;
        cartData.sizePrices = [];
        

        if (selectedSize && selectedSizePrice) {
            const sizePrice = createSizePrice(selectedSize, selectedSizePrice.price, quantity)
            cartData.sizePrices = [sizePrice];
            console.log(cartData);
            cart.addItem(cartData);
        }
        
    };

    const handleSizeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        // Find the selected size from the sizePrices array
        const newSizeId = event.target.value;
        const newSizePrice = data.sizePrices.find(sizePrice => sizePrice.size.id === newSizeId);
        
        if (newSizePrice) {
            // Update the selected size and size price states
            setSelectedSizePrice(newSizePrice);
            setSelectedSize(newSizePrice.size);
        }
    };

    const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newQuantity = parseInt(event.target.value);
        setQuantity(newQuantity);
    };

    return (  
        <div>
            <h1 className="text-3xl font-bold text-gray-500">{data.name}</h1>
            <div className="mt-3 flex items-end justify-between">
                <p className="text-2xl text-gray-900">
                    {selectedSizePrice != null ? <Currency value={selectedSizePrice.price}/> : <Currency value={0}/>}
                </p>
            </div>
            <hr className="my-4"/>
            {data.sizePrices.length >= 1 && data.sizePrices[0].size?.name !== 'Not Applicable' && (
                <div className="flex flex-col gap-y-6">
                    <div className="flex item-center gap-x-4">
                        <label htmlFor="size" className="font-semibol text-black">Size:</label>
                        <select id="size" name="size" value={selectedSize?.id} onChange={handleSizeChange}>
                            {data.sizePrices.map(sizePrice => (
                                <option key={sizePrice.size.id} value={sizePrice.size.id}>{sizePrice.size.name}</option>
                            ))}
                        </select>
                    </div>
                </div>
            )}
            <div className="flex items-center gap-x-4">
                <label htmlFor="quantity" className="font-semibold text-black">Quantity:</label>
                <input 
                    type="number" 
                    id="quantity" 
                    name="quantity" 
                    min={1} 
                    value={quantity} 
                    onChange={handleQuantityChange} 
                    className="border rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            <div className="mt-10 flex items-center gap-x-3">
                <Button onClick={onAddToCart} className="flex items-center gap-x-2">
                    Add to cart
                    <ShoppingCart />
                </Button>
            </div>            
        </div>
    );
}
 
export default Info;