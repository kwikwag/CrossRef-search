import React, {Component} from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Input from '@material-ui/core/Input';
import {fade} from '@material-ui/core/styles/colorManipulator';
import {withStyles} from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import FacetsList from "./FacetsList";

const styles = theme => ({
    root: {
        width: '100%',
    },
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing.unit,
            width: 'auto',
        },
    },
    searchIcon: {
        width: theme.spacing.unit * 9,
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
        width: '100%',
    },
    inputInput: {
        paddingTop: theme.spacing.unit,
        paddingRight: theme.spacing.unit,
        paddingBottom: theme.spacing.unit,
        paddingLeft: theme.spacing.unit * 10,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: 120,
            '&:focus': {
                width: 200,
            },
        },
    },
});

class Search extends Component {

    state = {
        inputVal: '',
        lastQuery: '',
        activeFilters: {}
    };

    setFilter = (facetName, filtersValues) => {
        let activeFilters = {...this.state.activeFilters};
        activeFilters[facetName] = {...filtersValues};
        this.setState({activeFilters});
        this.props.onSubmit(this.state.lastQuery, {filters: activeFilters})
    }

    handleChange = (e) => {
        let inputVal = e.target.value;
        this.setState({inputVal});
    };

    handleKeyUp = (e) => {
        //Submit on ENTER
        if (e.nativeEvent.keyCode === 13) {
            let query = e.target.value;
            if (query && this.state.lastQuery !== query) {
                this.props.onSubmit(query);
                this.setState({lastQuery: query});
            }
        }
    };

    render() {
        const classes = this.props.classes;
        return (
            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton className={classes.menuButton} color="inherit" aria-label="Open drawer">
                            <MenuIcon/>
                        </IconButton>
                        <Typography className={classes.title} variant="title" color="inherit" noWrap>
                            Material-UI
                        </Typography>
                        <div className={classes.grow}/>
                        <div className={classes.search}>
                            <div className={classes.searchIcon}>
                                <SearchIcon/>
                            </div>
                            <Input
                                placeholder="Search…"
                                disableUnderline
                                classes={{
                                    root: classes.inputRoot,
                                    input: classes.inputInput,
                                }}
                                onKeyUp={this.handleKeyUp}
                                onChange={this.handleChange}
                                value={this.state.inputVal}
                            />
                        </div>
                    </Toolbar>
                </AppBar>
                <FacetsList facets={this.props.facets} setFilter={this.setFilter}/>
            </div>
        );
    }
}

Search.propTypes = {
    classes: PropTypes.object.isRequired,
    onSubmit: PropTypes.func.isRequired,
    facets: PropTypes.object.isRequired
};

export default withStyles(styles)(Search);