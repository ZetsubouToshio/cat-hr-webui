import React from 'react'
import PropTypes from 'prop-types';
import {makeStyles} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

function TabContainer(props) {
    return (
        <Typography component="div" style={{padding: 8 * 3}}>
            {props.children}
        </Typography>
    );
}

TabContainer.propTypes = {
    children: PropTypes.node.isRequired,
};


const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
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
        login: 'xxxxxx',
        tab: "one"
    });


    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Tabs value={values.tab} onChange={handleChange("tab")}>
                    <Tab value="one" label="Информация о пользователе" wrapped/>
                    <Tab value="two" label="Формирование запроса" wrapped/>
                </Tabs>
            </AppBar>
            {values.tab === 'one' && <TabContainer>
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
                </TabContainer>}
            {values.tab === 'two' && <TabContainer>В разработке</TabContainer>}
        </div>


    )


}

export default GitHubTool