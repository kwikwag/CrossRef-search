
function parseArticle(result) {
    // get fields from crossref json to helper variables
    var year = "", journal = "", locator = [], authors = "";
    try {
        year = result["published-online"]["date-parts"][0][0];
    } catch (e) {
        try {
            year = result["published-print"]["date-parts"][0][0];
        } catch (e) {
        }
    }
    try {
        authors = result["author"].map(function (author) {
            return author["given"] + " " + author["family"]
        }).join(", ");
    } catch (e) {
    }
    try {
        journal = result["short-container-title"];
    } catch (e) {
    }
    try {
        locator.push(result["volume"]);
    } catch (e) {
    }
    try {
        locator.push(result["journal-issue"]["issue"]);
    } catch (e) {
    }
    try {
        locator.push(result["page"]);
    } catch (e) {
    }

    // format the helper variables
    locator = locator.filter(function (x) {
        return !!x;
    });
    if (locator.length) {
        locator.unshift(""); // put dummy first element to product a prefix comma (,)
    }
    if (year && journal) {
        year += ", ";
    }

    var title;
    try {
        title = result["title"][0];
    }
    catch (e) {
        title = "[Title unknown]";
    }

    var doi = result["DOI"];
    if (!doi) {
        doi = "[Unknown]";
    }

    var url = result["URL"];
    if (!url) {
        url = "#";
    }

    return {
        title,
        year,
        journal,
        locator,
        authors,
        url,
        doi
    }
}

const dataParser = {
    parseArticle
};

export default dataParser