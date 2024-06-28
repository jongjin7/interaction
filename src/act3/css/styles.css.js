import {globalStyle,  createTheme, createVar, style } from '@vanilla-extract/css';

globalStyle('body', {
    backgroundColor:'#000',
    minWidth: 360,
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

export const backgroundImg = style({
    height: '100%',
    selectors:{
        '&:before':{
            display: 'block',
            position:'absolute', left:0,  top:0, right:0, bottom:0,
            // backgroundImage: 'conic-gradient(from 180deg at 50% 40%, #f69d3c, #3f87a6)',
            background:'no-repeat center center / contain',
            backgroundImage: 'linear-gradient(180deg, rgba(251, 151, 57, 1.0) 0%, rgba(11, 5, 30, 1.0) 90%)',
            content:'',
            opacity: 0.85
        },
    },
    '.mask':{
        position:'absolute', left:'calc(50% - 8vw)', top:'8vw', bottom:0, right:0,
        width:'16vw', height: '16vw',
        // boxShadow: `
        //     0 0 0 2vw rgba(0, 0, 0, 0.4),
        //     0 0 0 4vw rgba(0, 0, 0, 0.2)
        // `,
        '.circle':{
            position:'absolute', left:0, top:0,
            zIndex:2,
            width: '100%', height:'100%',
            borderRadius:'50%',
            border:'1px solid red'
        },
        '.img':{
            width: '100%', height:'100%',
            borderRadius:'50%',
            overflow:'hidden',
            padding: '2vw',
            backgroundColor:'rgba(0, 0, 0, 0.6)',
            boxShadow: `inset 0.2vw 0.2vw 0.5vw red`,
            //border:'2vw solid rgba(0, 0, 0, 0.6)',

            img:{
                borderRadius:'50%',
            }
        },

        selectors:{
            '&:before, &:after':{
                display: 'block',
                position:'absolute', left:0,  top:0, right:0, bottom:0,
                opacity: 0.85,
                content:'',
            },
        },
    },

    '& img':{
        width: '100%',
        height: '100%',
        objectFit: 'cover'
    }
})

export const sideContent = style({
    position: 'absolute', right: 0, top:0, bottom:0,
    zIndex: 2,
    // display: 'flex', alignItems: 'center', justifyContent: 'center',
    display:'none',
    width: '50vw',
    maxWidth: '400px',
    border:'1px solid blue'
    // backgroundColor: 'rgb(255,255, 255, 0.3)',
});

export const mainBox = style({
    position: 'relative',
    height: '100%',
    maxWidth:767,
    margin:'0 auto',
})

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

