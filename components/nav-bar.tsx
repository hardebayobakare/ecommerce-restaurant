import Container from "@/components/ui/container";
import Link from "next/link";
import MainNav from "@/components/main-nav";
import NavbarActions from "@/components/navbar-actions";
import getBillboards from "@/actions/get-billboards";

export const revalidate = 0;

const Navbar = async () => {
    const billboards = await getBillboards();
    return (  
        <div className="border-b">
            <Container>
                <div className="relaive px-4 sm:px-5 lg:px-8 flex h-16 items-center">
                    <Link href="/" className="ml-4 flex lg:ml-0 gap-x-2">
                        <p className="font-bold text-xl">SIMPLYMARIAM RESTAURANT</p>
                    </Link>
                    <MainNav data={billboards} />
                    <NavbarActions />
                </div>
            </Container>
        </div>
    );
}
 
export default Navbar;