const Task = require('../db/model/task')
const User = require('../db/model/user')
exports.getMyAllTask = async function (req, res, next) {
    try {
        if (req.user.role !== 'user') {
            return res.status(401).json({
                message: 'You are not authorized to perform this action'
            })
        }
        const page = req.query.page ? parseInt(req.query.page) : 1;
        const limit = 2
        const offset = (page - 1) * limit
        const tasks = await Task.query().where('assignedUserId', req.user.id).withGraphFetched("admin").modifyGraph('admin', builder => {
            builder.select('id', 'name');
        }).offset(offset).limit(limit);

        res.status(200).json(
            {
                message: 'Tasks fetched successfully',
                tasks: tasks
            }
        )
    }
    catch (err) {
        next(err)
        res.status(500).json({
            message: err.message
        })
    }
}

exports.getUpdateMyTaskStatus = async function (req, res, next) {
    try {
        // console.log(req.user.role)
        if (req.user.role !== 'user') {
            return res.status(401).json({
                status: 401,
                message: 'You are not authorized to perform this action',
            });
        }
        const taskId = req.params.taskid;
        const task = await Task.query().findById(taskId);
        if (!task) {
            return res.status(404).json({
                status: 404,
                message: 'Task not found',
            });
        }
        if (task.assignedUserId !== req.user.id) {
            return res.status(403).json({
                status: 403,
                message: 'You are not authorized to perform this action',
            });
        }
        const updatedTaskstatus = await Task.query().patchAndFetchById(taskId, {
            status: req.body.status,
            updated_at: new Date()
        });
        res.status(200).json({
            status: 200,
            message: 'Task updated successfully',
            data: updatedTaskstatus,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 500,
            message: error.message
        });
    }
}

exports.getAllUsers = async function (req, res, next) {
    try {
        const users = await User.query().select('id', 'name', 'role')
        res.status(200).json({
            message: 'Users fetched successfully',
            users: users
        })
    } catch (err) {
        next(err)
        res.status(500).json({
            message: err.message
        })
    }
}

exports.getMyTaskStatus = async function (req, res, next) {
    try {
        if (req.user.role !== 'user') {
            return res.status(401).json({
                status: 401,
                message: 'You are not authorized to perform this action',
            });
        }

        const tasks = await Task.query().where('assignedUserId', req.user.id);
        // console.log(tasks)
        const currentDate = new Date();
        const currentDateStr = currentDate.toDateString();
        const todayCompletedTasksCount = tasks.filter(task => {
            const taskUpdateDate = new Date(task.updated_at).toDateString();
            const currentDateStr = currentDate.toDateString();
            return task.status === 'completed' && taskUpdateDate === currentDateStr;
        }).length;

        const overdueTasksCount = tasks.filter(task => {
            const taskEndDate = new Date(task.endDate);
            const taskEndDateStr = taskEndDate.toDateString();
            return task.status === 'pending' && taskEndDate < currentDate && taskEndDateStr !== currentDateStr;
        }).length;

        const pendingTasksCount = tasks.filter(task => {
            const taskEndDate = new Date(task.endDate);
            const taskEndDateStr = taskEndDate.toDateString();
            const isCompleted = task.status === 'completed';
            const isPending = taskEndDate > currentDate || taskEndDateStr === currentDateStr;
            return !isCompleted && isPending;
        }).length;

        const completedTasksCount = tasks.filter(task => task.status === 'completed').length;
        res.status(200).json(
            {
                status: 200,
                overdueTasksCount,
                todayCompletedTasksCount,
                pendingTasksCount,
                completedTasksCount
            })
    } catch (err) {
        next(err)
        res.status(500).json({
            message: err.message
        })
    }
}