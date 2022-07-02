const { Category, Product, Image, sequelize, User } = require('../models')

class productController {
    static async getCategory(req, res, next) {
        try {
            const response = await Category.findAll()
            res.status(200).json({
                statusCode: 200,
                data: response
            })
        }
        catch (err) {
            next(err)
        }
    }

    static async getProduct(req, res, next) {
        try {
            const response = await Product.findAll({
                include: [{
                    model: Image
                }, {
                    model: Category
                }, {
                    model: User
                }]
            })
            res.status(200).json({
                statusCode: 200,
                data: response
            })
        }
        catch (err) {
            next(err)
        }
    }

    static async addCategory(req, res, next) {
        try {
            const { name } = req.body
            const newCat = await Category.create({
                name
            })
            res.status(201).json({
                statusCode: 201,
                message: 'Success Create Category',
                data: {
                    name: newCat.name
                }
            })
        }
        catch (err) {
            next(err)
        }
    }

    static async createProduct(req, res, next) {

        const t = await sequelize.transaction()

        try {
            const { name, price, categoryId, description, mainImg, imgUrl1, imgUrl2, imgUrl3 } = req.body
            const authorId = +req.additionalData.id
            const slug = name.split(' ').join('-')
            const addData = await Product.create({
                name, price, categoryId, slug, description, mainImg, authorId
            }, { transaction: t })

            const listImages = [
                { productId: addData.id, imgUrl: imgUrl1 },
                { productId: addData.id, imgUrl: imgUrl2 },
                { productId: addData.id, imgUrl: imgUrl3 },
            ]

            await Image.bulkCreate(listImages, { transaction: t })

            await t.commit()
            res.status(201).json({
                statusCode: 201,
                message: `Product is Created`
            })
        }
        catch (err) {
            await t.rollback()
            next(err)
        }
    }

    static async getCategoryId(req, res, next) {
        try {
            const id = +req.params.id
            const response = await Category.findByPk(+id)
            if (!response) {
                throw new Error(`NOT_FOUND`)
            }
            res.status(200).json({
                statusCode: 200,
                data: response

            })
        }
        catch (err) {
            next(err)
        }
    }

    static async getProductId(req, res, next) {
        try {
            const id = +req.params.id
            const response = await Product.findByPk(+id, {
                include: [{
                    model: Image
                }, {
                    model: Category
                }]
            })
            if (!response) {
                throw new Error(`NOT_FOUND`)
            }
            res.status(200).json({
                statusCode: 200,
                data: response

            })
        }
        catch (err) {
            next(err)
        }
    }

    static async getProductSlug(req, res, next) {
        try {
            const slug = req.params.slug
            console.log(req.params);
            console.log(slug);
            const response = await Product.findOne({
                where: {
                    slug
                },
                include: [{
                    model: Image
                }, {
                    model: Category
                }]
            })
            if (!response) {
                throw new Error(`NOT_FOUND`)
            }
            res.status(200).json({
                statusCode: 200,
                data: response

            })
        }
        catch (err) {
            next(err)
        }
    }

    static async getPhotoById(req, res, next) {
        try {
            const id = +req.params.id
            const response = await Image.findOne({
                where: {
                    id: id
                }
            })
            if (!response) {
                throw new Error(`NOT_FOUND`)
            }
            res.status(200).json({
                statusCode: 200,
                data: response

            })
        }
        catch (err) {
            next(err);
        }
    }
    static async getPhoto(req, res, next) {
        try {
            const id = +req.params.id
            // console.log(id);
            const response = await Image.findAll({
                where: {
                    productId: id
                }
            })
            if (!response) {
                throw new Error(`NOT_FOUND`)
            }
            res.status(200).json({
                statusCode: 200,
                data: response

            })
        }
        catch (err) {
            next(err);
        }
    }

    static async deleteCategory(req, res, next) {
        try {
            const id = +req.params.id
            // console.log(id);
            const response = await Category.destroy({
                where: {
                    id
                }
            })
            if (!response) {
                throw new Error(`NOT_FOUND`)
            }
            res.status(200).json({
                statusCode: 200,
                message: 'Success Delete Category',

            })
        }
        catch (err) {
            next(err)
        }
    }

    static async deleteProduct(req, res, next) {
        try {
            const id = +req.params.id
            // console.log(id);
            const response = await Product.destroy({
                where: {
                    id
                }
            })
            if (!response) {
                throw new Error(`NOT_FOUND`)
            }
            res.status(200).json({
                statusCode: 200,
                message: 'Success Delete Product',

            })
        }
        catch (err) {
            next(err)
        }
    }

    static async deletePhoto(req, res, next) {
        try {
            const id = +req.params.id
            const response = await Image.destroy({
                where: {
                    id
                }
            })
            if (!response) {
                throw new Error(`NOT_FOUND`)
            }
            res.status(200).json({
                statusCode: 200,
                message: 'Success Delete Image',

            })
        }
        catch (err) {
            next(err)
        }
    }

    static async updateCategory(req, res, next) {
        try {
            const id = +req.params.id
            const { name } = req.body

            const updating = await Category.update({
                name
            },
                {
                    where: {
                        id
                    }
                }
            )
            if (updating == 0) {
                throw new Error(`NOT_FOUND`)
            }
            res.status(200).json({
                statusCode: 200,
                message: `Success Update Category`
            })
        }
        catch (err) {
            next(err)
        }
    }

    static async updatePhoto(req, res, next) {
        try {
            const id = +req.params.id
            const { imgUrl } = req.body
            const updating = await Image.update({
                imgUrl
            },
                {
                    where: {
                        id
                    }
                }
            )
            if (updating == 0) {
                throw new Error(`NOT_FOUND`)
            }
            res.status(200).json({
                statusCode: 200,
                message: `Success Update Image`
            })
        }
        catch (err) {
            next(err)
        }
    }

    static async updateProduct(req, res, next) {

        try {
            const productId = +req.params.id
            const { name, price, categoryId, description, mainImg, imgUrl1, imgUrl2, imgUrl3 } = req.body
            const authorId = +req.additionalData.id
            const slug = name.split(' ').join('-')
            const updating = await Product.update({
                name, price, categoryId, slug, description, mainImg, authorId
            }, {
                where: {
                    id: productId
                }
            })
            if (updating == 0) {
                throw new Error(`NOT_FOUND`)
            }

            res.status(200).json({
                statusCode: 200,
                message: `Product is Updated`
            })
        }
        catch (err) {
            next(err)
        }
    }




}

module.exports = productController