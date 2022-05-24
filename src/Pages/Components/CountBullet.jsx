import { Box } from "@mui/material";

export function CountBullet(props) {
    return (
        <Box
            sx={{

                border: '1px solid',
                borderColor: 'shade20.main',
                borderRadius: '50%',
                minWidth: '16px',
                minHeight: '16px',
                fontSize: '9px',
                fontWeight: '700',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mr: '8px',
                
            }}
        >{props.children}
        </Box>
    )
}