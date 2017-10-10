node-sass styles/main.scss styles/main.css;

uglifyjs \
./node_modules/linq/linq.min.js \
./node_modules/angular/angular.min.js \
./node_modules/angular-sanitize/angular-sanitize.min.js \
./node_modules/angular-route/angular-route.min.js \
./app/app.js \
./app/views/landingController.js \
./app/views/studentController.js \
./app/services/studentDataService.js \
./app/directives/affix.js \
-o ./main.min.js \
--source-map url=main.min.js.map;

uglifycss \
./styles/main.css \
./node_modules/font-awesome/css/font-awesome.css \
--output main.min.css;