export const isAuthenticated = (req, res, next) => {
    if (req.session && req.session.logged_in) {
      return next();
    }
    res.redirect('/auth/signup');
  };
  
  export const withAuth = (req, res, next) => {
    if (!req.session.user_id) {
      res.redirect('/login');
    } else {
      next();
    }
  };