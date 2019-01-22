package com.hozensoft.task.core.dao.repo;

import com.hozensoft.task.core.domain.TaskOperateLog;
import com.hozensoft.task.core.dto.TaskOperateLogItemDto;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface TaskOperateLogRepo {

    int addTaskOperateLog(TaskOperateLog log);

    TaskOperateLog loadTaskOperateLogById(@Param("tenantId") String tenantId,
                                          @Param("taskOperateLogId") String taskOperateLogId);
}
