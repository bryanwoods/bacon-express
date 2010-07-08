require.paths.unshift('vendor/express/lib')
require('express')
require('express/plugins')

configure(function() {
  set('root', __dirname)
  use(Logger)
  use(Static, {
    path: require('path').join(__dirname, 'public')
  }) 
  enable("show exceptions")
})

get('/', function() {
  this.redirect('/chunky/bacon')
})

get('/*.css', function(file) {
  this.render(file + '.css.sass', {
    layout: false
  })
})

get('/public/*', function(file) { 
  this.sendfile(__dirname + '/public/' + file) 
}) 

get('/chunky/bacon', function() {
  this.render('bacon.html.haml', {
    layout: false,
    locals: {
      title: 'Chunky Bacon!',
      logo: 'http://s3.amazonaws.com/boxflag-production/attachments/image/192/original.jpg?1278549707'
    }
  })
})

run(parseInt(process.env.PORT || 8000), null)
