import {useFetch} from "../../../shared/hooks/useFetch.ts";
import {Product} from "../../../types.ts";
import {ProductDetailsLayout} from "../layouts/ProductDetailsLayout.tsx";
import {SkeletonLoader} from "../../shared/components/SkeletonLoader.tsx";
import {ErrorAlert} from "../../shared/components/ErrorAlert.tsx";

export const ProductPage = ({id, onLocationChange}: { id: string, onLocationChange: () => void }) => {
    const {status, data} = useFetch<Product>(`https://dummyjson.com/products/${id}`);

    if (status.loading === 'LOADING') return (
        <ProductDetailsLayout>
            <SkeletonLoader/>
        </ProductDetailsLayout>
    );

    if (status.loading === 'ERROR') return (
        <ProductDetailsLayout>
            <div className="mb-4">
                <button onClick={() => { onLocationChange(); }} className="font-bold"> &#8592; Back to listing</button>
            </div>
            <ErrorAlert>
                An error occurred during fetching the data. Check developer console for more data.
            </ErrorAlert>
        </ProductDetailsLayout>
    );

    if (data === null) return (
        <ProductDetailsLayout>
            <div className="mb-4">
                <button onClick={() => { onLocationChange(); }} className="font-bold"> &#8592; Back to listing</button>
            </div>
            <ErrorAlert>
                No product found
            </ErrorAlert>
        </ProductDetailsLayout>
    )


    return (
        <ProductDetailsLayout>
            <div className="mb-4">
            <button onClick={() => { onLocationChange(); }} className="font-bold"> &#8592; Back to listing</button>
                </div>
                <div className="md:flex items-center -mx-10">
                    <div className="w-full md:w-1/2 px-10 mb-10 md:mb-0">
                        <div className="relative">
                            <img src={data.thumbnail} className="w-full relative z-10" alt=""/>
                        </div>
                    </div>
                    <div className="w-full md:w-1/2 px-10">
                        <div className="mb-10">
                            <h1 className="font-bold uppercase text-2xl mb-5">{data.title}</h1>
                            <p className="text-sm">{data.description}</p>
                        </div>
                        <div>
                            <div className="inline-block align-bottom mr-5">
                                <span className="text-2xl leading-none align-baseline">$</span>
                                <span className="font-bold text-5xl leading-none align-baseline">{data.price}</span>
                                <span className="text-2xl leading-none align-baseline">.00</span>
                            </div>
                            <div className="inline-block align-bottom">
                                <button className="bg-blue-600 text-white rounded-full px-10 py-2 font-semibold">BUY
                                    NOW
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
     </ProductDetailsLayout>
    )
};

