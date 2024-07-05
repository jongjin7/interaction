import { style } from "@vanilla-extract/css";
import {bodyBgColorEnd, previewCircleName} from "./variables.css";

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
export const pageToggleArea = style({
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

// 서브
export const pageTypeList = style({
    opacity:0,
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
            height: 'calc(88svh - 56px)',
            overflowY:'auto',
            '& > div':{
                transition: 'all 0.35s ease',
            },
        }
    },
    '.btn-group':{
        display:'flex',
        gap: '8px',
    }
});
