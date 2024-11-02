 game.splash("Press A to start")
game.splash("Move your plane with joystick and shoot the gun with A")
scene.setBackgroundColor(9)
effects.clouds.startScreenEffect()
 let Fighter_plane = sprites.create(assets.image`Fighter_plane`, SpriteKind.Player)
Fighter_plane.setStayInScreen(true)
info.setLife(3)
controller.moveSprite(Fighter_plane, 200, 200)
controller.A.onEvent(ControllerButtonEvent.Pressed, function() {
    let dart = sprites.createProjectileFromSprite(img`
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . 5 5 5 . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . 5 5 5 . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
    `, Fighter_plane, 200, 0)
    music.play(music.melodyPlayable(music.pewPew), music.PlaybackMode.UntilDone)
});

controller.A.onEvent(ControllerButtonEvent.Repeated, function () {
    let dart = sprites.createProjectileFromSprite(assets.image`Bullets`, Fighter_plane, 200, 0)

    music.play(music.melodyPlayable(music.pewPew), music.PlaybackMode.UntilDone)
})
game.onUpdateInterval(500, function() {
    let mySprite2 = sprites.create(assets.image`Enemy_missile`, SpriteKind.Enemy)
    mySprite2.setVelocity(-100, 0)
    mySprite2.left = scene.screenWidth()
    mySprite2.y = randint(0, scene.screenHeight())
    mySprite2.setFlag(SpriteFlag.AutoDestroy, true)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function(sprite, otherSprite) {
    otherSprite.destroy(effects.fire, 100)
    info.changeLifeBy(-1)
    music.play(music.melodyPlayable(music.bigCrash), music.PlaybackMode.UntilDone)
    
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function(sprite, otherSprite) {
    otherSprite.destroy()
    music.play(music.melodyPlayable(music.smallCrash), music.PlaybackMode.UntilDone)
    sprite.destroy(effects.fire, 100)
    info.changeScoreBy(1)
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    otherSprite.destroy()
    music.play(music.melodyPlayable(music.smallCrash), music.PlaybackMode.UntilDone)
    sprite.destroy(effects.fire, 100)
    info.changeScoreBy(1)
})
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    if (game.runtime() - LastPressed >= TimeBetweenPresses) {
        let missile = sprites.createProjectileFromSprite(assets.image`missile`, Fighter_plane, 200, 0)
        LastPressed = game.runtime()
        missile.follow(mySprite2)
    }
})
let projectile: Sprite = null
let TimeBetweenPresses = 0
let LastPressed = 0
LastPressed = 0
TimeBetweenPresses = 10000
sprites.onOverlap(SpriteKind.create(), SpriteKind.Player, function(sprite: Sprite, otherSprite: Sprite) {
    
})