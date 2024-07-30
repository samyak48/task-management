const { Model } = require('objection')
const Task = require('./task')
class User extends Model {
    static get tableName() {
        return 'user'
    }
    static get relationMappings() {
        return {
            assignedTask: {
                relation: Model.HasManyRelation,
                modelClass: Task,
                join: {
                    from: 'user.id',
                    to: 'task.assignedUserId'
                }
            },
            adminTasks: {
                relation: Model.HasManyRelation,
                modelClass: Task,
                join: {
                    from: 'user.id',
                    to: 'task.adminId'
                }
            }
        }
    }
}
module.exports = User