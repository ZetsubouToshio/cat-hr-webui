import React from 'react'
import PropTypes from 'prop-types';
import {makeStyles} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Button from '@material-ui/core/Button';
import {httpGet} from "../lib/Requests";
import {parseGitHubAnswer, parseGitHubSearchResult} from "../lib/GithubResponceParser";

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

    const handleChange = name => (event, newValue) => {
        setValues({...values, [name]: event.target.value || newValue});
    };

    const [values, setValues] = React.useState({
        login: '',
        tab: "one",
        emails: undefined,
        language: undefined,
        location: undefined
    });

    const getDataFromGithub = () => {
        const url = 'https://api.github.com/users/' + values.login + '/events/public';
        const data = httpGet(url);
        const emails = parseGitHubAnswer(data);
        handleChange("emails")({target: {}}, emails);
    };

    const searchOnGitlab = () => {
        console.log(createSearchUrl());
        const data = httpGet(createSearchUrl());
        console.log(data);
        const searchResult = parseGitHubSearchResult(data);
        handleChange("searchResult")({target: {}}, searchResult);
    };

    const createSearchUrl = () => {
        let url = "https://github.com/search?q=";

        if (values.language) {
            url+= "language%3A" + values.language
        }

        if (values.location) {
            url+= "+location%3A" + values.location
        }


        url += "&type=Users";

        return url;
    };


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
                            id="login"
                            label="github login"
                            className={classes.textField}
                            value={values.login}
                            onChange={handleChange('login')}
                            margin="normal"
                        />
                    </div>
                    <div>
                        <Button onClick={getDataFromGithub}>Анализ</Button>
                        <Button href={'https://api.github.com/users/' + values.login + '/events/public'}>Ссылка</Button>
                    </div>
                    <div>
                        {values.emails ? values.emails.length === 0 ? <div>Не найдено ни одного е-мейла</div> :
                            <div>Email:</div> : <div></div>}
                        {values.emails && values.emails.map(e => <Typography component="div" key={e}>{e}</Typography>)}
                    </div>
                </div>
            </TabContainer>}
            {values.tab === 'two' && <TabContainer>
                <div>
                    <div>
                        <TextField
                            id="language"
                            label="language"
                            className={classes.textField}
                            value={values.language}
                            onChange={handleChange('language')}
                            margin="normal"
                        />
                        <TextField
                            id="location"
                            label="location"
                            className={classes.textField}
                            value={values.location}
                            onChange={handleChange('location')}
                            margin="normal"
                        />
                    </div>
                    <div>
                        <a href={createSearchUrl()}>Ссылка на GitHub</a>
                    </div>
                    <div>
                        <Button onClick={searchOnGitlab}>Создать задачу</Button>
                    </div>
                    <div>
                        {values.searchResult}
                    </div>
                </div>

            </TabContainer>}
        </div>


    )


}

export default GitHubTool