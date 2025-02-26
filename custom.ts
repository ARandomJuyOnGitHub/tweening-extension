// Welcome to the Tweening Extension Source Code!!! Enjoy your stay! :)
// Some things may be hard to understand since my code is kind of all over the place. Sorry about that! 😔🙏 

// These things need to be outside the tweening namespace for the extension to work. Sorry about any variable/function naming inconveniences.
function lerp(p1: number, p2: number, t: number): number {
    return p1 + (p2 - p1) * t
}

function switchArrayLocation(item: any, currentArray: any[], newArray: any[]): void {
    if (currentArray.indexOf(item) == -1) { throw "Item is not in array" }
    newArray.push(currentArray.removeAt(currentArray.indexOf(item)))
}

type EasingFunction = (progress: number) => number;

// Variables used in some of the tweening functions
const PI = Math.PI;
const c1 = 1.70158;
const c2 = c1 * 1.525;
const c3 = c1 + 1;
const c4 = (2 * PI) / 3;
const c5 = (2 * PI) / 4.5;

// Note: Give creadit to the person to provided the tweening functions

// A tweening function excluded from the others because of it's length (im guessing)
const bounceOut: EasingFunction = function (x) {
    const n1 = 7.5625;
    const d1 = 2.75;

    if (x < 1 / d1) {
        return n1 * x * x;
    } else if (x < 2 / d1) {
        return n1 * (x -= 1.5 / d1) * x + 0.75;
    } else if (x < 2.5 / d1) {
        return n1 * (x -= 2.25 / d1) * x + 0.9375;
    } else {
        return n1 * (x -= 2.625 / d1) * x + 0.984375;
    }
};

// An array that contains (almost) all the functions requred for tweening
const easingsFunctions: EasingFunction[][] = [
    //Quad
    [
        //In
        function (x) {
            return x * x;
        },
        //Out
        function (x) {
            return 1 - (1 - x) * (1 - x);
        },
        //InOut
        function (x) {
            return x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2;
        },
    ],
    //Cubic
    [
        //In
        function (x) {
            return x * x * x;
        },
        //Out
        function (x) {
            return 1 - Math.pow(1 - x, 3);
        },
        //InOut
        function (x) {
            return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
        },
    ],
    //Quart
    [
        //In
        function (x) {
            return x * x * x * x;
        },
        //Out
        function (x) {
            return 1 - Math.pow(1 - x, 4);
        },
        //InOut
        function (x) {
            return x < 0.5 ? 8 * x * x * x * x : 1 - Math.pow(-2 * x + 2, 4) / 2;
        },
    ],
    //Quint
    [
        //In
        function (x) {
            return x * x * x * x * x;
        },
        //Out
        function (x) {
            return 1 - Math.pow(1 - x, 5);
        },
        //InOut
        function (x) {
            return x < 0.5 ? 16 * x * x * x * x * x : 1 - Math.pow(-2 * x + 2, 5) / 2;
        },
    ],
    //Sine
    [
        //In
        function (x) {
            return 1 - Math.cos((x * PI) / 2);
        },
        //Out
        function (x) {
            return Math.sin((x * PI) / 2);
        },
        //InOut
        function (x) {
            return -(Math.cos(PI * x) - 1) / 2;
        },
    ],
    //Expo
    [
        //In
        function (x) {
            return x === 0 ? 0 : Math.pow(2, 10 * x - 10);
        },
        //Out
        function (x) {
            return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
        },
        //InOut
        function (x) {
            return x === 0
                ? 0
                : x === 1
                    ? 1
                    : x < 0.5
                        ? Math.pow(2, 20 * x - 10) / 2
                        : (2 - Math.pow(2, -20 * x + 10)) / 2;
        },
    ],
    //Circ
    [
        //In
        function (x) {
            return 1 - Math.sqrt(1 - Math.pow(x, 2));
        },
        //Out
        function (x) {
            return Math.sqrt(1 - Math.pow(x - 1, 2));
        },
        //InOut
        function (x) {
            return x < 0.5
                ? (1 - Math.sqrt(1 - Math.pow(2 * x, 2))) / 2
                : (Math.sqrt(1 - Math.pow(-2 * x + 2, 2)) + 1) / 2;
        },
    ],
    //Back
    [
        //In
        function (x) {
            return c3 * x * x * x - c1 * x * x;
        },
        //Out
        function (x) {
            return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2);
        },
        //InOut
        function (x) {
            return x < 0.5
                ? (Math.pow(2 * x, 2) * ((c2 + 1) * 2 * x - c2)) / 2
                : (Math.pow(2 * x - 2, 2) * ((c2 + 1) * (x * 2 - 2) + c2) + 2) / 2;
        },
    ],
    //Elastic
    [
        //In
        function (x) {
            return x === 0
                ? 0
                : x === 1
                    ? 1
                    : -Math.pow(2, 10 * x - 10) * Math.sin((x * 10 - 10.75) * c4);
        },
        //Out
        function (x) {
            return x === 0
                ? 0
                : x === 1
                    ? 1
                    : Math.pow(2, -10 * x) * Math.sin((x * 10 - 0.75) * c4) + 1;
        },
        //InOut
        function (x) {
            return x === 0
                ? 0
                : x === 1
                    ? 1
                    : x < 0.5
                        ? -(Math.pow(2, 20 * x - 10) * Math.sin((20 * x - 11.125) * c5)) / 2
                        : (Math.pow(2, -20 * x + 10) * Math.sin((20 * x - 11.125) * c5)) / 2 + 1;
        },
    ],
    //Bounce
    [
        //In
        function (x) {
            return 1 - bounceOut(1 - x);
        },
        //Out
        bounceOut,
        //InOut
        function (x) {
            return x < 0.5
                ? (1 - bounceOut(1 - 2 * x)) / 2
                : (1 + bounceOut(2 * x - 1)) / 2;
        },
    ]
];

enum TweenState {
    Idle,
    Playing,
    Paused,
    Canceled,
    Complete
}

enum EasingStyle {
    //% block="quadratic"
    Quadratic,
    //% block="cubic"
    Cubic,
    //% block="quartic"
    Quartic,
    //% block="quintic"
    Quintic,
    //% block="sine"
    Sine,
    //% block="exponential"
    Exponential,
    //% block="circular"
    Circular,
    //% block="back"
    Back,
    //% block="elastic"
    Elastic,
    //% block="bounce"
    Bounce,
    //% block="linear"
    Linear
}

enum EasingDirection {
    //% block="in"
    In,
    //% block="out"
    Out,
    //% block="inout"
    InOut,
    //% block="n/a"
    NotApplicable,
}

enum ContainerTypes {
    //% block="vector2"
    Vector2,
    //% block="number"
    Number
}


// handler type
type Handler = (tween: Tween, state: TweenState) => void;

// was supposed to be a class for handling events. it didn't work out
// class Event<T, S> {
//     private handlers: Handler<T, S>[] = [];
//     constructor() { }
//     __fire(tween: T, state: S) {
//         for (let h of this.handlers)
//             h(tween, state);
//     }
//     connect(handler: Handler<T, S>) {
//         this.handlers.push(handler);
//     }
// }

// classes used to store specfic data types. Needed so that they can been tweened (is "tweened" even a word?).
class Vector2Container {
    value: Vector2

    constructor(_value: Vector2) {
        this.value = _value
    }
}

class NumberContainer {
    value: number

    constructor(_value: number) {
        this.value = _value
    }
}

// class used to store "all" information needed for tweening.
class TweenInfo {
    length: number
    easingSytle: EasingStyle
    easingDirection: EasingDirection
    // these properties aren't used yet, but will be in a future update (hopefully)
    repeatCount: number
    reverse: boolean
    delayTime: number

    constructor(_length: number, _easingStyle: EasingStyle, _easingDirection: EasingDirection) {
        this.length = _length
        this.easingSytle = _easingStyle
        this.easingDirection = _easingDirection
        this.repeatCount = 0
        this.reverse = false
        this.delayTime = 0
    }
}

//% blockNamespace=tweenExtension
class TweenGoal {
    // order matters, dont change the order of the properties
    //% group="Create"
    //% blockCombine
    position?: Vector2
    //% blockCombine
    velocity?: Vector2
    //% blockCombine
    acceleration?: Vector2
    //% blockCombine
    friction?: Vector2
    //% blockCombine
    scale?: Vector2

    chosenProperties: { spritePropertyIndex: number, value: Vector2 }[]
}

// where all the magic happens
//% blockNamespace=tweenExtension
class Tween {
    // Tween properties
    public readonly instance: Sprite | Vector2Container | NumberContainer // the thing being tweened
    public readonly info: TweenInfo // information about the tween
    public readonly goals: TweenGoal | Vector2 | number // where the tween is going
    private originalValue: Vector2[] | Vector2 | number
    private linearConstant: number = 0.033 // deteremines the speed of the tween
    private linearProgression: number = 0 // keeps track of the tween's progress
    private state: TweenState = TweenState.Idle // the current state of the tween

    // where all of the tweens are stored
    private static idleTweens: Tween[] = []
    private static playingTweens: Tween[] = []
    private static completedTweens: Tween[] = []

    // boolen that prevents the tweenloop function from being called more than once
    private static isLooping: boolean = false

    static handlers: Handler[] = []

    constructor(_instance: Sprite | Vector2Container | NumberContainer, _info: TweenInfo, _goals: TweenGoal | Vector2 | number) {
        // starts the loop for tweening
        if (!Tween.isLooping) {
            Tween.isLooping = true
            Tween.tweenLoop()
        }
        this.instance = _instance
        this.info = _info
        this.goals = _goals

        this.linearConstant = this.linearConstant / this.info.length
        this.linearProgression = this.linearConstant

        Tween.idleTweens.push(this)
    }

    // where the tweens occur
    private static tweenLoop() {
        forever(function () {
            if (Tween.playingTweens.length < 0) { return }
            for (let tween of Tween.playingTweens) {
                // what to do if tweening a vector --------------------------------------------------------------------------------------------------
                if (tween.instance instanceof Vector2Container && tween.originalValue instanceof Vector2 && tween.goals instanceof Vector2) {
                    if (tween.info.easingSytle == EasingStyle.Linear && tween.info.easingDirection == EasingDirection.NotApplicable) {
                        tween.instance.value = vectors.lerp(tween.originalValue, tween.goals, tween.linearProgression)
                    } else {
                        // get the progression value for the appropriate tweening function and style
                        const tweenedTime = easingsFunctions[tween.info.easingSytle][tween.info.easingDirection](tween.linearProgression)
                        //use the progression value to lerp the vector
                        tween.instance.value = vectors.lerp(tween.originalValue, tween.goals, tweenedTime)
                    }
                    // console.log(tween.instance.value.x)
                    if (tween.linearProgression >= 1) {
                        tween.state = TweenState.Complete
                        tween.linearProgression = tween.linearConstant
                        tween.instance.value = tween.goals
                        switchArrayLocation(tween, Tween.playingTweens, Tween.completedTweens)
                        //fire compleated event
                    } else {
                        tween.linearProgression = Math.clamp(0, 1, tween.linearProgression + tween.linearConstant)
                    }
                // what to do if tweening a number
                } else if (tween.instance instanceof NumberContainer && typeof tween.originalValue == "number" && typeof tween.goals == "number") {
                    if (tween.info.easingSytle == EasingStyle.Linear && tween.info.easingDirection == EasingDirection.NotApplicable) {
                        tween.instance.value = lerp(tween.originalValue, tween.goals, tween.linearProgression)
                    } else {
                        // get the progression value for the appropriate tweening function and style
                        const tweenedTime = easingsFunctions[tween.info.easingSytle][tween.info.easingDirection](tween.linearProgression)
                        //use the progression value to lerp the number
                        tween.instance.value = lerp(tween.originalValue, tween.goals, tweenedTime)
                    }
                    // console.log(tween.instance.value)
                    if (tween.linearProgression >= 1) {
                        //fire completed event
                        tween.state = TweenState.Complete
                        tween.linearProgression = tween.linearConstant
                        tween.instance.value = tween.goals
                        switchArrayLocation(tween, Tween.playingTweens, Tween.completedTweens)
                    } else {
                        tween.linearProgression = Math.clamp(0, 1, tween.linearProgression + tween.linearConstant)
                    }
                // what to do if tweening a sprite's properties ------------------------------------------------------------------------------------------------
                } else if (tween.instance instanceof Sprite && !(tween.originalValue instanceof Vector2 || typeof tween.originalValue == "number") && tween.goals instanceof TweenGoal) {
                    // get the progression value for the appropriate tweening function and style
                    let tweenedTime = 0
                    if (tween.info.easingSytle == EasingStyle.Linear && tween.info.easingDirection == EasingDirection.NotApplicable) {
                        tweenedTime = tween.linearProgression
                    } else {
                        tweenedTime = easingsFunctions[tween.info.easingSytle][tween.info.easingDirection](tween.linearProgression)
                    }
            
                    // loop through all chosenProperties
                    for (let property of tween.goals.chosenProperties) {
                        // get the index of current chosen property
                        const originalVectorIndex = tween.goals.chosenProperties.indexOf(property)
                        // use said index to get the original vector for that property
                        const tweenedVector = vectors.lerp(tween.originalValue[originalVectorIndex], property.value, tweenedTime)
                        vectors.vectorToSpriteProperty(tween.instance, property.spritePropertyIndex, tweenedVector)
                    }
                    // check if tween is compleate
                    if (tween.linearProgression >= 1) {
                        //fire completed event
                        //set each property to its correct tween goal. Dont do tween.instance = tween.goals (probaly)
                        tween.linearProgression = tween.linearConstant
                        for (let property of tween.goals.chosenProperties) {
                            vectors.vectorToSpriteProperty(tween.instance, property.spritePropertyIndex, property.value)
                            console.log(tween.instance.x)
                        }
                        switchArrayLocation(tween, Tween.playingTweens, Tween.completedTweens)
                        tween.state = TweenState.Complete
                        tween.fire(TweenState.Complete)
                    } else {
                        tween.linearProgression = Math.clamp(0, 1, tween.linearProgression + tween.linearConstant)
                    }
                }
            }
        })
    }

    //% block="play $this"
    //% this.shadow="variables_get" this.defl="tween"
    //% weight=94
    //% group="Functions"
    play() {
        console.log("called")
        if (this.instance instanceof Sprite && this.goals instanceof TweenGoal) {
            // make array
            let vector2Array: Vector2[] = []
            // use the spritePropertyIndex property of each chosen property to obtain the original/starting value of the property
            for (let goalInformation of this.goals.chosenProperties) {
                vector2Array.push(vectors.spritePropertyToVector(this.instance, goalInformation.spritePropertyIndex))
            }
            this.originalValue = vector2Array
        } else if ((this.instance instanceof Vector2Container && this.goals instanceof Vector2) || (this.instance instanceof NumberContainer && typeof this.goals == "number")) {
            // the original value is a single vector (or a number) rather than an array of vectors (your only tweening one value)
            this.originalValue = this.instance.value
        } else {
            // lets hope this never happens
            throw ("failed for some reason")
        }
        // play
        switchArrayLocation(this, Tween.idleTweens, Tween.playingTweens)
    }

    // fires all the handlers in the state changed Event
    // I plan to add more events latter
    private fire(state: TweenState) {
        for (let handler of Tween.handlers) {
            console.log(Tween.handlers.length)
            handler(this, state)
        }
    }

}

//% groups='["Create", "Functions", "Events"]'
//% weight=100 color=#0fbc11
namespace tweenExtension {
    //% block="new tween object $instance, $info, $goals"
    //% blockSetVariable="tweenObject"
    //% instance.shadow="variables_get" instance.defl="instance"
    //% info.shadow="variables_get" info.defl="info"
    //% goals.shadow="variables_get" goals.defl="goals"
    //% weight=100
    //% group="Create"
    export function createTween(instance: Sprite | Vector2Container | NumberContainer, info: TweenInfo, goals: TweenGoal | Vector2 | number): Tween {
        if (instance instanceof Vector2Container && (goals instanceof TweenGoal || typeof goals == "number")) {
            throw "When tweening a vector, the goal parameter must also be a vector."
        } else if (instance instanceof NumberContainer && (goals instanceof TweenGoal || goals instanceof Vector2 )) {
            throw "When tweening a number, the goal parameter must also be a number"
        } else if (instance instanceof Sprite && (goals instanceof Vector2 || typeof goals == "number")) {
            throw "When tweening a Sprite, the goal parameter must be a tween goal"
        } else if (info.easingSytle == EasingStyle.Linear && !(info.easingDirection == EasingDirection.NotApplicable)) {
            throw "When using a Linear easing style (also know as linear interpolation), the easing direction must be n/a (not applicable)."
        }
        if (goals instanceof TweenGoal) {
            goals.chosenProperties = []
            // This monstrosity is a temporary solution to an issue I was having. Once the issue is fixed, it will all go away.
            if (goals.position instanceof Vector2) {
                goals.chosenProperties.push({ spritePropertyIndex: 0, value: goals.position })
            }
            if (goals.velocity instanceof Vector2) {
                goals.chosenProperties.push({ spritePropertyIndex: 1, value: goals.velocity })
            }
            if (goals.acceleration instanceof Vector2) {
                goals.chosenProperties.push({ spritePropertyIndex: 2, value: goals.acceleration })
            }
            if (goals.friction instanceof Vector2) {
                goals.chosenProperties.push({ spritePropertyIndex: 3, value: goals.friction })
            }
            if (goals.scale instanceof Vector2) {
                goals.chosenProperties.push({ spritePropertyIndex: 4, value: goals.scale })
            }
        }
        const tween = new Tween(instance, info, goals)
        return tween
    }

    //% block="new tween object $instance, $info, $goals"
    //% blockAliasFor="tweenExtension.createTween"
    //% instance.shadow="variables_get" instance.defl="instance"
    //% info.shadow="variables_get" info.defl="info"
    //% goals.shadow="variables_get" goals.defl="goals"
    //% weight=99
    //% group="Create"
    export function __createTween(instance: Vector2Container | Sprite, info: TweenInfo, goals: TweenGoal | Vector2): Tween {
        if (instance instanceof Vector2Container && goals instanceof TweenGoal) {
            throw "When tweening a vector, the goal parameter must also be a vector."
        } else if (instance instanceof Sprite && goals instanceof Vector2) {
            throw "When tweening a Sprite, the goal parameter must be a tween goal"
        } else if (info.easingSytle == EasingStyle.Linear && !(info.easingDirection == EasingDirection.NotApplicable)) {
            throw "When using a Linear easing style (also know as linear interpolation), the easing direction must be n/a (not applicable)."
        }
        if (goals instanceof TweenGoal) {
            goals.chosenProperties = []
            // This monstrosity is a temporary solution to an issue I was having. Once the issue is fixed, it will all go away.
            if (goals.position instanceof Vector2) {
                goals.chosenProperties.push({ spritePropertyIndex: 0, value: goals.position })
            }
            if (goals.velocity instanceof Vector2) {
                goals.chosenProperties.push({ spritePropertyIndex: 1, value: goals.velocity })
            }
            if (goals.acceleration instanceof Vector2) {
                goals.chosenProperties.push({ spritePropertyIndex: 2, value: goals.acceleration })
            }
            if (goals.friction instanceof Vector2) {
                goals.chosenProperties.push({ spritePropertyIndex: 3, value: goals.friction })
            }
            if (goals.scale instanceof Vector2) {
                goals.chosenProperties.push({ spritePropertyIndex: 4, value: goals.scale })
            }
        }
        const tween = new Tween(instance, info, goals)
        return tween
    }

    //% block="new tween info||for a tween that has, in seconds, a length of $length|has an easingstyle of $easingStyle|has an easingDirction of $easingDirection"
    //% blockSetVariable="tweenInfo"
    //% expandableArgumentMode="enabled"
    //% length.defl=1
    //% easingDirection.defl=EasingDirection.NotApplicable
    //% weight=98
    //% group="Create"
    export function createTweenInfo(length?: number, easingStyle?: EasingStyle, easingDirection?: EasingDirection) {
        return new TweenInfo(length, easingStyle, easingDirection)
    }

    //% block="new tween info||for a tween that has, in seconds, a length of $length|has an easingstyle of $easingStyle|has an easingDirction of $easingDirection"
    //% blockAliasFor="tweenExtension.createTweenInfo"
    //% expandableArgumentMode="enabled"
    //% length.defl=1
    //% easingStyle.defl=EasingStyle.Linear
    //% easingDirection.defl=EasingDirection.NotApplicable
    //% weight=97
    //% group="Create"
    export function _createTweenInfo(length?: number, easingStyle?: EasingStyle, easingDirection?: EasingDirection) {
        return new TweenInfo(length, easingStyle, easingDirection)
    }

    //% block="A new tween goal"
    //% blockSetVariable="tweenGoal"
    //% weight=96
    //% group="Create"
    export function createTweenGoal() {
        return new TweenGoal
    }

    //% block="A new tween goal"
    //% blockAliasFor="tweenExtension.createTweenGoal"
    //% weight=95
    //% group="Create"
    export function __createTweenGoal() {
        return new TweenGoal
    }

    //% block="A new $containerType container with a value of $value"
    //% blockSetVariable="container"
    //% value.shadow="variables_get" value.defl="value"
    //% weight=94
    //% group="Create"
    export function createContainer(containerType: ContainerTypes, value: Vector2 | number) {
        switch (containerType) {
            case ContainerTypes.Vector2:
                if (!(value instanceof Vector2)) {
                    throw"value does not match the type of container type"
                } else {
                    return new Vector2Container(value)
                }
                break;
            case ContainerTypes.Number:
                if (!(typeof value == "number")) {
                    throw "value does not match the type of container type"
                } else {
                    return new NumberContainer(value)
                }
                break;
        }
    }

    //% block="A new $containerType container with a value of $value"
    //% blockAliasFor="tweenExtension.createContainer"
    //% value.shadow="variables_get" value.defl="value"
    //% weight=93
    //% group="Create"
    export function __createContainer(containerType: ContainerTypes, value: Vector2 | number): Vector2Container | NumberContainer {
        switch (containerType) {
            case ContainerTypes.Vector2:
                if (!(value instanceof Vector2)) {
                    throw "value does not match the type of container type"
                } else {
                    return new Vector2Container(value)
                }
                break;
            case ContainerTypes.Number:
                if (!(typeof value == "number")) {
                    throw "value does not match the type of container type"
                } else {
                    return new NumberContainer(value)
                }
                break;
        }
    }
    // Tween.play()

    //% block="When the state of $tween changes to $state"
    //% draggableParameters
    //% weight=94
    //% group="Events"
    export function onStateChanged(handler: (tween: Tween, state: TweenState) => void) {
        Tween.handlers.push(handler)
    }
}