/**
 * UserController
 *
 * @module      :: Controller
 * @description	:: A set of functions called `actions`.
 *
 *                 Actions contain code telling Sails how to respond to a certain type of request.
 *                 (i.e. do stuff, then send some JSON, show an HTML page, or redirect to another URL)
 *
 *                 You can configure the blueprint URLs which trigger these actions (`config/controllers.js`)
 *                 and/or override them with custom routes (`config/routes.js`)
 *
 *                 NOTE: The code you write here supports both HTTP and Socket.io automatically.
 *
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

module.exports = {
	"new": function(req, res) {
		res.view();
	},
	/*
	 * Action blueprints:
	 *    `/user/index`
	 *    `/user`
	 */
	index: function(req, res, next) {
		console.log("index action reached");
		User.find(function findUsers(err, users) {
			if (err) return next(err);
			console.log(users);
			res.view({
				users: users
			});
		});
	},


	/**
	 * Action blueprints:
	 *    `/user/create`
	 
	create: function(req, res, next) {

		User.create(req.params.all(), function userCreated(err, user) {
			if (err) {
				console.log(err);
				req.session.flash = {
					err: err
				}
				return res.redirect("user/new");

			}
			res.redirect("/user/show/" + user.id);

		});

	},


	//show the user view
	show: function(req, res, next) {
		console.log(req.params['id']);
		User.findOne(req.params['id'], function findUser(err, user) {
			if (err) return next(err);
			if (!user) return next();
			res.view({
				user: user
			});
		})
	},

	/**
	 * Action blueprints:
	 *    `/user/update`
	 */
	update: function(req, res, next) {

		var userObj = {
			name: req.param('name'),
			title: req.param('title'),
			email: req.param('email'),
			admin: req.param('admin')
		};

		console.log(req.params['id']);

		User.findOne(req.params.id).done(function(err, user) {
			user.name = req.params.name;
		})

		User.update(
			req.param['id'], userObj, function userUpdate(err, user) {
				if (err) {
					return res.redirect('/user/edit/' + req.params['id']);
				}
				res.redirect('/user/show/' + req.params['id']);
			});
		console.log("User has been updated");
	},


	//edit the user
	edit: function(req, res, next) {
		//find the user via the id
		User.findOne(req.params.id, function findUser(err, user) {
			if (err) return next(err);
			if (!user) return next("User doesn\'t exists.")
			// Send a JSON response
			return res.view({
				user: user
			});
		});
	},


	/**
	 * Action blueprints:
	 *    `/user/delete`
	 */
	delete: function(req, res) {

		// Send a JSON response
		return res.json({
			hello: 'world'
		});
	},


	/**
	 * Action blueprints:
	 *    `/user/search`
	 */
	search: function(req, res) {

		// Send a JSON response
		return res.json({
			hello: 'world'
		});
	},



	/**
	 * Overrides for the settings in `config/controllers.js`
	 * (specific to UserController)
	 */
	_config: {}


};