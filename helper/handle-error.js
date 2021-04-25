const wrap = (fn) => async (req, res, next) => {
    try {
        const result = fn(req, res, next)
        return result
    } catch (error) {
        if (error.name === 'ValidationError') {
            error.status = 400
        }
        throw error
    }
}

module.exports = wrap
