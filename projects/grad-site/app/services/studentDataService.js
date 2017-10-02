angular.module('GradSite').service('StudentDataService', function () {

    var students = [
        studentCTOR(1, "Max", "Cool guy. Number one super awesome person.",
            [studentImageCTOR("art1.png", "ART ART ART")]),
        studentCTOR(2, "Ashley Lindo", "Ashley Lindo is a representational oil painter based in South Florida and was born in Queens, New York to Jamaican parents.She attends Florida Atlantic University in Boca Raton where she will be receiving her BFA in Studio Art. My work reflects on subtle moments of everyday life through a journalistic approach.As a homebody and introvert, establishing a sentiment of home and security has been my automatic response to change and unfamiliarity.Within these intimate and often mundane moments, a sense of peace,             acceptance, and exploration is found.This is represented in portraits, objects, and interior spaces,             though when the sunlight embraces my subject is most prevalent.The warmth and light of the sun create the weightless energy of clarity and openness, while the darkness of doubt and insecurity     still remain.The desire to feel grounded is found in textured strokes of oil paint, also met by softer     qualities.",
            [
                studentImageCTOR("beam.png", "oil on canvas - lorem ipsum - 2017"),
                studentImageCTOR("lindo.png", "oil on canvas - lorem ipsum - 2017"),
                studentImageCTOR("smitty.png", "oil on canvas - lorem ipsum - 2017")
            ]),
        studentCTOR(3, "Student2", "awesome",
            [studentImageCTOR("art3.png", "ARRRRT")])
    ];

    function studentImageCTOR(_url, _desc) {
        return { url: "images/" + _url, desc: _desc };
    }

    function studentCTOR(_id, _name, _desc, _images) {
        return {
            id: _id,
            name: _name,
            info: { name: _name, desc: _desc },
            images: _images
        }
    }

    return {
        getStudentNames: function () {
            var result = Enumerable.from(students).select("x=>x.name").toArray();
            return result;
        },
        getStudentInfo: function (_studentID) {
            var result = Enumerable.from(students).where("x=>x.id==" + _studentID).select("x=>x.info").toArray()[0];
            return result;
        },
        getStudentImages: function (_studentID) {
            var result = Enumerable.from(students).where("x=>x.id==" + _studentID).selectMany("x=>x.images").toArray();
            return result;
        }
    }
});