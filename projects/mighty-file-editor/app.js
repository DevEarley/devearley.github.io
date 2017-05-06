/***DEMO LOGIC******/
angular
	.module("MightyFileEditApp", ["mighty-file-edit", "mighty-awesome-file-edit"])
	.config(function () { })
	.run(function ($rootScope, $http) { });

angular
	.module("MightyFileEditApp")
	.controller("MFEController", function MFEController($scope, $rootScope) {
	    var vm = this;
	    vm.ButtonTemplate = "custom-class";
	});

angular
	.module("MightyFileEditApp")
	.controller("MAFEController", function MAFEController($scope, $rootScope) {
	    var vm = this;
	});

angular
	.module("mighty-file-edit", [])
	.directive("mightyFileEdit", function ($timeout, $rootScope) {
	    return {
	        restrict: "EA",
	        scope: {
	            buttonTemplate: "=",
	            data: "=",
	            message: "="
	        },
	        link: function ($scope, $element) {
	            window.requestFileSystem =
                    window.requestFileSystem || window.webkitRequestFileSystem;
	            function init() {
	                navigator.webkitPersistentStorage.requestQuota(
                        1024 * 1024 * 5,
                        function (_grantedSize) {
                            window.requestFileSystem(
                                window.PERSISTENT,
                                _grantedSize,
                                function (_fs) {
                                    $scope.filesystem = _fs;
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
	            $rootScope.$watch('fileList', function (_data) {
	                if ($scope.filesystem == null) return;
	                $scope.listFiles();
	            });

	            $scope.filesystem = null;
	            $scope.filename = '';

	            $scope.deleteFile = function () {
	                $scope.message = "Delete Start";
	                $scope.filesystem.root.getFile(
                        $scope.filename,
                        { create: false },
                        function (_fileEntry) {
                            _fileEntry.remove(function (_event) {
                                $scope.listFiles();
                                $scope.message = "File deleted!";
                                $scope.filename = "";
                                $scope.data = "";
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
                        function (_fileEntry) {
                            _fileEntry.file(function (_file) {
                                var reader = new FileReader();
                                reader.onload = function (_event) {
                                    var _data = JSON.parse(this.result);
                                    $scope.data = _data;
                                    $scope.message = "File loaded!";
                                    $scope.$apply();
                                };
                                reader.readAsText(_file);
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
	                    dirReader.readEntries(function (_results) {
	                        $scope.fileList = [];
	                        angular.forEach(_results, function (_result) {
	                            $scope.fileList.push(_result.name);
	                            //$rootScope.fileList = $scope.fileList;
	                        });
	                        $scope.$apply();
	                    }, $scope.errorHandler);
	                };
	                fetchEntries();
	            };

	            $scope.errorHandler = function (_error) {
	                $scope.message = _error;
	                $scope.$apply();
	            };

	            $scope.assignFilename = function (_filename) {
	                $scope.filename = _filename;
	                $scope.loadFile();
	            };

	            $scope.saveFile = function () {
	                $scope.message = "Save Start";
	                $scope.filesystem.root.getFile(
                    $scope.filename,
                        { create: true },
                        function (_fileEntry) {
                            _fileEntry.createWriter(function (_fileWriter) {
                                _fileWriter.onwriteend = function (_event) {
                                    $scope.listFiles();
                                    $rootScope.fileList = $scope.fileList;
                                    $scope.loadFile();
                                    $scope.message = "File saved!";
                                    $scope.$apply();
                                };

                                _fileWriter.onerror = function (_event) {
                                    console.log("Write error: " + _event.toString());
                                    alert("An error occurred and your file could not be saved!");
                                };

                                var _contentBlob = new Blob([JSON.stringify($scope.data)], {
                                    type: "text/plain"
                                });
                                _fileWriter.write(_contentBlob);
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
             "<div class='{{buttonTemplate}} mighty-file-edit-button'" +
             " ng-repeat='file in fileList' ng-click='assignFilename(file)'>{{file}}</div>" };
	});

angular
	.module("mighty-awesome-file-edit", [])
	.directive("mightyAwesomeFileEdit", function ($timeout, $rootScope) {
	    return {
	        restrict: "EA",
	        scope: {
	            buttonTemplate: "=",
	            data: "=",
	            message: "="
	        },

	        link: function ($scope, $element) {
	            window.requestFileSystem =
					window.requestFileSystem || window.webkitRequestFileSystem;

	            function init() {
	                navigator.webkitPersistentStorage.requestQuota(
						1024 * 1024 * 5,
						function (_grantedSize) {
						    window.requestFileSystem(
								window.PERSISTENT,
								_grantedSize,
								function (_filesystem) {
								    $scope.filesystem = _filesystem;
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
	            $rootScope.$watch('fileList', function (_data) {
	                if ($scope.filesystem == null) return;
	                $scope.listFiles();
	            });

	            $scope.deleteFile = function () {
	                $scope.message = "Delete Start";
	                $scope.filesystem.root.getFile(
						$scope.filename.fontAwesome == ''
                        ? $scope.filename.name : $scope.filename.name + "." + $scope.filename.fontAwesome,
						{ create: false },
						function (_fileEntry) {
						    _fileEntry.remove(function (_event) {
						        $scope.listFiles();
						        $scope.message = "File deleted!";
						        $scope.filename = "";
						        $scope.data = "";
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
						function (_fileEntry) {
						    fileEntry.file(function (_file) {
						        var _reader = new FileReader();
						        _reader.onload = function (_event) {
						            var _data = JSON.parse(this.result);
						            $scope.data = _data;
						            $scope.message = "File loaded!";
						            $scope.$apply();
						        };
						        _reader.readAsText(_file);
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
	                    dirReader.readEntries(function (_results) {
	                        $scope.fileList = [];
	                        angular.forEach(_results, function (_result) {
	                            var _resultName = _result.name;
	                            var _fontAwesome = _resultName.substring(_resultName.lastIndexOf(".") + 1);
	                            var _name = _resultName.substring(0, _resultName.length - _fontAwesome.length - 1);
	                            if (_name == '' || _name == undefined) {
	                                $scope.fileList.push({ name: _resultName, fontAwesome: '' });

	                            }
	                            else {
	                                $scope.fileList.push({ name: _name, fontAwesome: _fontAwesome });
	                            }

	                          //  $rootScope.fileList = $scope.fileList;
	                        });
	                        $scope.$apply();
	                    }, $scope.errorHandler);
	                };
	                fetchEntries();
	            };

	            $scope.errorHandler = function (_error) {
	                $scope.message = _error;
	                $scope.$apply();
	            };

	            $scope.assignFilename = function (_filename) {
	                $scope.filename.name = _filename.name;
	                $scope.filename.fontAwesome = _filename.fontAwesome;
	                $scope.loadFile();
	            };

	            $scope.saveFile = function () {
	                $scope.message = "Save Start";
	                $scope.filesystem.root.getFile(
						$scope.filename.fontAwesome == '' ? $scope.filename.name : $scope.filename.name + "." + $scope.filename.fontAwesome,
						{ create: true },
						function (_fileEntry) {
						    _fileEntry.createWriter(function (_fileWriter) {
						        _fileWriter.onwriteend = function (_event) {
						            $scope.listFiles();
						            $rootScope.fileList = $scope.fileList;
						            $scope.loadFile();
						            $scope.message = "File saved!";
						            $scope.$apply();
						        };
						        _fileWriter.onerror = function (_event) {
						            console.log("Write error: " + _event.toString());
						            alert("An error occurred and your file could not be saved!");
						        };

						        var _contentBlob = new Blob([JSON.stringify($scope.data)], {
						            type: "text/plain"
						        });
						        _fileWriter.write(_contentBlob);
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


