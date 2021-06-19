import { createMuiTheme } from '@material-ui/core/styles';
import {orange,grey} from '@material-ui/core/colors';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: grey[500],
        },
        secondary: {
            main: orange[700],
        },
    }    
});

export default theme;