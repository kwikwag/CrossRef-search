import React, {Component} from 'react';
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import {withStyles} from "@material-ui/core/styles";
import PropTypes from "prop-types";
import FormControl from "@material-ui/core/FormControl";

const styles = theme => ({
    root: {
        display: 'inline-block',
    },
    sortingFormControl: {
        marginRight: theme.spacing.unit,
        minWidth: theme.typography.pxToRem(200)
    },
    orderFormControl: {
        minWidth: theme.typography.pxToRem(100)
    }
});

const sortingTypes = [
    'relevance',
    'deposited',
    'indexed',
    'published',
    'published-print',
    'published-online',
    'issued',
    'is-referenced-by-count',
    'references-count'
];

const orderTypes = {
    asc: 'Ascending',
    desc: 'Descending'
};

class QuerySort extends Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange = event => {
        this.props.handleChange({[event.target.name]: event.target.value});
    };

    render() {
        const {classes} = this.props;
        let sortMenuItems = sortingTypes.map((sortingType) => {
            let label = sortingType.replace(/(-)/g, ' ').replace(/^./, sortingType[0].toUpperCase());
            return <MenuItem key={sortingType} value={sortingType}>{label}</MenuItem>
        });

        return (
            <div className={classes.root}>
                <FormControl className={classes.sortingFormControl}>
                    <InputLabel htmlFor="value">Sort</InputLabel>
                    <Select
                        value={this.props.current.value}
                        onChange={this.handleChange}
                        inputProps={{
                            name: 'value',
                            id: 'value',
                        }}
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        {sortMenuItems}
                    </Select>
                </FormControl>
                <FormControl className={classes.orderFormControl}>
                    <InputLabel htmlFor="order">Order</InputLabel>
                    <Select
                        value={this.props.current.order}
                        onChange={this.handleChange}
                        inputProps={{
                            name: 'order',
                            id: 'order',
                        }}
                    >
                        <MenuItem value='asc'>{orderTypes.asc}</MenuItem>,
                        <MenuItem value='desc'>{orderTypes.desc}</MenuItem>
                    </Select>
                </FormControl>
            </div>
        );
    }
}

QuerySort.propTypes = {
    classes: PropTypes.object.isRequired,
    current: PropTypes.object.isRequired,
    handleChange: PropTypes.func.isRequired
};

export default withStyles(styles)(QuerySort)