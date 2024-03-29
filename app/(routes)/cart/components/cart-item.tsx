"use client"

import Image from "next/image";
import { toast} from "react-hot-toast";
import { X } from "lucide-react";

import { Product } from "@/types";
import React from "react";
import IconButton from "@/components/ui/icon-button";
import Currency from "@/components/ui/currency";
import useCart from "@/hooks/use-cart";


interface CartItemProps {
    data: Product;
}

const CartItem: React.FC<CartItemProps> = ({
    data
}) => {
    const cart = useCart();
    
    const onRemove = () => {
        cart.removeItem(data.id, data.sizePrices[0].id);
    }
    return (  
        <li className="flex py-6 border-b">
            <div className="relative h-24 w-24 rounded-md overflow-hidden sm:h-48 sm:w-48">
                <Image fill src={data.images[0].url} alt="" className="object-cover object-center"/>
            </div>
            <div className="relative ml-4 flex flex-1 flex-col juistify-between sm:ml-6">
                <div className="absolute z-10 right-0 top-0">
                    <IconButton onClick={onRemove} icon={<X size={15} />} />
                </div>
                <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6">
                    <div className="flex justify-between">
                        <p className="ext-lg font-semibold text-black">{data.name}</p>
                    </div>
                    {data.sizePrices[0].size.value !== "N/A" && (
                        <div className="mt-1 flex text-sm">
                            <p className="text-gray-500 ml-4 border-l border-gray-200 pl-4">{data.sizePrices[0].size.name}</p>
                        </div>
                    )}
                     <div className="flex items-center">
                        <Currency value={data.sizePrices[0].price} />
                        {data.sizePrices[0].quantity && <span className="text-gray-500 ml-2">x{data.sizePrices[0].quantity}</span>}
                    </div>
                </div>
            </div>
        </li>
    );
}
 
export default CartItem;