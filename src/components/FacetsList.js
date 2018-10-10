import React from 'react';
import PropTypes from 'prop-types';
import ExpansionPanel from "@material-ui/core/ExpansionPanel/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary/ExpansionPanelSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Typography from "@material-ui/core/Typography/Typography";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails/ExpansionPanelDetails";
import {withStyles} from "@material-ui/core";
import Grid from "@material-ui/core/Grid/Grid";
import _ from 'lodash'

import Facet from './Facet'
import Button from "@material-ui/core/Button/Button";

const styles = theme => ({
    root: {
        width: '100%',
        borderBottom: '1px solid'
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
    emptyMsg: {
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        position: 'absolute'
    }
});

class FacetsList extends React.Component {

    labels = {
        published: 'Published',
        'container-title': 'Container title',
        'type-name': 'Type'
    };

    handleChange = (e, expanded) => {
        this.timeoutPromise && clearTimeout(this.timeoutPromise);
        this.timeoutPromise = setTimeout(() => {
            this.props.setViewPort()
        }, 500)
    };

    componentDidUpdate = () => {
        this.handleChange()
    };

    render() {

        let {classes} = this.props;

        let facetsList = (() => {
            let facets = _.map(this.props.facets, (val, key) => {
                return (<Facet name={key} label={this.labels[key]} key={key} filters={val} setFilter={this.props.setFilter}/>)
            });
            return facets.length ? facets : <Typography variant='h5' color='textSecondary' >No filters yet...</Typography>
        })();

        // if (facets.length) {
        return (
            <div className={classes.root}>
                <ExpansionPanel onChange={this.handleChange}>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                        <Typography className={classes.heading}>Filters</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <Grid direction="row" container={true} alignContent='stretch' alignItems='stretch' justify="space-around">
                            {facetsList}
                            <Grid direction="column" container={true} alignContent='stretch' alignItems='flex-end'>
                                <Button className={classes.fab} onClick={this.props.search} color='primary' variant='contained' disabled={this.props.loading}>
                                    SEARCH
                                </Button>
                            </Grid>
                        </Grid>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            </div>
        )
    }
}

FacetsList.propTypes = {
    classes: PropTypes.object.isRequired,
    facets: PropTypes.object.isRequired,
    loading: PropTypes.bool.isRequired,
    setViewPort: PropTypes.func
};

export default withStyles(styles)(FacetsList);