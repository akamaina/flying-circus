/**
 * Created with JetBrains WebStorm.
 * User: cdaley
 * Date: 7/4/13
 * Time: 8:37 PM
 * To change this template use File | Settings | File Templates.
 */
var cv = require('opencv');

var camera = new cv.VideoCapture(0);
var COLOR = [0, 255, 0]; //default red
var x = 2;

setInterval(function () {
    camera.read(function (err, im) {
        console.log(x);
        im.inRange([65,25,130], [90,40,190]);
        im.save('image/filter' + x++ +'.png');

    });

}, 1000);