// eslint-disable-next-line import/no-extraneous-dependencies
import { globalStyle } from '@vanilla-extract/css';
import {
  bodyBgColorEnd,
  bodyBgColorStart,
  bodyMaxWidth,
  bodyMinWidth,
  circleSize,
  maxCircleSize,
  primaryColor,
} from './variables.css';

globalStyle('html, body', {
  overflow: 'hidden',
});
globalStyle('body', {
  vars: {
    [bodyMinWidth]: '360px',
    [bodyMaxWidth]: '900px',
    [circleSize]: '60vw',
    [maxCircleSize]: '300px',
    [bodyBgColorStart]: '237, 99, 7',
    [bodyBgColorEnd]: '0, 16, 34',
    [primaryColor]: '#F97316',
  },
  backgroundColor: '#000',
  color: '#374151', // gray-700
  minWidth: bodyMinWidth,
  maxWidth: bodyMaxWidth,
  margin: '0 auto',
  overflow: 'hidden',

  '#app': {
    height: 'inherit',
    backgroundColor: '#fff',
    transition: 'opacity .5s ease-in-out',
  },
  '.page-panel': {
    width: '100%',
    height: '100%',
    maxWidth: bodyMaxWidth,
    backgroundColor: '#fff',
    margin: '0 auto',
  },

  button: {
    alignItems: 'center',
    gap: '12px',
    userSelect: 'none',
    cursor: 'pointer',
  },

  '.fadein': {
    opacity: 1,
  },
  '.fadeout': {
    opacity: 0,
  },
});

globalStyle('#app', {
  overflow: 'hidden',
});

globalStyle('[data-current-page=home]', {
  '#home': {
    transform: 'translateY(0)',
    margin: '0',
  },
  '#list': {
    opacity: 0,
    '.tab-contents': {},
  },
});

globalStyle('[data-current-page=list]', {
  '#home': {
    transform: 'translateY(88svh)',
    margin: '8px',
    borderTopLeftRadius: '12px',
    borderTopRightRadius: '12px',
    boxShadow: '0 -1vw 3vw 0.25vw rgba(255,255,255, 0.7)',
    width: `calc( 100% - 16px)`,
    maxWidth: `calc( ${bodyMaxWidth} - 16px)`,
    overflow: 'hidden',

    '@media screen and (orientation: landscape)': {
      transform: 'translateY(83svh)',
      header: {
        '.inner': {
          '.btn-toggle': {
            // marginTop: '-2svh !important',
          },
        },
      },
    },

    '.page-container': {
      '&:before': {
        borderTopLeftRadius: '12px',
        borderTopRightRadius: '12px',
        border: '1px solid rgba(0,0,0, 0.3)',
      },
    },

    header: {
      '.inner': {
        padding: '4svh 0',
        '.sub-title': {
          display: 'none',
        },
        '.btn-toggle': {
          // marginTop: '1svh',
        },
      },
    },
    '.btn-toggle': {
      transform: 'rotate(-270deg)',
      left: '8px',
      'span:nth-of-type(1), span:nth-of-type(3)': {
        width: '10px',
      },
      'span:nth-of-type(1)': {
        transform: 'translate(-2px, 7px) rotate(-45deg)',
      },
      'span:nth-of-type(3)': {
        transform: 'translate(-2px, -7px) rotate(45deg)',
      },
    },
  },
  '#list': {
    opacity: 1,
    transform: 'translateY(0) scale(1)',
  },
});
