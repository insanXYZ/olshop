export default ({className , title , children}) => {
    return (
        <div className="collapse group">
            <input type="radio" name="my-accordion-1" /> 
            <div className={`collapse-title ${className}`}>
                {title}
            </div>
            <div className="collapse-content flex flex-col gap-2 text-stone-300"> 
                {children}
            </div>
        </div>
    )
}