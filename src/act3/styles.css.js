import { createTheme, style } from '@vanilla-extract/css';
import IMG from './img/icon.svg';
export const [themeClass, vars] = createTheme({
    color: {
        brand: 'red'
    },
    font: {
        body: 'arial'
    }
});

export const myStyle = style({
    backgroundColor: 'pink',
    fontFamily: vars.font.body,
    color: 'blue',

    ':before': {
        display:"inline-block",
        width: 24,
        height: 24,
        backgroundImage: `url(./img/icon.svg)`,
        backgroundSize:'cover',
        content: ''
    }
});
export const bodyBg = style({
    height: '100vh',
    backgroundImage: 'radial-gradient(red, blue)'
})
export const container = style({
    padding: 10,
    margin: 0,
    border: '1px solid red',
});

export const backgroundImg = style({
    ':before': {
        display:"block",
        height: 100,
        marginBottom: 16,
        backgroundImage: `url(./img/@sample.png)`,
        backgroundSize:'contain',
        content: ''
    }
})

