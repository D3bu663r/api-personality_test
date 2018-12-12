const mongoose = require('mongoose');

function isValidId(req, res, next) {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(400).json({
            message: "invalid id"
        });
    next();
}

module.exports = {
    isValidId
}