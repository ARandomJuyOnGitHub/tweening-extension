# game.onUpdate(function () {
# 
# 
# vectors.vectorToSpriteProperty(mySprite, SpriteProperties.Position, con.value)
# 
# 
# })
item = 0
mySprite = sprites.create(img("""
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
    """),
    SpriteKind.player)
mySprite.set_position(10, 50)
tweenInfo = tweenExtension.create_tween_info(1, EasingStyle.BACK, EasingDirection.IN_OUT, 0, False, 0)
tweenInfo2 = tweenExtension.create_tween_info(1, EasingStyle.SINE, EasingDirection.IN_OUT)
tweenGoal = tweenExtension.create_tween_goal()
tweenGoal2 = tweenExtension.create_tween_goal()
tweenGoal.position = vectors.create(100, 50)
tweenGoal2.position = vectors.create(100, 100)
con = tweenExtension.create_container(ContainerTypes.NUMBER, 5)
tweenObject = tweenExtension.create_tween(mySprite, tweenInfo2, tweenGoal2)
tween = tweenExtension.create_tween(mySprite, tweenInfo, tweenGoal)
# tweenObject.play()
tween.play()