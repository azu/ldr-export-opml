// MIT © 2017 azu
"use strict";
const xml = require("xml");
const groupBy = require("lodash.groupby");
const Rate = {
    "5": "★★★★★",
    "4": "★★★★☆",
    "3": "★★★☆☆",
    "2": "★★☆☆☆",
    "1": "★☆☆☆☆",
    "0": "☆☆☆☆☆",
};

const convertGroupXML = (json) => {
    return xml({
        'body': [
            {
                "outline": [
                    {
                        _attr: {
                            title: "Subscriptions"
                        }
                    }
                ].concat(json)
            }
        ]
    }, true);
};
const convertCategoryToOutline = (title, json) => {
    return {
        "outline": [
            {
                _attr: {
                    title: title
                }
            }
        ].concat(json)
    }
};
/**
 /**
 * Convert feed item to outline
 * @param json
 * @returns {{}}
 */
const convertItemToOutline = (json) => {
    return {
        "outline": {
            _attr: {
                type: "rss",
                title: json.title,
                htmlUrl: json.link,
                xmlUrl: json.feedlink
            }
        }
    }
};
/**
 *
 * @param json
 *
 * @example
 * {
 *   "icon": "http://image.reader.livedwango.com/favicon/a/e/ae09425b3ab46d3665cce24909f488330edfc716.png",
 *   "link": "http://blog.livedoor.jp/staff_reader/",
 *   "subscribe_id": 12256405,
 *   "unread_count": 0,
 *   "folder": "walf443",
 *   "tags": [],
 *   "rate": 5,
 *   "modified_on": "1500886853",
 *   "public": 0,
 *   "title": "LDR / LDRポケット 開発日誌",
 *   "subscribers_count": "283673",
 *   "feedlink": "http://blog.livedoor.jp/staff_reader/atom.xml"
 * }
 *
 * to
 *
 *
 * <outline title="LDR / LDRポケット 開発日誌" htmlUrl="http://blog.livedoor.jp/staff_reader/" type="rss" xmlUrl="http://blog.livedoor.jp/staff_reader/atom.xml" />
 */
const convertJsonToXML = (json) => {
    const groupByRate = groupBy(json, "rate");
    let results = [];
    Object.keys(groupByRate).map(rateKey => {
        const rateName = Rate[rateKey];
        const items = groupByRate[rateKey];
        results = results.concat(convertCategoryToOutline(rateName, items.map(convertItemToOutline)));
    });
    const head = {
        "head": [
            {
                title: "LDR Subscriptions"
            },
            {
                dateCreated: (new Date()).toDateString()
            }
        ]
    };
    return `<?xml version="1.0" encoding="UTF-8"?><opml version="2.0">
    ${xml(head, true)}
    ${convertGroupXML(results)}
</opml>`;
};
module.exports.convertJsonToXML = convertJsonToXML;