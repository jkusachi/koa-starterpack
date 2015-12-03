'use strict';

var bookshelf = require('../../config/database/bookshelf');


var Post = bookshelf.Model.extend({
  tableName: 'Posts',
});

var User = bookshelf.Model.extend({
  tableName: 'Users',
});


module.exports = {
  Post: Post,
  User: User
};