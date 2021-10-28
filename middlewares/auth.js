module.exports = {
    enforceAuthentication: function (req,res,next){
        if(req.isAuthenticated()==false)
        {
           return next()
        }
        res.redirect('/')
    },
    forwardAuthentication: function (req,res,next){
        if(req.isAuthenticated())
        {
            res.redirect('/')
        }
        return next()
    }
}