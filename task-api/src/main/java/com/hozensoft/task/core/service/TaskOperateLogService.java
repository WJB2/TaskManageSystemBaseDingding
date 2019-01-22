package com.hozensoft.task.core.service;

import com.github.pagehelper.PageInfo;
import com.hozensoft.struct.pagehelper.Limitable;
import com.hozensoft.struct.pagehelper.Pageable;
import com.hozensoft.system.utils.bean.ContextHolder;
import com.hozensoft.task.core.domain.TaskOperateLog;
import com.hozensoft.task.core.dto.TaskOperateLogItemDto;
import com.hozensoft.task.core.dto.TaskOperateLogQueryDto;
import com.hozensoft.task.core.dto.TaskOperateLogWithTaskItemDto;

import java.util.List;

public interface TaskOperateLogService {

    void addTaskOperateLog(ContextHolder holder, TaskOperateLog taskOperateLog);

    List<TaskOperateLogItemDto> findTaskOperateLogList(ContextHolder holder,
                                                       TaskOperateLogQueryDto params,
                                                       Limitable limitable);

    PageInfo<TaskOperateLogItemDto> findTaskOperateLogPage(ContextHolder holder,
                                                           TaskOperateLogQueryDto params,
                                                           Pageable pageable);

    PageInfo<TaskOperateLogWithTaskItemDto> findTaskOperateLogWithTaskList(ContextHolder holder,
                                                                       Boolean readed,
                                                                       Pageable pageable);
}
