import {findA} from '../util'

export default function updateFunc(d) {

    //Define collisions
    let hitPlatform = d.game.physics.arcade.collide(d.platforms, d.roboraj)
    // let hitPlatform = d.game.physics.arcade.collide(d.platforms, d.guy)
    let hitBricks = d.game.physics.arcade.collide(d.leftWall, d.guy)
    //d.game.physics.arcade.overlap(d.guy, d.platforms, d.leftWall, null, this)

    // initializing cursor
    let cursors = d.game.input.keyboard.createCursorKeys();
    let aimLeft = d.game.input.keyboard.addKey(Phaser.Keyboard.A)
    let aimUp = d.game.input.keyboard.addKey(Phaser.Keyboard.W)
    let aimRight = d.game.input.keyboard.addKey(Phaser.Keyboard.D)
    let aimDown = d.game.input.keyboard.addKey(Phaser.Keyboard.S)

    //stand still
    d.roboraj.body.velocity.x = 0
    d.bow.rotation = 0
    d.bow.position.set(0, 8)

    if (cursors.left.isDown)
    {
      d.roboraj.body.velocity.x = -350

      if (d.roboraj.scale.x < 0) d.roboraj.scale.x *= -1

      d.roboraj.animations.play('walk')

    }
    else if (cursors.right.isDown)
    {
        //  Move to the right
        d.roboraj.body.velocity.x = 350

        if (d.roboraj.scale.x > 0) d.roboraj.scale.x *= -1

        d.roboraj.animations.play('walk')
    }
    else {
      d.roboraj.animations.stop()
    }

    if((cursors.up.isDown) && d.roboraj.body.touching.down && hitPlatform) {
      d.roboraj.body.velocity.y = -350
    }

    // you can turn your player by either moving in a direction or by aiming in a direction
    // the direction you aim in takes precedent over the direction you move in
    // which allows for strafing
    if (aimLeft.isDown) {
      if (d.roboraj.scale.x < 0) d.roboraj.scale.x *= -1
    }
    else if (aimRight.isDown) {
      if (d.roboraj.scale.x > 0) d.roboraj.scale.x *= -1
    }

    if (aimDown.isDown) {
      if (aimDown.isDown && aimLeft.isDown) {
        d.bow.rotation = -.785
        d.bow.position.set(0, 0)
      }
      else if (aimDown.isDown && aimRight.isDown) {
        d.bow.rotation = .785
        d.bow.position.set(0, 0)
      }
      else {
        d.bow.rotation = -1.57
        d.bow.position.set(8, 32)
      }
    }
    if (aimUp.isDown) {
      if (aimUp.isDown && aimLeft.isDown) {
        d.bow.rotation = -.785
        d.bow.position.set(0, 0)
      }
      else if (aimUp.isDown && aimRight.isDown) {
        d.bow.rotation = .785
        d.bow.position.set(0, 0)
      }
      else {
        d.bow.rotation = 1.57
        d.bow.position.set(24, 0)
      }
    }
    

    if (d.spaceBar.isDown) {
        console.log('spaceBar is down!!!!')
        fireArrow(d)
    }

}

function fireArrow(d) {
    console.log('arrow has been fired!!!!!')
    let arrow = d.arrows.getFirstExists(false)
    if (arrow) {
        arrow.reset(d.roboraj.x, d.roboraj.y)
        arrow.body.velocity.x = -500
    }
}


