controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    if (game.runtime() - LastPressed >= TimeBetweenPresses) {
        myEnemy = sprites.createProjectileFromSprite(assets.image`missile`, Fighter_plane, 200, 0)
        LastPressed = game.runtime()
        myEnemy.follow(mySprite2)
        music.play(music.createSoundEffect(WaveShape.Noise, 5000, 2672, 255, 0, 2000, SoundExpressionEffect.None, InterpolationCurve.Linear), music.PlaybackMode.UntilDone)
    }
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    dart = sprites.createProjectileFromSprite(img`
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
})
controller.A.onEvent(ControllerButtonEvent.Repeated, function () {
    dart2 = sprites.createProjectileFromSprite(assets.image`Bullets`, Fighter_plane, 200, 0)
    music.play(music.melodyPlayable(music.pewPew), music.PlaybackMode.UntilDone)
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    otherSprite.destroy()
    music.play(music.melodyPlayable(music.smallCrash), music.PlaybackMode.UntilDone)
    sprite.destroy(effects.fire, 100)
    info.changeScoreBy(1)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    otherSprite.destroy(effects.fire, 100)
    info.changeLifeBy(-1)
    music.play(music.melodyPlayable(music.bigCrash), music.PlaybackMode.UntilDone)
})
let dart2: Sprite = null
let dart: Sprite = null
let mySprite2: Sprite = null
let myEnemy: Sprite = null
let TimeBetweenPresses = 0
let LastPressed = 0
let Fighter_plane: Sprite = null
let projectile = null
game.splash("FIGHTER JET")
game.splash("Move your plane with joystick and shoot the gun with A")
scene.setBackgroundColor(9)
effects.clouds.startScreenEffect()
Fighter_plane = sprites.create(assets.image`Fighter_plane`, SpriteKind.Player)
Fighter_plane.setStayInScreen(true)
info.setLife(3)
controller.moveSprite(Fighter_plane, 200, 200)
LastPressed = 0
TimeBetweenPresses = 10000
game.onUpdateInterval(500, function () {
    mySprite2 = sprites.create(assets.image`Enemy_missile`, SpriteKind.Enemy)
    mySprite2.setVelocity(-100, 0)
    mySprite2.left = scene.screenWidth()
    mySprite2.y = randint(0, scene.screenHeight())
})
