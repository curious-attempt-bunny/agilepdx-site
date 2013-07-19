!function(d,s,id)
{
  var js,
  fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';
  if(!d.getElementById(id))
    {
     js=d.createElement(s);
     js.id=id;js.src=p+"://platform.twitter.com/widgets.js";
     fjs.parentNode.insertBefore(js,fjs);
    }
}
(document,"script","twitter-wjs");

//  This version was depricated by twitter
//new TWTR.Widget({
//  version: 2,
//  type: 'search',
//  search: '(agile pdx) OR agilepdx',
//  interval: 6000,
//  title: 'search: agile pdx',
//  subject: 'Agile PDX Buzz',
//  width: 250,
//  height: 300,
//  theme: {
//	shell: {
//	  background: '#39892f',
//	  color: '#ffffff'
//	},
//	tweets: {
//	  background: '#ffffff',
//	  color: '#444444',
//	  links: '#2a7322'
//	}
//},
//  features: {
//	scrollbar: false,
//	loop: true,
//	live: true,
//	hashtags: true,
//	timestamp: true,
//	avatars: true,
//	toptweets: true,
//	behavior: 'default'
//  }
//}).render().start();
