/**
 * @class SPaginator component
 * @param {Object} list Object of the list tha is paginated
 * @param {string} selector Selector of the paginator 
 * @param {number} total Total of items
 * @callback  callBack Function to call when is cliked on a page to refresh the list
 * @param {Object} options Configurable options
 */
function SPaginator(list, selector, total, callBack, options){
    this.list = list;
    this.$container = null;
    this.current = 1;
    this.total = parseInt(total, 10);
    this._pages = null;
    this._options =$.extend({
        items_per_page: 10,
        labelNext: 'Next >',
        labelPrevious: '< Prev',
        page: 1,
        display: 5
    },options);
    this._options.halfDisplay = Math.floor(this._options.display/2);

    this._callBack = callBack;

    this._init(selector);
}

SPaginator.prototype = {

    _init: function(container) {
        this.$container = $(container);
        this.current = this._options.page;
        this._pages =  Math.ceil(this.total/this._options.items_per_page);
        this.print();
        this._initClickEvent();
    },

    getCurrentPage: function() {
        return this.current;
    },

    empty: function() {
        this.$container.empty();
    },

    _getInterval: function() {
        return {
            start: Math.ceil(this.current > this._options.halfDisplay ? Math.max(Math.min(this.current - this._options.halfDisplay, (this._pages - this._options.display)), 1) : 1),
            end: Math.ceil(this.current > this._options.halfDisplay ? Math.min(this.current + this._options.halfDisplay, this._pages) : Math.min(this._options.display, this._pages))
        };
    },

    print: function() {
        var $list = $('<ul></ul>'),
            i = 1,
            interval = this._getInterval();

        this.$container.empty();

        if(this._pages > 0) {
            $list.append(this.printShortcut('previous'));
        }

        if (interval.start > 1 && this._options.halfDisplay > 0) {
            var end = Math.min(this._options.halfDisplay, interval.start-1);
            for (i = 1; i <= end; i++) {
                $list.append(this.printPage(i));
            }
            if (this._options.halfDisplay < interval.start && (interval.start - this._options.halfDisplay > 1)) {
                $list.append(this.printText('...'));
            }
        }

        for(i=interval.start; i<=interval.end; i++)
        {
            $list.append(this.printPage(i));
        }

        if (interval.end < this._pages && this._options.halfDisplay > 0) {
            if ((this._pages - this._options.halfDisplay > interval.end) && (this._pages - this._options.halfDisplay - interval.end > 0)) {
                $list.append(this.printText('...'));
            }
            var begin = Math.max(this._pages - this._options.halfDisplay, interval.end)+1;
            for (i = begin; i <= this._pages; i++) {
                $list.append(this.printPage(i));
            }
        }

        if(this._pages > 0) {
            $list.append(this.printShortcut('next'));
        }

        this.$container.html($list);
        this.$container.append('<div class="clear"></div>');
    },

    printPage: function(num)
    {
        if(num===this.current)
        {
            return '<li class="active">'+num+'</li>';
        }
        else
        {
            return '<li><a data-page="'+num+'" href="#">'+num+'</a></li>';
        }

    },

    printText: function(text)
    {
        return '<li class="text">'+text+'</li>';
    },

    printShortcut: function(type)
    {
        var limit = (type==="next")?
                        (this.current===this._pages):
                        (this.current===1),
            label = 'label'+type.charAt(0).toUpperCase()+type.slice(1);
        if(limit)
        {
            return '<li class="active">'+this._options[label]+'</li>';
        }
        else
        {
            return '<li><a data-page="'+type+'" href="#">'+this._options[label]+'</a></li>';
        }
    },

    _initClickEvent: function() {
        var _self = this;

        this.$container.off().on('click','a',function(e) {
            var page = $(this).data('page');

            e.preventDefault();

            if (page==='next')
            {
                _self.current++;
            }
            else if (page==="previous") {
                _self.current--;
            }
            else
            {
                _self.current = page;
            }
            if(typeof _self._callBack==='string')
            {
                eval(_self._callBack+'('+_self.current+')');
            }
            else
            {
                _self._callBack.apply(_self.list, [_self.current]);
            }
            _self.print();
        });
    }
};
