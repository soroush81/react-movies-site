import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles(theme => ({
    form: {
        margin: "0 auto",
        [theme.breakpoints.down("xs")]: {
            width: "80%"
        },
        [theme.breakpoints.between("sm", "md")]: {
            width: "450px"
        },
        "@media (min-width: 1280px)": {
            width: "450px"
        }
    },
    buttonPanel:{ marginTop: 16, width: "100%", display: "flex", justifyContent: "space-between" }
}));