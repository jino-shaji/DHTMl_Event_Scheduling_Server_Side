(function () {
	
	
 
})();

function init() {

	
	// scheduler.load("../DB_Functions/connection.php?uid="+scheduler.uid());
	// window.dp  = new dataProcessor("../DB_Functions/connection.php");
	// dp.init(scheduler);

    scheduler.locale.labels.section_text = 'Name';
	scheduler.locale.labels.section_room = 'Room';
	scheduler.locale.labels.section_is_paid = 'Paid';
	scheduler.locale.labels.section_time = 'Time';
	scheduler.locale.labels.section_Status = 'Status';
	scheduler.locale.labels.section_category = 'Category';

	scheduler.xy.scale_height = 30;
	scheduler.config.details_on_create = true;
	scheduler.config.details_on_dblclick = true;
	scheduler.config.prevent_cache = true;
	scheduler.config.show_loading = true;
	scheduler.config.xml_date = "%Y-%m-%d %H:%i";
	scheduler.config.multisection = true; 
	scheduler.config.max_month_events = 3;
	scheduler.config.resize_month_events = true;
	scheduler.config.resize_month_timed= true;  


	var roomsArr = scheduler.serverList("room");
	var roomTypesArr = scheduler.serverList("roomType");
	var roomStatusesArr = scheduler.serverList("roomStatus");
	var bookingStatusesArr = scheduler.serverList("bookingStatus");
	var bookingStatusesArray = scheduler.serverList("bookingStatusData");
	var status_opts = [
		{ key: 1, label: 'Enquiry' },
		{ key: 2, label: 'Progress' },
		{ key: 3, label: 'Confirmed' }
	];

	var Category_opts = [
		{ key: 1, label: 'Foreign (Europe)' },
		{ key: 2, label: 'Foreign (USA)' },
		{ key: 3, label: 'Indian Standard' },
		{ key: 4, label: 'Indian Premium' },
		{ key: 5, label: 'Room Alone' }
	];
	
	scheduler.config.lightbox.sections = [
		{map_to: "text", name: "text", type: "textarea", height: 24}, 
		{map_to: "text", name: "Email", height: 40, type: "textarea"},
		{map_to: "text", name: "Referred By", height: 40, type: "textarea"},
		{map_to:"type", name:"Status", height:40,  type:"radio", options:status_opts},
		{map_to:"type", name:"category", height:40,  type:"select", options:Category_opts},
		{map_to: "room", name: "room", type: "select", options: scheduler.serverList("currentRooms")},
		// {map_to: "status", name: "status", type: "radio", options: scheduler.serverList("bookingStatus")},
		// {map_to: "is_paid", name: "is_paid", type: "checkbox", checked_value: true, unchecked_value: false},
		{map_to: "time", name: "time", type: "time"}
	];

	scheduler.locale.labels.timeline_tab = 'Timeline';
 
	scheduler.createTimelineView({
	//	fit_events: true,
		name: "timeline",
		y_property: "room",
		render: 'bar',
		x_unit: "day",
		x_date: "%d",
		x_size: 45,
		dy: 52,
		event_dy: 48,
		section_autoheight: true,
		round_position: false,
		y_unit: scheduler.serverList("currentRooms"),
		second_scale: {
			x_unit: "month",
     		x_date: "%F %Y"
		}
    });
    
	scheduler.init('scheduler_here', new Date(2017, 2, 1), "timeline");
	
	scheduler.load("./data.php", "json");
	window.dp = new dataProcessor("./data.php");
	dp.init(scheduler);


	(function () {
		var element = document.getElementById("scheduler_here");
		var top = scheduler.xy.nav_height + 1 + 1;// first +1 -- blank space upper border, second +1 -- hardcoded border length
		var height = scheduler.xy.scale_height;
		var width = scheduler.matrix.timeline.dx;
		var header = document.createElement("div");
		header.className = "collection_label";
		header.style.position = "absolute";
		header.style.top = top + "px";
		header.style.width = width + "px";
		header.style.height = height + "px";

		var descriptionHTML = "<div class='timeline_item_separator'></div>" +
			"<div class='timeline_item_cell'>Room No</div>" ;
			// "<div class='timeline_item_separator'></div>" +
			// "<div class='timeline_item_cell'>Type</div>" +
			// "<div class='timeline_item_separator'></div>" +
			// "<div class='timeline_item_cell room_status'>Status</div>";
		header.innerHTML = descriptionHTML;
		element.appendChild(header);
	})();
}
