package com.hozensoft.task.core.service.impl;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.hozensoft.struct.pagehelper.Limitable;
import com.hozensoft.struct.pagehelper.Pageable;
import com.hozensoft.system.core.dto.StaffItemDto;
import com.hozensoft.system.core.dto.StaffQueryDto;
import com.hozensoft.system.core.service.StaffService;
import com.hozensoft.system.utils.bean.ContextHolder;
import com.hozensoft.task.core.dao.query.TaskOperateLogQuery;
import com.hozensoft.task.core.dao.repo.TaskOperateLogRepo;
import com.hozensoft.task.core.dao.repo.TaskOperateLogStaffLinkRepo;
import com.hozensoft.task.core.domain.TaskOperateLog;
import com.hozensoft.task.core.dto.*;
import com.hozensoft.task.core.service.TaskOperateLogService;
import com.hozensoft.task.core.service.TaskService;
import com.hozensoft.utils.persistent.IdGen;
import org.apache.commons.collections.CollectionUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class TaskOperateLogServiceImpl implements TaskOperateLogService {

    @Autowired
    private TaskOperateLogRepo taskOperateLogRepo;

    @Autowired
    private TaskOperateLogQuery taskOperateLogQuery;

    @Autowired
    private StaffService staffService;

    @Autowired
    private TaskOperateLogStaffLinkRepo taskOperateLogStaffLinkRepo;

    @Autowired
    private TaskService taskService;

    @Override
    @Transactional
    public void addTaskOperateLog(ContextHolder holder, TaskOperateLog taskOperateLog) {

        taskOperateLog.setId(IdGen.generate());
        taskOperateLog.setTenantId(holder.getTenantId());

        taskOperateLogRepo.addTaskOperateLog(taskOperateLog);
    }

    @Override
    public List<TaskOperateLogItemDto> findTaskOperateLogList(ContextHolder holder, TaskOperateLogQueryDto params, Limitable limitable) {

        params.setTenantId(holder.getTenantId());

        PageHelper.offsetPage(limitable.getOffset(), limitable.getLimit());
        List<TaskOperateLogItemDto> list = taskOperateLogQuery.findTaskOperateLogList(params);

        fillDomains(holder, list);

        return list;
    }

    @Override
    public PageInfo<TaskOperateLogItemDto> findTaskOperateLogPage(ContextHolder holder, TaskOperateLogQueryDto params, Pageable pageable) {

        params.setTenantId(holder.getTenantId());

        PageHelper.startPage(pageable.getPage(), pageable.getPageSize());
        List<TaskOperateLogItemDto> list = taskOperateLogQuery.findTaskOperateLogList(params);

        fillDomains(holder, list);

        return new PageInfo<>(list);
    }

    @Override
    public PageInfo<TaskOperateLogWithTaskItemDto> findTaskOperateLogWithTaskList(ContextHolder holder, Boolean readed, Pageable pageable) {

        PageHelper.startPage(pageable.getPage(), pageable.getPageSize());
        List<TaskOperateLogWithTaskItemDto> list = taskOperateLogQuery.findTaskOperateLogWithTaskList(holder.getTenantId(), holder.getStaffId(), readed);

        TaskQueryDto taskParams = TaskQueryDto.builder().tenantId(holder.getTenantId()).id(list.stream().map(item->item.getTaskId()).distinct().collect(Collectors.toList())).build();
        StaffQueryDto staffParams = StaffQueryDto.builder().tenantId(holder.getTenantId()).id(list.stream().map(item->item.getOperateById()).distinct().collect(Collectors.toList())).build();

        List<TaskItemDto> taskList = taskService.findTaskList(holder, taskParams, new Limitable());
        Map<String, TaskItemDto> taskMap = taskList.stream().collect(Collectors.toMap(TaskItemDto::getId, item->item));

        List<StaffItemDto> staffList = staffService.findStaffList(holder, staffParams, new Limitable());
        Map<String, StaffItemDto> staffMap = staffList.stream().collect(Collectors.toMap(StaffItemDto::getId, item->item));

        list.stream().forEach(item->{
            item.setTask(taskMap.get(item.getTaskId()));
            item.setOperateBy(staffMap.get(item.getOperateById()));
        });

        return new PageInfo<>(list);
    }

    protected List<TaskOperateLogItemDto> fillDomains(ContextHolder holder, List<TaskOperateLogItemDto> list){
        List<String> createByIdList = list.stream().filter(item->item.getOperateById()!=null).map(item->item.getOperateById()).collect(Collectors.toList());

        if(CollectionUtils.isEmpty(createByIdList)){
           return list;
        }

        StaffQueryDto params = StaffQueryDto.builder().id(createByIdList).tenantId(holder.getTenantId()).build();

        List<StaffItemDto> staffList = staffService.findStaffList(holder, params, new Limitable());
        Map<String, StaffItemDto> staffHash = staffList.stream().collect(Collectors.toMap(item->item.getId(), item->item));

        list.stream().forEach(item->{
            item.setOperateBy(staffHash.get(item.getOperateById()));
        });

        return list;
    }
}
