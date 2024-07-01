import {assignVars, globalStyle,  createTheme, createVar, style } from '@vanilla-extract/css';

export const bodyMinWidth = createVar();
export const bodyMaxWidth = createVar();
export const circleSize = createVar();
export const bodyBgColorStart = createVar();
export const bodyBgColorEnd = createVar();

globalStyle('body', {
    vars: {
        [bodyMinWidth]: '360px',
        [bodyMaxWidth]: '767px',
        [circleSize]: '60vw',
        [bodyBgColorStart]: '237, 99, 7',
        [bodyBgColorEnd]: '0, 16, 34'
    },
    backgroundColor:'#000',
    color:'#393939',
    minWidth: bodyMinWidth,
    maxWidth: bodyMaxWidth,
    margin:'0 auto',
    'h1, h2, h3, h4, h5, h6': {
        margin:0
    },
    '#app':{
        // height: 'inherit',
        backgroundColor:'#fff'
    },
    '.route-frame':{
        height: '100%',
        maxWidth:'767px',
        margin:'0 auto',
        color: '#1a1a1a',
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
        opacity: 0
    }
});

globalStyle('[data-current-page=list]', {
    '#home':{
        transform: 'translateY(90vh)',
        margin: '10px',
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
        }
    },
    '#list':{
        opacity: 1
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

const button = style({

})


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
            backgroundColor: '#fff',
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
        padding: '8vw 0',
        margin: '0 auto',
        textAlign:'center',
        color:'white',
    },
    '.text-holder':{
        opacity:0.3,
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

export const previewCircle = style({
    display:'flex',
    justifyContent:'center',

    '.btn-circle': {
        position:'relative',
        width: circleSize, height: circleSize,
        maxWidth: '300px',
        maxHeight: '300px',

        '&:before': {
            '--track-width': `calc(${circleSize} * 0.2)`,
            width:`calc(100% - var(--track-width))`,
            height: `calc(100% - var(--track-width))`,
            boxShadow: `inset 0 0 0 calc(var(--track-width) * 0.5) rgba(0,0,0, 0.2), inset 0.2vw 0.2vw 1vw rgba(0,0,0, 0.3)`
        },

        '&:after':{
            boxShadow: `inset 0 0 0 6vw rgba(0,0,0, 0.1), inset 0.2vw 0.2vw 1vw rgba(0,0,0, 0.3)`,
        },

        '.img-circle':{
            width: '100%', height:'100%',
            borderRadius:'50%',
            padding:'12vw',
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
        }
    }
});

export const bodyContent = style({
    height: '100%',
    color: '#1a1a1a',
    selectors:{
        '&:before':{
            display: 'block',
            position:'absolute', left:0,  top:0, right:0, bottom:0,
            // zIndex:2,
            // backgroundImage: 'conic-gradient(from 180deg at 50% 40%, #f69d3c, #3f87a6)',
            background:'no-repeat center center / contain',
            backgroundImage: `linear-gradient(180deg, rgba(${bodyBgColorStart}, 0.85) 20%, rgba(${bodyBgColorEnd}, 0.85) 80%, rgba(${bodyBgColorEnd}, 0.95) 100%)`,
            content:'',
        },
    },

    main:{
        display:'flex', alignItems:'center',
        flexFlow:'column wrap',
        position:'absolute', left:0, top:0, bottom:0, right:0,
        paddingTop: '24vw'
    },

    '& img':{
        width: '100%',
        height: '100%',
        objectFit: 'cover'
    }
})

export const mainController = style({
    position:'absolute', bottom: 0, left:0, right:0,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    flexDirection: 'column',
    padding: '0 8vw 4vw',
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
    '.row':{
      display:'flex',

    },
    '.divide-box':{
        border:'1px solid red'
    },

    '.copyright':{
        color: 'rgba(255,255,255,0.2)',
        fontSize: '0.75rem',
    },

    '&.is-ready':{
        paddingBottom: '40vh'
    }

});

// 페이지 컨테이너 정의
// 메인
export const pageTypeMain = style({
    display:'none',
    position:'fixed', zIndex: 100,
    transition: 'transform 0.5s ease-in-out, margin 0.3s ease-in'
})

// 서브
export const pageTypeList = style({
    // display:'none',
    // opacity:0,
    position: 'relative',
    transition: 'opacity 0.3s ease-in-out',

    '&.show': {
       display:'block',
    },
    '& > .container':{
        height: '100%',
        padding:'12px 0',
    },
    '.page-header':{
        display:'flex',
        justifyContent:'space-between',
        alignItems:'center',
        padding: '0 16px',
        lineHeight:1,
    },
    '.tabs':{
        position:'sticky', top:'0',
        padding:'0 0 8px',
        backgroundColor:'rgba(255,255,255, 0.8)',
        backdropFilter: 'blur(6px)',
    },
    '.tab-nav':{
        display:'flex',
        gap: '12px',
        overflowY:'auto',
        paddingLeft:'16px',
        borderBottom:'1px solid #eaeaea',
        a:{
            display:'inline-flex',
            padding: '8px 0',
            minWidth:'60px',
            fontSize:'0.875rem',
            // backgroundColor:'pink'
        }
    },
    '.btn-group':{
        display:'flex',
        gap: '8px',
    }
});

export const galleryList = style({
    // border:'1px solid red',
    marginBottom:'24px',

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
      '.list':{
          display: 'block',
          overflow: 'visible',
          columnCount:2,
          '.list-item':{
              height:'auto',
              minHeight:'auto',
              maxHeight:'none',
              marginBottom: '12px',
              img:{
                  objectFit:'contain'
              }
          }
      }
    },

    '.list-header':{
        position:'sticky', top:'45px',
        display:'flex',
        justifyContent:'space-between',
        alignItems:'center',
        padding:'0 16px 0',
        marginBottom: '4px',
        lineHeight:1,
        backgroundColor:'rgba(255,255,255, 0.8)',
        backdropFilter: 'blur(6px)',
        boxShadow:'0 2px 6px rgba(255,255,255, 0.7)',
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
        display:'flex',
        gap: '12px',
        width: '100%',
        padding:'0 16px',
        overflowY:'auto',
    },
    '.list-item':{
        height: '10vw',
        minHeight:'70px',
        maxHeight: '100px',
        flexShrink:0,
        borderRadius:'8px',
        boxShadow:"0 0 6px rgba(0,0,0, 0.05)",
        overflow:'hidden',
        img:{
            width:'100%',
            height: '100%',
            objectFit:'cover'
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

