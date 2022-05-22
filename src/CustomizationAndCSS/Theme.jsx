import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
    typography: {
      h1 : {
          fontFamily: 'Gilroy',
          fontStyle: 'normal',
          fontWeight: '800',
          fontSize: '64px',
          lineHeight: '80px'
      },
      h2 : {
          fontFamily: 'Gilroy',
          fontStyle: 'normal',
          fontWeight: '800',
          fontSize: '40px',
          lineHeight: '48px'
      },
      h3 : {
          fontFamily: 'Gilroy',
          fontStyle: 'normal',
          fontWeight: '800',
          fontSize: '24px',
          lineHeight: '28px'
      },
      body : {
          fontStyle: 'normal',
          fontWeight: '400',
          fontSize: '16px',
          lineHeight: '24px'
      },
      footnote : {
          fontStyle: 'normal',
          fontWeight: '400',
          fontSize: '12px',
          lineHeight: '16px'
      },
      step : {
          fontStyle: 'normal',
          fontWeight: '700',
          fontSize: '9px',
          lineHeight: '11px'
      }
    },
    palette : {
      base : '#000000',
      base1 : '#FFFFFF',
      shade20 : '#DDDDDD',
      shade40 : '#A9A9A9',
      shade50 : '#82786A',
      easy : '#2FB65D',
      medium : '#EB8A31',
      hard : '#EB3C31'
    },
    components : {
        MuiSlider : {
            styleOverrides : {
                root : {
                    color: '#82786A',
                    height: 1,
                },
                thumb : {
                    height: 12,
                    width: 12,
                    '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
                        boxShadow: 'inherit',
                      },
                      '&:before': {
                        display: 'none',
                      },
                },
                track : {
                    height: 0,
                },
                valueLabel : {
                    lineHeight: 16,
                    fontSize: 12,
                    background: 'unset',
                    padding: 0,      
                    width: 32,
                    height: 32,
                    borderRadius: '50% 50% 50% 0',
                    backgroundColor: '#82786A',
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
    }
   
});
