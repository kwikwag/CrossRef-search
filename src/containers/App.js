import React, {Component} from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import $ from "jquery";
import _ from 'lodash'
import LoadingOverlay from 'react-loading-overlay'
import {withStyles} from "@material-ui/core/styles";

import Search from '../components/Search'
import ArticlesList from '../components/ArticlesList'

const styles = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 999
    },
    articlesList: {
        height: '100%',
        width: '100%'
    }
};

class App extends Component {

    state = {
        articles: [],
        facets: {},
        loading: false
    };

    search = (input, extraParams) => {
        if (!this.state.loading) {
            if (!extraParams) extraParams = {};

            if (!extraParams.facets) extraParams.facets = {
                published: 5,
                'container-title': 5,
                'type-name': 5
            };

            this.setState({loading: true});

            $.ajax({
                type: "GET",
                url: this.buildQuery(input, extraParams),
                processData: false
            }).then((res) => {
                if (res && res.message && Array.isArray(res.message.items)) {
                    this.setState({
                        articles: res.message.items,
                        facets: res.message.facets,
                        loading: false
                    });
                } else {
                    console.log('Received faulty response from crossref', this)
                }
            }, (err) => {
                debugger
            });
        }
    };

    buildQuery(input, extraParams) {
        let baseUrl = 'https://api.crossref.org/works?rows=5';
        let query = baseUrl;

        if (extraParams.facets) {
            let facetsQuery = '&facet=';
            _.each(extraParams.facets, (facetVal, facetName) => {
                facetsQuery = facetsQuery + facetName + ':' + facetVal + ','
            });
            //remove trailing comma
            facetsQuery = facetsQuery.slice(0, -1);
            query = query + facetsQuery;
        }

        if (extraParams.filters) {

            let filtersQuery = '&filter=';
            _.each(extraParams.filters, (filterValues, facetName) => {
                _.each(filterValues, (isActive, filterName) => {
                    if (isActive) {
                        if (facetName === 'published') {
                            filtersQuery = filtersQuery + 'from-pub-date:' + filterName + '-01-01,until-pub-date:' + filterName + '-12-31,'
                        } else if (facetName === 'type-name') {
                            filtersQuery = filtersQuery + 'type:' + filterName.toLowerCase().replace(' ', '-') + ','
                        } else {
                            filtersQuery = filtersQuery + facetName + ':' + filterName + ','
                        }
                    }
                })
            });
            //remove trailing comma
            filtersQuery = filtersQuery.slice(0, -1);
            query = query + filtersQuery;
        }

        let escapedSearchQuery = encodeURIComponent(input.replace(/\s+$/, "").replace(/^\s+/, ""));

        return query + '&query.bibliographic=' + escapedSearchQuery

    }

    setViewPort = (controlsHeight) => {
        this.setState({viewPort: document.getElementById('app-root').clientHeight - controlsHeight})
    };

    render() {
        const {classes} = this.props;

        return (
            <React.Fragment>
                <CssBaseline/>
                {/*<Grid direction="column" container={true} justify='space-around' alignContent='flex-start' alignItems='flex-start'>*/}
                <LoadingOverlay  active={this.state.loading} spinner text='Loading...'>
                    <Search onSubmit={this.search} facets={this.state.facets} loading={this.state.loading} setViewPort={this.setViewPort}/>
                    <ArticlesList className={classes.articlesList} height={this.state.viewPort} articles={this.state.articles}/>
                </LoadingOverlay>
                {/*</Grid>*/}
            </React.Fragment>
        );
    }
}

export default withStyles(styles)(App);
