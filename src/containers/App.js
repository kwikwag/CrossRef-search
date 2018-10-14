import React, {Component} from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import $ from "jquery";
import _ from 'lodash'
import LoadingOverlay from 'react-loading-overlay'
import {withStyles} from "@material-ui/core/styles";
import TablePagination from '@material-ui/core/TablePagination';


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
        loading: false,
        totalResults: 0,
        lastQuerySettings: {
            input: '',
            extraParams: {
                itemsPerPage: 5,
                currentPage: 0
            }
        }
    };

    search = (input, extraParams) => {
        if (!this.state.loading) {
            if (!extraParams) extraParams = {};

            if (!extraParams.facets) extraParams.facets = {
                published: 5,
                'container-title': 5,
                'type-name': 5
            };

            extraParams = {...this.state.lastQuerySettings.extraParams, ...extraParams};

            input = input ? input : this.state.lastQuerySettings.input;

            let querySettings = {
                input,
                extraParams
            };

            this.setState({loading: true, lastQuerySettings: querySettings});

            $.ajax({
                type: "GET",
                url: this.buildQuery(querySettings.input, querySettings.extraParams),
                processData: false
            }).then((res) => {
                if (res && res.message && Array.isArray(res.message.items)) {
                    this.setState({
                        articles: res.message.items,
                        facets: res.message.facets,
                        totalResults: res.message['total-results'],
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
        let baseUrl = 'https://api.crossref.org/works?';

        let paginationQuery = 'rows=' + extraParams.itemsPerPage + '&offset=' + extraParams.currentPage * extraParams.itemsPerPage;

        let facetsQuery = '';
        if (extraParams.facets) {
            facetsQuery = '&facet=';
            _.each(extraParams.facets, (facetVal, facetName) => {
                facetsQuery = facetsQuery + facetName + ':' + facetVal + ','
            });
            //remove trailing comma
            facetsQuery = facetsQuery.slice(0, -1);
        }

        let filtersQuery = '';
        if (extraParams.filters) {

            filtersQuery = '&filter=';
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
        }

        let sortQuery = '';
        if (extraParams.sorting && extraParams.sorting.value) {
            sortQuery = '&sort=' + extraParams.sorting.value + '&order=' + extraParams.sorting.order
        }

        let escapedSearchQuery = '&query.bibliographic=' + encodeURIComponent(input.replace(/\s+$/, "").replace(/^\s+/, ""));

        return baseUrl + paginationQuery + facetsQuery + filtersQuery + sortQuery + escapedSearchQuery;

    }

    setViewPort = (controlsHeight, firstRun) => {
        (firstRun || this.state.articles.length) && this.setState({viewPort: document.getElementById('app-root').clientHeight - controlsHeight})
    };

    setPage = (pageNumber) => {
        this.search(null, {currentPage: pageNumber})
    };

    render() {
        const {classes} = this.props;

        return (
            <React.Fragment>
                <CssBaseline/>
                <LoadingOverlay  active={this.state.loading} spinner text='Loading...'>
                    <Search onSubmit={this.search} facets={this.state.facets} loading={this.state.loading} setViewPort={this.setViewPort}/>
                    <ArticlesList className={classes.articlesList} height={this.state.viewPort} articles={this.state.articles} totalResults={this.state.totalResults} setPage={this.setPage}/>
                </LoadingOverlay>
            </React.Fragment>
        );
    }
}

export default withStyles(styles)(App);
