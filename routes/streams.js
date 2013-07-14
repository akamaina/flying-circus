/**
 * Created with JetBrains WebStorm.
 * User: cdaley
 * Date: 7/10/13
 * Time: 6:27 PM
 * To change this template use File | Settings | File Templates.
 */

var processor = require('../logic/processor.js');

/**
 * Builder for constructing objects for writing to multipart streams
 *
 * @param boundary string, boundary condition for the stream
 * @param res response object to write the images to
 * @returns {{head: Function method for writing the stream header, image: Function method for writing a JPEG image to the stream}}
 */
var buildWriter = function (boundary, res) {

    var _boundary = '--' + boundary;
    var _res = res;

    return {

        head: function () {
            _res.writeHead(200, {
                'Content-Type': 'multipart/x-mixed-replace;boundary=' + _boundary,
                'Connection': 'keep-alive',
                'Expires': 'Fri, 01 Jan 1990 00:00:00 GMT',
                'Cache-Control': 'no-cache, no-store, max-age=0, must-revalidate',
                'Pragma': 'no-cache'
            });
        },
        image: function (data) {
            res.write(_boundary + '\nContent-Type: image/jpeg\nContent-length: ' + data.length + '\n\n');
            res.write(data);
        }
    };
};

var copterControl = new processor.copter();

/**
 * Setup a response object for processing camera data
 *
 * @param req the http request
 * @param res the http response object.  THis should not be closed in order to stream a multi-part image
 */
exports.camera = function (req, res) {
    copterControl.setCameraWriter(buildWriter("cameraBoundary", res));
};

/**
 * Setup a response object for processing color filtered data
 *
 * @param req the http request
 * @param res the http response
 */
exports.filtered = function (req, res) {
    copterControl.setFilterWriter(buildWriter('filterBoundary', res));
};

/**
 * Setup a response object for processing contoured image data
 *
 * @param req the http request
 * @param res the http response
 */
exports.contours = function (req, res) {
    copterControl.setContourWriter(buildWriter('contourBoundary', res));
};


/**
 * Setup a response object for processing circle data
 *
 * @param req the http request
 * @param res the http response
 */
exports.circle = function (req, res) {
    copterControl.setCircleWriter(buildWriter('circleBoundary', res));
};

/**
 * Setup the socketIO connection
 *
 * @param socket the SocketIO instance
 */
exports.setSocket = function(socket){
    copterControl.setSocket(socket);
}