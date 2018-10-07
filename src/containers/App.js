import React, {Component} from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import $ from "jquery";
import _ from 'lodash'

import Search from '../components/Search'
import ArticlesList from '../components/ArticlesList'

class App extends Component {

    state = {
        articles: [],
        facets: {}
    };

    search = (input, extraParams) => {
        if (!extraParams) extraParams = {};

        if (!extraParams.facets) extraParams.facets = {
            published: 5,
            'container-title': 5,
            affiliation: 5
        };

        $.ajax({
            type: "GET",
            url: this.buildQuery(input, extraParams),
            processData: false
        }).then((res) => {
            if (res && res.message && Array.isArray(res.message.items)) {
                this.setState({articles: res.message.items, facets: res.message.facets});
            } else {
                console.log('Received faulty response from crossref', this)
            }
        }, (err) => {
            debugger
        });
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
                // filtersQuery = filtersQuery + filterName + ':' + filterVal + ','
                _.each(filterValues, (isActive, filterName) => {
                    if (isActive) {
                        if (facetName === 'published') {
                            filtersQuery = filtersQuery + 'from-pub-date:' + filterName + '-01-01,until-pub-date:' + filterName + '-12-31,'
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

    render() {
        return (
            <React.Fragment>
                <CssBaseline/>
                <Search onSubmit={this.search} facets={this.state.facets}/>
                <ArticlesList articles={this.state.articles}/>
            </React.Fragment>
        );
    }
}

export default App;
