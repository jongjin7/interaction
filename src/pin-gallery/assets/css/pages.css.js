import { style } from "@vanilla-extract/css";
import {bodyBgColorEnd, previewCircleName, bodyMaxWidth, bodyMinWidth, circleSize, maxCircleSize} from "./variables.css";

// 메인
export const pageTypeMain = style([
    {
        // display:'none',
        position:'fixed', zIndex: 100,
        transition: 'transform 0.5s ease-in-out',
        '.page-container':{
            height: '100%',
            color: '#1a1a1a',
            '&:before, &:after':{
                display:'none',
                position:'absolute', left:0,  top:0, right:0, bottom:0,
                content:'""',
            },
            '&:before':{
                display: 'block',
                background:'no-repeat center center / contain',
                backgroundImage:`linear-gradient(180deg, rgba(255,255,255, 0.1) 0%, rgba(${bodyBgColorEnd}, 0.95) 100%)`,
                transition:'background-image 0.5s ease, background-position 0.1s ease 0.4s',
            },
            '&.is-loading':{
                '&:after':{
                    display: 'block',
                    backgroundColor:'transparent',
                    // backgroundColor:'rgba(255,255,255,0.5)',
                }
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
            },
        },
    },
    {
        '@media': {
            'screen and (min-width: 600px) and (max-height: 400px)': {
                header:{
                    '.inner':{
                        padding:'16px 0',
                    }
                },
                main:{
                    paddingTop: '1vh'
                },
                '.copyright':{
                    marginTop: '0'
                }
            },
            'screen and (min-width: 600px) and (min-height: 400px)': {
                header:{
                    '.inner':{
                        padding: '60px 0',
                    }
                },
                main:{
                    paddingTop:'150px'
                }
            },
        },
    }
]);

export const mainPseudoCircle = style({
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

export const mainToggleBtnArea = style({
    position:'absolute', right: '1.5rem', top:'1.5rem',
    zIndex: 20,
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

export const mainHeader = style({
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

export const mainPreviewCircleButton = style([
    {
        '--track-width': `calc(${circleSize} * 0.2)`,
        '--track-outer-width':`calc(${circleSize} * 0.1)`,
        '--img-track-width': `calc(${circleSize} * 0.4)`,
        position:'relative',
        display:'flex',
        justifyContent:'center',
        '.btn-circle': {
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

export const mainFormGroup = style({
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

// 서브
export const pageTypeList = style({
    opacity:0 ,
    // opacity:'1 !important',
    position: 'relative',
    transition: 'opacity 0.3s ease-in-out',
    paddingBottom: '10vh',
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
        padding: '0 16px 8px',
        borderBottom:'1px solid #eaeaea',
        boxShadow:'0 2px 6px rgba(255,255,255, 0.7)',
        a:{
            display:'inline-block',
            padding: '6px 8px 0',
            height:'32px',
            fontSize:'0.875rem',
            borderRadius: '8px',
            textAlign: 'center',
            whiteSpace:'nowrap',
        }
    },
    '.tab-contents':{
        display:'flex',
        flexWrap:'nowrap',
        overflowX:'auto',
        scrollSnapType:'x mandatory',
        scrollBehavior: 'smooth',
        '&::-webkit-scrollbar':{
            display:'none'
        },
        '.tab-panel':{
            flexShrink: 0,
            width:'100%',
            scrollSnapAlign:'start',
            //paddingTop: '8px',
            height: 'calc(88svh - 56px)',
            overflowY:'auto',
            '& > div':{
                transition: 'all 0.35s ease',
            },

            '&.is-removable':{
                '.btn-delete':{
                    visibility:'visible',
                    pointerEvents:'auto',
                    '& + a':{
                        pointerEvents: 'none'
                    }
                }
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

    '.list-header':{
        display:'flex',
        justifyContent:'space-between',
        alignItems:'center',
        padding:'0 24px 0',
        marginBottom: '12px',
        lineHeight:1,

        '.title':{
            display:'flex',
            alignItems:'center',
            gap:'8px'
        },

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
            '--del-color': '#f43f5e',
            display:'flex',
            justifyContent:'center',
            alignItems:'center',
            position:'absolute',
            left:0, top:0, bottom:0, right:0,
            zIndex:1,
            overflow:'hidden',
            opacity: 0.5,
            color: 'var(--del-color)',
            border:'2px solid transparent',
            borderRadius:'8px',
            visibility:'hidden',
            pointerEvents:'none',
            'svg':{
                position:"relative", zIndex: 1,
                width: '40px', height:'40px',
                'path':{
                    filter: 'drop-shadow(0 0 0.3px rgba(0, 0, 0, 0.3))',
                    transformOrigin: 'center center',
                    transform: 'scale(0.9)'
                }
            },
            '&.selected':{
                opacity:1,
                borderColor:'var(--del-color)',
                '&:before':{
                    display:'block',
                    position:'absolute',
                    left:0, top:0, bottom:0, right:0,
                    backgroundColor: 'rgba(255, 255, 255, 0.4)',
                    backdropFilter: 'blur(1px)',
                    content:'""'
                }
            },
            '@media (hover: hover)':{
                '&:hover':{
                    opacity:1,
                },
            }
        },
        img:{
            width:'100%',
            height: '100%',
            objectFit:'contain'
        },

    },
    '.btn-group':{
        justifyContent:'space-between',
        padding:'16px 16px',
    }
});