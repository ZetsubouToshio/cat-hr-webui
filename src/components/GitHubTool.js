import React from 'react'
import {makeStyles} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    }
}));

function GitHubTool() {

    const classes = useStyles();

    const handleChange = name => event => {
        setValues({...values, [name]: event.target.value});
    };

    const [values, setValues] = React.useState({
        login: 'xxxxxx'
    });


    return (
        <div>
            <div>
                <TextField
                    id="standard-name"
                    label="github login"
                    className={classes.textField}
                    value={values.login}
                    onChange={handleChange('login')}
                    margin="normal"
                />
            </div>
            <div>
                <a href={'https://api.github.com/users/' + values.login + '/events/public'}>https://api.github.com/users/{values.login}/events/public</a>
            </div>
        </div>
    )


}

export default GitHubTool