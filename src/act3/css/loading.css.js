import {assignVars, globalStyle, style} from '@vanilla-extract/css';

export const LoadingBasic = style([
    {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        '.ripple': {
            position: 'relative',
            width: '50px',
            height: '50px',

            '&:before, &:after': {
                content: '""',
                position: 'absolute',
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                border: '4px solid #FF5C35',
                opacity: '0',
                animation: 'ripple 3s infinite',
            },
            '&:after': {
                animationDelay: '1.5s'
            }
        },
    },
    {
        '@keyframes': {
            'ripple': {
                '0%': {
                    transform: 'scale(0.5)',
                    opacity: 0,
                },
                '25%': {
                    opacity: 1,
                },
                '100%': {
                    transform: 'scale(2.5)',
                    opacity: 0,
                }
            }
        }
    }
])








