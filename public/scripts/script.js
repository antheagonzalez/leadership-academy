$(document).ready(() => {
  const search = instantsearch({
    // Replace with your own values
    appId: 'U0SJEMOF8V',
    apiKey: 'cb0544d625338e96d85185fdccd9e499', // search only API key, no ADMIN key
    indexName: 'prod_LAStudents',
    urlSync: true,
    routing: true
    // searchParameters: {
    //   hitsPerPage: 5
    // }
  });

  search.addWidget(
    instantsearch.widgets.searchBox({
      container: '#search-input'
    })
  );

  search.addWidget(
  instantsearch.widgets.stats({
    container: '#stats'
  })
);

  search.addWidget(
    instantsearch.widgets.hits({
      container: '#hits',
      templates: {
        item: document.getElementById('hit-template').innerHTML,
        empty: "We didn't find any results for the search <em>\"{{query}}\"</em>"
      }
    })
  );

  search.addWidget(
    instantsearch.widgets.pagination({
      container: '#pagination'
    })
  );

  search.addWidget(
    instantsearch.widgets.refinementList({
      container: '#events',
      attributeName: 'eventsAttended',
      limit: 100
    })
  );

  search.addWidget(
    instantsearch.widgets.rangeInput({
      container: '#points',
      attributeName: 'totalPoints'
    })
  );
  search.start();
});
