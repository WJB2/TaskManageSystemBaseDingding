package com.hozensoft.task.core.service.impl;

import com.github.pagehelper.PageHelper;
import com.hozensoft.struct.pagehelper.Limitable;
import com.hozensoft.system.core.dto.PositionDto;
import com.hozensoft.system.core.service.PositionService;
import com.hozensoft.system.utils.ContextUtils;
import com.hozensoft.system.utils.awared.CreatedAwared;
import com.hozensoft.system.utils.awared.UpdatedAwared;
import com.hozensoft.system.utils.bean.ContextHolder;
import com.hozensoft.task.core.dao.query.TaskGroupQuery;
import com.hozensoft.task.core.dao.repo.TaskGroupRepo;
import com.hozensoft.task.core.domain.TaskGroup;
import com.hozensoft.task.core.dto.TaskGroupDto;
import com.hozensoft.task.core.dto.TaskGroupItemDto;
import com.hozensoft.task.core.dto.TaskGroupQueryDto;
import com.hozensoft.task.core.dto.TaskGroupValueDto;
import com.hozensoft.task.core.service.TaskGroupService;
import com.hozensoft.task.core.transformer.TaskGroupTransformer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;


@Service
public class TaskGroupServiceImpl implements TaskGroupService {
    @Autowired
    private TaskGroupRepo taskGroupRepo;

    @Autowired
    private TaskGroupQuery taskGroupQuery;

    @Autowired
    private PositionService positionService;

    @Autowired
    private TaskGroupService taskGroupService;


    @Override
    @Transactional
    public TaskGroupDto addTaskGroup(ContextHolder holder, TaskGroupValueDto taskGroupDto) {

        TaskGroup tt = TaskGroupTransformer.transforTaskGroupAddToDomain(taskGroupDto);

        tt.setTenantId(holder.getTenantId());
        taskGroupRepo.addTaskGroup(tt);
        TaskGroupDto outDto = findTaskGroupById(holder,tt.getId());

        return outDto;
    }

    @Override
    @Transactional
    public TaskGroupDto editTaskGroup(ContextHolder holder, TaskGroupValueDto taskGroupDto) {
        TaskGroup tt = TaskGroupTransformer.transforTaskGroupEditToDomain(taskGroupDto);
        tt.setTenantId(holder.getTenantId());

        taskGroupRepo.patchEditTaskGroup(tt);

        TaskGroupDto outDto = findTaskGroupById(holder, tt.getId());
        return outDto;
    }


    @Override
    @Transactional
    public void deleteTaskGroup(ContextHolder holder, String taskGroupId) {

        taskGroupRepo.deleteTaskGroupById(taskGroupId);
    }

    @Override
    public TaskGroupDto findTaskGroupById(ContextHolder holder, String taskGroupId) {

        TaskGroupDto tt = taskGroupQuery.findTaskGroupById(taskGroupId);

        return tt;

    }

    @Override
    public TaskGroup loadTaskGroupById(ContextHolder holder, String taskGroupId) {

        return taskGroupRepo.loadTaskGroupById(taskGroupId);
    }

    @Override
    public List<TaskGroupItemDto> findTaskGroupList(ContextHolder holder, TaskGroupQueryDto params, Limitable limitable) {

        PageHelper.offsetPage(limitable.getOffset(),limitable.getLimit());

        return taskGroupQuery.findTaskGroupList(params);
    }
}
