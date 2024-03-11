import {useState} from "react";
import {createUrlWithParams} from "../../../shared/utils/create-url-with-params.ts";
import {useFetch} from "../../../shared/hooks/useFetch.ts";
import {IResponseProducts} from "../../../types.ts";
import {ProductsListLoading} from "../components/ProductsListLoading.tsx";
import {SkeletonLoader} from "../../shared/components/SkeletonLoader.tsx";
import {ProductsListLayout} from "../layouts/ProductsListLayout.tsx";
import {ErrorAlert} from "../../shared/components/ErrorAlert.tsx";
import {storageProvider} from "../../../shared/storage/storage.provider.ts";

const PRODUCT_LISTING_SKIP_STORAGE_KEY = "PRODUCT_LISTING_SKIP"
export const ProductListPage = ({changeLocation}: { changeLocation: (page: string, params: object) => void }) => {
    const savedSkip = storageProvider.getItem(PRODUCT_LISTING_SKIP_STORAGE_KEY);
    const [skip, setSkip] = useState(Number(savedSkip) || 0);
    const itemsPerPage = 12;
    const apiUrlWithParams = createUrlWithParams("https://dummyjson.com/products", {skip: skip.toString(), limit: `${itemsPerPage}`});
    const {status, data} = useFetch<IResponseProducts>(
        apiUrlWithParams
    );

    if (status.loading === 'LOADING') return (
        <ProductsListLayout>
            <ProductsListLoading items={itemsPerPage}>
                <SkeletonLoader/>
            </ProductsListLoading>
        </ProductsListLayout>
    );

    if (status.loading === 'ERROR') return (
        <ProductsListLayout>
            <ErrorAlert>
                An error occurred during fetching the data. Check developer console for more data.
            </ErrorAlert>
        </ProductsListLayout>
    );

    if (data === null) return (
        <ProductsListLayout>
            <ErrorAlert>
                No data found.
            </ErrorAlert>
        </ProductsListLayout>
    );

    const handleChange = (newSkip: number) => {
        window.scrollTo(0, 0);
        storageProvider.setItem(PRODUCT_LISTING_SKIP_STORAGE_KEY, `${newSkip}`)
        setSkip(newSkip);
    };

    return (
        <ProductsListLayout>
            <ul className="grid grid-cols-12 gap-2">
                {data.products.map((product) => (
                    <li key={product.id} className="col-span-6 md:col-span-4 lg:col-span-3">
                        <div
                            className="bg-white shadow-md rounded-lg max-w-sm dark:bg-gray-800 dark:border-gray-700">
                            <a
                                className="link cursor-pointer"
                                onClick={() => { changeLocation("view", {id: product.id}); }}
                            >
                                <img className="rounded-t-lg p-5" src={product.thumbnail} alt="product image"/>
                            </a>
                            <div className="px-5 pb-2">
                                <p className="text-gray-900 font-bold text-xl tracking-tight dark:text-white">
                                    ${product.price}</p>
                            </div>
                            <div className="px-5 pb-5">
                                <a
                                    className="link cursor-pointer"
                                    onClick={() => { changeLocation("view", {id: product.id}); }}
                                >
                                    <h3 className="text-gray-900 font-semibold text-xl tracking-tight dark:text-white">
                                        {product.title}</h3>
                                </a>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
            <div className="inline-flex rounded-md shadow-sm justify-center w-full my-10" role="group">
                {skip > 0 ? <button type="button"
                        onClick={() =>
                            { handleChange( skip !== 0 ? skip - itemsPerPage : 0); }
                        }
                        className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-transparent border border-gray-900 rounded-s-lg hover:bg-gray-900 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700">
                    Previous
                </button>: <></>}
                {data.total > data.skip + data.limit ? <button type="button"
                        className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-transparent border border-gray-900 rounded-e-lg hover:bg-gray-900 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700"
                        onClick={() => { handleChange(skip + itemsPerPage); }}>
                    Next
                </button> : <></>}
            </div>
        </ProductsListLayout>
    );
};