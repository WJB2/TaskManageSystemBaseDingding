package com.hozensoft.task.core.dao.repo;

import com.hozensoft.task.core.domain.TaskGroup;
import org.apache.ibatis.annotations.Param;

public interface TaskGroupRepo {

    int addTaskGroup(TaskGroup taskGroup);

    int editTaskGroup(TaskGroup taskGroup);

    int patchEditTaskGroup(TaskGroup taskGroup);

    int deleteTaskGroupById(@Param("taskGroupId") String taskGroupId);

    TaskGroup loadTaskGroupById(@Param("taskGroupId") String taskGroupId);
}
