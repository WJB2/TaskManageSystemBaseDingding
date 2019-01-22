package com.hozensoft.task.core.service.impl;

import com.github.pagehelper.PageHelper;
import com.hozensoft.struct.pagehelper.Limitable;
import com.hozensoft.system.core.dto.PositionDto;
import com.hozensoft.system.core.service.PositionService;
import com.hozensoft.system.utils.ContextUtils;
import com.hozensoft.system.utils.awared.CreatedAwared;
import com.hozensoft.system.utils.awared.UpdatedAwared;
import com.hozensoft.system.utils.bean.ContextHolder;
import com.hozensoft.task.core.dao.query.TaskTagQuery;
import com.hozensoft.task.core.dao.repo.TaskTagRepo;
import com.hozensoft.task.core.domain.TaskTag;
import com.hozensoft.task.core.dto.TaskTagDto;
import com.hozensoft.task.core.dto.TaskTagItemDto;
import com.hozensoft.task.core.dto.TaskTagQueryDto;
import com.hozensoft.task.core.dto.TaskTagValueDto;
import com.hozensoft.task.core.service.TaskTagService;
import com.hozensoft.task.core.transformer.TaskTagTransformer;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;


@Service
public class TaskTagServiceImpl implements TaskTagService {
    @Autowired
    private TaskTagRepo taskTagRepo;

    @Autowired
    private TaskTagQuery taskTagQuery;

    @Autowired
    private PositionService positionService;

    @Autowired
    private TaskTagService taskTagService;


    @Override
    @Transactional
    public TaskTagDto addTaskTag(ContextHolder holder, TaskTagValueDto taskTagDto) {

        TaskTag tt = TaskTagTransformer.transforTaskTagAddToDomain(taskTagDto);

        PositionDto currentPosition = positionService.findPositionById(holder, taskTagDto.getCurrentPositionId());
        ContextUtils.applyAwaredContext(currentPosition, tt, CreatedAwared.class, UpdatedAwared.class);

        tt.setTenantId(holder.getTenantId());
        taskTagRepo.addTaskTag(tt);
        TaskTagDto outDto = findTaskTagById(holder,tt.getId());

        return outDto;
    }

    @Override
    @Transactional
    public TaskTagDto editTaskTag(ContextHolder holder, TaskTagValueDto taskTagDto) {
        TaskTag tt = TaskTagTransformer.transforTaskTagEditToDomain(taskTagDto);
        tt.setTenantId(holder.getTenantId());

        PositionDto currentPosition = positionService.findPositionById(holder, taskTagDto.getCurrentPositionId());
        ContextUtils.applyAwaredContext(currentPosition, tt, UpdatedAwared.class);

        taskTagRepo.patchEditTaskTag(tt);

        TaskTagDto outDto = findTaskTagById(holder, tt.getId());
        return outDto;
    }


    @Override
    @Transactional
    public void deleteTaskTag(ContextHolder holder, String taskTagId) {

        taskTagRepo.deleteTaskTagById(taskTagId);
    }

    @Override
    public TaskTagDto findTaskTagById(ContextHolder holder, String taskTagId) {

        TaskTagDto tt = taskTagQuery.findTaskTagById(taskTagId);

        return tt;

    }

    @Override
    public TaskTag loadTaskTagById(ContextHolder holder, String taskTagId) {

        return taskTagRepo.loadTaskTagById(taskTagId);
    }

    @Override
    public List<TaskTagItemDto> findTaskTagList(ContextHolder holder, TaskTagQueryDto params, Limitable limitable) {

        PageHelper.offsetPage(limitable.getOffset(),limitable.getLimit());

        return taskTagQuery.findTaskTagList(params);
    }
}
