"use client";

import { Product } from "@/types";
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

    const [selectedSize, setSelectedSize] = useState<string>(''); 

    useEffect(() => {
        // Find the size price with the smallest price
        if (data.sizePrices.length === 1 || data.sizePrices[0].size.name === 'Not Applicable') {
            setSelectedSize(data.sizePrices[0]?.size.id || ''); // Set the default selected size to the only available size
        } else {
            const smallestPriceSize = data.sizePrices.reduce((prev, current) => (prev.price < current.price ? prev : current));
            setSelectedSize(smallestPriceSize.size.id);
        }
    }, [data.sizePrices]);

    useEffect(() => {
        if (data.sizePrices.length === 1 || data.sizePrices[0].size.name === 'Not Applicable') {
            setSelectedSize(data.sizePrices[0]?.size.id || ''); // Set the default selected size to the only available size
        }
    }, [data.sizePrices]);


    const onAddToCart = () => {
        cart.addItem(data);
    };

    const handleSizeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedSize(event.target.value); // Update the selected size when the dropdown value changes
    };

    const selectedSizePrice = data.sizePrices.find(sizePrice => sizePrice.size.id === selectedSize);

    return (  
        <div>
            <h1 className="text-3xl font-bold text-gray-500">{data.name}</h1>
            <div className="mt-3 flex items-end justify-between">
                <p className="text-2xl text-gray-900">
                    {selectedSizePrice ? <Currency value={selectedSizePrice.price}/> : <Currency value={0}/>}
                </p>
            </div>
            <hr className="my-4"/>
            {data.sizePrices.length == 1 && data.sizePrices[0].size?.name !== 'Not Applicable' && (
                <div className="flex flex-col gap-y-6">
                    <div className="flex item-center gap-x-4">
                        <label htmlFor="size" className="font-semibol text-black">Size:</label>
                        <select id="size" name="size" value={selectedSize} onChange={handleSizeChange}>
                            <option value="">Select a size</option>
                            {data.sizePrices.map(sizePrice => (
                                <option key={sizePrice.size.id} value={sizePrice.size.id}>{sizePrice.size.name}</option>
                            ))}
                        </select>
                    </div>
                </div>
            )}
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