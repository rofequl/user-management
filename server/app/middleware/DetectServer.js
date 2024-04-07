const DeviceDetector = require('node-device-detector');
const ClientHints = require('node-device-detector/client-hints')

// init app
const deviceDetector = new DeviceDetector({
    clientIndexes: true,
    deviceIndexes: true,
    deviceAliasCode: false,
});
const clientHints = new ClientHints;

const hasBotResult = (result) => {
    return result && result.name;
}

// create middleware
const middlewareDetect = (req, res, next) => {
    const useragent = req.headers['user-agent'];
    let meta = {}
    const clientHintsData = clientHints.parse(res.headers, meta);

    req.useragent = useragent;
    req.device = deviceDetector.detect(useragent, clientHintsData);
    next();
};

module.exports.detectServer = middlewareDetect;
module.exports.hasBotResult = hasBotResult;