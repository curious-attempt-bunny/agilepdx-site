new TWTR.Widget({
  version: 2,
  type: 'search',
  search: '(agile pdx) OR agilepdx  near:portland',
  interval: 6000,
  title: 'search: agile pdx',
  subject: 'Agile PDX Buzz',
  width: 250,
  height: 300,
  theme: {
	shell: {
	  background: '#39892f',
	  color: '#ffffff'
	},
	tweets: {
	  background: '#ffffff',
	  color: '#444444',
	  links: '#2a7322'
	}
  },
  features: {
	scrollbar: false,
	loop: true,
	live: true,
	hashtags: true,
	timestamp: true,
	avatars: true,
	toptweets: true,
	behavior: 'default'
  }
}).render().start();
