package com.hozensoft.task.core.rest;

import com.hozensoft.struct.pagehelper.Limitable;
import com.hozensoft.system.utils.ContextUtils;
import com.hozensoft.task.core.dto.TaskTagDto;
import com.hozensoft.task.core.dto.TaskTagItemDto;
import com.hozensoft.task.core.dto.TaskTagQueryDto;
import com.hozensoft.task.core.dto.TaskTagValueDto;
import com.hozensoft.task.core.service.TaskTagService;
import io.swagger.annotations.Api;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Api(value = "标签管理接口")
@RestController
@RequestMapping("api/tm/task-tag")
public class TaskTagRest {

    @Autowired
    private TaskTagService taskTagService;

    @PostMapping
   public @ResponseBody
    TaskTagDto addTaskTag(@RequestBody TaskTagValueDto taskTagDto){

        taskTagDto.setCurrentPositionId(ContextUtils.getCurrentPosition().getId());

        return taskTagService.addTaskTag(ContextUtils.fetchContext(),taskTagDto);
    }

    @PutMapping("/{taskTagId}")
    public @ResponseBody TaskTagDto editTaskTag(@PathVariable("taskTagId")String taskTagId,
                                               @RequestBody TaskTagValueDto taskTagDto){
        taskTagDto.setCurrentPositionId(ContextUtils.getCurrentPosition().getId());

        return taskTagService.editTaskTag(ContextUtils.fetchContext(),taskTagDto);
    }

    @DeleteMapping("/{taskTagId}")
    public void deleteTaskTagById(@PathVariable("taskTagId")String taskTagId){

        taskTagService.deleteTaskTag(ContextUtils.fetchContext(),taskTagId);
    }

    @GetMapping("/{taskTagId}")
    public @ResponseBody TaskTagDto findTaskTagById(@PathVariable("taskTagId")String taskTagId){

        return taskTagService.findTaskTagById(ContextUtils.fetchContext(),taskTagId);
    }

    @GetMapping(value = "/list")
    public @ResponseBody
    List<TaskTagItemDto> findTaskTagList(TaskTagQueryDto params, Limitable limitable){

        return taskTagService.findTaskTagList(ContextUtils.fetchContext(),params,limitable);
    }



}
