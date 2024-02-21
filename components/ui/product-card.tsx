"use client"

import Image from "next/image";

import { Product, Size, SizePrice } from "@/types";
import IconButton from "@/components/ui/icon-button";
import { Expand, ShoppingCart } from "lucide-react";
import Currency from "@/components/ui/currency";
import { useRouter } from "next/navigation";
import { MouseEventHandler } from "react";
import usePreviewModel from "@/hooks/use-preview-modal";
import useCart from "@/hooks/use-cart";

interface ProductCardProps {
    data: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({
    data
}) => {
    const cart = useCart();
    const previewModal = usePreviewModel();
    const router = useRouter();

    const createSizePrice = (size: Size, price: string, quantity: number): SizePrice => {
        const sizePrice: SizePrice = {
            id: '', 
            price: price,
            size: size,
            quantity: quantity
        };
        return sizePrice;
    };
    
    const handleClick = () => {
        router.push(`/product/${data?.id}`);
    }

    const onPreview: MouseEventHandler<HTMLButtonElement> = (event) => {
        event.stopPropagation();
        previewModal.onOpen(data)
    }

    const onAddToCart: MouseEventHandler<HTMLButtonElement> = (event) => {
        event.stopPropagation();
        const cartData = data;
        cartData.sizePrices = [];
        const sizePrice = createSizePrice(lowestPriceVariant.size, lowestPriceVariant.price, 1);
        cartData.sizePrices = [sizePrice];
        cart.addItem(cartData);
    }

    // Sort the sizePrices based on price and get the first item (lowest price variant)
    const lowestPriceVariant = data.sizePrices.sort((a: SizePrice, b: SizePrice) => parseFloat(a.price) - parseFloat(b.price))[0];


    return (  
        <div onClick={handleClick} className="bg-white group cursor-pointer rounded-xl border p-3 spac-y-4">
            {/* Images and Actions */}
            <div className="aspect-square rounded-xl bg-gray-100 relative">
                <Image
                    src={data?.images?.[0]?.url}
                    fill
                    alt="Image"
                    className="aspect-square object-cover rounded-md" 
                />
                <div className="opacity-0 group-hover:opacity-100 transition absolute w-full px-6 bottom-5">
                    <div className="flex gap-x-6 justify-center">
                        <IconButton onClick={onPreview} icon={<Expand size={20} className="text-gray-600" />}/>
                        <IconButton onClick={onAddToCart} icon={<ShoppingCart size={20} className="text-gray-600" />}/>
                    </div>
                </div>
            </div>
            {/* Description */}
            <div>
                <p className="font-semibold text-lg">
                    {data.name}
                </p>
                <p className="text-sn text-gray-500">
                    {data.category?.name}
                </p>
            </div>
            {/* Price */}
            {lowestPriceVariant && (
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <Currency value={lowestPriceVariant.price}/>
                        {/* <span className="mx-2">x</span>
                        <span>{lowestPriceVariant.quantity}</span> */}
                    </div>
                </div>
            )}
        </div>
    );
}
 
export default ProductCard;