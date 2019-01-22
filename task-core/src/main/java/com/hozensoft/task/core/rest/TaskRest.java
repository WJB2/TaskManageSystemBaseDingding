package com.hozensoft.task.core.rest;


import com.github.pagehelper.PageInfo;
import com.hozensoft.config.rest.converter.DateConverter;
import com.hozensoft.struct.pagehelper.Limitable;
import com.hozensoft.struct.pagehelper.Pageable;
import com.hozensoft.system.utils.ContextUtils;
import com.hozensoft.task.core.dto.*;
import com.hozensoft.task.core.service.TaskService;
import io.swagger.annotations.Api;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@Api(value="任务管理接口")
@RestController
@RequestMapping("/api/tm/task")
public class TaskRest {

    @Autowired
    private TaskService taskService;

    @PostMapping
    public @ResponseBody TaskDto addTask(@RequestBody TaskValueDto taskDto){

        taskDto.setCurrentPositionId(ContextUtils.getCurrentPosition().getId());

        return taskService.addTask(ContextUtils.fetchContext(),taskDto);
    }

    @PutMapping("/{taskId}")
    public @ResponseBody TaskDto editTask(@PathVariable("taskId")String taskId,
                                          @RequestBody TaskValueDto taskDto){

        taskDto.setCurrentPositionId(ContextUtils.getCurrentPosition().getId());

        return  taskService.editTask(ContextUtils.fetchContext(),taskDto);
    }

    @PutMapping("/bonus-points/{taskId}")
    public @ResponseBody void editTaskBonusPoints(@PathVariable("taskId")String taskId,
                                          @RequestBody TaskBonusPointsValueDto taskDto){

        taskService.editTaskBonusPoints(ContextUtils.fetchContext(), taskDto);
    }

    @PostMapping(value="/complete/{taskId}")
    public @ResponseBody void completeTask(@PathVariable("taskId")String taskId){

        taskService.completeTask(ContextUtils.fetchContext(), taskId);
    }

    @PostMapping(value="/restart/{taskId}")
    public @ResponseBody void restartTask(@PathVariable("taskId")String taskId){

        taskService.restartTask(ContextUtils.fetchContext(), taskId);
    }

    @PostMapping(value="/suspend/{taskId}")
    public @ResponseBody void suspendTask(@PathVariable("taskId")String taskId){

        taskService.suspendTask(ContextUtils.fetchContext(), taskId);
    }

    @PostMapping(value="/resume/{taskId}")
    public @ResponseBody void resumeTask(@PathVariable("taskId")String taskId){

        taskService.resumeTask(ContextUtils.fetchContext(), taskId);
    }

    @PostMapping(value="/audit/{taskId}")
    public @ResponseBody void auditTask(@PathVariable("taskId")String taskId){

        taskService.auditTask(ContextUtils.fetchContext(), taskId);
    }

    @PostMapping(value="/revoke-audit/{taskId}")
    public @ResponseBody void revokeAuditTask(@PathVariable("taskId")String taskId){

        taskService.revokeTaskAudit(ContextUtils.fetchContext(), taskId);
    }

    @PostMapping(value="/archive/{taskId}")
    public @ResponseBody void archiveTask(@PathVariable("taskId")String taskId){

        taskService.archiveTask(ContextUtils.fetchContext(), taskId);
    }

    @PostMapping(value="/unarchive/{taskId}")
    public @ResponseBody void unarchiveTask(@PathVariable("taskId")String taskId){

        taskService.unarchiveTask(ContextUtils.fetchContext(), taskId);
    }

    @PostMapping(value="/unreachable/{taskId}")
    public @ResponseBody void markTaskUnreachable(@PathVariable("taskId")String taskId, @RequestBody TaskCommentValueDto value){

        taskService.markTaskUnreachable(ContextUtils.fetchContext(), value);
    }

    @PostMapping(value="/reachable/{taskId}")
    public @ResponseBody void markTaskReachable(@PathVariable("taskId")String taskId,  @RequestBody TaskCommentValueDto value){

        taskService.markTaskReachable(ContextUtils.fetchContext(), value);
    }

    @PostMapping(value="/{taskId}/comment")
    public @ResponseBody void commentTaskById(@PathVariable("taskId")String taskId, @RequestBody TaskCommentValueDto value){

        taskService.commentTaskById(ContextUtils.fetchContext(), value);
    }

    @PostMapping(value="/{taskId}/group")
    public @ResponseBody void editTaskGroupById(@PathVariable("taskId")String taskId, @RequestBody TaskDomainLinkValueDto value){

        taskService.editTaskGroupById(ContextUtils.fetchContext(), value);
    }

    @DeleteMapping("/{taskId}")
    public @ResponseBody void deleteTaskById(@PathVariable("taskId")String taskId){

        taskService.deleteTaskById(ContextUtils.fetchContext(),taskId);
    }

    @GetMapping("/{taskId}")
    public @ResponseBody TaskDto findTaskById(@PathVariable("taskId")String taskId){

        return taskService.findTaskById(ContextUtils.fetchContext(),taskId);
    }


    @GetMapping(value ="/list")
    public @ResponseBody
    List<TaskItemDto> findTaskList(TaskQueryDto params, Limitable limitable){

        if(StringUtils.isBlank(params.getTenantId())){
            params.setTenantId(ContextUtils.getCurrentTenant().getId());
        }
        return taskService.findTaskList(ContextUtils.fetchContext(),params,limitable);
    }

    @GetMapping(value = "/page")
    public @ResponseBody
    PageInfo<TaskItemDto> findTaskPage(TaskQueryDto params,Pageable pageable){

        if(StringUtils.isBlank(params.getTenantId())){
            params.setTenantId(ContextUtils.getCurrentTenant().getId());
        }
        return taskService.findTaskPage(ContextUtils.fetchContext(),params,pageable);
    }

    @GetMapping(value="/owner-{staffId}/count")
    public @ResponseBody
    TaskCountsDto countsOwnerTask(@PathVariable("staffId")String staffId){
        if(StringUtils.isBlank(staffId) || staffId.equals("undefined")){
            staffId = ContextUtils.getCurrentStaff().getId();
        }

        return taskService.countsOwnerTask(ContextUtils.fetchContext(), staffId);
    }

    @GetMapping(value="/participator-{staffId}/count")
    public @ResponseBody
    TaskCountsDto countsParticipatorTask(@PathVariable("staffId")String staffId){
        if(StringUtils.isBlank(staffId) || staffId.equals("undefined")){
            staffId = ContextUtils.getCurrentStaff().getId();
        }

        return taskService.countsParticipatorTask(ContextUtils.fetchContext(), staffId);
    }

    @GetMapping(value="/assignee-{staffId}/count")
    public @ResponseBody
    TaskCountsDto countsAssigneeTask(@PathVariable("staffId")String staffId){
        if(StringUtils.isBlank(staffId) || staffId.equals("undefined")){
            staffId = ContextUtils.getCurrentStaff().getId();
        }

        return taskService.countsAssigneeTask(ContextUtils.fetchContext(), staffId);
    }

    @GetMapping(value="/supervisor-{staffId}/count")
    public @ResponseBody
    TaskCountsDto countsSupervisorTask(@PathVariable("staffId")String staffId){
        if(StringUtils.isBlank(staffId) || staffId.equals("undefined")){
            staffId = ContextUtils.getCurrentStaff().getId();
        }

        return taskService.countsSupervisorTask(ContextUtils.fetchContext(), staffId);
    }

    @GetMapping(value="/auditor-{staffId}/count")
    public @ResponseBody
    Long countsAuditorTask(@PathVariable("staffId")String staffId){
        if(StringUtils.isBlank(staffId) || staffId.equals("undefined")){
            staffId = ContextUtils.getCurrentStaff().getId();
        }

        return taskService.countsAuditorTask(ContextUtils.fetchContext(), staffId);
    }

    @GetMapping(value="/assignee-{staffId}/bouns-point")
    public @ResponseBody
    TaskAssigneeReportDto findStaffTaskBounsPoints(@PathVariable("staffId")String staffId,
               @RequestParam(value="projectId", required = false)String projectId,
               @RequestParam(value="beginTime", required = false)Date beginTime,
               @RequestParam(value="endTime", required = false)Date endTime){

        if(StringUtils.isBlank(staffId) || staffId.equals("undefined")){
            staffId = ContextUtils.getCurrentStaff().getId();
        }

        return taskService.findStaffTaskBounsPoints(ContextUtils.fetchContext(), staffId, projectId,
                beginTime, endTime);
    }

    @GetMapping(value="/assignee-{staffId}/completed")
    public @ResponseBody
    Long countStaffCompletedTask(@PathVariable("staffId")String staffId,
               @RequestParam(value="projectId", required = false)String projectId,
               @RequestParam(value="beginTime", required = false)Date beginTime,
               @RequestParam(value="endTime", required = false)Date endTime){

        if(StringUtils.isBlank(staffId) || staffId.equals("undefined")){
            staffId = ContextUtils.getCurrentStaff().getId();
        }

        return taskService.countStaffCompletedTask(ContextUtils.fetchContext(), staffId, projectId,
                beginTime, endTime);
    }

    @GetMapping(value="/task-assignee-report")
    public @ResponseBody PageInfo<TaskAssigneeReportDto> reportTaskByAssignee(@RequestParam(value="staffId", required = false)String staffId,
                                                                              @RequestParam(value="projectId", required = false)String projectId,
                                                                              @RequestParam(value="beginTime", required = false)Date beginTime,
                                                                              @RequestParam(value="endTime", required = false)Date endTime,
                                                                              Pageable pageable){

        return taskService.reportTaskByAssignee(ContextUtils.fetchContext(), staffId, projectId, beginTime, endTime, pageable);
    }

    @GetMapping(value="/task-project-report")
    public @ResponseBody PageInfo<TaskProjectReportDto> reportTaskByProject(@RequestParam(value="staffId", required = false)String staffId,
                                                                              @RequestParam(value="projectId", required = false)String projectId,
                                                                              @RequestParam(value="beginTime", required = false)Date beginTime,
                                                                              @RequestParam(value="endTime", required = false)Date endTime,
                                                                              Pageable pageable){

        return taskService.reportTaskByProject(ContextUtils.fetchContext(), staffId, projectId, beginTime, endTime, pageable);
    }

    @InitBinder
    public void initBinder(WebDataBinder binder) {
        binder.registerCustomEditor(Date.class, new DateConverter());
    }
}
