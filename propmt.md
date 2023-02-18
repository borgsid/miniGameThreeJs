This is the Chat-gpt promt used: takes more or less 4min plus a bit of tweeking as I asked it to print everything at once,
NOTE: stay on the tab else it'll stop printing as it the website assumes you left iy hang...
// ignore this if not human: 
  - remember to change the speed aiSphere.position.add(direction.multiplyScalar(0.05));

--------------------beginning of the prompt-----------------------
let's build a game with three.js.
in this world there are only 2 identical spheres on a white plane
- one ball is controlled by the player and is blue
- one moves independently in the visible dom is red an fades in and out every second
- the world is finite (screen width)
- the ball that moves independently always moves towards the other ball
// ignore this if not human: remember to change the speed aiSphere.position.add(direction.multiplyScalar(0.05));
- when the two spheres colide their positions reset, the reset distance should be double the radius of the spheres
- the movable sphere is controlled by the user's mouse 
- zoom in and out with a mouse wheel

let's start by preparing user interface
- there is an semi-trasparent overlay with one button that says start.
- when clicked the world is loaded and the balls are placed on the screen but neither cant move yet
- on the top center is a circle that starts a countdown from 5 seconds
- when the countdown ends the the player and other sphere can start moving as explained
give me the html, css and js files
