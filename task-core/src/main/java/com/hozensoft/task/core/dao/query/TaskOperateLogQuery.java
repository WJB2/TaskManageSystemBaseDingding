package com.hozensoft.task.core.dao.query;


import com.hozensoft.task.core.dto.TaskOperateLogItemDto;
import com.hozensoft.task.core.dto.TaskOperateLogQueryDto;
import com.hozensoft.task.core.dto.TaskOperateLogWithTaskItemDto;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface TaskOperateLogQuery {

    List<TaskOperateLogItemDto> findTaskOperateLogList(TaskOperateLogQueryDto params);

    List<TaskOperateLogWithTaskItemDto> findTaskOperateLogWithTaskList(@Param("tenantId") String tenantId,
                                                                       @Param("staffId")String staffId,
                                                                       @Param("readed")Boolean readed);
}
