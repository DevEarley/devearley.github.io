node-sass styles/main.scss styles/main.css;

uglifyjs \
     ./node_modules/angular/angular.min.js \
    ./node_modules/angular-route/angular-route.min.js \
	./app/app.js \
	./app/views/landingController.js \
    -o ./main.min.js \
    --source-map url=main.min.js.map;

uglifycss \
    ./styles/main.css \
    --output main.min.css;
