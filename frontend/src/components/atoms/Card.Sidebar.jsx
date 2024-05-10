export default ({children, className}) => {
    return (
        <div className={`w-full flex gap-4 transition-all items-center text-stone-300 hover:text-white cursor-pointer px-4 py-3 ${className}`}>
            {children}
        </div>
    )
}