
/* GET 'about us' page */
module.exports.about = function(req, res) {
    res.render('generic-text', {
        title: 'About Real Meal',
        content: 'An explination of this is pending...'});
};
