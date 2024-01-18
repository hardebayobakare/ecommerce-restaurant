import getBillboard from "@/actions/get-billboards";
import Container from "@/components/ui/container";
import Billboard from "@/components/billboard";

export const revalidate = 0;

const HomePage = async () => {
    const billboard = await getBillboard("c4af6ea2-c3fc-4cfc-8916-3a99064a3424")
    return ( 
        <Container>
            <div className="space-y-10 pb-10">
                <Billboard data={billboard}/>
            </div>
        </Container>
     );
}
 
export default HomePage;