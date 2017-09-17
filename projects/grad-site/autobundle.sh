sh ./bundle.sh;
simple-file-watch --extension='scss' --path='./styles' --command="sh ./bundle.sh"&
simple-file-watch --extension='js' --path='./app' --command="sh ./bundle.sh"&
watch-http-server ./ -a localhost -o
