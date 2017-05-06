/***DEMO LOGIC******/
angular
	.module("MightyFileEditApp", ["mighty-file-edit", "mighty-awesome-file-edit"])
	.config(function () { })
	.run(function ($rootScope, $http) { });

angular
	.module("MightyFileEditApp")
	.controller("MFEController", function MFEController($scope, $rootScope) {
	    var vm = this;
	    vm.Data = "";
	    vm.ButtonTemplate = "custom-class";
	});

angular
	.module("MightyFileEditApp")
	.controller("MAFEController", function MAFEController($scope, $rootScope) {
	    var vm = this;
	    vm.Data = "";
	});

angular
	.module("mighty-file-edit", [])
	.directive("mightyFileEdit", function ($timeout, $rootScope) {
	    return {
	        restrict: "EA",
	        scope: {
	            buttonTemplate: "=",
	            data: "=",
	            content: "=",
	            message: "="
	        },
	        link: function ($scope, element) {
	            window.requestFileSystem =
                    window.requestFileSystem || window.webkitRequestFileSystem;
	            function init() {
	                navigator.webkitPersistentStorage.requestQuota(
                        1024 * 1024 * 5,
                        function (grantedSize) {
                            window.requestFileSystem(
                                window.PERSISTENT,
                                grantedSize,
                                function (fs) {
                                    $scope.filesystem = fs;
                                    $scope.listFiles();
                                },
                                $scope.errorHandler
                            );
                        },
                        $scope.errorHandler
                    );
	            }
	            if (window.requestFileSystem) {
	                init();
	            } else {
	                alert("Sorry! Your browser doesn't support the FileSystem API :(");
	            }
	        },
	        controller: function ($scope, $element) {
	            $scope.filesystem = null;
	            $scope.filename = '';
	            $scope.deleteFile = function () {
	                $scope.message = "Delete Start";
	                $scope.filesystem.root.getFile(
                        $scope.filename,
                        { create: false },
                        function (fileEntry) {
                            fileEntry.remove(function (e) {
                                $scope.listFiles();
                                $scope.message = "File deleted!";
                                $scope.$apply();
                            }, $scope.errorHandler);
                        },
                        $scope.errorHandler
                    );
	            };
	            $scope.loadFile = function () {
	                $scope.message = "Load Start";
	                $scope.filesystem.root.getFile(
                        $scope.filename,
                        {},
                        function (fileEntry) {
                            fileEntry.file(function (file) {
                                var reader = new FileReader();
                                reader.onload = function (e) {
                                    var _data = JSON.parse(this.result);
                                    $scope.content = _data;
                                    $scope.message = "File loaded!";
                                    $scope.$apply();
                                };
                                reader.readAsText(file);
                            }, $scope.errorHandler);
                        },
                        $scope.errorHandler
                    );
	            };
	            $scope.listFiles = function () {
	                $scope.message = "List Start";
	                var dirReader = $scope.filesystem.root.createReader();
	                var entries = [];
	                var fetchEntries = function () {
	                    dirReader.readEntries(function (results) {
	                        $scope.fileList = [];
	                        angular.forEach(results, function (result) {
	                            var _resultName = result.name;
	                            $scope.fileList.push(_resultName);
	                        });
	                        $scope.$apply();
	                    }, $scope.errorHandler);
	                };
	                fetchEntries();
	            };

	            $scope.errorHandler = function (error) {
	                $scope.message = error;
	                $scope.$apply();
	            };

	            $scope.assignFilename = function (fn) {
	                $scope.filename = fn;
	                $scope.loadFile();
	            };

	            $scope.saveFile = function () {
	                $scope.message = "Save Start";
	                $scope.filesystem.root.getFile(
                    $scope.filename,
                        { create: true },
                        function (fileEntry) {
                            fileEntry.createWriter(function (fileWriter) {
                                fileWriter.onwriteend = function (e) {
                                    $scope.listFiles();
                                    $scope.loadFile();
                                    $scope.message = "File saved!";
                                    $scope.$apply();
                                };

                                fileWriter.onerror = function (e) {
                                    console.log("Write error: " + e.toString());
                                    alert("An error occurred and your file could not be saved!");
                                };

                                var contentBlob = new Blob([JSON.stringify($scope.data)], {
                                    type: "text/plain"
                                });
                                fileWriter.write(contentBlob);
                            }, $scope.errorHandler);
                        },
                        $scope.errorHandler
                    );
	            };
	        },
	        template:
            "<input ng-model='filename' placeholder='Filename'></input><br/>" +

            "<button ng-click='saveFile()'>save</button>" +
            "<button ng-click='listFiles()'>list</button>" +
            "<button ng-click='loadFile()'>load</button>" +
            "<button ng-click='deleteFile()'>delete</button><br/>" +
             "<div class='{{buttonTemplate}} mighty-file-edit-button' ng-repeat='file in fileList' ng-click='assignFilename(file)'>{{file}}</div>"

	    };
	});


angular
	.module("mighty-awesome-file-edit", [])
	.directive("mightyAwesomeFileEdit", function ($timeout, $rootScope) {
	    return {
	        restrict: "EA",
	        scope: {
	            buttonTemplate: "=",
	            data: "=",
	            content: "=",
	            message: "="
	        },
	        link: function ($scope, element) {
	            window.requestFileSystem =
					window.requestFileSystem || window.webkitRequestFileSystem;
	            function init() {
	                navigator.webkitPersistentStorage.requestQuota(
						1024 * 1024 * 5,
						function (grantedSize) {
						    window.requestFileSystem(
								window.PERSISTENT,
								grantedSize,
								function (fs) {
								    $scope.filesystem = fs;
								    $scope.listFiles();
								},
								$scope.errorHandler
							);
						},
						$scope.errorHandler
					);
	            }
	            if (window.requestFileSystem) {
	                init();
	            } else {
	                alert("Sorry! Your browser doesn't support the FileSystem API :(");
	            }
	        },
	        controller: function ($scope, $element) {
	            $scope.filesystem = null;
	            $scope.filename = { name: '', fontAwesome: '' };
	            $scope.deleteFile = function () {
	                $scope.message = "Delete Start";
	                $scope.filesystem.root.getFile(
						$scope.filename.fontAwesome == '' ? $scope.filename.name : $scope.filename.name + "." + $scope.filename.fontAwesome,
						{ create: false },
						function (fileEntry) {
						    fileEntry.remove(function (e) {
						        $scope.listFiles();
						        $scope.message = "File deleted!";
						        $scope.$apply();
						    }, $scope.errorHandler);
						},
						$scope.errorHandler
					);
	            };

	            $scope.loadFile = function () {
	                $scope.message = "Load Start";
	                $scope.filesystem.root.getFile(
						$scope.filename.name + "." + $scope.filename.fontAwesome,
						{},
						function (fileEntry) {
						    fileEntry.file(function (file) {
						        var reader = new FileReader();
						        reader.onload = function (e) {
						            var _data = JSON.parse(this.result);
						            $scope.content = _data;
						            $scope.message = "File loaded!";
						            $scope.$apply();
						        };
						        reader.readAsText(file);
						    }, $scope.errorHandler);
						},
						$scope.errorHandler
					);
	            };

	            $scope.listFiles = function () {
	                $scope.message = "List Start";
	                var dirReader = $scope.filesystem.root.createReader();
	                var entries = [];
	                var fetchEntries = function () {
	                    dirReader.readEntries(function (results) {
	                        $scope.fileList = [];
	                        angular.forEach(results, function (result) {
	                            var _resultName = result.name;
	                            var _fa = _resultName.substring(_resultName.lastIndexOf(".") + 1);
	                            var _name = _resultName.substring(0, _resultName.length - _fa.length - 1);
	                            if (_name == '' || _name == undefined) {
	                                $scope.fileList.push({ name: _resultName, fontAwesome: '' });
	                            }
	                            else {
	                                $scope.fileList.push({ name: _name, fontAwesome: _fa });
	                            }
	                        });
	                        $scope.$apply();
	                    }, $scope.errorHandler);
	                };
	                fetchEntries();
	            };

	            $scope.errorHandler = function (error) {
	                $scope.message = error;
	                $scope.$apply();
	            };
	            $scope.assignFilename = function (fn) {
	                $scope.filename.name = fn.name;

	                $scope.filename.fontAwesome = fn.fontAwesome;
	                $scope.loadFile();
	            };
	            $scope.saveFile = function () {
	                $scope.message = "Save Start";

	                $scope.filesystem.root.getFile(
						// JSON.stringify($scope.filename),
						$scope.filename.fontAwesome == '' ? $scope.filename.name : $scope.filename.name + "." + $scope.filename.fontAwesome,
						{ create: true },
						function (fileEntry) {
						    fileEntry.createWriter(function (fileWriter) {
						        fileWriter.onwriteend = function (e) {
						            $scope.listFiles();
						            $scope.loadFile();
						            $scope.message = "File saved!";
						            $scope.$apply();
						        };

						        fileWriter.onerror = function (e) {
						            console.log("Write error: " + e.toString());
						            alert("An error occurred and your file could not be saved!");
						        };

						        var contentBlob = new Blob([JSON.stringify($scope.data)], {
						            type: "text/plain"
						        });
						        fileWriter.write(contentBlob);
						    }, $scope.errorHandler);
						},
						$scope.errorHandler
					);
	            };
	        },
	        template:
		"<input ng-model='filename.name' placeholder='Filename'></input><br/>" +
		"fa-<input ng-model='filename.fontAwesome' placeholder='Font Awesome'></input><br/>" +
			"<a href='http://fontawesome.io/cheatsheet/' target='_blank'>http://fontawesome.io/cheatsheet/</a><br/>" +
		"<button ng-click='saveFile()'>save</button>" +
		"<button ng-click='listFiles()'>list</button>" +
		"<button ng-click='loadFile()'>load</button>" +
		"<button ng-click='deleteFile()'>delete</button><br/>" +
	"<div class='mighty-file-edit-button' ng-repeat='file in fileList' ng-click='assignFilename(file)'><i class='fa fa-{{file.fontAwesome}}'></i>{{file.name}}</div>"
	    };
	});


