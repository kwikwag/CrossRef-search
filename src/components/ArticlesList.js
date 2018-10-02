import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';

import dataParser from '../helpers/dataParser'
import Article from "./Article";

const styles = theme => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
});

function ArticlesList(props) {
    const { classes } = props;

    let listItems = props.articles.map((article) => {
        let parsedArticle = dataParser.parseArticle(article);
        return (<Article key={parsedArticle.doi} article={parsedArticle}/>)
    })

    return (
        <div className={classes.root}>
            <List component="nav">
                {listItems}
            </List>
        </div>
    );
}

ArticlesList.propTypes = {
    classes: PropTypes.object.isRequired,
    articles: PropTypes.array.isRequired
};

export default withStyles(styles)(ArticlesList);