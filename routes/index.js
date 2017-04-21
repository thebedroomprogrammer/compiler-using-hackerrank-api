var express = require('express');
var router = express.Router();
var hackerRank = require('machinepack-hackerrank');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {language:"1",langCode:"c_cpp"});
});

router.post('/compile', function(req, res, next) {

hackerRank.submit({
	apiKey: 'PLACE YOUR API KEY HERE',
	source: req.body.source,
	language: parseInt(req.body.language),
	testcases: JSON.parse(req.body.input),
	wait: true,
	callbackUrl: '',
	format: 'json',
	}).exec({
// An unexpected error occurred.
	error: function (err) {
		throw err;
	},
// OK.
	success: function (response) {
 	console.log(response)
	 res.json(response);
	},
	});

});

router.get('/changelang/:langCode/:language', function(req, res, next) {
var language = req.params.language.trim();
var langCode = req.params.langCode.trim();

res.render('index',{language:language,langCode:langCode});

});

module.exports = router;
