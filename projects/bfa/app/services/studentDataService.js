angular.module('GradSite').service('StudentDataService', function () {

    var students = [
        student(1, "Ashley Lindo", "<div>&nbsp;&nbsp;Ashley Lindo is a representational oil painter based in South Florida and was born in Queens, New York to Jamaican parents.She attends Florida Atlantic University in Boca Raton where she will be receiving her BFA in Studio Art. </div><div> &nbsp;&nbsp;My work reflects on subtle moments of everyday life through a journalistic approach.As a homebody and introvert, establishing a sentiment of home and security has been my automatic response to change and unfamiliarity.Within these intimate and often mundane moments, a sense of peace,             acceptance, and exploration is found.This is represented in portraits, objects, and interior spaces,             though when the sunlight embraces my subject is most prevalent.The warmth and light of the sun create the weightless energy of clarity and openness, while the darkness of doubt and insecurity     still remain.The desire to feel grounded is found in textured strokes of oil paint, also met by softer     qualities.</div>",
            [
                studentImage("ashley3.png", "Smitty,</br> 2017 Oil on canvas</br> 12\" x 16\""),
                studentImage("ashley1.png", "Beam,</br> 2017 Oil on panel</br> 3\" x 3\""),
                studentImage("ashley2.png", "Aunty Annette’s,</br> 2017 Oil on panel</br> 11\"x 14\"")
            ],
            studentProfileImage("Ashley")),
        student(2, "Jordan DiCosola", "<div>&nbsp;&nbsp;Jordan DiCosola, native Floridian and graduate from Florida Atlantic University with a BFA degree in Studio Art majoring in sculpture, creates work that encompasses the intercommunicated relationships within maker, object, and viewer.Utilizing a variety of materials being textile, wood, and human hair, she intricately dimensionalizes an invisible language.She is highly influenced by conceptual sculptors such as Sheila Hicks and Doris Salcedo in regards to the importance of research, writing, process, and the act of making.DiCosola has shown some of her works in exhibitions such as the Juried Student Exhibitions at Florida Atlantic University and the Mark My Words Exhibition at the Cultural Council in Palm Beach County.</div>",
            [
                studentImage("dicosola_1.png", "2017"),
                studentImage("dicosola_2.png", "2017"),
                studentImage("dicosola_3.png", "2017"),
                studentImage("dicosola_4.png", "2017")
            ],
            studentProfileImage("Jordan")),
        student(3, "Maggie Pinkien", "<div>&nbsp;&nbsp;Maggie Pinkien is from Davie Florida and studies studio art at Florida Atlantic University. She is interested in painting, sculpture, and mixed media art, but mostly works with paint.Her other interests are animals, nature, and books and these themes are reflected in her art.</div>",
            [
                studentImage("maggie1.png", "2017"),
                studentImage("maggie2.png", "2017"),
                studentImage("maggie3.png", "2017")
            ],
            studentProfileImage("Maggie")),
        student(4, "Florencia Soto", "<div>&nbsp;&nbsp;Florencia Soto is a Bachelor of Fine Arts student who currently resides in South Florida and has for the majority of her life.Florencia is of Peruvian descent and considers herself a Peruvian- American as she was raised with both cultures.Growing up in South Florida has given her the opportunity to explore her Latina ethnicity from a personal and external perspective.Her work focuses heavily on the South American culture of Peru and its neighboring countries.Their cultures have a large impact on her life as inspiration and influence.Her oil paintings evolved from traditional influences but are now transforming into abstract visions of her dreams and memories.Her visions encompass the Latino culture, which includes fruit, luxurious environments and the female figure in an attempt to inspire those unfamiliar with these topics and motifs.</div>",
            [
                studentImage("florencia1.png", "2017"),
                studentImage("florencia2.png", "2017"),
                studentImage("florencia3.png", "2017"),
                studentImage("florencia4.png", "2017")
            ],
            studentProfileImage("Flo")),
        student(5, "Caitlin Nobil&#233;", "<div>&nbsp;&nbsp;</div>",
            [
                studentImage("caitlinnobile1.png", "2017"),
                studentImage("caitlinnobile2.png", "2017"),
                studentImage("caitlinnobile3.png", "2017"),
                studentImage("caitlinnobile4.png", "2017")
            ], studentProfileImage("Cait")),
        student(6, "Giovanny Lopez", "<div>&nbsp;&nbsp;I was born in Colombia and arrived in the United States at the age of 7. Since then I’ve been raised by my mother and sister my two biggest influences.I have been at Florida Atlantic University for the past several years and finally finding out what I want to do for my career,         which is painting.I will be graduating Florida Atlantic University with a BFA in studio art in the     Fall of 2017. I am currently a full- time student at the moment.My art consistently focuses on     the emotions of people and I work with geometric shapes, vibrant colors and patterns.</div>",
            [
                studentImage("gio_full.png", "2017")
            ],
            studentProfileImage("Gio")),
        student(7, "Tayler Macy", "<div>&nbsp;&nbsp;</div>",
            [
                studentImage("tayler_full.png", "2017")
            ],
            studentProfileImage("Tayler")),
        student(8, "Max Kagno", "<div>&nbsp;&nbsp;</div>",
            [
                studentImage("gio_full.png", "2017")
            ],
            studentProfileImage("Max")),
    ];

    function studentImage(_url, _desc) {
        return { url: "images/" + _url, desc: _desc };
    }
    function studentProfileImage(_url) {
        return { url: "images/profiles/" + _url + ".png" };
    }

    function student(_id, _name, _desc, _images, _profile) {
        return {
            id: _id,
            name: _name,
            info: { name: _name, desc: _desc, profile: _profile },
            images: _images,
           
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