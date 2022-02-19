const authorizationPatch = async (req,res, next) => {
    try {
        const {role} = req.user

        if (role !== 'Admin') {
            throw { name: 'AdminAccsess' }
        }
        next()
    } catch (err) {
        next(err)
    }
}


module.exports = authorizationPatch