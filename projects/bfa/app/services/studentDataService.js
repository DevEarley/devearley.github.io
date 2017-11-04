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
                studentImage("dicosola_1.png", "9 days a Pawn, Jane</br>2017</br>Installation</br>Textile, thread, chair</br>36”x 18’"),
                studentImage("dicosola_2.png", "Restrained Affection</br>2016</br>Wood, thread, joint compound"),
                studentImage("dicosola_3.png", "Self</br>2015</br>Human hair"),
                studentImage("dicosola_4.png", "Sono infatuato di colore rosso</br>2016</br>Steel, wood, textile, thread, animal bone and fiber </br>H:15.5” x W: 20” x D: 15.5”")
            ],
            studentProfileImage("Jordan")),
        student(3, "Maggie Pinkien", "<div>&nbsp;&nbsp;Maggie Pinkien is from Davie Florida and studies studio art at Florida Atlantic University. She is interested in painting, sculpture, and mixed media art, but mostly works with paint.Her other interests are animals, nature, and books and these themes are reflected in her art.</div>",
            [
                studentImage("maggie3.png", "Daylight</br>Size: 2 &#39; 18 & quot;</br>Materials: acrylic on canvas"),
                studentImage("maggie1.png", "Journey</br>Size: 2 &#39; 18 & quot;</br>Materials: Oil on canvas"),
                studentImage("maggie2.png", "In Memory of our Trees</br>Size: 2 &#39; 15 & quot;</br>Materials: bark, plaster, chicken wire, tulle fabric,</br>acrylic paint")
            ],
            studentProfileImage("Maggie")),
        student(4, "Florencia Soto", "<div>&nbsp;&nbsp;Florencia Soto is a Bachelor of Fine Arts student who currently resides in South Florida and has for the majority of her life.Florencia is of Peruvian descent and considers herself a Peruvian- American as she was raised with both cultures.Growing up in South Florida has given her the opportunity to explore her Latina ethnicity from a personal and external perspective.Her work focuses heavily on the South American culture of Peru and its neighboring countries.Their cultures have a large impact on her life as inspiration and influence.Her oil paintings evolved from traditional influences but are now transforming into abstract visions of her dreams and memories.Her visions encompass the Latino culture, which includes fruit, luxurious environments and the female figure in an attempt to inspire those unfamiliar with these topics and motifs.</div>",
            [
                studentImage("florencia2.png", "Seripiente,Guayaba y</br>Huayruro</br>Oil on wood panel</br>24 x 36”"),
                studentImage("florencia3.png", "Una tina llena de semillas</br>Oil on canvas</br>30x30”"),
                studentImage("florencia1.png", "Que captura</br>Oil on canvas</br>16 x 20”"),
                studentImage("florencia4.png", "Ella y la orquidea fantasma</br>Oil on wood panel</br>36 x 32”")
            ],
            studentProfileImage("Flo")),
        student(5, "Caitlin Nobil&#233;", "<div>&nbsp;&nbsp;Caitlin Nobilé is a contemporary painter approaching her BFA in Studio Art. Her work has been shown at The Studios of Key West, Wynwood Warehouse Project, C&I Studios, FAU’s Ritter Gallery and the Jaffe Center for Book Arts. Caitlin lives and works out of Boca Raton, FL.</br>At once pleasant, eerie, trite and cute, the world enveloped in my  paintings is a dwelling place where the comfort of the perceptual world is met with the paralyzing horror of what is unknown.The paintings, primarily acrylic on wood panel, create translucent dream- like environments where ritualistic, superstitious, and apparitional enactments unfold; symbolic tropes of humanity’s historical attempts to make sense of our world.  </div>",
            [
                studentImage("caitlinnobile2.png", "The details, 2017</br>Acrylic on wood</br>12 x 16 in</br>"),
                studentImage("caitlin4.jpg", "dwellingplace, 2017</br>Acrylic on wood</br>24 x 30 in</br>"),
                studentImage("caitlinnobile3.png", "glimpse, 2017</br>Acrylic on wood</br>9 x 12 inches"),
                studentImage("caitlinnobile1.png", "Sisters, 2017</br>Acrylic on wood </br>9 x 12 inches")
            ], studentProfileImage("Cait")),
        student(6, "Giovanny Lopez", "<div>&nbsp;&nbsp;I was born in Colombia and arrived in the United States at the age of 7. Since then I’ve been raised by my mother and sister my two biggest influences.I have been at Florida Atlantic University for the past several years and finally finding out what I want to do for my career,         which is painting.I will be graduating Florida Atlantic University with a BFA in studio art in the     Fall of 2017. I am currently a full- time student at the moment.My art consistently focuses on     the emotions of people and I work with geometric shapes, vibrant colors and patterns.</div>",
            [
                studentImage("gio1.jpg", "Adrian</br> 20x20 canvas.</br>Acrylic, 2017."),
                studentImage("gio2.jpg", "Cristalann</br>20x20 canvas.</br>Acrylic, 2017."),
                studentImage("gio3.jpg", "Felicia</br> 20x20 canvas.</br>Acrylic, 2017."),
                studentImage("gio4.jpg", "Gabe</br>20x20 canvas.</br>Acrylic, 2017."),
                studentImage("gio5.jpg", "Gaby</br>20x20 canvas.</br>Acrylic, 2017."),
                studentImage("gio6.jpg", "Jacari</br>20x20 canvas.</br>Acrylic, 2017."),
                studentImage("gio7.jpg", "Mairim</br>20x20 canvas.</br>Acrylic, 2017."),
                studentImage("gio8.jpg", "Mark</br>20x20 canvas.</br>Acrylic, 2017."),
                studentImage("gio9.jpg", "Rhonda</br>20x20 canvas.</br>Acrylic, 2017."),
                studentImage("gio10.jpg", "Xander</br>20x20 canvas.</br>Acrylic, 2017."),
                studentImage("gio11.jpg", "Trisha</br>20x20 canvas.</br>Acrylic, 2017."),
                studentImage("gio12.jpg", "Rudy</br>20x20 canvas.</br>Acrylic, 2017."),
                studentImage("gio_full.png", "20x20 canvas.</br>Acrylic, 2017.")
            ],
            studentProfileImage("Gio")),
        student(7, "Tayler Macy", "<div>&nbsp;&nbsp;My first influence in art came from my Grandmother. When I was growing up, she had a garage full of paints and supplies for me to use at my disposal. From then on, I was constantly involved with making all types of art. When I discovered printmaking in college, I was drawn to the unfamiliar techniques, and the results that the process could achieve. My subject matter has always been geared towards nature and animals that coincide with my surroundings. Currently, my fundamental practice deals with the ocean and all the life within it. I am inspired by the ocean’s natural beauty and majestic qualities that it possesses. The goal of my work is to emphasize life’s simple pleasures.</div>",
            [
                studentImage("tayler1.png", "Mahi 16 x 19 Woodblock 2017"),
                studentImage("tayler2.png", "Queen 11 x 17 Woodblock 2016"),
                studentImage("tayler3.png", "Flamingo 14.5 x 9 Woodblock 2017"),
                studentImage("tayler4.png", "Gila Bend 14 x 20 Woodblock 2017")
            ],
            studentProfileImage("Tayler")),
        student(8, "Max Kagno", "<div>&nbsp;&nbsp;Max Kagno is a South Florida based artist getting his Bachelors of Fine Arts degree at FAU with a focus in printmaking. He works in various forms of print, including: woodblock, silkscreen, and copper plate etching. Using these different forms, he creates works commercially and for fine art. His main concept focuses around conveying personalities of people he gets to know using their body to describe them without their face. He prefers to take all his own reference photos for each piece he makes. Max’s works have been on display in the Juried Student Exhibition at FAU. He has also live printed tee-shirts with his woodblocks at events around South Florida as president of FAU’s Print Club president.</div>",
            [
                studentImage("max1.png", "Ash Monoprint Series #9</br> Silkscreen, charcoal, paint </br> 8\" x 10\" per print</br> 2017"),
                studentImage("max2.png", "See and Taste</br> Woodblock</br> 32\" x 47\" per block</br> 2017"),
                studentImage("max4.png", "That Time of the Month</br>Silskscreen</br>12\" x 18\"</br>2017"),
                studentImage("max3.png", "Self-Portrait</br>Silkscreen reduction</br>11\" x 15\"</br>2017")
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