import { createTheme, style } from '@vanilla-extract/css';

export const [themeClass, vars] = createTheme({
    color: {
        brand: 'blue'
    },
    font: {
        body: 'arial'
    }
});

export const myStyle = style({
    backgroundColor: vars.color.brand,
    fontFamily: vars.font.body,
    color: 'white',
    fontSize: '1rem',

    ':hover': {
        color: 'pink',
        backgroundColor: "brown"
    },
    ':before': {
        display:"inline",
        content: '---'
    }
});

export const container = style({
    padding: 10,
    margin: 0
});

