import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from "@material-ui/core/Typography/Typography";

const styles = {
    label: {
        width: '100%'
    }
};

class CheckboxLabels extends React.Component {
    handleChange = (e) => {
        this.props.onChange(this.props.label, e.target.checked)
    };

    render() {
        return (
            <FormControlLabel
                control={
                    <Checkbox
                        checked={this.props.checked}
                        onChange={this.handleChange}
                        value={this.props.label}
                        color="primary"
                    />
                }
                label={<span>{this.props.label} <Typography style={{display: 'inline-block'}} component='span' color="textSecondary" variant='caption'>- ({this.props.count})</Typography></span>}
            />
        );
    }
}

CheckboxLabels.propTypes = {
    classes: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    checked: PropTypes.bool,
    label: PropTypes.string
};

export default withStyles(styles)(CheckboxLabels);