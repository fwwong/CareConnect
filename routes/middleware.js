const url = require('url');

module.exports = (req, res, next) => {
    res.locals.navLinks = navLinks;
    res.locals.path = url.parse(req.url).pathname;
    next();
};

const navLinks = [{
    name: 'Home',
    link: '/home', 
    icon: 'home',
},
{
    name: 'Find a Clinic',
    link: '/map',
    icon: 'info',
},
{
    name: 'Ask a health professional',
    link: '/professional',
    icon: 'info',
},
{
    name: 'About Us',
    link: '/about',
    icon: 'info',
},
{
    name: 'FAQ',
    link: '/faq',
    icon: 'info',
},
{
    name: 'Contact Us',
    link: '/contact',
    icon: 'info',
},
{
    name: 'Language',
    link: '/language',
    icon: 'info',
}
];

//console.log(navLinks.length)
// console.log(navLinks[1].name)
