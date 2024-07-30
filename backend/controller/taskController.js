const Task = require('../db/model/task')

exports.createTask = async function (req, res, next) {
    try {
        if (req.user.id === req.body.assignedUserId) {
            res.status(401).json({
                status: 401,
                message: 'You are not authorized to perform this action'
            })
        }

        const startDate = new Date(req.body.startDate);
        const endDate = new Date(req.body.endDate);
        const currentDate = new Date();


        if (startDate < currentDate.setHours(0, 0, 0, 0)) {
            return res.status(400).json({
                status: 400,
                message: 'Start date cannot be less than the current date'
            });
        }


        if (endDate < startDate) {
            return res.status(400).json({
                status: 400,
                message: 'End date cannot be less than the start date'
            });
        }

        else if (req.user.role === 'admin') {
            const newTask = await Task.query().insert({
                taskName: req.body.taskName,
                description: req.body.description,
                status: req.body.status,
                startDate: req.body.startDate,
                endDate: req.body.endDate,
                assignedUserId: req.body.assignedUserId,
                adminId: req.user.id,
            })
            res.status(201).json({
                status: 201,
                message: 'Task created successfully',
                data: newTask
            });
        }
        else {
            res.status(401).json({
                status: 401,
                message: 'You are not authorized to perform this action'
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 500,
            message: error.message
        });
    }
}

exports.getAlltasks = async function (req, res, next) {
    try {
        if (req.user.role === 'admin') {
            const page = req.query.page ? parseInt(req.query.page) : 1;
            const limit = 10
            const offset = (page - 1) * limit

            const allTasks = await Task.query().where('adminId', req.user.id).offset(offset).limit(limit)
            // console.log(allTasks, "alltask");
            res.status(200).json({
                status: 200,
                data: allTasks
            });
        }
        else {
            res.status(401).json({
                status: 401,
                message: 'You are not authorized to perform this action'
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 500,
            message: error.message
        });
    }
}
exports.updateTask = async function (req, res, next) {
    try {
        if (req.user.role !== 'admin') {
            return res.status(401).json({
                status: 401,
                message: 'You are not authorized to perform this action',
            });
        }
        const startDate = new Date(req.body.startDate);
        const endDate = new Date(req.body.endDate);
        const currentDate = new Date();


        if (startDate < currentDate.setHours(0, 0, 0, 0)) {
            return res.status(400).json({
                status: 400,
                message: 'Start date cannot be less than the current date'
            });
        }

        if (endDate < startDate) {
            return res.status(400).json({
                status: 400,
                message: 'End date cannot be less than the start date'
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
        if (task.adminId !== req.user.id) {
            return res.status(403).json({
                status: 403,
                message: 'You are not authorized to perform this action',
            });
        }
        const updatedTask = await Task.query().patchAndFetchById(taskId, {
            taskName: req.body.taskName,
            description: req.body.description,
            status: req.body.status,
            startDate: req.body.startDate,
            endDate: req.body.endDate,
            assignedUserId: req.body.assignedUserId,
            updated_at: new Date()
        });
        res.status(200).json({
            status: 200,
            message: 'Task updated successfully',
            data: updatedTask,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            status: 500,
            message: error.message
        });
    }
}
exports.deleteTask = async function (req, res, next) {
    try {
        if (req.user.role !== 'admin') {
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
        if (task.adminId !== req.user.id) {
            return res.status(403).json({
                status: 403,
                message: 'You are not authorized to perform this action',
            });
        }
        await Task.query().deleteById(taskId);
        res.status(200).json({
            status: 200,
            message: 'Task deleted successfully',
        });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({
            status: 500,
            message: err.message
        })
    }
}

exports.getTaskStatus = async function (req, res, next) {
    try {
        const tasks = await Task.query().where('adminId', req.user.id);
        // console.log(typeof (tasks))
        const currentDate = new Date();
        const currentDateStr = currentDate.toDateString();

        let x = tasks.map(task => {
            return task.updated_at
        })
        // console.log(x)
        // console.log(currentDate)
        // const todayCompletedTasksCount = tasks.filter(task => new Date(task.endDate).toDateString() === currentDate.toDateString() && task.status === 'completed').length;
        // const todayCompletedTasksCount = tasks.filter(task => {
        //     return task.status !== 'completed' && new Date(task.endDate).toDateString() === currentDate.toDateString();
        // }).length;
        const todayCompletedTasksCount = tasks.filter(task => {
            const taskUpdateDate = new Date(task.updated_at).toDateString();
            const currentDateStr = currentDate.toDateString();
            return task.status === 'completed' && taskUpdateDate === currentDateStr;
        }).length;


        // const overdueTasksCount = tasks.filter(task => task.status === 'pending' && new Date(task.endDate) < currentDate).length;

        // const pendingTasksCount = tasks.filter(task => {
        //     const isCompleted = task.status === 'completed';
        //     const isPending = new Date(task.endDate) > currentDate;
        //     return !isCompleted && isPending;
        // }).length;

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

        res.status(200).json({
            status: 200,
            overdueTasksCount,
            todayCompletedTasksCount,
            pendingTasksCount,
            completedTasksCount
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 500,
            message: error.message
        });
    }
}