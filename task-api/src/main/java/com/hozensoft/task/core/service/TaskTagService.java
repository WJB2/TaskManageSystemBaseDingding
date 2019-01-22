package com.hozensoft.task.core.service;

import com.hozensoft.struct.pagehelper.Limitable;
import com.hozensoft.system.utils.bean.ContextHolder;
import com.hozensoft.task.core.domain.TaskTag;
import com.hozensoft.task.core.dto.TaskTagDto;
import com.hozensoft.task.core.dto.TaskTagItemDto;
import com.hozensoft.task.core.dto.TaskTagQueryDto;
import com.hozensoft.task.core.dto.TaskTagValueDto;


import java.util.List;

public interface TaskTagService {
    TaskTagDto addTaskTag(ContextHolder holder, TaskTagValueDto taskTag);

    TaskTagDto editTaskTag(ContextHolder holder, TaskTagValueDto taskTag);

    void deleteTaskTag(ContextHolder holder, String taskTagId);

    TaskTagDto findTaskTagById(ContextHolder holder, String TaskTagId);

    TaskTag loadTaskTagById(ContextHolder holder, String TaskTagId);

    List<TaskTagItemDto> findTaskTagList(ContextHolder holder, TaskTagQueryDto params, Limitable limitable);

}
