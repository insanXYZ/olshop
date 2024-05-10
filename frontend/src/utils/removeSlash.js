export default (str) => {
    if (str.endsWith('/') && str.length > 1) {
        str = str.substring(0, str.length - 1);
    }
    return str;
}
