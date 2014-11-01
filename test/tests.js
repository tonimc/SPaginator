QUnit.test( "Test running", function( assert ) {
	assert.ok( 1 == "1", "Passed!" );
});

QUnit.test( "Simple paginator", function( assert ) {
	var selector = '#pagination',
			testPaginator = new SPaginator(
			null,
	        selector,
	        11,
	        function (page) { },
	        {}
	    ),
		event,
        $gen = $(selector);
 
    // trigger event
    event = $.Event( "click" );
    event.keyCode = 9;

	assert.ok( $gen.find("ul").size() == 1, "Create list" );
	assert.ok( $gen.find("li").size() == 4, "Create 2 pages" );
	assert.ok( $gen.find("li").eq(0).text() == testPaginator._options.labelPrevious, "Previous text" );
	assert.ok( $gen.find("li").eq(3).text() == testPaginator._options.labelNext, "Next text" );
	assert.ok( $gen.find("li").eq(1).text() == "1", "Page 1 text" );
	assert.ok( $gen.find("li").eq(1).attr('class') == "active", "Page 1 is active" );
	assert.ok( $gen.find("li").eq(2).attr('class') != "active", "Page 1 isn't active" );

	$gen.find('a[data-page=2]').trigger( event );
	assert.ok( $gen.find("li").eq(0).attr('class') != "active", "Previous isn't active" );
	assert.ok( $gen.find("li").eq(2).attr('class') == "active", "Page 2 is active" );
	assert.ok( $gen.find("li").eq(2).attr('class') == "active", "Next is active" );
});

QUnit.test( "Advanced paginator", function( assert ) {
	var selector = '#pagination',
		page_clicked = 0,
		testPaginator = new SPaginator(
			null,
	        selector,
	        112,
	        function (page) { page_clicked = page; },
	        { items_per_page: 3, display: 3 }
	    ),
	    event,
        $gen = $(selector);
 
    
	assert.ok( $gen.find("li").size() == 7, "List has 7 li items" );
	assert.ok( $gen.find("li.active").size() == 2, "Has 2 item active" );

	function clickTest($paginator, page, items, actives, text_active) {
		// trigger event
	    event = $.Event( "click" );
	    event.keyCode = 9;

		$paginator.find('a[data-page='+page+']').trigger( event );
		$paginator = $(selector);
		assert.ok( page_clicked == (page=="next"?4:page), "Page "+page+ " has clicked");
		assert.ok( $gen.find("li").size() == items, "List has "+items+" items" );
		assert.ok( $gen.find("li.active").size() == actives, "Has "+actives+" items active" );
		assert.ok( $gen.find("li.active").eq(0).text() == text_active, "First active has text "+text_active);
	}

	clickTest($gen, 3, 8, 1, 3);
	clickTest($gen, "next", 9, 1, 4);
	clickTest($gen, 38, 8, 2, 38);
});

