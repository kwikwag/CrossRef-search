import React, {Component} from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import $ from "jquery";

import Nav from '../components/Nav'
import FacetsList from '../components/FacetsList'
import ArticlesList from '../components/ArticlesList'

class App extends Component {

    state = {
        articles: [],
        facets: {}
    };

    search = (query) => {
        let escapedQuery = encodeURIComponent(query.replace(/\s+$/, "").replace(/^\s+/, ""));

        let url = "https://api.crossref.org/works?filter=type:journal-article&rows=5&query.bibliographic=" + escapedQuery + "&facet=published:5,container-title:5,affiliation:5";

        $.ajax({
            type: "GET",
            url: url,
            processData: false
        }).then((res) => {
            if (res && res.message && Array.isArray(res.message.items) ) {
                this.setState({articles: res.message.items, facets: res.message.facets});
            } else {
                console.log('Received faulty response from crossref', this)
            }
        }, (err) => {
            debugger
        });
    };

    render() {
        return (
            <React.Fragment>
                <CssBaseline/>
                <Nav onSubmit={this.search}/>
                <FacetsList facets={this.state.facets}/>
                <ArticlesList articles={this.state.articles}/>
            </React.Fragment>
        );
    }
}

export default App;
