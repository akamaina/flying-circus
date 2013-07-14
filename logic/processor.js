/**
 * Created with JetBrains WebStorm.
 * User: cdaley
 * Date: 7/12/13
 * Time: 11:31 PM
 * To change this template use File | Settings | File Templates.
 */

var cv = require('opencv');
var drone = require('ar-drone');

exports.copter = Copter;

function Copter() {
    this.cameraResponseWriter = null;
    this.filterResponseWriter = null;
    this.contourResponseWriter = null;
    this.circleResponseWriter = null;
    this.client = drone.createClient();
    var imageStream = new cv.ImageStream();
    var self = this;
    var processing = false;

    function drawContours(contours, image) {
        for (var x = 0; x < contours.size(); x++) {

            if (contours.area(x) > 10000) {
                image.drawContour(contours, x, [0, 0, 255]);
            }

        }
    }

    imageStream.on('data', function onStreamData(matrix) {
        if (!processing) {
            processing = true;
            cv.readImage(matrix.toBuffer(), function (error, image) {
                var greyscale = image.copy();
                greyscale.convertGrayscale();
                self.write(self.cameraResponseWriter, greyscale.toBuffer());

                var filteredImage = image.copy();
                filteredImage.inRange([10, 25, 20], [150, 90, 190]);
                self.write(self.filterResponseWriter, filteredImage.toBuffer());

                var contourImage = filteredImage.copy();
                contourImage.canny(100, 200);
                contourImage.gaussianBlur([11, 11]);
                drawContours(contourImage.findContours(), contourImage);
                self.write(self.contourResponseWriter, contourImage.toBuffer());

                self.write(self.circleResponseWriter, contourImage.toBuffer());
                processing = false;
            });

        }
    });

    this.client.getPngStream().pipe(imageStream);
};

/**
 * Write the buffer to the defined writer if it exists
 *
 * @param writer
 * @param buffer
 */
Copter.prototype.write = function write(writer, buffer) {
    if (writer != null && typeof writer !== 'undefined') {
        writer.image(buffer);
    }
}

/**
 * Set the writer for pushing jpg images to a respose stream for plain camera input
 *
 * @param writer streams.js writer for pushing a jpg image to the response stream
 */
Copter.prototype.setCameraWriter = function camera(writer) {
    writer.head();
    this.cameraResponseWriter = writer;
};

/**
 * Set the writer for pushing jpg images to a response stream for color filtered input
 * @param writer streams.js writer for pusing a jpg image to a response stream
 */
Copter.prototype.setFilterWriter = function filter(writer) {
    writer.head();
    this.filterResponseWriter = writer;
};

/**
 * Set the writer for pushing jpg images to a response stream for image contour detection input
 * @param writer streams.js writer for pushing a jpg image to a response stream
 */
Copter.prototype.setContourWriter = function contours(writer) {
    writer.head();
    this.contourResponseWriter = writer;
};

/**
 * Set the writer for pushing jpg images to a response stream for image circles detected input
 * @param writer  streams.js writer for pushing a jpg image to a response stream
 */
Copter.prototype.setCircleWriter = function circle(writer) {
    writer.head();
    this.circleResponseWriter = writer;
};

Copter.prototype.setSocket = function setCircle(socket) {
    socket.on('event_filter_from', function onFromFilterChange(data) {
        console.log(data);
    });
    socket.on('event_filter_to', function onToFilterChange(data) {
        console.log(data);
    });
};

Copter.prototype.getDrone = function getDrone() {
    return this.client;
};


