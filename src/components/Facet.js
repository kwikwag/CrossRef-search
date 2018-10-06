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
        activeFilters: {}
    };

    handleChange = key => event => {
        let newState = {...this.state.activeFilters};
        newState[key] = event.target.checked;
        this.setState(newState);
    };

    render() {
        let filters = _.map(this.props.filters.values, (val, key) => {
            return (<CheckboxLabel label={key} key={key} count={val} checked={this.state.activeFilters[key]} onChange={this.handleChange(key)}/>)
        })

        return (
            <FormGroup>
                <Typography gutterBottom variant="headline" component="h2" noWrap>
                    {this.props.label}
                </Typography>
                {filters}
            </FormGroup>
        );
    }
}

Facet.propTypes = {
    filters: PropTypes.object.isRequired,
    // activeFilters: PropTypes.object.isRequired
};

export default withStyles(styles)(Facet);