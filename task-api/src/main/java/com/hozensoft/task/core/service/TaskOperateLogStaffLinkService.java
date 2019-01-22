package com.hozensoft.task.core.service;

import com.hozensoft.struct.pagehelper.Limitable;
import com.hozensoft.system.utils.bean.ContextHolder;
import com.hozensoft.task.core.domain.TaskOperateLogStaffLink;
import com.hozensoft.task.core.dto.TaskOperateLogItemDto;
import com.hozensoft.task.core.dto.TaskOperateLogQueryDto;

import java.util.List;

public interface TaskOperateLogStaffLinkService {

    void addTaskOperateLogStaffLink(ContextHolder holder,  List<TaskOperateLogStaffLink> links);

    void editTaskOperateLogStaffLinkReaded(ContextHolder holder, String operateLogId);
}
