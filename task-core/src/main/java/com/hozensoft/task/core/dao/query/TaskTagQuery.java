package com.hozensoft.task.core.dao.query;

import com.hozensoft.task.core.dto.TaskTagDto;
import com.hozensoft.task.core.dto.TaskTagItemDto;
import com.hozensoft.task.core.dto.TaskTagQueryDto;

import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface TaskTagQuery {

    TaskTagDto findTaskTagById(@Param("taskTagId")String taskTagId);

    List<TaskTagItemDto>findTaskTagList(TaskTagQueryDto params);
}
