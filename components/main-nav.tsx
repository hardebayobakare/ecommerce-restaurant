"use client"

import { cn } from "@/lib/utils";
import { Billboard, Category } from "@/types";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface Route {
    href: string;
    label: string;
    active: boolean;
}

interface MainNavProps {
    data: Billboard[];
}

const MainNav: React.FC<MainNavProps> = ({
    data
}) => {
    const pathname = usePathname();
    const routes: Route[] = (data.filter(route => route.isMainMenu)
    .map((route) => route.isMainMenu && ({
        href: `/billboard/${route.id}`,
        label: route.label,
        active: pathname === `/billboard/${route.id}`
    })) as Route[]);

    return (  
        <nav className="mx-6 flex item-center space-x-4 lg:space-x-6">
            {routes.map((route) => (
                <Link key={route.href} href={route.href} className={cn(
                    "text-sm font-medium transition-colors hover:text-black",
                    route.active ? "text-black" : "text-neutral-500"
                )}>
                    {route.label}
                </Link>
            ))}
        </nav>
    );
}
 
export default MainNav;