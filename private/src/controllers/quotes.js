const http = require('request');

const getQuoteUrl = (symbols) => {
    const sql = encodeURIComponent('select * from yahoo.finance.quotes where symbol in ("' + symbols + '")');

    return 'https://query.yahooapis.com/v1/public/yql?q=' + sql + '&format=json&env=http%3A%2F%2Fdatatables.org%2Falltables.env';
};

module.exports = {
    get (request, response) {
        const config = {
            url: getQuoteUrl(request.query.symbol),
            json: true
        };

        http(config, (error, headers, body) => {
            if (!error && body.query.results) {
                if (!Array.isArray(body.query.results.quote)) {
                    body.query.results.quote = [body.query.results.quote];
                }
                response.json(body.query.results.quote);
            } else {
                response.json([]);
            }
        });
    }
};