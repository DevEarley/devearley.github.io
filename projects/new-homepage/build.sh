uglifyjs \
./node_modules/angular/angular.min.js \
./node_modules/angular-route/angular-route.min.js \
./app/app.js \
-o ./main.min.js \
--source-map url=main.min.js.map;