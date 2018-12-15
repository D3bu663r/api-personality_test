const Category = require('../models/category');
const NotFound = require('../errors/not_found');

function createCategory(data) {
    return new Promise(function (resolve, reject) {
        const category = new Category(data);
        category.save()
            .then(function (category) {
                resolve({
                    id: category._id,
                    name: category.name
                });
            })
            .catch(reject);
    });
}

function readCategory(id) {
    return new Promise(function (resolve, reject) {
        Category.findById(id)
            .then(function (category) {
                if (category) {
                    resolve({
                        id: category._id,
                        name: category.name
                    });
                }
                else {
                    reject(new NotFound("Categoria não encontrada"));
                }
            }).catch(reject);
    });
}

function listCategory() {
    return new Promise(function (resolve, reject) {
        Category.find({})
            .then(function (categorys) {
                resolve(categorys.map(function to(category) {
                    return {
                        id: category._id,
                        name: category.name
                    }
                }));
            }).catch(reject);
    });
}

function updateCategory(id, data) {
    return new Promise(function (resolve, reject) {
        Category.findByIdAndUpdate(id, data, { new: true })
            .then(function (category) {
                if (category) {
                    resolve({
                        id: category._id,
                        name: category.name
                    });
                }
                else {
                    reject(new NotFound("Categoria não encontrada"));
                }
            })
            .catch(reject);
    });
}

function deleteCategory(id) {
    return new Promise(function (resolve, reject) {
        Category.findByIdAndRemove(id).exec()
            .then(function (category) {
                if (category) {
                    category.remove();
                    resolve({
                        id: category._id,
                        name: category.name
                    });
                }
                else {
                    reject(new NotFound("Categoria não encontrada"));
                }
            })
            .catch(reject);
    });
}

module.exports = {
    createCategory,
    readCategory,
    listCategory,
    updateCategory,
    deleteCategory
}