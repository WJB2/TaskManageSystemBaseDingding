package com.hozensoft.task.core.dao.query;

import com.hozensoft.task.core.dto.TaskGroupDto;
import com.hozensoft.task.core.dto.TaskGroupItemDto;
import com.hozensoft.task.core.dto.TaskGroupQueryDto;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface TaskGroupQuery {

    TaskGroupDto findTaskGroupById(@Param("taskGroupId") String taskGroupId);

    List<TaskGroupItemDto>findTaskGroupList(TaskGroupQueryDto params);
}
