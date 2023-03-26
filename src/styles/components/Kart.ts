import { styled } from "..";

export const KartContainer = styled('div', {
    width: '25%',
    height: '100vh',
    background: '$gray800',
    position:  "absolute",
    left: '75%',

    "& > :first-child": {
        padding: '1rem',
        display: "flex",
        justifyContent: "flex-end",

        button:{
            border: 'none',
            background: '$gray800',
            color: '$gray300',
            cursor: 'pointer',
        }
      },

      "& > :last-child": {

        button: {
            width: '100%',
            padding: '1rem',
            background: '$green300',
            borderRadius: 8,
            border: 'none',
            color: '$white', 
            cursor: 'pointer',
            fontSize: 16,
            marginTop: '1.5rem',

        }

      }
})

export const ShoppingContent = styled('div', {
    display: "flex",
    justifyContent:"center",
    alignItems: "center", 
    flexDirection: "column",

    "& > :first-child": {
        width: '80%'
    },



    "& > :last-child": {

        width: '80%',

        div: {
            display:'flex',
            justifyContent:"space-between",
            marginBottom: '0.5rem',

            span: {
                display:'flex',
                justifyContent:"space-between",
                color: '$gray300'
            },

            p: {
                color: '$white'
            }
        }


    },
})

export const Content = styled('div', {
    height: '50vh',
    overflow: 'auto',
    marginBottom: '2rem',



    "&::-webkit-scrollbar": {
        width: '4px',
    },

    "&::-webkit-scrollbar-thumb": {
        backgroundColor: '$green300',
        borderRadius: '4px',
    },

    "&::-webkit-scrollbar-thumb:hover": {
        backgroundColor: '$green500',
    },
})

export const ProductInKart = styled('div', {
    position: 'relative' ,
    display: 'flex',
    gap: '1rem',
    marginBottom: '1rem',


    "& > :first-child": {
        background: 'linear-gradient(180deg, #1ea483 0%, #7465d4 100%)',
        borderRadius: 6,
    },

    img: {
        borderRadius: 6,
        objectFit: 'cover',
    },

    "& > :last-child": {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",

        button: {
            background: '$gray800',
            color: "$green500",
            cursor:'pointer',
            display: "flex",
            padding: 0,
            margin: 0,
            width: '4rem',
        }

    },

    p: {
        fontSize: '12px',
        color: '$gray300',
    },

    h3: {
        color: "$gray100"
    },
})

export const SacolaDeCompras = styled('h1', {
        fontSize: '16px',
        marginBottom: '2rem',
        paddingLeft: '10%',
})


