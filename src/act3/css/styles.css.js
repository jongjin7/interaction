import {assignVars, globalStyle,  createTheme, createVar, style, createContainer } from '@vanilla-extract/css';

export const bodyMinWidth = createVar();
export const bodyMaxWidth = createVar();
export const circleSize = createVar();
export const maxCircleSize = createVar();
export const bodyBgColorStart = createVar();
export const bodyBgColorEnd = createVar();
export const previewCircleName = createContainer();

const responsiveStyle = ({ tablet, desktop }) => ({
    '@media': {
        'screen and (min-width: 768px)': tablet,
        'screen and (min-width: 1024px)': desktop
    }
});

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
    color:'#393939',
    minWidth: bodyMinWidth,
    maxWidth: bodyMaxWidth,
    margin:'0 auto',
    overflow:'hidden',
    'h1, h2, h3, h4, h5, h6': {
        margin:0
    },
    '#app':{
        // height: 'inherit',
        backgroundColor:'#fff'
    },
    '.route-frame':{
        width: '100%',
        height: '100%',
        maxWidth: bodyMaxWidth,
        margin:'0 auto',
        //overflow:'hidden',
    },

    button:{
        alignItems:'center',
        gap:'12px'
    }
});

globalStyle('[data-current-page=home]', {
    '#home':{
        transform: 'translateY(0)',
        margin: '0',
    },
    '#list':{
        opacity: 0,
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

        '& > div':{
            '&:before':{
                backgroundPositionY:'-60vh',
                transitionDelay:'background-position 0s',
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

export const [themeClass, vars] = createTheme({
    color: {
        brand: 'blue',
        white: '#fff'
    },
    space: {
        small: '4px',
        medium: '8px',
    }
});


export const mainBodyContent = style([
    {
        height: '100%',
        color: '#1a1a1a',
        selectors:{
            '&:before':{
                display: 'block',
                position:'absolute', left:0,  top:0, right:0, bottom:0,
                // zIndex:2,
                // backgroundImage: 'conic-gradient(from 180deg at 50% 40%, #f69d3c, #3f87a6)',
                background:'no-repeat center center / contain',
                // backgroundImage: `linear-gradient(180deg, rgba(${bodyBgColorStart}, 0.85) 20%, rgba(${bodyBgColorEnd}, 0.85) 80%, rgba(${bodyBgColorEnd}, 0.95) 100%)`,
                backgroundImage:`linear-gradient(180deg, rgba(255,255,255, 0.1) 0%, rgba(${bodyBgColorEnd}, 0.95) 100%)`,
                transition:'background-image 0.5s ease, background-position 0.1s ease 0.4s',
                content:'',
            },
        },

        main:{
            containerType: 'inline-size',
            containerName: previewCircleName,
            display:'flex', alignItems:'center',
            flexFlow:'column wrap',
            position:'absolute', left:0, top:0, bottom:0, right:0,
            paddingTop: '20vh',

        },

        '& img':{
            width: '100%',
            height: '100%',
            objectFit: 'cover'
        },
        '@container':{
            '(min-width: 600px)': {
                paddingTop:'128px',
            },
        }
    },
    // responsiveStyle({
    //     tablet: { flex: 1, content: 'I will be overridden' },
    //     desktop: { flexDirection: 'row' }
    // }),
    {
        '@media': {
            'screen and (min-width: 600px) and (min-height: 300px)': {
                header:{
                    '.inner':{
                        padding: '60px 0',
                    }
                },
                main:{
                    paddingTop:'150px'
                }
            },
            // 'screen and (max-height: 600px)': {
            //     minHeight: '600px',
            // },
            // [`(orientation: landscape) and (min-width: 900px) and (max-height: 600px)`]: {
            //     header:{
            //         '.inner':{
            //             padding: '32px 0'
            //         }
            //     },
            //     main:{
            //         paddingTop: '32px'
            //     },
            //     '.copyright':{
            //         marginTop: '0',
            //     }
            // },
            // '(orientation: portrait) and (min-width: 600px)':{
            //     header:{
            //         '.inner':{
            //             padding: '60px 0',
            //         }
            //     },
            // },


        },
    },
])

export const pseudoCircle = style({
    selectors: {
        '&:before, &:after': {
            display: 'block',
            position: 'absolute', left: '50%', top:'50%',
            width: '100%', height:'100%',
            borderRadius:'50%',
            transform: 'translate(-50%, -50%)',
            content: '""',
        }
    },
});

export const pageToggleArea = style({
    position:'absolute', right: '1.5rem', top:'1.5rem',
    'button':{
        display:'block',
        position: 'relative',
        width: '24px',
        height: '22px',
        span:{
            position: 'absolute',
            left: 0,
            width: '100%',
            height: '2px',
            backgroundColor: '#1a1a1a',
            borderRadius: '1px',
            '&:nth-of-type(1)':{
                top:0,
            },
            '&:nth-of-type(2)':{
                top: '10px'
            },
            '&:nth-of-type(3)':{
                bottom:0,
            }
        },
        opacity:0.8,

        '&:hover':{
            opacity: 1
        },
        '&, span':{
            transition:'all 0.5s ease-in-out',
        }
    }
})

export const headerContent = style({
    position:'fixed', top:0, left:0, right:0,
    zIndex:10,
    '.inner':{
        position:'relative',
        minWidth: bodyMinWidth,
        maxWidth: bodyMaxWidth,
        padding: '15vw 0',
        margin: '0 auto',
        textAlign:'center',
        // color:'white',
    },
    '.text-holder':{
        //opacity:0.3,
        '.title':{
            fontSize:'1.5rem',
            fontWeight: '600',
            lineHeight:1,
        },
        '.sub-title':{
            marginTop: '0.25em',
            padding:0,
            fontSize: '0.875rem'
        }
    },

})

export const previewCircle = style([
    {
        display:'flex',
        justifyContent:'center',
        '.btn-circle': {
            '--track-width': `calc(${circleSize} * 0.2)`,
            '--track-outer-width':`calc(${circleSize} * 0.1)`,
            position:'relative',
            width: circleSize, height: circleSize,
            maxWidth: maxCircleSize,
            maxHeight: maxCircleSize,
            borderRadius:'50%',
            overflow:'hidden',

            '&:before': {
                width:`calc(100% - var(--track-width))`,
                height: `calc(100% - var(--track-width))`,
                boxShadow: `inset 0 0 0 calc(var(--track-width) * 0.5) rgba(0,0,0, 0.2), inset 0.2vw 0.2vw 1vw rgba(0,0,0, 0.3)`
            },

            '&:after':{
                boxShadow: `inset 0 0 0 var(--track-outer-width) rgba(0,0,0, 0.1), inset 0.2vw 0.2vw 1vw rgba(0,0,0, 0.3)`,
            },

            '.img-circle':{
                width: '100%', height:'100%',
                borderRadius:'50%',
                padding: `calc(${circleSize} * 0.2)`,
                overflow:'hidden',

                '&:before': {
                    '--img-track-width': `calc(${circleSize} * 0.4)`,
                    width:`calc(100% - var(--img-track-width))`,
                    height: `calc(100% - var(--img-track-width))`,
                    backgroundImage:'radial-gradient(circle at 10% 10%, rgba(255,255,255, 0.5), transparent)',
                    boxShadow: `inset 0.2vw 0.2vw 1vw rgba(0,0,0, 0.5)`,
                },
                '&:after':{
                    display: 'none'
                },

                img:{
                    borderRadius:'50%',
                }
            },
            '.icon-camera':{
                position: 'absolute', left: `calc(50% - (100% * 0.3 / 2))`, top: 'calc(50% - (100% * 0.3 /2))',
                width: `calc(100% * 0.3)`,
                height: `calc(100% * 0.3)`,
                opacity:0.5,
                path:{
                    // filter: 'drop-shadow(0 0 0.5px rgba(0, 0, 0, 0.5))'
                    filter: 'drop-shadow(0 0 0.5px rgba(255, 255, 255, 0.7))'
                }
            },
        },
    },
    {
        '@container': {
            [`${previewCircleName} (min-width: 600px)`]: {
                vars: {
                    [circleSize]: maxCircleSize,
                },

            },
        },
    }
]);

export const mainController = style({
    position:'absolute', bottom: 0, left:0, right:0,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    flexDirection: 'column',
    padding: '0 8vw 2vh',
    gap:'8px',
    transition:'padding 0.3s ease-in',

    'button, input, select':{
        height: '50px'
    },

    'input, select':{
        color: 'rgba(255,255,255,0.8)',
        borderColor: 'rgba(255,255,255,0.3)',
        backgroundColor:'rgba(255,255,255,0.1)',
        '&:focus':{
            borderColor:'white'
        }
    },
    '.divide-box':{
        border:'1px solid red'
    },

    '.custom-field':{
        '&.none':{
            display:'none'
        }
    },

    '.copyright':{
        marginTop: '4vw',
        color: 'rgba(255,255,255,0.2)',
        fontSize: '0.75rem',
    },
});

// 페이지 컨테이너 정의
// 메인
export const pageTypeMain = style({
    // display:'none',
    position:'fixed', zIndex: 100,
    transition: 'transform 0.5s ease-in-out'
})

// 서브
export const pageTypeList = style({
    opacity:0,
    // opacity:1,
    position: 'relative',
    transition: 'opacity 0.3s ease-in-out',
    '& > .page-container':{
        height: '100%',
        padding:'16px 0 12px',
    },
    '.page-header':{
        display:'flex',
        justifyContent:'space-between',
        alignItems:'center',
        padding: '0 16px',
        lineHeight:1,
    },
    '.tabs':{
        position:'sticky', top:'0', zIndex:10,
        padding:'8px 0 0',
        backgroundColor:'rgba(255,255,255, 0.9)',
        backdropFilter: 'blur(6px)',
    },
    '.tab-nav':{
        display:'flex',
        gap: '8px',
        scrollbarWidth: 'none',
        overflowY:'auto',
        // padding:'0 8px 8px 16px',
        padding: '0 16px 8px',
        borderBottom:'1px solid #eaeaea',
        boxShadow:'0 2px 6px rgba(255,255,255, 0.7)',
        // scrollSnapType:'x mandatory',
        a:{
            display:'inline-block',
            padding: '6px 8px 0',
            // marginLeft:'-8px',
            height:'32px',
            fontSize:'0.875rem',
            borderRadius: '8px',
            textAlign: 'center',
            whiteSpace:'nowrap',
            // scrollSnapAlign:'center'
        }
    },
    '.tab-contents':{
        display:'flex',
        flexWrap:'nowrap',
        // gap: '16px',
        scrollbarWidth: 'none',
        overflowX:'auto',
        scrollSnapType:'x mandatory',
        scrollBehavior: 'smooth',
        '.tab-panel':{
            flexShrink: 0,
            width:'100%',
            border:'1px dotted green',
            scrollSnapAlign:'start',
            '& > div':{
                transition: 'all 0.35s ease',
                // transform: 'translateX(-50%) scale(0.7)',
            },
        }
    },
    '.btn-group':{
        display:'flex',
        gap: '8px',
    }
});

export const galleryList = style({
    paddingTop:'16px',
    marginBottom:'8px',

    '&.ly-grid':{
        '.btn-toggle':{
            'path':{
                '&:first-child':{
                    opacity:0
                },
                '&:last-child':{
                    opacity:'1 !important'
                }
            },
            '&:hover':{
                'path':{
                    '&:first-child':{
                        opacity:'1 !important'
                    },
                    '&:last-child':{
                        opacity:'0 !important'
                    }
                }
            }
        },
    },

    '.list-header':{
        display:'flex',
        justifyContent:'space-between',
        alignItems:'center',
        padding:'0 24px 0',
        marginBottom: '8px',
        lineHeight:1,

        '.btn-toggle':{
            path:{
                '&:last-child':{
                    position:'absolute', left:0, top:0,
                    opacity:0,
                }
            },
             '&:hover':{
                'path':{
                    '&:first-child':{
                        opacity:0
                    },
                    '&:last-child':{
                        opacity:1
                    }
                }
             }
        }
    },
    '.list':{
        display: 'block',
        gap: '12px',
        width: '100%',
        padding:'0 16px',
        columnCount:2,
    },
    '.list-item':{
        position:'relative',
        flexShrink:0,
        borderRadius:'8px',
        boxShadow:"0 0 6px rgba(0,0,0, 0.05)",
        overflow:'hidden',
        marginBottom: '12px',
        '.btn-delete':{
            display:'flex',
            justifyContent:'center',
            alignItems:'center',
            position:'absolute',
            left:0, top:0, bottom:0, right:0,
            zIndex:1,
            overflow:'hidden',
            color: 'white',

            'svg':{
                position:"relative", zIndex: 1,
                width: '24px', height:'24px',
                'path':{
                    filter: 'drop-shadow(0 0 1px rgba(0, 0, 0, 0.1))'
                }
            },
            '&:before':{
                display:'block',
                position:'absolute',
                left:0, top:0, bottom:0, right:0,
                backgroundColor: 'rgba(255, 255, 255, 0.4)',
                backdropFilter: 'blur(1px)',
                content:'""'
            }
        },
        img:{
            width:'100%',
            height: '100%',
            objectFit:'contain'
        }
    },
    '.btn-group':{
        justifyContent:'flex-end',
        marginTop:'8px',
        padding:'0 16px 8px',
    }
});

export const container = style({
    padding: 10,
    margin: 0,
    color: vars.color.brand,
    border: `1px solid ${vars.color.brand}`,
    background:'rgba(255,255,255, 0.4)',
    borderRadius: vars.space.medium
});

export const iconLink = style({
    ':before': {
        display:"inline-block",
        width: 24,
        height: 24,
        backgroundImage: `url(../img/@sample.png)`,
        backgroundSize:'contain',
        verticalAlign:'center',
        content: ''
    }
})

