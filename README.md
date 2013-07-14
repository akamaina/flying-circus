flying-circus
=============

AR Drones doing circus tricks

Project Plan

Capture images
	-Written to file works - not fast enough
	-Need to be able to get PNG Stream
Find a certain colour in the image
	-This will depend on which Hula Hoop we're using
	-Tune the RGB accordingly
Find the elipse represented by that colour
	-RISK
	-We can get a series of points
	-Stretch: Validate that it is an ellipse/circle
Find the centre of that elipse
	-We can assume that the centroid of the points is the centre of the circle
Find the right angle to make elipse a circle - stretch
	-This might require a more advanced fitting protocol
	-Containing box ration of X-dimension vs. Y-dimension?
Figure out how to move the drone to center/align the circle/elipse
	-Loop, continuously reassessing
	-Calculate difference between centre of image and centre of circle
	-Move for 1/100s, 20% power
Fly forward through the elipse
	-Easy?
Verify that we're flying straight - stretch
	-Reassess the loop until it's out of the bounds of the image?

Tests:
	Stable hovering
	Move small amounts left, right, up, down, find a good step for aligning with a hoop

Flair - Music
	- find music circus music and applause mp3
	- hook up sound playing
