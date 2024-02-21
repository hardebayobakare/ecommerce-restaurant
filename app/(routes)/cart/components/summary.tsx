"use client"

import axios from "axios";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "react-hot-toast";

import Button from "@/components/ui/button";
import Currency from "@/components/ui/currency";
import useCart from "@/hooks/use-cart";
import { useOrigin } from "@/hooks/use-origin";


const Summary = () => {
    const items = useCart((state) => state.items);
    const removeAll = useCart((state) => state.removeAll);
    const searchParams = useSearchParams();
    const origin = useOrigin();

    useEffect(() => {
        if(searchParams.get("success")){
            toast.success("Payment Completed");
            removeAll();
        }

        if(searchParams.get("canceled")){
            toast.error("Something went wrong.")
        }
    }, [searchParams, removeAll])

    const totalPrice = items.reduce((total, item) => {
        return total + Number(item.sizePrices[0].price) * item.sizePrices[0].quantity;
    }, 0);

    const onCheckout = async () => {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/checkout`, {productIds: items.map((item) => item.id), redirectUrl: origin});

        window.location = response.data.url;
    }

    return (  
        <div className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8">
            <h2 className="text-lg font-medium text-gray-900">Order Summary</h2>
            <div className="mt-6 space-y-4">
                <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                    <div className="text-base font-medium text-gray-900">
                        Order Total
                    </div>
                    <Currency value={totalPrice}/>
                </div>
            </div>
            <Button disabled={items.length === 0} onClick={onCheckout} className="w-full mt-6">
                Checkout
            </Button>
        </div>
    );
}
 
export default Summary;
