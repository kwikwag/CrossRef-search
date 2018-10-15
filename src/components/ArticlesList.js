import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import List from '@material-ui/core/List';

import dataParser from '../helpers/dataParser'
import Article from "./Article";
import Typography from "@material-ui/core/Typography/Typography";
import Paper from "@material-ui/core/Paper/Paper";
import Grid from "@material-ui/core/Grid/Grid";
import Pagination from "material-ui-flat-pagination";


const styles = (theme) => ({
    root: {
        maxHeight: '85%%',
        overflow: 'auto',
        backgroundColor: theme.palette.background.paper,
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
    },
    pagination: {
        margin: theme.spacing.unit
    }
});

class ArticlesList extends React.Component {
    state = {
        itemsPerPage: 5,
        currentOffset: 0
    };

    setOffset = (e, offset) => {
        this.props.setOffset(offset);
        this.setState({currentOffset: offset})
    };

    render() {
        const {classes, height} = this.props;

        // if (height) classes.root.height = height;

        let listItems = this.props.articles.map((article) => {
            let parsedArticle = dataParser.parseArticle(article);
            return (<Article key={parsedArticle.doi} article={parsedArticle}/>)
        });

        let list = (
            <div>
                <List>
                    {listItems}
                </List>
                <Pagination
                    className={classes.pagination}
                    limit={this.state.itemsPerPage}
                    offset={this.state.currentOffset}
                    total={this.props.totalResults}
                    onClick={this.setOffset}
                    size='large'
                />
            </div>

        );
        let msg = <Typography className={classes.emptyMsg} variant='h5' color='textSecondary'>Empty...</Typography>;

        let renderItem = listItems.length ? list : msg;

        return (
            <Grid className={classes.root} style={{height: height ? height : '85%'}} direction="column" container={true} justify='space-between' alignContent='stretch' alignItems='stretch'>
                <Paper className={classes.container} elevation={1}>
                    {renderItem}
                </Paper>
            </Grid>
        );
    }
}

ArticlesList.propTypes = {
    classes: PropTypes.object.isRequired,
    articles: PropTypes.array.isRequired,
    totalResults: PropTypes.number.isRequired
};

export default withStyles(styles)(ArticlesList);