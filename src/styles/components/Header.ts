import { styled } from "..";

export const HeaderContainer = styled('header', {
    padding: '2rem 0',
    width: '100%',
    maxWidth: 1180,
    margin: '0 auto',
    display: "flex",
    justifyContent: "space-between",
    alignItems:"center",

    button: {
        color: '$gray300',
        background: '$gray800',
        padding: '0.5rem',
        borderRadius: 6,
        border: 'none',
        cursor: "pointer",

        span: {
            position: 'absolute',
            background: '$green300',
            color: '$white',
            padding: '2px 6px',
            borderRadius: '100%',
            marginTop: '-15px'
        }
    }
})