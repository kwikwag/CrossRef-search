import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const styles = {
    card: {
        width: '100%'
    },
    media: {
        // ⚠️ object-fit is not supported by IE11.
        objectFit: 'cover',
    },
};

class Article extends Component {
    render() {
        const classes = this.props.classes;
        return (
            <Card className={classes.card}>
                <CardActionArea className={classes.card}>
                    <CardContent className={classes.card}>
                        <Typography gutterBottom variant="headline" component="h2" noWrap>
                            {this.props.article.title}
                        </Typography>
                        <Typography color="textSecondary" variant='subheading' component="div" noWrap>
                            {this.props.article.year} {this.props.article.journal} {this.props.article.locator.join(", ")}
                        </Typography>
                        <Typography component="p">
                            {this.props.article.authors}
                            DOI: <a target="_blank" href={this.props.article.url}>{this.props.article.doi}</a>
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Button size="small" color="primary">
                        Share
                    </Button>
                    <Button size="small" color="primary">
                        Learn More
                    </Button>
                </CardActions>
            </Card>
        );
    }
}

Article.propTypes = {
    classes: PropTypes.object.isRequired,
    article: PropTypes.object.isRequired
};

export default withStyles(styles)(Article);