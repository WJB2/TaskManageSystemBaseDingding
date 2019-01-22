package com.hozensoft.task.core.dao.repo;

import com.hozensoft.task.core.domain.TaskTag;
import org.apache.ibatis.annotations.Param;

public interface TaskTagRepo {

    int addTaskTag (TaskTag taskTag);

    int editTaskTag(TaskTag taskTag);

    int patchEditTaskTag(TaskTag taskTag);

    int deleteTaskTagById(@Param("taskTagId")String taskTagId);

    TaskTag loadTaskTagById(@Param("taskTagId")String taskTagId);
}
