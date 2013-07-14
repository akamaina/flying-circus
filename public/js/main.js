/**
 * Created with JetBrains WebStorm.
 * User: cdaley
 * Date: 7/10/13
 * Time: 6:17 PM
 * To change this template use File | Settings | File Templates.
 */
var prog = (function ($) {

    var socket = null;

    /**
     * Initialize the page for use.  Intended for after the onload.
     *
     * @param options specify the selectors for the filter color pickers
     */
    var _setup = function setup(options) {

        socket = io.connect('http://localhost:3000');

        $("idBtnSendFromFilter").on('click', function () {
            socket.emit('event_filter_from', {color: 'test'});
        });
    };

    /**
     * Load the image streams after page load
     *
     * @param options specify the selectors for the image tags
     */
    var _loadImages = function loadImages(options) {
        $(options.camera).attr('src', '/camerastream');
        $(options.filter).attr('src', '/filterstream');
        $(options.contour).attr('src', '/contourstream');
        $(options.circle).attr('src', '/circlestream');
    };

    return {
        setup: _setup,
        loadImages: _loadImages
    };

})
    (jQuery);

$(function onLoad() {
    prog.setup(
        {
            filterFrom: "#idFromColor",
            filterFromBtn: '#idBtnSendFromFilter',
            filterTo: "#idToColor"
        }
    );

    prog.loadImages({
        camera: '#idImgCamera',
        filter: '#idImgFilter',
        contour: '#idImgContour',
        circle: '#idImgCircle'
    });
});