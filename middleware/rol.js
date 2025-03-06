const { handleHttpError } = require("../utils/handleError.js")

const rolUser = (roles) => (req, res, next) => {
    const { user } = req;
    if (!user || !user.role) {
        return handleHttpError(res, "USER_ROLE_NOT_FOUND", 403);
    }

    const userRole = user.role;
    const isAuthorized = roles.some(r => r.includes(userRole));

    if (isAuthorized) {
        return next();
    } else {
        return handleHttpError(res, "FORBIDDEN", 403);
    }
}

module.exports = {rolUser}