import {globalStyle,  createTheme, createVar, style } from '@vanilla-extract/css';

globalStyle('body', {
    backgroundColor:'#000'
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

const shadowColor = createVar();

export const sideContent = style({
    position: 'absolute', right: 0, top:0, bottom:0,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    width: '30vw',
    backgroundColor: 'rgb(255,255, 100, 0.3)',
});

export const mainBox = style({
    position: 'relative',
    height: '100%',
    backgroundImage: 'radial-gradient(red, blue)',
    maxWidth:767,
    margin:'0 auto',
})
console.log('aaa', vars.color.brand)
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

