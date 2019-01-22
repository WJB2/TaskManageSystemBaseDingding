package com.hozensoft.task.core.rest;

import com.hozensoft.struct.pagehelper.Limitable;
import com.hozensoft.system.utils.ContextUtils;
import com.hozensoft.task.core.dto.TaskGroupDto;
import com.hozensoft.task.core.dto.TaskGroupItemDto;
import com.hozensoft.task.core.dto.TaskGroupQueryDto;
import com.hozensoft.task.core.dto.TaskGroupValueDto;
import com.hozensoft.task.core.service.TaskGroupService;
import io.swagger.annotations.Api;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Api(value = "任务群组接口")
@RestController
@RequestMapping("api/tm/task-group")
public class TaskGroupRest {

    @Autowired
    private TaskGroupService taskGroupService;

    @PostMapping
   public @ResponseBody
    TaskGroupDto addTaskGroup(@RequestBody TaskGroupValueDto taskGroupDto){

        taskGroupDto.setStaffId(ContextUtils.getCurrentStaff().getId());

        return taskGroupService.addTaskGroup(ContextUtils.fetchContext(),taskGroupDto);
    }

    @PutMapping("/{taskGroupId}")
    public @ResponseBody TaskGroupDto editTaskGroup(@PathVariable("taskGroupId")String taskGroupId,
                                               @RequestBody TaskGroupValueDto taskGroupDto){

        taskGroupDto.setStaffId(ContextUtils.getCurrentStaff().getId());

        return taskGroupService.editTaskGroup(ContextUtils.fetchContext(),taskGroupDto);
    }

    @DeleteMapping("/{taskGroupId}")
    public void deleteTaskGroupById(@PathVariable("taskGroupId")String taskGroupId){

        taskGroupService.deleteTaskGroup(ContextUtils.fetchContext(),taskGroupId);
    }

    @GetMapping("/{taskGroupId}")
    public @ResponseBody TaskGroupDto findTaskGroupById(@PathVariable("taskGroupId")String taskGroupId){

        return taskGroupService.findTaskGroupById(ContextUtils.fetchContext(),taskGroupId);
    }

    @GetMapping(value = "/list")
    public @ResponseBody
    List<TaskGroupItemDto> findTaskGroupList(TaskGroupQueryDto params, Limitable limitable){

        params.setStaffId(ContextUtils.getCurrentStaff().getId());

        return taskGroupService.findTaskGroupList(ContextUtils.fetchContext(),params,limitable);
    }



}
