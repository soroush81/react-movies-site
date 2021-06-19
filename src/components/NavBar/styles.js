import { makeStyles } from '@material-ui/core/styles'
import { grey } from '@material-ui/core/colors';

export const useStyles = makeStyles(theme => ({
    navLinkStyle:  {
        textDecoration: "none",
        padding: 20,
        color: "#fff"
    },
    activeNavLinkStyle:{
        background: grey[300],
        color: 'orange'
    }
    // ,
    // toolbar:{
    //     background: grey[800]
    // }
}));


