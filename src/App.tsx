import "./index.css";

import {useState, useCallback} from "react";
import {ProductPage} from "./products/details/pages/Product.tsx";
import {ProductListPage} from "./products/lists/pages/ProductsList.tsx";


const App = () => {
    const [location, setLocation] = useState<{ page: string, params: { id?: string } }>({page: "list", params: {}});

    const changeLocation = useCallback(
        (page: string, params: object) => {
            setLocation({page, params: params || {}});
        },
        [setLocation]
    );


    return (
        <div className="App">
            {location.page === "list" && (
                <ProductListPage changeLocation={changeLocation}/>
            )}
            {location.page === "view" && location.params.id &&
                <ProductPage id={location.params.id} onLocationChange={() => changeLocation("list", () => ({}))}/>}
        </div>
    );
};

export default App;
