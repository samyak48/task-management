/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('task', table => {
        table.increments('id').primary();
        table.string('taskName').notNullable();
        table.string('description');
        table.string('status').notNullable().defaultTo("pending");
        table.dateTime('startDate').notNullable();
        table.dateTime('endDate').notNullable();
        table.integer('assignedUserId').unsigned().references('id').inTable('user').onDelete('CASCADE');
        table.integer('adminId').unsigned().references('id').inTable('user').onDelete('CASCADE');
        table.dateTime('created_at').defaultTo(knex.fn.now());
        table.dateTime('updated_at').defaultTo(knex.fn.now());
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {

};
