const paypalConfig = {
    clientId: process.env.PAYPAL_CLIENT_ID,
    clientSecret: process.env.PAYPAL_CLIENT_SECRET,
    baseURL: process.env.PAYPAL_BASE_URL
};

module.exports = {
    paypalConfig
};