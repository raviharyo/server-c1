const { Product } = require('../models')

const authorizationUser = async (req, res, next) => {
    try {
        const iduser = +req.additionalData.id
        const roleUser = req.additionalData.role
        const productId = +req.params.id

        const product = await Product.findByPk(+productId)
        if (!product) {
            throw new Error('NOT_FOUND')
        }

        if (roleUser == 'admin') {
            next()
        } else {
            throw new Error("NOT_ALLOWED")

        }

    }
    catch (err) {
        next(err)
    }
}

module.exports = authorizationUser 