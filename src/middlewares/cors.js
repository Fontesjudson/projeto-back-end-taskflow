function corsMiddlewares(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
    res.setHeader('Access-Control-Allow-Methods',
        'GET, POST, PUT, DELETE, OPTIONS');

        res.setHeader('Access-Control-Allow-Headers',
            'Content-Type, Authorization');

            res.setHeader('Access-Control-Max-Age', '864000');

            if(req.method === 'OPTIONS') {
                return res.sendStatus(200);
            }
            next();
}
module.exports = corsMiddlewares;