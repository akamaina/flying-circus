var directions = ['left', 'right', 'stop', 'left', 'right'];

var stepDuration = 2000;
var waitTime = 10000;
var start = waitTime + (new Date()).getTime();
function HoopDetector() {}

HoopDetector.prototype = {
    detectHoop : function(filePath, cb) {
        var offsetTime = (new Date()).getTime() - start,
            step = parseInt((offsetTime / stepDuration));

        if (step > directions.length) return cb(null, 'stop');

        return cb(null, directions[step]);

    }
};

module.exports = new HoopDetector();

