var team_members = [
    //Todo maybe use an int as a in position reference to a position and the later turn it into text
    {
        id: 0,
        name: "Ashley Renne",
        position: "Director, Founder",
        what_i_do: "As a director I work across Trunk to  align vision and team culture into a cohesive whole.",
        why_im_here: "To discover and build the best culture and products on the planet.",
        my_quote: "Embrace complexity",
        onClick: function (evt) {
            showModal(0);
        },
        image: "https://merged-ray.herokuapp.com/image?code=team/ashleyClearThumbBW.png"
    },
    {
        id: 1,
        name: "Ben White",
        position: "Director, Founder",
        what_i_do: "",
        why_im_here: "",
        my_quote: "",
        onClick: function (evt) {
            showModal(1);
        },
        image: "https://merged-ray.herokuapp.com/image?code=team/benwhiteClearThumb.png"
    }, {
        id: 2,
        name: "Justin Watts",
        position: "Director of Marketing",
        what_i_do: "As the director of Marketing at Trunk I am always on the look out for ways that we can reach the people who our products are going to help.",
        why_im_here: "Trunk has the ability to build amazing products and turn things around that are practical, revolutionary and can help people from all different disciplines. I get excited about creating stuff - not talking about it and Trunk has the right team, philosophy and method to make things happen.",
        my_quote: "“Build, measure, learn” - Eric Reis",
        onClick: function (evt) {
            showModal(2);
        },
        image: "https://merged-ray.herokuapp.com/image?code=team/justinwattsClearThumbBW.png"
    }, {
        id: 3,
        name: "Nava Mahdavi",
        position: "Director",
        what_i_do: "I am committed to creating focus on our core business, removing unnecessary operational burden to allow the flow of true innovation.",
        why_im_here: "I see a great opportunity to deliver great product with an outstanding team.",
        my_quote: "Strive for perfection",
        onClick: function (evt) {
            showModal(3);
        },
        image: "https://merged-ray.herokuapp.com/image?code=team/navaClearThumbBW.png"
    }, {
        id: 4,
        name: "Tim Kotsiakos",
        position: "Creative Director & Founder of Mass",
        what_i_do: "I will be dedicated 24 hrs per week working with you guys to make Trunk / Apmasphere the best possible UX/UI.",
        why_im_here: "I’m really excited about being part of designing a great digital product.",
        my_quote: "“Good design is as little design as possible” — Dieter Rams.",
        onClick: function (evt) {
            showModal(4);
        },
        image: "https://merged-ray.herokuapp.com/image?code=team/timkotsiakosClearThumbBW.png"
    }, {
        id: 5,
        name: "Pat Mifsud",
        position: "Designer",
        what_i_do: "I move words and pictures around on a screen in an effort to make them look good and communicate well.",
        why_im_here: "Trunk has a great workplace culture, it’s hard not to be enthusiastic about the product and goals of the team, you’re contributing to a great project.",
        my_quote: "“It is far better to adapt the technology to the user than to force the user to adapt to the technology.” — Larry Marine",
        onClick: function (evt) {
            showModal(5);
        },
        image: "https://merged-ray.herokuapp.com/image?code=team/patClearThumbBW.png"
    }, {
        id: 6,
        name: "Evgeny Dudin",
        position: "Lead Software Engineer CBO (Chief Beard Officer)",
        what_i_do: "When I am not pair programming with other engineers, you can see me floating around the office helping others solving technical problems and blockers, bouncing ideas on how to design and build things.",
        why_im_here: "Our People. They are absolutely fantastic to work with. On top of that, flat structure and great technology makes it even more exciting!",
        my_quote: "“Optimism is an occupational hazard of programming: feedback is the treatment. “ --Kent Beck",
        onClick: function (evt) {
            showModal(6);
        },
        image: "https://merged-ray.herokuapp.com/image?code=team/evgenyClearThumbBW.png"
    }, {
        id: 7,
        name: "Yun Zhi Lin",
        position: "Senior Software Engineer (Wizard & Fashion Injector)",
        what_i_do: "I bring heartfelt corporate lessons on how not to do things, and proven open source solutions on how to do things. Most mornings I also act as an initiator or opinionator for discussions.",
        why_im_here: "Trunk empowers everyone to explore and turn ideas into reality. No BS means the only limit is yourself really.",
        my_quote: "“There is no shortcut to anyplace worth going” - Beverly Sills",
        onClick: function (evt) {
            showModal(7);
        },
        image: "https://merged-ray.herokuapp.com/image?code=team/yunClearThumbBW.png"
    }, {
        id: 8,
        name: "Thomas Wolle",
        position: "Senior Software Engineer",
        what_i_do: "Software - components, services, features.",
        why_im_here: "Awesome team. Awesome opportunity to make the world a better place.",
        my_quote: "“Science is what we understand well enough to explain to a computer. Art is everything else we do.” --- Donald E. Knuth",
        onClick: function (evt) {
            showModal(8);
        },
        image: "https://merged-ray.herokuapp.com/image?code=team/thomasClearThumbBW.png"
    }, {
        id: 9,
        name: "Daniel Theodosius",
        position: "Software Engineer ",
        what_i_do: "I am jumping across technologies to help the team to achieve the goal and to help people to develop.",
        why_im_here: "I am working at trunk to challenge and improve myself by using a lot of varieties of technologies.",
        my_quote: "When you think you know everything, look up to other people and you will realise that you know nothing",
        onClick: function (evt) {
            showModal(9);
        },
        image: "https://merged-ray.herokuapp.com/image?code=team/danielClearThumbBW.png"
    }, {
        id: 10,
        name: "Callum Gardner",
        position: "Junior Software Engineer",
        what_i_do: "Eat. Sleep. Code. Repeat. (We’re full-stack developers.)",
        why_im_here: "Trunk is a lean team of overachievers free of bureaucracy and office politics. We’re here to write code, not reports!",
        my_quote: "“If things aren’t failing, you’re not innovating enough.” -- Elon Musk",
        onClick: function (evt) {
            showModal(10);
        },
        image: "https://merged-ray.herokuapp.com/image?code=team/callumClearThumbBW.png"
    }, {
        id: 11,
        name: "Chanthu Shamsu",
        position: "Software Engineer",
        what_i_do: "As an engineer, I work on a variety of projects ranging from frontend, backend and infrastructure",
        why_im_here: "I’m working at Trunk to work as a team to help deliver great products using the latest technology while learning something new everyday",
        my_quote: "“I think that my biggest attribute to any success that I have had is hard work. There really is no substitute for working hard.” -- Maria Bartiromo",
        onClick: function (evt) {
            showModal(11);
        },
        image: "https://merged-ray.herokuapp.com/image?code=team/chanthuClearThumbBW.png"
    }, {
        id: 12,
        name: "Lee Zhao",
        position: "Junior Software Engineer",
        what_i_do: "Together with a team I like very much, create innovative technology solutions",
        why_im_here: "To do what I have wished to do. To fulfill my dream",
        onClick: function (evt) {
            showModal(12);
        },
        image: "https://merged-ray.herokuapp.com/image?code=team/placeholderProfile.png"
    }, {
        id: 13,
        name: "Denis Strygin",
        position: "Junior Software Engineer",
        onClick: function (evt) {
            showModal(13);
        },
        image: "https://merged-ray.herokuapp.com/image?code=team/placeholderProfile.png"
    }, {
        id: 14,
        name: "Erica Rosalina",
        position: "Junior Software Engineer",
        onClick: function (evt) {
            showModal(14);
        },
        image: "https://merged-ray.herokuapp.com/image?code=team/placeholderProfile.png"
    },
    {
        id: 15,
        name: "Sherry Wang",
        position: "Business Engineer",
        what_i_do: "I support people to do their best thinking and practice, aiming to cultivate a world-class self-organizing team.",
        why_im_here: "Trunk gives me every opportunity I dreamed of. I couldn’t express how proud and lucky I am to work among these bright people!",
        my_quote: "Working software is the primary measure of progress.",
        onClick: function (evt) {
            showModal(15);
        },
        image: "https://merged-ray.herokuapp.com/image?code=team/sherryClearThumbBW.png"
    }
];

function loadTeamMembers() {
    console.log('loading team members');
    setTimeout(function () {
        var engineers = document.getElementById("team-slider1");
        var directors = document.getElementById("team-directors-slider");

        team_members.forEach(function (item) {
            var div0 = document.createElement("div");
            div0.className = "col-md-12";

            var div1 = document.createElement("div");
            div1.className = "profile";

            var div2 = document.createElement("div");
            div2.className = "profile-photo";

            var a = document.createElement("a");
            a.onclick = item.onClick;


            var div3 = document.createElement("div");
            div3.className = "director-title";

            var image = document.createElement("img");
            image.src = item.image;

            var h = document.createElement("h3");
            h.innerHTML = item.name;

            var p = document.createElement("p");
            p.innerHTML = item.position;

            div3.appendChild(h);
            div3.appendChild(p);

            div2.appendChild(image);
            a.appendChild(div2);
            div1.appendChild(a);
            div1.appendChild(div3);
            div0.appendChild(div1);

            if (strContains(item.position, "Director")) {
                try {
                    directors.appendChild(div0);
                } catch (e) {
                }
            } else {
                try {
                    engineers.appendChild(div0);
                } catch (e) {
                }
            }
        });
    }, 1000)
}

function getTeamMemberById(id) {
    console.log("getting team member > " + id);
    var obj;
    team_members.forEach(function (item) {
        if (id === item.id) {
            console.log("checking>");
            console.dir(item);
            obj = item;
        }
    });
    return obj;
}


function showModal(id) {
    var data = getTeamMemberById(id);

    document.getElementById("name").innerHTML = data.name;
    document.getElementById("modal_profile_photo").src = data.image;
    document.getElementById("position").innerHTML = data.position;

    if (data.what_i_do) {
        document.getElementById("what_i_do").innerHTML = data.what_i_do;
    } else {
        document.getElementById("h4_0").visibility = "hidden";
        document.getElementById("what_i_do").visibility = "hidden";
    }

    if (data.why_im_here) {
        document.getElementById("why_im_here").innerHTML = data.why_im_here;
    } else {
        document.getElementById("h4_1").visibility = "hidden";
        document.getElementById("why_im_here").visibility = "hidden";
    }

    if (data.my_quote) {
        document.getElementById("my_quote").innerHTML = data.my_quote;
    } else {
        document.getElementById("h4_2").visibility = "hidden";
        document.getElementById("my_quote").visibility = "hidden";
    }

    disableScroll();
    window.open('#modal_dialog', '_self');
}

function strContains(str, content) {
    try {
        return str.indexOf(content) > -1;
    } catch (err) {

    }
    return false;
}