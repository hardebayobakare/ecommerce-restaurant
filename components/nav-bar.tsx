import Container from "@/components/ui/container";
import Link from "next/link";
import MainNav from "@/components/main-nav";
import getCategories from "@/actions/get-categories";

const Navbar = async () => {
    const categories = await getCategories();
    return (  
        <div className="border-b">
            <Container>
                <div className="relaive px-4 sm:px-5 lg:px-8 flex h-16 items-center">
                    <Link href="/" className="ml-4 flex lg:ml-0 gap-x-2">
                        <p className="font-bold text-xl">SIMPLYMARIAM RESTAURANT</p>
                    </Link>
                    <MainNav data={categories} />
                </div>
            </Container>
        </div>
    );
}
 
export default Navbar;