module.exports = {
    // Middleware functions

    // If the user is authenticated, then go home. I dont want them to see the landing page
    // If a user is aguest, then load next
    ensureAuth: function (req, res, next) {
        if (req.isAuthenticated()){
            return next()
        }
        else {
            res.redirect('/')
        }
    },
    // If the user is authenticated, then load next.
    // If not, redirect to login screen
    ensureGuest: function (req, res, next) {
        if (req.isAuthenticated()){
            res.redirect('/home');
        } else {
            return next()
        }
    }
}
