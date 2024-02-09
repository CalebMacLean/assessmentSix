class ExpressError extends Error {
    constructor(message, status) {
        super(message);
        this.status = status;

        console.log(this.stack);
    }
}

module.exports = ExpressError;