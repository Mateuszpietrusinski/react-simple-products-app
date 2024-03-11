import React from "react";

export const ErrorAlert = ({children}: {children: React.ReactNode}) => {
    return (
        <div className="block container mx-auto h-full">
            <div
                className="font-regular relative mb-4 block w-full rounded-lg bg-red-500 p-4 text-base leading-5 text-white opacity-100">
                {children}
            </div>
        </div>
    )
}