/*jslint browser:true */
/*globals jQuery */

if (typeof Object.create !== 'function') {
  Object.create = function(o) {
    var F = function() {};
    F.prototype = o;
    return new F();
  };
}

var Calagator = {
  nextId: 1,
  activate_calendars: function() {
                        var that = this;
                        jQuery('a[rel=calendar][type=application/json]').each(function(i, e) { that.create(e, that); });
                      },

  create: function(calendar_link, link) {
            var calendar = Object.create(this);

            calendar.href = jQuery(calendar_link).attr('href');
            calendar.container = jQuery(calendar_link).replaceWith('<div class="calendar" id="calendar'+Calagator.nextId+'"></div>');
            calendar.container = jQuery('div#calendar'+Calagator.nextId);
            Calagator.nextId++
            calendar.events = [];

            jQuery.getJSON(calendar.href + '&callback=?',
              function(events) {
                jQuery.each(events, function(i, item) {
                  calendar.Item.create(item, calendar);
                });
              });
          },

  Item: {
    create: function(data, calendar) {
              var item = Object.create(this),
                  start_time = item.parse_date(data.start_time),
                  now = new Date();
              if (start_time > now) {
                item.data = data;
                item.start_time = item.parse_date(data.start_time);
                item.end_time   = item.parse_date(data.end_time);
                item.calendar = calendar;
                item.calendar.container.append('<li class="vevent">' + '<a href="'+item.link()+'" target="_blank">'+item.summary() + "</a> &ndash; " + item.start_and_end() + item.venue() + item.description() + '</li>');
                item.calendar.events.push(this);
              }
            },
    link: function() {
    			return 'http://calagator.org/events/'+this.data.id;
    		},
    summary: function() {
    	   	   var title = this.data.title;
    	   	   if (title.indexOf(" - Agile PDX") > -1) {
    	   	     title = title.substring(0, title.indexOf(" - Agile PDX"))
    	   	   }
               return '<span class="summary">' + title + '</span>';
             },
    print_start_time: function() {
                  var pretty_time = this.start_time.strftime('%A, %B %d');
                  return ' <abbr style="border:none" class="dtstart" title="' + this.iso8601(this.start_time) + '">' + pretty_time + '</abbr>';
                },
    start_and_end: function() {
                     return '<span class="date">' + this.print_start_time() + '</span>';
                   },
    venue: function() {
             return '<a rel="venue" type="application/json" href="' + this.data.venue_id + '" />';
           },
    description: function() {
                   return '<p class="description">' + this.data.description.replace(/\n/g, '<br />') + '</p>';
                 },
    iso8601: function(time) {
               var tz_offset = time.toString().match(/([+\-]\d+)/);
               if (tz_offset.length > 1) {
                 return time.strftime('%Y-%m-%dT%H:%M:%S') + tz_offset[1];
               } else {
                 return time.strftime('%Y-%m-%dT%H:%M:%S');
               }
             },
    parse_date: function(date) {
                    var prepared;
                    prepared = date.replace(/T/, ' ');
                    prepared = prepared.replace(/-/, '/');
                    prepared = prepared.replace(/-/, '/');
                    return (new Date(prepared));
                }
  }
};

jQuery(document).ready(function() {
  Calagator.activate_calendars();
});
