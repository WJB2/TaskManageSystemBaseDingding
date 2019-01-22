package com.hozensoft.task.core.rest;

import com.github.pagehelper.PageInfo;
import com.hozensoft.struct.pagehelper.Limitable;
import com.hozensoft.struct.pagehelper.Pageable;
import com.hozensoft.system.utils.ContextUtils;
import com.hozensoft.task.core.dto.TaskOperateLogItemDto;
import com.hozensoft.task.core.dto.TaskOperateLogQueryDto;
import com.hozensoft.task.core.dto.TaskOperateLogWithTaskItemDto;
import com.hozensoft.task.core.service.TaskOperateLogService;
import com.hozensoft.task.core.service.TaskOperateLogStaffLinkService;
import io.swagger.annotations.Api;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Api(value = "任务操作记录接口")
@RestController
@RequestMapping("/api/tm/task-operate-log")
public class TaskOperateLogRest {

    @Autowired
    private TaskOperateLogService taskOperateLogService;

    @Autowired
    private TaskOperateLogStaffLinkService taskOperateLogStaffLinkService;

    @PostMapping(value="/{taskOperateLogId}/readed")
    public @ResponseBody void read(@PathVariable("taskOperateLogId")String taskOperateLogId){

        taskOperateLogStaffLinkService.editTaskOperateLogStaffLinkReaded(ContextUtils.fetchContext(), taskOperateLogId);
    }

    @GetMapping(value="/list")
    public @ResponseBody
    List<TaskOperateLogItemDto> findTaskOperateLogList(TaskOperateLogQueryDto params, Limitable limitable){

        return taskOperateLogService.findTaskOperateLogList(ContextUtils.fetchContext(), params, limitable);
    }

    @GetMapping(value="/page")
    public @ResponseBody PageInfo<TaskOperateLogItemDto> findTaskOperateLogPage(TaskOperateLogQueryDto params, Pageable pageable){

        return taskOperateLogService.findTaskOperateLogPage(ContextUtils.fetchContext(), params, pageable);
    }

    @GetMapping(value="/detail/list")
    public @ResponseBody PageInfo<TaskOperateLogWithTaskItemDto> findTaskOperateLogWithTaskList(@RequestParam(value="readed", required = false)Boolean readed, Pageable pageable){

        return taskOperateLogService.findTaskOperateLogWithTaskList(ContextUtils.fetchContext(), readed, pageable);
    }
}
