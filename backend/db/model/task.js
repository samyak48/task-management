const { Model } = require('objection')
class Task extends Model {
    static get tableName() {
        return 'task'
    }
    static get relationMappings() {
        const User = require('./user')
        return {
            assignedUser: {
                relation: Model.BelongsToOneRelation,
                modelClass: User,
                join: {
                    from: "task.assignedUserId",
                    to: "user.id"
                }
            },
            admin: {
                relation: Model.BelongsToOneRelation,
                modelClass: User,
                join: {
                    from: "task.adminId",
                    to: "user.id"
                }
            }
        }
    }
}
module.exports = Task