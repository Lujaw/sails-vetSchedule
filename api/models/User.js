/**
 * User
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 *
 */

module.exports = {

	migrate: 'alter',
	attributes: {

		name: {
			type: 'STRING',
			required: true
		},

		password: {
			type: 'STRING',
			required: true
		},

		email: {
			type: 'STRING',
			required: true
		},

		address: {
			type: 'STRING',
			// required: true
		},

		type: {
			type: 'STRING',
			required: true,
			defaultsTo: "normal"
		}

	}

};