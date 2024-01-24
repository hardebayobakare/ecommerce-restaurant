"use client";

import { Product } from "@/types";
import React from "react";
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

    const onAddToCart = () => {
        cart.addItem(data);
    };

    return (  
        <div>
            <h1 className="text-3xl font-bold text-gray-500">{data.name}</h1>
            <div className="mt-3 flex items-end justify-between">
                <p className="text-2xl text-gray-900">
                    <Currency value={data.price}/>
                </p>
            </div>
            <hr className="my-4"/>
            <div className="flex flex-col gap-y-6">
                {data?.size.value !== 'N/A' && (
                <div className="flex item-center gap-x-4">
                    <h3 className="font-semibol text-black">Size:</h3>
                    <div>
                        { data?.size.name}
                    </div>
                </div>
                )}
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