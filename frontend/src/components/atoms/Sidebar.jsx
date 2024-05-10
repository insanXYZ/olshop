export default ({children , className}) => {
    return (
        <div className={`flex flex-col w-[300px]  ${className}`}>
            {children}
        </div>
    )
}