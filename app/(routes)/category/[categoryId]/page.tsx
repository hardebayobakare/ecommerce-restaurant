import getCategory from "@/actions/get-category";
import getProducts from "@/actions/get-products";
import getSizes from "@/actions/get-sizes";
import Billboard from "@/components/billboard";
import Container from "@/components/ui/container";
import Filter from "./components/filter";
import NoResults from "@/components/ui/no-result";
import getCategories from "@/actions/get-categories";

export const revalidate = 0;

interface CategoryPageProps {
    params: {
        categoryId: string;
    },
    searchParams: {
        sizeId: string
    }
}

const CategoryPage: React.FC<CategoryPageProps> = async ({
    params,
    searchParams,
}) => {
    const products = await getProducts({
        categoryId: params.categoryId,
        sizeId: searchParams.sizeId
    });

    const sizes = await getSizes();
    const category = await getCategory(params.categoryId);
    const categories = await getCategories();
    

    return (  
        <div className="bg-white">
            <Container>
                <Billboard data={category.billboard}/>
                <div className="px-4 sm:px-6 lg:px-8 pb-24">
                    <div className="lg:grid lg:grid-col-5 lg:gap-x-8">
                        {/*Add mobile filters*/}
                        <div className="hidden lg:block">
                            <Filter valueKey="sizeId" name="Sizes" data={sizes}/>
                            <Filter valueKey="categoryId" name="Category" data={categories}/>
                        </div>
                        <div className="mt-6 lg:col-span-4 lg:mt-0">
                            {products.length === 0 && <NoResults />}
                        </div>
                    </div>
                </div>
            </Container>
        </div>

    );
}
 
export default CategoryPage;