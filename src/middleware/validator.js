// checks something on request if its "there" good if not throw an error
// const { server } = requires('../src/__tests__/validator.test.js');

const validator = (req, res, next) => {
    if (req.query?.name) {
        req.name = req.query.name
        next()
    } else {
        next('Failed validation: No name in query!');
    }
}

module.exports = validator
