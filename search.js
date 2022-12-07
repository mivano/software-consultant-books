---
layout: null
---
var documents = [
    {% for book in site.books %}
    {
    "title": "{{ book.title | escape }}",
    "author": "{{ book.author | escape }}",
    "url": "{{ site.baseurl }}{{ book.url }}",
    "categories": "{{ book.categories | join: ', ' }}",
    "tags": "{{ book.tags | join: ', ' }}",
    "audiences": "{{ book.audiences | join: ', ' }}",
    "date": "{{ book.date }}",
    "imageurl": "{{ book.imageurl }}",
    "excerpt": "{{ book.excerpt | strip | strip_newlines | strip_html }}"
} {% unless forloop.last %}, {% endunless %}
 {% endfor %}
];

var configuration = {
    sortings: {
        year_asc: {
            // field name in data
            field: 'year',
            // possible values asc or desc
            order: 'asc'
        },
        year_name_asc: {
            // Multiple criteria possible
            field: ['date', 'name'],
            order: ['asc', 'asc']
        }
    },
    aggregations: {
        categories: {
            title: 'category',
            // conjunctive facet (AND)
            conjunction: true,
            // sort can ben an array
            sort: ['selected', 'count', 'key'],
            order: ['desc', 'desc', 'asc'],
            // the default is 10
            size: 20
        },
        audiences: {
            title: 'audience',
            // conjunctive facet (AND)
            conjunction: true,
            // sort can ben an array
            sort: ['selected', 'count', 'key'],
            order: ['desc', 'desc', 'asc'],
            // the default is 10
            size: 20
        }
    },
    searchableFields: ['title', 'categories', 'excerpt', 'author'],
};
var itemsjs = itemsjs(documents, configuration);

const { createApp } = Vue

createApp({
    data: function () {

        // making it more generic
        var filters = {};
        Object.keys(configuration.aggregations).map(function (v) {
            filters[v] = [];
        })

        return {
            query: '',
            // initializing filters with empty arrays
            filters: filters
        }
    },
    methods: {
        reset: function () {
            var filters = {};
            Object.keys(configuration.aggregations).map(function (v) {
                filters[v] = [];
            })

            this.filters = filters;
            this.query = '';
        }
    },
    computed: {
        searchResult: function () {

            var result = itemsjs.search({
                query: this.query,
                filters: this.filters
            })
            return result
        }
    }
}).mount('#el')