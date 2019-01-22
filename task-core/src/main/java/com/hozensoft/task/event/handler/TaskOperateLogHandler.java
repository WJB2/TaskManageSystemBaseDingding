package com.hozensoft.task.event.handler;

import com.hozensoft.system.utils.bean.ContextHolder;
import com.hozensoft.task.TmEventConst;
import com.hozensoft.task.core.domain.TaskOperateLog;
import com.hozensoft.task.core.domain.TaskOperateLogStaffLink;
import com.hozensoft.task.core.dto.TaskDto;
import com.hozensoft.task.core.service.TaskOperateLogService;
import com.hozensoft.task.core.service.TaskOperateLogStaffLinkService;
import com.hozensoft.task.enumeration.TaskOperateTypeEnum;
import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jms.annotation.JmsListener;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.LinkedList;
import java.util.List;

@Component
public class TaskOperateLogHandler {

    @Autowired
    private TaskOperateLogService logService;

    @Autowired
    private TaskOperateLogStaffLinkService taskOperateLogStaffLinkService;

    @JmsListener(
            destination = TmEventConst.TM_QUEUE,
            selector = "JMSType='" + TmEventConst.TM_TASK_CREATED + "'"
    )
    public void onTaskCreatedEvent(TaskDto taskDto){

        TaskOperateLog log = new TaskOperateLog();

        ContextHolder holder = new ContextHolder();
        holder.setTenantId(taskDto.getTenantId());
        log.setTaskId(taskDto.getId());
        log.setOperateById(taskDto.getCreatedById());
        log.setOperateTime(new Date());
        log.setOpType(TaskOperateTypeEnum.NEW);
        log.setDescription(TaskOperateTypeEnum.NEW.getDescription());

        logService.addTaskOperateLog(holder, log);
        addTaskOperateLogStaffLink(taskDto, log);
    }

    @JmsListener(
            destination = TmEventConst.TM_QUEUE,
            selector = "JMSType='" + TmEventConst.TM_TASK_EDITED + "'"
    )
    public void onTaskEditedEvent(TaskDto taskDto){

        TaskOperateLog log = new TaskOperateLog();

        ContextHolder holder = new ContextHolder();
        holder.setTenantId(taskDto.getTenantId());
        log.setTaskId(taskDto.getId());
        log.setOperateById(taskDto.getUpdatedById());
        log.setOperateTime(new Date());
        log.setOpType(TaskOperateTypeEnum.EDIT);
        log.setDescription(TaskOperateTypeEnum.EDIT.getDescription());

        logService.addTaskOperateLog(holder, log);
        try{
            addTaskOperateLogStaffLink(taskDto, log);
        }catch (Exception ex){
            ex.printStackTrace();
        }
    }

    @JmsListener(
            destination = TmEventConst.TM_QUEUE,
            selector = "JMSType='" + TmEventConst.TM_TASK_COMPLETED + "'"
    )
    public void onTaskCompletedEvent(TaskDto taskDto){

        TaskOperateLog log = new TaskOperateLog();

        ContextHolder holder = new ContextHolder();
        holder.setTenantId(taskDto.getTenantId());
        log.setTaskId(taskDto.getId());
        log.setOperateById(taskDto.getUpdatedById());
        log.setOperateTime(new Date());
        log.setOpType(TaskOperateTypeEnum.COMPLETE);
        log.setDescription(TaskOperateTypeEnum.COMPLETE.getDescription());

        logService.addTaskOperateLog(holder, log);
        addTaskOperateLogStaffLink(taskDto, log);
    }

    @JmsListener(
            destination = TmEventConst.TM_QUEUE,
            selector = "JMSType='" + TmEventConst.TM_TASK_AUDITED + "'"
    )
    public void onTaskAuditedEvent(TaskDto taskDto){

        TaskOperateLog log = new TaskOperateLog();

        ContextHolder holder = new ContextHolder();
        holder.setTenantId(taskDto.getTenantId());
        log.setTaskId(taskDto.getId());
        log.setOperateById(taskDto.getUpdatedById());
        log.setOperateTime(new Date());
        log.setOpType(TaskOperateTypeEnum.AUDIT);
        log.setDescription(TaskOperateTypeEnum.AUDIT.getDescription());

        logService.addTaskOperateLog(holder, log);
        addTaskOperateLogStaffLink(taskDto, log);
    }

    @JmsListener(
            destination = TmEventConst.TM_QUEUE,
            selector = "JMSType='" + TmEventConst.TM_TASK_AUDIT_REVOKED + "'"
    )
    public void onTaskAuditRevokedEvent(TaskDto taskDto){

        TaskOperateLog log = new TaskOperateLog();

        ContextHolder holder = new ContextHolder();
        holder.setTenantId(taskDto.getTenantId());
        log.setTaskId(taskDto.getId());
        log.setOperateById(taskDto.getUpdatedById());
        log.setOperateTime(new Date());
        log.setOpType(TaskOperateTypeEnum.REVOKE_AUTID);
        log.setDescription(TaskOperateTypeEnum.REVOKE_AUTID.getDescription());

        logService.addTaskOperateLog(holder, log);
        addTaskOperateLogStaffLink(taskDto, log);
    }

    @JmsListener(
            destination = TmEventConst.TM_QUEUE,
            selector = "JMSType='" + TmEventConst.TM_TASK_RESTARTED + "'"
    )
    public void onTaskRestartedEvent(TaskDto taskDto){

        TaskOperateLog log = new TaskOperateLog();

        ContextHolder holder = new ContextHolder();
        holder.setTenantId(taskDto.getTenantId());
        log.setTaskId(taskDto.getId());
        log.setOperateById(taskDto.getUpdatedById());
        log.setOperateTime(new Date());
        log.setOpType(TaskOperateTypeEnum.RESTART);
        log.setDescription(TaskOperateTypeEnum.RESTART.getDescription());

        logService.addTaskOperateLog(holder, log);
        addTaskOperateLogStaffLink(taskDto, log);
    }

    @JmsListener(
            destination = TmEventConst.TM_QUEUE,
            selector = "JMSType='" + TmEventConst.TM_TASK_SUSPENDED + "'"
    )
    public void onTaskSuspendedEvent(TaskDto taskDto){

        TaskOperateLog log = new TaskOperateLog();

        ContextHolder holder = new ContextHolder();
        holder.setTenantId(taskDto.getTenantId());
        log.setTaskId(taskDto.getId());
        log.setOperateById(taskDto.getUpdatedById());
        log.setOperateTime(new Date());
        log.setOpType(TaskOperateTypeEnum.SUSPEND);
        log.setDescription(TaskOperateTypeEnum.SUSPEND.getDescription());

        logService.addTaskOperateLog(holder, log);
        addTaskOperateLogStaffLink(taskDto, log);
    }

    @JmsListener(
            destination = TmEventConst.TM_QUEUE,
            selector = "JMSType='" + TmEventConst.TM_TASK_RESUME + "'"
    )
    public void onTaskResumeEvent(TaskDto taskDto){

        TaskOperateLog log = new TaskOperateLog();

        ContextHolder holder = new ContextHolder();
        holder.setTenantId(taskDto.getTenantId());
        log.setTaskId(taskDto.getId());
        log.setOperateById(taskDto.getUpdatedById());
        log.setOperateTime(new Date());
        log.setOpType(TaskOperateTypeEnum.RESUME);
        log.setDescription(TaskOperateTypeEnum.RESUME.getDescription());

        logService.addTaskOperateLog(holder, log);
        addTaskOperateLogStaffLink(taskDto, log);
    }

    @JmsListener(
            destination = TmEventConst.TM_QUEUE,
            selector = "JMSType='" + TmEventConst.TM_TASK_ARCHIVED + "'"
    )
    public void onTaskArchivedEvent(TaskDto taskDto){

        TaskOperateLog log = new TaskOperateLog();

        ContextHolder holder = new ContextHolder();
        holder.setTenantId(taskDto.getTenantId());
        log.setTaskId(taskDto.getId());
        log.setOperateById(taskDto.getUpdatedById());
        log.setOperateTime(new Date());
        log.setOpType(TaskOperateTypeEnum.ARCHIVE);
        log.setDescription(TaskOperateTypeEnum.ARCHIVE.getDescription());

        logService.addTaskOperateLog(holder, log);
        addTaskOperateLogStaffLink(taskDto, log);
    }

    @JmsListener(
            destination = TmEventConst.TM_QUEUE,
            selector = "JMSType='" + TmEventConst.TM_TASK_UNARCHIVED + "'"
    )
    public void onTaskUnarchivedEvent(TaskDto taskDto){

        TaskOperateLog log = new TaskOperateLog();

        ContextHolder holder = new ContextHolder();
        holder.setTenantId(taskDto.getTenantId());
        log.setTaskId(taskDto.getId());
        log.setOperateById(taskDto.getUpdatedById());
        log.setOperateTime(new Date());
        log.setOpType(TaskOperateTypeEnum.UNARCHIVE);
        log.setDescription(TaskOperateTypeEnum.UNARCHIVE.getDescription());

        logService.addTaskOperateLog(holder, log);
        addTaskOperateLogStaffLink(taskDto, log);
    }

    @JmsListener(
            destination = TmEventConst.TM_QUEUE,
            selector = "JMSType='" + TmEventConst.TM_TASK_DELETED + "'"
    )
    public void onTaskDeletedEvent(TaskDto taskDto){

        TaskOperateLog log = new TaskOperateLog();

        ContextHolder holder = new ContextHolder();
        holder.setTenantId(taskDto.getTenantId());
        log.setTaskId(taskDto.getId());
        log.setOperateById(taskDto.getUpdatedById());
        log.setOperateTime(new Date());
        log.setOpType(TaskOperateTypeEnum.DELETE);
        log.setDescription(TaskOperateTypeEnum.DELETE.getDescription());

        logService.addTaskOperateLog(holder, log);
        addTaskOperateLogStaffLink(taskDto, log);
    }

    protected void addTaskOperateLogStaffLink(TaskDto taskDto, TaskOperateLog taskOperateLog){

        List<String> staffIdList = new LinkedList<>();

        if(!CollectionUtils.isEmpty(taskDto.getAssigneeIdList())){
            staffIdList.addAll(taskDto.getAssigneeIdList());
        }

        if(!CollectionUtils.isEmpty(taskDto.getSupervisorIdList())){
            staffIdList.addAll(taskDto.getSupervisorIdList());
        }

        if(StringUtils.isNotBlank(taskDto.getCreatedById())){
            staffIdList.add(taskDto.getCreatedById());
        }

        if(CollectionUtils.isEmpty(staffIdList)){
            return;
        }

        List<TaskOperateLogStaffLink> linkList = new LinkedList<>();

        staffIdList.stream().distinct().forEach((staffId)->{
            TaskOperateLogStaffLink link = new TaskOperateLogStaffLink();

            link.setOperateLogId(taskOperateLog.getId());
            link.setReaded(false);
            link.setSortNo(10);
            link.setStaffId(staffId);
            link.setTaskId(taskDto.getId());
            link.setTenantId(taskDto.getTenantId());

            linkList.add(link);
        });

        taskOperateLogStaffLinkService.addTaskOperateLogStaffLink(null, linkList);
    }
}
