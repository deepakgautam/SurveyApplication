
module.exports = {
    googleClientID : process.env.GOOGLE_CLIENT_ID,
    googleClientSecret :process.env.GOOGLE_CLIENT_SECRET,
    mongoUri : process.env.MONGO_URI,
    cookieKey : process.env.COOKIE_KEY,
    stripPublishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
    stripSecretKey: process.env.STRIPE_SECRET_KEY,
    sendGridKey :process.env.SEND_GRID_KEY,
    redirectDomain : process.env.REDIRECT_DOMAIN
};
