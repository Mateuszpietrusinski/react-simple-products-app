import React from "react";

export const ProductsListLoading = ({items, children}: {items: number, children: React.ReactNode}) => {
    return (
        <ul className="grid grid-cols-12 gap-2">
            {Array(items).map((_, i) => (
                <li key={i} className="col-span-6 md:col-span-4 lg:col-span-3">
                    {children}
                </li>
            ))}
        </ul>
    )
}