tsc;
uglifyjs \
./node_modules/angular/angular.min.js \
./node_modules/angular-route/angular-route.min.js \
./app/app.js \
-o ./main.js \
--source-map url=main.js.map;