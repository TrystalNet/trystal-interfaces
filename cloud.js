"use strict";
(function (Formats) {
    Formats[Formats["UNKNOWN"] = 0] = "UNKNOWN";
    Formats[Formats["FMT2014"] = 20140] = "FMT2014";
    Formats[Formats["FMT2014A"] = 20141] = "FMT2014A";
    Formats[Formats["FMT2015"] = 20150] = "FMT2015";
})(exports.Formats || (exports.Formats = {}));
var Formats = exports.Formats;
var TristId = (function () {
    function TristId(uid, filename) {
        this.uid = uid || null;
        this.filename = filename || null;
    }
    TristId.prototype.toString = function () {
        var _a = this, uid = _a.uid, filename = _a.filename;
        return uid + "/" + filename;
    };
    return TristId;
}());
exports.TristId = TristId;
