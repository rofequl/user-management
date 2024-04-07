const crypto = require("crypto"),
    geoIp = require('geoip-lite'),
    {models} = require('../../models'),
    moment = require('moment')

async function storeUserLoginInfo(req, user) {
    let userId, useragent, detectResult, expiredTime, geo, lastActive;
    userId = user.id
    // User Ip and Location
    const ip = "207.97.227.239";
    geo = geoIp.lookup(ip);
    const userLocation = {
        country: geo.country,
        timezone: geo.timezone,
        city: geo.city,
    };
    //User Device and useragent
    useragent = req.useragent;
    detectResult = req.device;
    const device = {
        device: detectResult.device.type,
        os: detectResult.os.name,
        browser: detectResult.client.name,
    };
    const refreshKey = crypto.randomBytes(32).toString('hex');
    const userLog = await models.LoginInfo.findOne({
        where: {userId, ip, userAgent: useragent},
        attributes: ['id']
    });
    expiredTime = moment().add(1, 'days').format()
    if (userLog && userLog.id) {
        lastActive = moment().format()
        await models.LoginInfo.update({refreshKey, expiredTime, lastActive}, {where: {id: userLog.id}});
    } else {
        await models.LoginInfo.create({
            userId,
            refreshKey,
            device,
            userAgent: useragent,
            ip,
            userLocation,
            expiredTime
        });
    }
    return refreshKey;
}

async function refreshToken(decodedToken) {
    const refreshKey = crypto.randomBytes(32).toString('hex');
    const userLog = await models.LoginInfo.findOne({
        where: {refreshKey: decodedToken.payload.ref},
        attributes: ['id', 'expiredTime']
    });
    const user = await models.User.findOne({
        where: {id: decodedToken.payload.sub}
    });
    if (user && userLog) {
        let lastActive = moment().format()
        if (moment().isBefore(userLog.expiredTime)) {
            await models.LoginInfo.update({refreshKey, lastActive}, {where: {id: userLog.id}});
            return {user, refreshKey}
        } else return null;
    } else return null;
}

module.exports.storeUserLoginInfo = storeUserLoginInfo;
module.exports.refreshToken = refreshToken;