import Button from "./Button";

export default ({ children, className, id }) => {
    const handleClick = () => {
        document.getElementById(id).showModal();
    };

    return (
        <Button className={className} onClick={handleClick}>
            {children}
        </Button>
    );
};
