const validator = (req, res, next) => {
    if (req.query.name) {
        req.name = req.query.name
        next()
    } else {
        next('Failed validation: No name in query!')
    }
}

module.exports = validator
