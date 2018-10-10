import React, {Component} from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Input from '@material-ui/core/Input';
import {fade} from '@material-ui/core/styles/colorManipulator';
import {withStyles} from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import FacetsList from "./FacetsList";
import Button from "@material-ui/core/Button/Button";

const styles = theme => ({
    root: {
        width: '100%',
        height: 'auto'
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
        position: 'absolute',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        left: '50%',
        transform: 'translateX(-50%)',
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing.unit,
            width: 'auto',
        },
    },
    searchIcon: {
        width: theme.spacing.unit * 6,
        minWidth: theme.spacing.unit * 6,
        borderRadius: 0,
        height: '100%',
        position: 'absolute',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        right: 0,
        zIndex: 100,
        padding: 0
    },
    searchProgress: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
        right: 0
    },
    inputRoot: {
        color: 'inherit',
        width: '100%'
    },
    inputInput: {
        paddingTop: theme.spacing.unit,
        paddingRight: theme.spacing.unit * 10,
        paddingBottom: theme.spacing.unit,
        paddingLeft: theme.spacing.unit,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: 450
            //     '&:focus': {
            //         width: 550,
            //     },
        },
    },
});

class Search extends Component {

    constructor(props) {
        super(props);

        this.setViewPort = this.setViewPort.bind(this)
    }

    state = {
        inputVal: '',
        lastQuery: '',
        activeFilters: {}
    };

    rootElem = React.createRef();

    setFilter = (facetName, filtersValues) => {
        let activeFilters = {...this.state.activeFilters};
        activeFilters[facetName] = {...filtersValues};
        this.setState({activeFilters});
        // this.props.onSubmit(this.state.lastQuery, {filters: activeFilters})
    }

    handleChange = (e) => {
        let inputVal = e.target.value;
        this.setState({inputVal});
    };

    handleKeyUp = (e) => {
        //Submit on ENTER
        if (!this.props.loading && e.nativeEvent.keyCode === 13) {
            let query = e.target.value;
            if (query && this.state.lastQuery !== query) {
                this.props.onSubmit(query);
                this.setState({lastQuery: query});
            }
        }
    };

    search = () => {
        !this.props.loading && this.state.inputVal && this.props.onSubmit(this.state.inputVal, {filters: this.state.activeFilters})
    };

    componentDidMount() {
        this.setViewPort();
    };

    shouldComponentUpdate = (nextProps, nextState) => {
        return nextProps.facets !== this.props.facets || nextProps.loading !== this.props.loading || nextState.inputVal !== this.state.inputVal || nextState.activeFilters !== this.state.activeFilters
    }

    setViewPort() {
        this.props.setViewPort(this.rootElem.current.clientHeight)
    }

    render() {
        const {classes, loading} = this.props;
        return (
            <div className={classes.root} ref={this.rootElem}>
                <AppBar position="sticky">
                    <Toolbar>
                        <Typography className={classes.title} variant="h5" color="inherit" noWrap>
                            CrossRef search
                        </Typography>
                        {/*<div className={classes.grow}/>*/}
                        <div className={classes.search}>
                            <Button onClick={this.search} className={classes.searchIcon} disabled={loading}>
                                <SearchIcon/>
                                {/*{loading && <CircularProgress size={24} className={classes.searchProgress}/>}*/}
                            </Button>
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
                        {/*<div className={classes.grow}/>*/}
                    </Toolbar>
                </AppBar>
                <FacetsList facets={this.props.facets} setFilter={this.setFilter} search={this.search} loading={loading} setViewPort={this.setViewPort }/>
            </div>
        );
    }
}

Search.propTypes = {
    classes: PropTypes.object.isRequired,
    onSubmit: PropTypes.func.isRequired,
    facets: PropTypes.object.isRequired,
    loading: PropTypes.bool.isRequired
};

export default withStyles(styles)(Search);