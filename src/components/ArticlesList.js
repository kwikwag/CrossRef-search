import React from 'react';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import withPropsStyles from '../helpers/withPropsStyles'

import dataParser from '../helpers/dataParser'
import Article from "./Article";
import Typography from "@material-ui/core/Typography/Typography";
import Paper from "@material-ui/core/Paper/Paper";
import Grid from "@material-ui/core/Grid/Grid";

const styles = (props, theme) => ({
    root: {
        height: props.height ? props.height : '85%',
        maxHeight: '100%',
        overflow: 'auto',
        backgroundColor: theme.palette.background.paper,
        // transition: theme.transitions.create('height'),
        // [theme.breakpoints.up('sm')]: {
        //     width: 120,
        //     '&:focus': {
        //         width: 200,
        //     },
        },
        container: {
            height: 'auto',
            overflow: 'auto'

        },
        emptyMsg: {
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            position: 'absolute'
        }
    });

function ArticlesList(props) {
    const {classes} = props;

    // if (height) classes.root.height = height;

    let listItems = props.articles.map((article) => {
        let parsedArticle = dataParser.parseArticle(article);
        return (<Article key={parsedArticle.doi} article={parsedArticle}/>)
    });

    let list = <List>{listItems}</List>;
    let msg = <Typography className={classes.emptyMsg} variant='h5' color='textSecondary'>Empty...</Typography>;

    let renderItem = listItems.length ? list : msg;

    return (
        <Grid className={classes.root} direction="column" container={true} justify='space-between' alignContent='stretch' alignItems='stretch'>
            <Paper className={classes.container} elevation={1}>
                {renderItem}
            </Paper>
        </Grid>
    );
}

ArticlesList.propTypes = {
    classes: PropTypes.object.isRequired,
    articles: PropTypes.array.isRequired
};

export default withPropsStyles(styles)(ArticlesList);