class ResponseError extends Error {
    constructor(status, message){
        console.error(status, message);
    }
}

export { ResponseError }