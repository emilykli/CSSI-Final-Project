# Kitty Dash
### CSSI 2021 Final Project — Emily Li & Helena Lowe

Play [Here!](https://emilykli.github.io/CSSI-Final-Project/)

Written with p5.js and [collide2D library](https://github.com/bmoren/p5.collide2D#colliderectpoly)

## Overview
<img src = "https://cdn.glitch.com/2ce08a5a-5720-473d-b331-a11380828bdc%2FScreen%20Shot%202021-08-07%20at%206.37.18%20PM.png?v=1628379516687" width = 500px style = "float:left;" > <img src = "https://cdn.glitch.com/2ce08a5a-5720-473d-b331-a11380828bdc%2FScreen%20Shot%202021-08-05%20at%209.27.44%20PM.png?v=1628379320147" width = 500px style = "float-right;">
* Get the cat to the victory platform without dying to advance to the next level!
* Avoid obstacles (red triangles), as they will decrease your HP by 1 every frame you are standing on one
* Reaching 0 HP will cause you to die and get a game over
* Collect kibble and power ups along the way!
  * Each kibble will increase your number of points by 1
  * Each fish will either increase your HP by 3 or increase your number of points by 5 if your HP is already full
* Odd levels have teleportation, even levels do not
  * If you hit the floor on a teleportation level, you will "teleport" to the top of the screen and fall down from there
  * If you hit the floor on a non-teleportation level, you will die

## Challenges
- [x] Jumping and gravity mechanics
- [x] Collisions between the player and objects
- [x] Scrolling
- [x] Hiding/unhiding buttons at appropriate times

## Lessons Learned
* Having a plan and defining the scope of a project at the beginning is very important
  * "Simple" tasks get complicated quickly, especially if things are disorganized
* Using easier, but slightly less accurate methods (ex. hitboxes) is completely valid
