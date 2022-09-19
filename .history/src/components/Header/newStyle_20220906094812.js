import { makeStyles } from "@material-ui/core/styles";


export default makeStyles((theme) => ({
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block'
        }
    },
    search: {
        position: theme.shape.borderRadius,
    }

    })
)