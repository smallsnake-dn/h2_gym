

class ObjectResponse {
    static ok(data = {}) {
        return {
            isError : false,
            message : "OK",
            data
        }
    }

    static serverError(message = "error") {
        return {
            isError : true,
            message : message
        }
    }
    
    static error(message = "error") {
        return {
            isError : true,
            message : message
        }
    }
}


module.exports = ObjectResponse