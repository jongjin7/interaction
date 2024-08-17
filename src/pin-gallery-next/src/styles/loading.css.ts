import { style, globalKeyframes } from '@vanilla-extract/css';
import { primaryColor } from './variables.css';

const ripple = 'globalRotate';
const bounce = 'myBounce';
const spin = 'mySpin';

globalKeyframes(ripple, {
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
  },
});

globalKeyframes(bounce, {
  '0%': {
    transform: `translateY(-40px)`,
    animationTimingFunction: `cubic-bezier(0.76, 0.05, 0.86, 0.06)`,
  },
  '50%': {
    transform: `rotateX(45deg) rotateY(0) rotateZ(225deg)`,
    animationTimingFunction: `cubic-bezier(0.76, 0.05, 0.86, 0.06)`,
  },
  '100%': {
    transform: `rotateX(45deg) rotateY(0) rotateZ(405deg)`,
    animationTimingFunction: `cubic-bezier(0.17, 0.84, 0.44, 1)`,
  },
});

globalKeyframes(spin, {
  '100%': {
    transform: 'rotate(360deg)',
  },
});

const defLoading = style({
  position: 'absolute',
  left: 0,
  top: 0,
  zIndex: 20,
  width: '100%',
  height: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  transition: 'opacity 0.3s ease-in-out',
  pointerEvents: 'none',

  '.ripple': {
    flexShrink: 0,
    width: 'calc(100% - var(--img-track-width))',
    height: 'calc(100% - var(--img-track-width))',
    border: '6px solid rgba(255, 255, 255, 0.3)',
    borderTopColor: primaryColor,
    borderRadius: '50%',
    animation: `${spin} 1s ease-in-out infinite`,
  },

  // 앱 로딩
  '&.app-loading': {
    background: 'rgba(0,0,0, 0.95)',
    position: 'fixed',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    zIndex: 1000,
    transition: 'opacity .5s ease-in-out',
    '.ripple': {
      width: '15vw',
      height: '15vw',
      maxWidth: '200px',
      maxHeight: '200px',
      borderWidth: '2px',
    },
  },

  '&.btn-loading': {
    '.ripple': {
      width: '24px',
      height: '24px',
      borderWidth: '3px',
    },
  },
});

export const LoadingBasic = defLoading;
