import { createTheme, style } from '@vanilla-extract/css';

export const [themeClass, vars] = createTheme({
    color: {
        brand: 'red'
    },
    font: {
        body: 'arial'
    }
});

export const myStyle = style({
    backgroundColor: vars.color.brand,
    fontFamily: vars.font.body,
    color: 'blue',

    ':before': {
        display:"inline",
        content: '---'
    }
});

export const container = style({
    padding: 10,
    margin: 0,
    border: '1px solid red'
});

