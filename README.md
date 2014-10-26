SPaginator
==========

SPaginator - Very simple paginator in JS

# SPaginator is a simple component to create an pagintor

SPaginator is very simple to add to your components like lists, grids......

You can configurate:

* Callback fuction to every page click
* Very confugurable, you can:
	* Specificate items for page
	* number of pages to display on list
** Label texts

# Component

```
/**
 * @class SPaginator component
 * @param {Object} list Object of the list tha is paginated
 * @param {string} selector Selector of the paginator 
 * @param {number} total Total of items
 * @callback  callBack Function to call when is cliked on a page to refresh the list
 * @param {Object} options Configurable options
 */
function(list, container, total, callBack, options){
}
```

# Example

```
var cPaginator2 = new SPaginator(
    null,
    '#pagination2',
    112,
    function (page) { console.log("Call function to load " + page); },
    { items_per_page: 3 }
);
```


You can see many examples at examples folder.
To see one of then at this link: 