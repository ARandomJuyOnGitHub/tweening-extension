// tests go here; this will not be compiled when this package is used as an extension.

tweenExtension.onStateChanged(function (tween, state) {
    if (tween != tweenObject) {
        tweenObject.play()
    }
})
let tweenObject: Tween = null
let item = 0
let mySprite = sprites.create(img`
    . . . . . . . . . . b 5 b . . . 
    . . . . . . . . . b 5 b . . . . 
    . . . . . . b b b b b b . . . . 
    . . . . . b b 5 5 5 5 5 b . . . 
    . . . . b b 5 d 1 f 5 5 d f . . 
    . . . . b 5 5 1 f f 5 d 4 c . . 
    . . . . b 5 5 d f b d d 4 4 . . 
    . b b b d 5 5 5 5 5 4 4 4 4 4 b 
    b d d d b b d 5 5 4 4 4 4 4 b . 
    b b d 5 5 5 b 5 5 5 5 5 5 b . . 
    c d c 5 5 5 5 d 5 5 5 5 5 5 b . 
    c b d c d 5 5 b 5 5 5 5 5 5 b . 
    . c d d c c b d 5 5 5 5 5 d b . 
    . . c b d d d d d 5 5 5 b b . . 
    . . . c c c c c c c c b b . . . 
    . . . . . . . . . . . . . . . . 
    `, SpriteKind.Player)
mySprite.setPosition(10, 50)
let tweenInfo = tweenExtension.createTweenInfo(1, EasingStyle.Back, EasingDirection.In)
let tweenInfo2 = tweenExtension.createTweenInfo(1, EasingStyle.Back, EasingDirection.Out)
let tweenGoal = tweenExtension.createTweenGoal()
let tweenGoal2 = tweenExtension.createTweenGoal()
tweenGoal.position = vectors.create(100, 50)
tweenGoal2.position = vectors.create(10, 50)
let con = tweenExtension.createContainer(ContainerTypes.Number, 5)
tweenObject = tweenExtension.createTween(mySprite, tweenInfo2, tweenGoal2)
let tween1 = tweenExtension.createTween(mySprite, tweenInfo, tweenGoal)
tween1.play()