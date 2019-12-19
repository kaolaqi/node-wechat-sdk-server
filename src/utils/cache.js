// node-cache 保存和获取缓存
const NodeCache = require("node-cache");
const myCache = new NodeCache({
    stdTTL: 7200, // 缓存过期时间
    checkperiod: 120 // 定期检查时间
});

// 设置缓存
var setCache = function (key, value) {
    // 设置缓存
    var isCache = myCache.set(key, value);
    if (isCache) {
        console.log(key + "保存成功", value);
    }
};

// 获取缓存
var getCache = function (key, callback) {
    // 读取缓存
    var value = myCache.get(key);
    if (value) {
        console.log(`存在于缓存中${key}=${value}`);
        callback(value);
    } else {
        console.log(`${key} not found in node-cache`);
        callback();
    }
};

module.exports = {
    setCache,
    getCache
}