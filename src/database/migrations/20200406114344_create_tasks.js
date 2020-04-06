
exports.up = function(knex) {
    return knex.schema
    .createTable('tasks', function (table) {
       table.increments('id').unique();
       table.string('title', 100).notNullable();
       table.string('description', 255).notNullable();
       table.string('tag', 10).notNullable();
       table.timestamps(true, true);
    })
};

exports.down = function(knex) {
    return knex.schema
    .dropTable('tasks')
};
