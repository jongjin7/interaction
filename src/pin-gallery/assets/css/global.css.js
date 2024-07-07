import {globalStyle} from "@vanilla-extract/css";
import {bodyBgColorEnd, bodyBgColorStart, bodyMaxWidth, bodyMinWidth, circleSize, maxCircleSize} from "./variables.css";

globalStyle('body', {
    vars: {
        [bodyMinWidth]: '360px',
        [bodyMaxWidth]: '900px',
        [circleSize]: '60vw',
        [maxCircleSize]: '300px',
        [bodyBgColorStart]: '237, 99, 7',
        [bodyBgColorEnd]: '0, 16, 34'
    },
    backgroundColor:'#000',
    color:'#374151', //gray-700
    minWidth: bodyMinWidth,
    maxWidth: bodyMaxWidth,
    margin:'0 auto',
    overflow:'hidden',

    '#app':{
        height: 'inherit',
        backgroundColor:'#fff',
        transition: 'opacity .5s ease-in-out',
    },
    '.page-panel':{
        width: '100%',
        height: '100%',
        maxWidth: bodyMaxWidth,
        margin:'0 auto',
    },

    button:{
        alignItems:'center',
        gap:'12px',
        userSelect:'none',
    },

    '.fadein':{
        opacity:1
    },
    '.fadeout':{
        opacity:0
    }
});

globalStyle('[data-current-page=home]', {
    '#home':{
        transform: 'translateY(0)',
        margin: '0',
    },
    '#list':{
        opacity: 0,
        '.tab-contents':{
        }
    }
});

globalStyle('[data-current-page=list]', {
    '#home':{
        transform: 'translateY(88svh)',
        margin: '8px',
        borderTopLeftRadius:'12px',
        borderTopRightRadius:'12px',
        boxShadow:'0 -1vw 4vw 2vw rgba(255,255,255, 0.8)',
        width: `calc( 100% - 16px)`,
        maxWidth: `calc( ${bodyMaxWidth} - 16px)`,
        overflow:'hidden',

        '@media screen and (orientation: landscape)':{
            transform: 'translateY(83svh)',
            header:{
                '.inner':{
                    '.btn-toggle':{
                        marginTop: '-2svh !important'
                    }
                }
            }
        },

        'header':{
            '.inner':{
                padding: '4svh 0',
                '.sub-title':{
                    display:'none'
                },
                '.btn-toggle':{
                    marginTop: '1svh'
                }
            }
        },
        '.btn-toggle':{
            transform:'rotate(-270deg)',
            // left: '4px',
            'span:nth-of-type(1), span:nth-of-type(3)':{
                width: '10px',
            },
            'span:nth-of-type(1)':{
                transform: 'translate(-2px, 7px) rotate(-45deg)'
            },
            'span:nth-of-type(3)':{
                transform: 'translate(-2px, -7px) rotate(45deg)'
            }
        },
    },
    '#list':{
        opacity: 1,
    }
});
