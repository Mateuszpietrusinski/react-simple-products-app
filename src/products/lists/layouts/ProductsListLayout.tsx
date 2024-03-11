import React from "react";

export const ProductsListLayout = ({children}: { children: React.ReactNode }) => {
    return (
        <div>
            <h1 className="py-4 text-center mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
                Products list</h1>
            <div className="container mx-auto px-2">
                {children}
            </div>
        </div>
    )
}