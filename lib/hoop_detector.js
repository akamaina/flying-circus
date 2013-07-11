function HoopDetector() {}

HoopDetector.prototype = {
    detectHoop : function(pngStream, cb) {
        // detect in what direction a hoop is at relative to the center of the image
        // and returns results in cb(err, direction)
        // direction is either up, down, left, right or stop in case no hoop is detected
        cb(null, 'down');
    }
}

module.exports = new HoopDetector();

