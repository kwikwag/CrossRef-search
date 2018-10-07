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

const styles = theme => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
});

class FacetsList extends React.Component {

    render() {

        let {classes} = this.props;

        let facets = _.map(this.props.facets, (val, key) => {
            return (<Facet name={key} key={key} filters={val} setFilter={this.props.setFilter}/>)
        });

        if (facets.length) {
            return (
                <div className={classes.root}>
                    <ExpansionPanel>
                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                            <Typography className={classes.heading}>Filters</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <Grid direction="row" container={true} alignContent='stretch' alignItems='stretch' justify="space-between">
                                {facets}
                            </Grid>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                </div>
            )
        }
        else return null
    }
}

FacetsList.propTypes = {
    classes: PropTypes.object.isRequired,
    facets: PropTypes.object.isRequired
};

export default withStyles(styles)(FacetsList);