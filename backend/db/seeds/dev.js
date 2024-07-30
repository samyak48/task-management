/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('task').del();
  await knex('user').del();

  // Inserts seed entries for user
  await knex('user').insert([
    { id: 1, name: 'samyak', email: 'samyaksankhesara@gmail.com', password: 'Samyak26$', role: 'admin' },
    { id: 2, name: 'arpit', email: 'arpit@gmail.com', password: 'Arpit26$', role: 'user' },
  ]);

  // Inserts seed entries for task
  await knex('task').insert([
    { id: 1, taskName: 'task1', description: 'task1 description', status: 'pending', startDate: new Date(), endDate: new Date(), assignedUserId: 2, adminId: 1 },
    { id: 2, taskName: 'task2', description: 'task2 description', status: 'completed', startDate: new Date(), endDate: new Date(), assignedUserId: 2, adminId: 1 },
  ]);
};
