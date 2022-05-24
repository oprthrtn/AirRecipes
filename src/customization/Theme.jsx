import { createTheme } from '@mui/material/styles';

const plt = {
    base0: {
        main: '#000000'
    },
    base1: {
        main: '#FFFFFF'
    },
    shade20: {
        main: '#DDDDDD'
    },
    shade40: {
        main: '#A9A9A9',
    },
    shade50: {
        main: '#82786A',
        contrastText : '#fff'
    },
    easy: {
        main: '#2FB65D'
    },
    medium: {
        main: '#EB8A31'
    },
    hard: {
        main: '#EB3C31'
    },
}
export const theme = createTheme({
    typography: {
        h1: {
            fontFamily: 'Gilroy',
            fontStyle: 'normal',
            fontWeight: '800',
            fontSize: '64px',
            lineHeight: '80px'
        },
        h2: {
            fontFamily: 'Gilroy',
            fontStyle: 'normal',
            fontWeight: '800',
            fontSize: '40px',
            lineHeight: '48px'
        },
        h3: {
            fontFamily: 'Gilroy',
            fontStyle: 'normal',
            fontWeight: '800',
            fontSize: '24px',
            lineHeight: '28px'
        },
        body: {
            fontStyle: 'normal',
            fontWeight: '400',
            fontSize: '16px',
            lineHeight: '24px'
        },
        footnote: {
            fontStyle: 'normal',
            fontWeight: '400',
            fontSize: '12px',
            lineHeight: '16px'
        },
        step: {
            fontStyle: 'normal',
            fontWeight: '700',
            fontSize: '9px',
            lineHeight: '11px'
        }
    },
    palette: { ...plt },
    components: {
        MuiSlider: {
            styleOverrides: {
                root: {
                    color: plt.shade50.main,
                    height: 1,
                },
                thumb: {
                    height: 12,
                    width: 12,
                    '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
                        boxShadow: 'inherit',
                    },
                    '&:before': {
                        display: 'none',
                    },
                },
                track: {
                    height: 0,
                },
                valueLabel: {
                    lineHeight: 16,
                    fontSize: 12,
                    background: 'unset',
                    padding: 0,
                    width: 32,
                    height: 32,
                    borderRadius: '50% 50% 50% 0',
                    backgroundColor: plt.shade50.main,
                    transformOrigin: 'bottom left',
                    transform: 'translate(50%, -80%) rotate(-45deg) scale(0)',
                    '&:before': { display: 'none' },
                    '&.MuiSlider-valueLabelOpen': {
                        transform: 'translate(50%, -80%) rotate(-45deg) scale(1)',
                    },
                    '& > *': {
                        transform: 'rotate(45deg)',
                    },
                }
            }
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    color: plt.shade20.main,
                    borderRadius: '28px',
                    '&.Mui-focused .MuiOutlinedInput-input': {
                        color: plt.base0.main,
                    },

                    '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: plt.shade40.main,
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: plt.shade40.main,
                        borderWidth: '1px'
                    }

                },
                notchedOutline: {
                    borderColor: plt.shade20.main,
                },
                input: {
                    color: plt.base0,
                    '&::placeholder': {
                        color: plt.shade40.main
                    }
                }
            }
        },
        MuiIconButton: {
            styleOverrides: {
                root: {
                    transition: '0.1s',
                    '&:hover ': {
                        backgroundColor: plt.shade20.main
                    },

                }
            }
        }
    }
});
