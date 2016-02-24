'use strict';

import bookshelf from '../../config/database/bookshelf';

var Post = bookshelf.Model.extend({
  tableName: 'Posts',
});

var User = bookshelf.Model.extend({
  tableName: 'Users',
});

export default {
  Post: Post,
  User: User
};