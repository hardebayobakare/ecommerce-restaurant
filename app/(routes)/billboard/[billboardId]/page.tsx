import getCategory from "@/actions/get-category";
import getProducts from "@/actions/get-products";
import getSizes from "@/actions/get-sizes";
import Billboard from "@/components/billboard";
import Container from "@/components/ui/container";
import Filter from "./components/filter";
import NoResults from "@/components/ui/no-result";
import getCategories from "@/actions/get-categories";
import getBillboard from "@/actions/get-billboard";
import ProductCard from "@/components/ui/product-card";
import MobileFilters from "./components/mobile-filters";

export const revalidate = 0;

interface BillboardProps {
    params: {
        billboardId: string;
    },
    searchParams: {
        sizeId: string,
        categoryId: string,
    }
}

const CategoryPage: React.FC<BillboardProps> = async ({
    params,
    searchParams,
}) => {
    const products = await getProducts({
        billboardId: params.billboardId,
        sizeId: searchParams.sizeId,
        categoryId: searchParams.categoryId,
    });

    const sizes = await getSizes();
    const categories = await getCategories({billboardId: params.billboardId});
    const billboard = await getBillboard(params.billboardId);
    

    return (  
        <div className="bg-white">
            <Container>
                <Billboard data={billboard}/>
                <div className="px-4 sm:px-6 lg:px-8 pb-24">
                    <div className="lg:grid lg:grid-cols-5 lg:gap-x-8">
                        {/*Add mobile filters*/}
                        <MobileFilters sizes={sizes} categories={categories}/>
                        <div className="hidden lg:block">
                            <Filter valueKey="sizeId" name="Sizes" data={sizes}/>
                            <Filter valueKey="categoryId" name="Category" data={categories}/>
                        </div>
                        <div className="mt-6 lg:col-span-4 lg:mt-0">
                            {products.length === 0 && <NoResults />}
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                {products.map((item) => (
                                    <ProductCard key={item.id} data={item}/>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </div>

    );
}
 
export default CategoryPage;