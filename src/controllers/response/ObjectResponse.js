

class ObjectResponse {
    static ok() {
        return {
            isError : false,
            message : "OK"
        }
    }

    static serverError(message = "error") {
        return {
            isError : true,
            message : message
        }
    }
}


module.exports = ObjectResponse