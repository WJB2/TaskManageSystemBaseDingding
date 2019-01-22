package com.hozensoft.task.core.dao.repo;

import com.hozensoft.task.core.domain.Task;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface TaskRepo {

    int addTask(Task task);

    int editTask(Task task);

    int patchEditTask(Task task);

    int editTaskCompletionInfo(Task task);

    int editTaskSuspensionInfo(Task task);

    int editTaskAuditInfo(Task task);

    int editTaskArchiveInfo(Task task);

    int deleteTaskById(@Param("tenantId")String tenantId, @Param("taskId") String taskId);

    int deleteTaskByProjectId(@Param("tenantId")String tenantId, @Param("projectId")String projectId);

    Task loadTaskById(@Param("taskId")String taskId);
}
