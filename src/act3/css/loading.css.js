import {assignVars, globalStyle, style, globalKeyframes} from '@vanilla-extract/css';



const ripple = 'globalRotate';
const bounce = 'myBounce';
const spin = 'mySpin';

globalKeyframes(ripple, {
    '0%': {
        transform: 'scale(0.5)',
        opacity: 0,
    },
    '25%': {
        opacity: 1,
    },
    '100%': {
        transform: 'scale(2.5)',
        opacity: 0,
    }
});

globalKeyframes(bounce, {
    '0%' : {
        transform: `translateY(-40px)`,
        animationTimingFunction: `cubic-bezier(0.76, 0.05, 0.86, 0.06)`
    },
    '50%': {
        transform: `rotateX(45deg) rotateY(0) rotateZ(225deg)`,
        animationTimingFunction: `cubic-bezier(0.76, 0.05, 0.86, 0.06)`
    },
    '100%': {
        transform: `rotateX(45deg) rotateY(0) rotateZ(405deg)`,
        animationTimingFunction: `cubic-bezier(0.17, 0.84, 0.44, 1)`
    }
})

globalKeyframes(spin, {
    '100%':{
        transform: 'rotate(360deg)'
    }
})

const rippleLoop = style([
    {
        position:'absolute', left:0, top:0,
        zIndex: 2,
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        alignItems: 'center',
        '.ripple': {
            position: 'relative',
            width: '50px',
            height: '50px',

            '&:before, &:after': {
                content: '""',
                position: 'absolute',
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                border: '4px solid #FF5C35',
                opacity: '0',
                animation: `${ripple} 3s infinite`,
            },
            '&:after': {
                animationDelay: '1.5s'
            }
        },
    }
])
const defLoading = style({
    position:'absolute', left:0, top:0,
    zIndex: 20,
    width:'100%',
    height:'100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems:'center',
    transition: 'opacity 0.3s ease-in-out',

    '.ripple': {
        flexShrink: 0,
        width: 'calc(100% - var(--img-track-width))',
        height: 'calc(100% - var(--img-track-width))',
        border: '6px solid rgba(255, 255, 255, 0.3)',
        borderTopColor: 'rgb(249 115 22)',
        borderRadius: '50%',
        animation: `${spin} 1s ease-in-out infinite`
    }
})

export const LoadingBasic = defLoading;







