package com.hozensoft.task.core.service;

import com.hozensoft.struct.pagehelper.Limitable;
import com.hozensoft.system.utils.bean.ContextHolder;
import com.hozensoft.task.core.domain.TaskGroup;
import com.hozensoft.task.core.dto.TaskGroupDto;
import com.hozensoft.task.core.dto.TaskGroupItemDto;
import com.hozensoft.task.core.dto.TaskGroupQueryDto;
import com.hozensoft.task.core.dto.TaskGroupValueDto;

import java.util.List;

public interface TaskGroupService {

    TaskGroupDto addTaskGroup(ContextHolder holder, TaskGroupValueDto taskGroup);

    TaskGroupDto editTaskGroup(ContextHolder holder, TaskGroupValueDto taskGroup);

    void deleteTaskGroup(ContextHolder holder, String taskGroupId);

    TaskGroupDto findTaskGroupById(ContextHolder holder, String taskGroupId);

    TaskGroup loadTaskGroupById(ContextHolder holder, String taskGroupId);

    List<TaskGroupItemDto> findTaskGroupList(ContextHolder holder, TaskGroupQueryDto params, Limitable limitable);

}
