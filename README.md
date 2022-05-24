# express-web-server-serving-dynamic-pages-and-static-files
## Code changes before hosting on heroku
  ### Backend
    #### const port = process.env.PORT || 3000 instead of const port = 3000
    #### in package.json in scripts add 
      ##### "start" : "node src/app.js" so heroku knows how to launch the server
      ##### "dev" : "nodemon src/app.js" for other developpers to know how to start dev server
      ##### for this dont forget to install nodemon locally as dev dependency and not globaly
  
  ### Frontend
    ####change (base url) any call to your backend from localhost:3000/ to http://heroku-url:port/
