angular.module('GradSite').service('StudentDataService', function () {

    var students = [
        studentCTOR(1,"Max", "Cool guy. Number one super awesome person.", [studentImageCTOR("art1.png", "ART ART ART")]),
        studentCTOR(2,"Student1", "cool", [studentImageCTOR("art2.png", "ARTTTTT")]),
        studentCTOR(3,"Student2", "awesome", [studentImageCTOR("art3.png", "ARRRRT")])
    ];

    function studentImageCTOR(_url, _desc) {
        return { url:"images/"+ _url, desc: _desc };
    }

    function studentCTOR(_id,_name, _desc, _images) {
        return {
            id:_id,
            info: { name: _name, desc: _desc },
            images: _images
        }
    }

    return {
        getStudentNames: function () {
           return Enumerable.from(students).select("x=>x.id").toArray();
        },
        getStudentInfo: function (_studentID) {
            return students[_studentID].info;
        },
        getStudentImages: function (_studentID) {
            return students[_studentID].images;
        }
    }
});