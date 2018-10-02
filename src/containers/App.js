import React, {Component} from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import $ from "jquery";

import Nav from '../components/Nav'
import ArticlesList from '../components/ArticlesList'

class App extends Component {

    state = {
        articles: []
    };

    search = (query) => {
        let escapedQuery = encodeURIComponent(query.replace(/\s+$/, "").replace(/^\s+/, ""));

        let url = "https://api.crossref.org/works?query.bibliographic=" + escapedQuery + "&filter=type:journal-article&rows=5";

        $.ajax({
            type: "GET",
            url: url,
            processData: false
        }).then((res) => {
            if (res.message && res.message.items && Array.isArray(res.message.items) ) {
                this.setState({articles: res.message.items});
            } else {
                console.log('Received faulty response from crossref')
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
                <ArticlesList articles={this.state.articles}/>
            </React.Fragment>
        );
    }
}

export default App;
