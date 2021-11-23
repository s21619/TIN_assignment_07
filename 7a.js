const http = require('http');

const requestListener = function (req, res) {
    res.writeHead(200);
    const url = new URL(req.url, `http://${req.headers.host}`);
    var result = "undefined operation";
    switch (url.pathname) {
        case "/add":
            result = paramGetter(url, "+");
            break;
        case "/sub":
            result = paramGetter(url, "-");
            break;
        case "/mul":
            result = paramGetter(url, "*");
            break;
        case "/div":
            result = paramGetter(url, "/");
            break;
        default:
            break;
    }
    res.end(result);
};

const paramCheck = function (url, paramName) {
    var param = "";
    try {
        param = url.searchParams.get(paramName);
    } catch (err) {
        param = "Error in getting correct parameter";
    }
    return param;
};


const paramGetter = function (url, operand) {
    const first = paramCheck(url, "first");
    const second = paramCheck(url, "second");
    if (isNaN(first) || isNaN(second)) {
        return "The parameters are not numbers";
    }
    const result = getResult(first, second, operand);
    return `First Number: ${first}, Second Number: ${second}, The result is: ${result}`;
};

const getResult = (firstNumber, secondNumber, operand) =>
    eval(`${firstNumber} ${operand} ${secondNumber}`);


const server = http.createServer(requestListener);
server.listen(8080);
