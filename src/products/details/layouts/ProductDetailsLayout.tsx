export const ProductDetailsLayout = ({children}: { children: React.ReactNode }) => {
    return (
        <div className="min-w-screen min-h-screen flex items-center p-5 lg:p-10 overflow-hidden relative">
            <div
                className="w-full max-w-6xl rounded bg-white shadow-xl p-10 lg:p-20 mx-auto text-gray-800 relative md:text-left">
            {children}
            </div>
        </div>
    )
}