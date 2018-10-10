import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';
import FormGroup from '@material-ui/core/FormGroup';
import _ from 'lodash'

import CheckboxLabel from './CheckboxLabel'
import Typography from "@material-ui/core/Typography/Typography";

const styles = {
    root: {
        color: green[600],
        '&$checked': {
            color: green[500],
        },
    },
    checked: {},
};

class Facet extends React.Component {

    state = {
        filterValues: {}
    };

    toggleFilter = (key, checked) => {
        let filterValues = {...this.state.filterValues};
        filterValues[key] = checked;
        this.props.setFilter(this.props.name, filterValues);
        this.setState({filterValues});
    };

    render() {
        let filters = _.map(this.props.filters.values, (val, key) => {
            return (<CheckboxLabel label={key} key={key} count={val} checked={this.state.filterValues[key]} onChange={this.toggleFilter}/>)
        })

        return (
            <FormGroup>
                <Typography gutterBottom variant="h5" component="h2" noWrap>
                    {this.props.label}
                </Typography>
                {filters}
            </FormGroup>
        );
    }
}

Facet.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    filters: PropTypes.object.isRequired,
    setFilter: PropTypes.func.isRequired,
    // loading: PropTypes.bool.isRequired
};

export default withStyles(styles)(Facet);