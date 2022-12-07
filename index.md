---
layout: default
title: "Happy Jekylling!"
---

<div class="container-fluid" style="margin-top: 50px;">
{% raw %}
    <h1>List of items ({{ searchResult.pagination.total }})</h1>

    <p class="text-muted">Search performed in {{ searchResult.timings.search }} ms, facets in
        {{ searchResult.timings.facets }} ms</p>

    <div class="row">
        <div class="col-md-2 col-xs-2">
            <div v-for="facet in searchResult.data.aggregations">
                <h5 style="margin-bottom: 5px;"><strong style="color: #337ab7;">{{ facet.title }}</strong></h5>

                <ul class="browse-list list-unstyled long-list" style="margin-bottom: 0;">
                    <li v-for="bucket in facet.buckets">
                        <div class="checkbox block" style="margin-top: 0; margin-bottom: 0;">
                            <label>
                                <!--<input class="checkbox" type="checkbox" v-on:click="updateFilters(facet.name, bucket.key)" v-model="filters[bucket.key]" value="{{ bucket.key }}" v-bind:value="isChecked2()">-->
                                <!--<input class="checkbox" type="checkbox" v-on:click="updateFilters(facet.name, bucket.key)" v-model="filters[bucket.key]" v-bind:value="bucket.key">-->
                                <input class="checkbox" type="checkbox" v-model="filters[facet.name]"
                                    v-bind:value="bucket.key">
                                {{ bucket.key }} ({{ bucket.doc_count }})
                            </label>
                        </div>
                    </li>
                </ul>
            </div>
        </div>

        <div class="col-md-10 col-xs-10">
            <div class="breadcrumbs"></div>
            <div class="clearfix"></div>  
            
            <ul class="align">
            
                <li v-for="item of searchResult.data.items" >
                    <figure class="book">

                        <!-- Front -->

                        <ul class="hardcover_front">
                            <li>
                                <img v-bind:src="item.imageurl" alt="" style="width: 100%;    height: 100%;" width="100%" height="100%" />
                            </li>
                            <li></li>
                        </ul>

                        <!-- Pages -->

                        <ul class="page">
                            <li></li>
                            <li>
                                <a class="btn" v-bind:href="item.url">see details</a>
                            </li>
                            <li></li>
                            <li></li>
                            <li></li>
                        </ul>

                        <!-- Back -->

                        <ul class="hardcover_back">
                            <li></li>
                            <li></li>
                        </ul>
                        <ul class="book_spine">
                            <li></li>
                            <li></li>
                        </ul>
                        <figcaption>
                            <h1>{{ item.title }}</h1>
                            <span>By {{ item.author }}</span>
                            <p>{{ item.excerpt }}</p>
                        </figcaption>
                    </figure>
                </li>

            </ul>
           
            <div class="clearfix"></div>
        </div>

        <div class="clearfix" style="margin-bottom: 100px;"></div>
    </div>
    {% endraw %}
</div>

