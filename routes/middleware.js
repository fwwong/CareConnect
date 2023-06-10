const url = require('url');

module.exports = (req, res, next) => {
    res.locals.navLinks = navLinks;
    res.locals.path = url.parse(req.url).pathname;
    next();
};

const navLinks = [{
    name: 'Home',
    link: '/home', 
    icon: 'fa-solid fa-house',
},
{
    name: 'Find a Clinic',
    link: '/map',
    icon: 'fa solid fa-location-dot fa-lg',
},
{
    name: 'Ask a health professional',
    link: '/professional',
    icon: 'fa solid fa-user-doctor',
},
{
    name: 'About Us',
    link: '/about',
    icon: 'fa solid fa-info-circle',
},
{
    name: 'FAQ',
    link: '/faq',
    icon: 'fa solid fa-question-circle',
},
{
    name: 'Contact Us',
    link: '/contact',
    icon: 'fa solid fa-envelope',
},
{
    name: 'Language',
    link: '/language',
    icon: 'fa solid fa-universal-access',
}
];

//console.log(navLinks.length)
// console.log(navLinks[1].name)

