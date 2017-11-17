(function () {
	
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
	scheduler.config.xml_date = "%Y-%m-%d %H:%i:%s";
	scheduler.config.multisection = true; 
	scheduler.config.max_month_events = 3;
	scheduler.config.resize_month_events = true;
	scheduler.config.resize_month_timed= true;  

	// scheduler.config.readonly = true;

	var roomsArr = scheduler.serverList("room");
	var roomTypesArr = scheduler.serverList("roomType");
	var roomStatusesArr = scheduler.serverList("roomStatus");
	var bookingStatusesArr = scheduler.serverList("bookingStatus");
	var bookingStatusesArray = scheduler.serverList("bookingStatusData");
	// var status_opts = [
	// 	{ key: 'Enquiry', label: 'Enquiry' },
	// 	{ key: 2, label: 'Progress' },
	// 	{ key: 3, label: 'Confirmed' }
	// ];
	var status_opts = [
		{ key: 'Enquiry', label: 'Enquiry' },
		{ key: 'Progress', label: 'Progress' },
		{ key: 'Confirmed', label: 'Confirmed' }
	];
	// var Category_opts = [
	// 	{ key: 1, label: 'Foreign (Europe)' },
	// 	{ key: 2, label: 'Foreign (USA)' },
	// 	{ key: 3, label: 'Indian Standard' },
	// 	{ key: 4, label: 'Indian Premium' },
	// 	{ key: 5, label: 'Room Alone' }
	// ];
	var Category_opts = [
		{ key: 'Foreign (Europe)' , label: 'Foreign (Europe)' },
		{ key: 'Foreign (USA)', label: 'Foreign (USA)' },
		{ key: 'Indian Standard', label: 'Indian Standard' },
		{ key: 'Indian Premium', label: 'Indian Premium' },
		{ key: 'Room Alone', label: 'Room Alone' }
	];

	var room_type_opts=[
		{ key: 'AC', label: 'AC' },
		{ key: 'Non-AC', label: 'Non-AC' },
	]
	var bed_type_opts=[
		{ key: 'Single', label: 'Single' },
		{ key: 'Double', label: 'Double' },
		{ key: 'Twin', label: 'Twin' },
	]
	scheduler.config.lightbox.sections = [
		{map_to: "Name", name: "text", type: "textarea", height: 24}, 
		{map_to: "Email", name: "Email", height: 40, type: "textarea"},
		{map_to: "ReferredBy", name: "Referred By", height: 40, type: "textarea"},
		{map_to:"status", name:"Status", height:40,  type:"radio", options:status_opts},
		{map_to:"Category", name:"category", height:40,  type:"select", options:Category_opts},
		{map_to:"room_type", name:"Room Type", height:40,  type:"radio", options:room_type_opts},
		{map_to:"bed_type", name:"Bed Type", height:40,  type:"radio", options:bed_type_opts},
		{map_to: "No_of_guests", name: "No.Of Guests", height: 24, type: "textarea"},
		{map_to: "No_of_male", name: "No.Of Male", height: 24, type: "textarea"},
		{map_to: "No_of_female", name: "No.Of Female", height: 24, type: "textarea"},
		{map_to: "Arrival_flight_details", name: "Arrival Flight Details", height: 40, type: "textarea"},
		{map_to: "Departure_flight_details", name: "Departure Flight Details", height: 40, type: "textarea"},
		{map_to: "room", name: "room", type: "select", options: scheduler.serverList("currentRooms")},
		{map_to: "Description", name: "Description", height: 40, type: "textarea"},
		// {map_to: "status", name: "status", type: "radio", options: scheduler.serverList("bookingStatus")},
		{map_to: "is_paid", name: "is_paid", type: "checkbox", checked_value: 1, unchecked_value: 0},
		{map_to: "is_taxi", name: "Taxi", type: "checkbox", checked_value: 1, unchecked_value: 0},
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
	 
	function findInArray(array, key) {
		for (var i = 0; i < array.length; i++) {
			if (key == array[i].key)
				return array[i];
		}
		return null;
	}

	function getRoomType(key) {
		return findInArray(roomTypesArr, key).label;
	}

	function getRoomStatus(key) {
		return findInArray(roomStatusesArr, key);
	}

	function getRoom(key) {
		return findInArray(roomsArr, key);
	}

	scheduler.templates.timeline_scale_label = function (key, label, section) {
		var roomStatus = getRoomStatus(section.status);
		return [
			// "<div class='timeline_item_separator'></div>",
			"<div class='timeline_item_cell'>" + label + "</div>",
			// "<div class='timeline_item_separator'></div>",
			// "<div class='timeline_item_cell'>" + getRoomType(section.type) + "</div>",
			// "<div class='timeline_item_separator'></div>",
			// "<div class='timeline_item_cell room_status'>",
			// "<span class='room_status_indicator room_status_indicator_" + roomStatus.key + "'></span>",
			// "<span class='status-label'>" + roomStatus.label + "</span>",
			"</div>"].join("");
	};

	scheduler.date.timeline_start = scheduler.date.month_start;
	scheduler.date.add_timeline = function (date, step) {
		return scheduler.date.add(date, step, "month");
	};

	scheduler.attachEvent("onBeforeViewChange", function (old_mode, old_date, mode, date) {
		var year = date.getFullYear();
		var month = (date.getMonth() + 1);
		var d = new Date(year, month, 0);
		var daysInMonth = d.getDate();
		scheduler.matrix["timeline"].x_size = daysInMonth;
		return true;
	});

	scheduler.templates.event_class = function (start, end, event) {
		return "event_" + (event.status || "");
	};

	function getBookingStatus(key) {
		var bookingStatus = findInArray(bookingStatusesArr, key);
		return !bookingStatus ? '' : bookingStatus.label;
	}

	function getPaidStatus(isPaid) {
		return (isPaid==1) ? "paid" : "not paid";
	}
	function getTaxiStatus(isTaxi) {
		return (isTaxi==1) ? "Taxi" : "No Taxi";
	}

	var eventDateFormat = scheduler.date.date_to_str("%d %M %Y %H:%i");
	scheduler.templates.event_bar_text = function (start, end, event) {
		var paidStatus = getPaidStatus(event.is_paid);
		var startDate = eventDateFormat(event.start_date);
		var endDate = eventDateFormat(event.end_date);
		return [event.Name + "<br />",
			startDate + " - " + endDate,
			"<div class='booking_status booking-option'>" + (event.status) + "</div>",
			"<div class='booking_paid booking-option'>" + paidStatus + "</div>"].join("");
	};

	scheduler.templates.tooltip_text = function (start, end, event) {
		var room = getRoom(event.room) || {label: ""};
     //  var room=event;
		var html = [];
		// html.push("Booking: <b>" + event.text + "</b>");
		html.push("Name: <b>" + (event.Name==null?'':event.Name) + "</b>");
		html.push("Email: <b>" +(event.Email==null?'':event.Email) + "</b>");
		html.push("ReferredBy: <b>" + (event.ReferredBy==null?'':event.ReferredBy) + "</b>");
		html.push("Category: <b>" +(event.Category==null?'':event.Category) + "</b>");
		html.push("Room Type: <b>" +(event.room_type==null?'':event.room_type) + "</b>");
		html.push("Bed Type: <b>" +(event.bed_type==null?'':event.bed_type) + "</b>");
		html.push("No.of Guests: <b>" +(event.No_of_guests==null?'0':event.No_of_guests) + "</b>"+"- ( Male: <b>" +(event.No_of_male==null?'0':event.No_of_male) + "</b>"+" Female: <b>" +(event.No_of_female==null?'0':event.No_of_female) + "</b> )");
		html.push("Arrival Flight Details: <b>" +(event.Arrival_flight_details==null?'':event.Arrival_flight_details) + "</b>");
		html.push("Departure Flight Details: <b>" +(event.Departure_flight_details==null?'':event.Departure_flight_details) + "</b>");
		
		html.push("Room: <b>" + room.label + "</b>");
		// html.push("Status: <b>" +(event.status==null?'':event.status) + "</b>");
		html.push("Check-in: <b>" + eventDateFormat(start) + "</b>");
		html.push("Check-out: <b>" + eventDateFormat(end) + "</b>");
		html.push("Description: <b>" +(event.Description==null?'':event.Description) + "</b>");
		
		html.push((event.status==null?'':event.status) + ", " + getPaidStatus(event.is_paid)+ ", " + getTaxiStatus(event.is_taxi));
		return html.join("<br>")
	};

	scheduler.templates.lightbox_header = function (start, end, ev) {
		var formatFunc = scheduler.date.date_to_str('%d.%m.%Y %H:%i:%s');
		return formatFunc(start) + " - " + formatFunc(end);
	};

	scheduler.attachEvent("onEventCollision", function (ev, evs) {
		for (var i = 0; i < evs.length; i++) {
			if (ev.room != evs[i].room) continue;
			dhtmlx.message({
				type: "error",
				text: "This room is already booked for this date."
			});
		}
		return true;
	});

	scheduler.attachEvent('onEventCreated', function (event_id) {
		var ev = scheduler.getEvent(event_id);
		ev.status ="Enquiry";
		ev.is_paid = 1;
		ev.is_taxi = 1;
		ev.Name = '';
		ev.Email = '';
		ev.ReferredBy = '';
	});

	scheduler.addMarkedTimespan({days: [0, 6], zones: "fullday", css: "timeline_weekend"});

	window.updateSections = function updateSections(value) {
		var currentRoomsArr = [];
		if (value == 'all') {
			scheduler.updateCollection("currentRooms", roomsArr.slice());
			return
		}
		for (var i = 0; i < roomsArr.length; i++) {
			if (value == roomsArr[i].type) {
				currentRoomsArr.push(roomsArr[i]);
			}
		}
		scheduler.updateCollection("currentRooms", currentRoomsArr);
	};

	scheduler.attachEvent("onXLE", function () {
		updateSections("all");

		var select = document.getElementById("room_filter");
		var selectHTML = ["<option value='all'>All</option>"];
		for (var i = 1; i < roomTypesArr.length + 1; i++) {
			selectHTML.push("<option value='" + i + "'>" + getRoomType(i) + "</option>");
		}
		select.innerHTML = selectHTML.join("");
	});

	scheduler.attachEvent("onEventSave", function (id, ev, is_new) {
		var no_guests=ev.No_of_guests;
		var no_male=ev.No_of_male;
		var no_female=ev.No_of_female;
		  
		if (!ev.Name) {
			dhtmlx.alert("Name must not be empty");
			return false;
		}
		// if (!ev.Email) {
		// 	dhtmlx.alert("Email must not be empty");
		// 	return false;
		// }
		return true;
	});

})();

function init() {

	
	// scheduler.load("../DB_Functions/connection.php?uid="+scheduler.uid());
	// window.dp  = new dataProcessor("../DB_Functions/connection.php");
	// dp.init(scheduler);

	//scheduler.init('scheduler_here', new Date(2017, 2, 1), "timeline");
	scheduler.init('scheduler_here', new Date(), "timeline");
	
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
