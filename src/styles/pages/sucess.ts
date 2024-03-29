import { styled } from ".."

export const SucessContainer = styled('main', {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto',
    height: 540,

    h1: {
        fontSize: '$2xl',
        color: "$gray100",
    },

    p: {
        fontSize: '$xl',
        color: "$gray300",
        maxWidth: 500,
        textAlign: 'center',
        marginTop: '2rem',
        lineHeight: 1.4,
    },

    a: {
        display: 'block',
        marginTop: '5rem',
        fontSize: '$lg',
        color: '$green500',
        textDecoration: 'none',
        fontWeight: 'bold',

        '&:hover': {
            color: '$green300'
        }
    }
})

export const ImageContainer = styled('main', {
    width: '100%',
    maxWidth: 130,
    height: 145,
    background: 'linear-gradient(180deg, #1ea483 0%, #7465d4 100%)',
    borderRadius: 8,
    padding: '0.25rem',
    display: "flex",
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '4rem',

    img:{
        objectFit: 'cover'
    }

})

export const ImagensContainer = styled('main', {
    width: '100%',
    maxWidth: 260,
    height: 145,
    padding: '0.25rem',
    display: "flex",
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '4rem',

    img:{
        objectFit: 'cover',
        borderRadius: '50%',
        background: 'linear-gradient(180deg, #1ea483 0%, #7465d4 100%)',
        width: '100%',
        height: 145,
        display: "flex",
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 10,

    }

})