package com.hozensoft.task.core.service.impl;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.google.common.collect.Lists;
import com.hozensoft.struct.pagehelper.Limitable;
import com.hozensoft.struct.pagehelper.Pageable;
import com.hozensoft.system.core.domain.Staff;
import com.hozensoft.system.core.dto.*;
import com.hozensoft.system.core.service.OrganizationService;
import com.hozensoft.system.core.service.PositionService;
import com.hozensoft.system.core.service.StaffService;
import com.hozensoft.system.file.domain.FileInfoLink;
import com.hozensoft.system.file.dto.FileInfoItemDto;
import com.hozensoft.system.file.dto.FileInfoLinkQueryDto;
import com.hozensoft.system.file.dto.FileInfoQueryDto;
import com.hozensoft.system.file.service.FileInfoLinkService;
import com.hozensoft.system.file.service.FileService;
import com.hozensoft.system.utils.ContextUtils;
import com.hozensoft.system.utils.awared.CreatedAwared;
import com.hozensoft.system.utils.awared.UpdatedAwared;
import com.hozensoft.system.utils.bean.ContextHolder;
import com.hozensoft.task.TmFileConst;
import com.hozensoft.task.core.dao.query.TaskQuery;
import com.hozensoft.task.core.dao.repo.TaskDomainLinkRepo;
import com.hozensoft.task.core.dao.repo.TaskOperateLogRepo;
import com.hozensoft.task.core.dao.repo.TaskRepo;
import com.hozensoft.task.core.dao.repo.TaskStaffDomainLinkRepo;
import com.hozensoft.task.core.domain.*;
import com.hozensoft.task.core.dto.*;
import com.hozensoft.task.core.service.ProjectService;
import com.hozensoft.task.core.service.TaskService;
import com.hozensoft.task.core.service.TaskTagService;
import com.hozensoft.task.core.transformer.TaskTransformer;
import com.hozensoft.task.enumeration.TaskOperateTypeEnum;
import com.hozensoft.task.enumeration.TaskSortByEnum;
import com.hozensoft.task.enumeration.TaskTypeEnum;
import com.hozensoft.task.event.dispatcher.TaskDispatcher;
import com.hozensoft.task.exception.TaskIncompletedException;
import com.hozensoft.utils.beans.BeanUtils;
import com.hozensoft.utils.persistent.IdGen;
import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class TaskServiceImpl implements TaskService {

    @Autowired
    private TaskRepo taskRepo;

    @Autowired
    private TaskQuery taskQuery;

    @Autowired
    private TaskService taskService;

    @Autowired
    private PositionService positionService;

    @Autowired
    private StaffService staffService;

    @Autowired
    private FileInfoLinkService fileInfoLinkService;

    @Autowired
    private TaskDomainLinkRepo taskDomainLinkRepo;

    @Autowired
    private TaskOperateLogRepo taskOperateLogRepo;

    @Autowired
    private TaskTagService taskTagService;

    @Autowired
    private FileService fileService;

    @Autowired
    private OrganizationService organizationService;

    @Autowired
    private TaskDispatcher taskDispatcher;

    @Autowired
    private ProjectService projectService;

    @Autowired
    private TaskStaffDomainLinkRepo taskStaffDomainLinkRepo;

    @Override
    @Transactional
    public TaskDto addTask(ContextHolder holder, TaskValueDto taskDto) {

        Task task = TaskTransformer.transforTaskAddtoDomain(taskDto);

        PositionDto currentPosition = positionService.findPositionById(holder, taskDto.getCurrentPositionId());
        ContextUtils.applyAwaredContext(currentPosition, task, CreatedAwared.class, UpdatedAwared.class);

        task.setTenantId(holder.getTenantId());
        task.setDeletedFlag(false);
        task.setCompleted(false);
        task.setAudited(false);
        task.setArchived(false);
        task.setSuspended(false);
        task.setUnreachable(false);
        task.setOwnerBonusPoints(new BigDecimal(1));
        task.setAssigneeBonusPoints(new BigDecimal(1));
        task.setParticipatorBonusPoints(new BigDecimal(1));
        task.setOpenTimes(0);

        taskRepo.addTask(task);

        List<TaskDomainLink> links = createTaskDomainLink(holder, task);
        if(!CollectionUtils.isEmpty(links)){
            addTaskDomainLinkList(links);
        }

        List<FileInfoLink> fileInfoLinkList = createFileInfoLink(holder, task);
        if(!CollectionUtils.isEmpty(fileInfoLinkList)){
            fileInfoLinkService.addFileInfoLinkList(holder, fileInfoLinkList);
        }

        TaskDto outDto = findTaskById(holder, task.getId());

        taskDispatcher.dispatchTaskCreatedEvent(outDto);

        return outDto;
    }

    @Override
    @Transactional
    public TaskDto editTask(ContextHolder holder, TaskValueDto taskDto) {

        Task task = TaskTransformer.transforTaskAddtoDomain(taskDto);

        TaskDomainLinkQueryDto linkParams = TaskDomainLinkQueryDto.builder().
                tenantId(holder.getTenantId()).
                taskId(Arrays.asList(taskDto.getId())).
                taskField(Arrays.asList("assigneeIdList")).
                domainType(Arrays.asList(Staff.class.getSimpleName())).
                build();
        List<TaskDomainLink> originalTaskDomainLinks = taskDomainLinkRepo.loadTaskDomainLinkList(linkParams);

        fileInfoLinkService.deleteFileInfoLinkListByDomain(holder, TmFileConst.TM_M_TASK, null, task.getId());
        taskDomainLinkRepo.deleteLinksByTaskInfo(holder.getTenantId(), task.getId(), null, null);

        PositionDto currentPosition = positionService.findPositionById(holder, taskDto.getCurrentPositionId());
        ContextUtils.applyAwaredContext(currentPosition, task, UpdatedAwared.class);

        taskRepo.patchEditTask(task);

        List<TaskDomainLink> links = createTaskDomainLink(holder, task);

        links.stream().filter((link)->{
            return "assigneeIdList".equals(link.getTaskField());
        }).forEach((link)->{
            Optional<TaskDomainLink> taskDomainLink = originalTaskDomainLinks.stream().filter(oLink->oLink.getDomainId().equals(link.getDomainId())).findFirst();

            taskDomainLink.ifPresent((t)->{
               link.setCompleted(t.getCompleted());
               link.setCompletedTime(new Date());
            });
        });

        if(!CollectionUtils.isEmpty(links)){
            addTaskDomainLinkList(links);
        }

        List<FileInfoLink> fileInfoLinkList = createFileInfoLink(holder, task);
        if(!CollectionUtils.isEmpty(fileInfoLinkList)){
            fileInfoLinkService.addFileInfoLinkList(holder, fileInfoLinkList);
        }

        TaskDto outDto = findTaskById(holder, task.getId());

        taskDispatcher.dispatchTaskEditedEvent(outDto);

        return outDto;
    }

    @Override
    @Transactional
    public TaskDto patchEditTask(ContextHolder holder, TaskValueDto taskDto) {

        Task task = TaskTransformer.transforTaskAddtoDomain(taskDto);

        TaskDomainLinkQueryDto linkParams = TaskDomainLinkQueryDto.builder().
                tenantId(holder.getTenantId()).
                taskId(Arrays.asList(taskDto.getId())).
                taskField(Arrays.asList("assigneeIdList")).
                domainType(Arrays.asList(Staff.class.getSimpleName())).
                build();
        List<TaskDomainLink> originalTaskDomainLinks = taskDomainLinkRepo.loadTaskDomainLinkList(linkParams);

        if(task.getImageIdList()!=null){
            fileInfoLinkService.deleteFileInfoLinkListByDomain(holder, TmFileConst.TM_M_TASK, "imageIdList", task.getId());
        }
        if(task.getAttachmentIdList()!=null){
            fileInfoLinkService.deleteFileInfoLinkListByDomain(holder, TmFileConst.TM_M_TASK, "attachmentIdList", task.getId());
        }

        List<String> domainFields = new ArrayList<>();
        if(task.getTagIdList()!=null){
            domainFields.add("tagIdList");
        }
        if(task.getAssigneeIdList()!=null){
            domainFields.add("assigneeIdList");
        }
        if(task.getSupervisorIdList()!=null){
            domainFields.add("supervisorIdList");
        }
        if(!CollectionUtils.isEmpty(domainFields)){
            taskDomainLinkRepo.deleteLinksByTaskInfo(holder.getTenantId(), task.getId(), domainFields, null);
        }

        PositionDto currentPosition = positionService.findPositionById(holder, taskDto.getCurrentPositionId());
        ContextUtils.applyAwaredContext(currentPosition, task, UpdatedAwared.class);

        taskRepo.patchEditTask(task);

        List<TaskDomainLink> links = createTaskDomainLink(holder, task);

        links.stream().filter((link)->{
            return "assigneeIdList".equals(link.getTaskField());
        }).forEach((link)->{
            Optional<TaskDomainLink> taskDomainLink = originalTaskDomainLinks.stream().filter(oLink->oLink.getDomainId().equals(link.getDomainId())).findFirst();

            taskDomainLink.ifPresent((t)->{
                link.setCompleted(t.getCompleted());
                link.setCompletedTime(new Date());
            });
        });

        if(!CollectionUtils.isEmpty(links)){
            addTaskDomainLinkList(links);
        }

        List<FileInfoLink> fileInfoLinkList = createFileInfoLink(holder, task);
        if(!CollectionUtils.isEmpty(fileInfoLinkList)){
            fileInfoLinkService.addFileInfoLinkList(holder, fileInfoLinkList);
        }

        TaskDto outDto = findTaskById(holder, task.getId());

        taskDispatcher.dispatchTaskEditedEvent(outDto);

        return outDto;
    }

    @Override
    public void editTaskBonusPoints(ContextHolder holder, TaskBonusPointsValueDto taskBonusPointsValueDto) {
        Task task = new Task();

        BeanUtils.copyProperties(taskBonusPointsValueDto, task);
        PositionDto currentPosition = positionService.findPositionById(holder, holder.getPositionId());
        ContextUtils.applyAwaredContext(currentPosition, task, UpdatedAwared.class);

        taskRepo.patchEditTask(task);
    }

    @Override
    @Transactional
    public void deleteTaskById(ContextHolder holder, String taskId) {
        Task task = taskRepo.loadTaskById(taskId);

        task.setDeletedFlag(true);
        task.setDeletedById(holder.getStaffId());
        task.setDeletedOrgId(holder.getOrgId());
        task.setDeletedTime(new Date());

        PositionDto currentPosition = positionService.findPositionById(holder, holder.getPositionId());
        ContextUtils.applyAwaredContext(currentPosition, task, UpdatedAwared.class);

        taskRepo.patchEditTask(task);

        TaskDto taskDto = findTaskById(holder, taskId);
        taskDispatcher.dispatchTaskDeletedEvent(taskDto);
    }

    @Override
    @Transactional
    public TaskDto findTaskById(ContextHolder holder, String taskId) {

        TaskDto task = taskQuery.findTaskById(taskId);

        if(task==null){
            return null;
        }

        TaskDomainLinkQueryDto taskDomainLinkParams = TaskDomainLinkQueryDto.builder().tenantId(holder.getTenantId()).taskId(Arrays.asList(taskId)).build();
        FileInfoLinkQueryDto fileInfoLinkParams = FileInfoLinkQueryDto.builder().tenantId(holder.getTenantId()).
                domainType(Arrays.asList(TmFileConst.TM_M_TASK)).domainId(Arrays.asList(taskId)).build();

        List<TaskDomainLink> domainLinks = taskDomainLinkRepo.loadTaskDomainLinkList(taskDomainLinkParams);
        List<FileInfoLink> fileLinks = fileInfoLinkService.loadFileInfoLink(holder, fileInfoLinkParams);

        List<FileInfoItemDto> fileInfoList = Collections.emptyList();
        if(!CollectionUtils.isEmpty(fileLinks)){
            FileInfoQueryDto fileInfoParams = FileInfoQueryDto.builder().tenantId(holder.getTenantId()).id(fileLinks.stream().map(link->link.getFileId()).collect(Collectors.toList())).build();
            fileInfoList = fileService.findFileInfoList(holder, fileInfoParams, new Limitable());
        }
        Map<String, FileInfoItemDto> fileInfoHash = fileInfoList.stream().collect(Collectors.toMap(FileInfoItemDto::getId, item->item));

        List<String> staffIdList = new ArrayList<>();
        List<String> orgIdList = new ArrayList<>();

        if(!CollectionUtils.isEmpty(domainLinks)){
            task.setAssigneeIdList(domainLinks.stream().
                    filter(item->"assigneeIdList".equals(item.getTaskField())).
                    map(item->item.getDomainId()).
                    collect(Collectors.toList()));
            staffIdList.addAll(task.getAssigneeIdList());

            task.setParticipatorIdList(domainLinks.stream().
                    filter(item->"participatorIdList".equals(item.getTaskField())).
                    map(item->item.getDomainId()).
                    collect(Collectors.toList()));
            staffIdList.addAll(task.getParticipatorIdList());

            task.setSupervisorIdList(domainLinks.stream().
                    filter(item->"supervisorIdList".equals(item.getTaskField())).
                    map(item->item.getDomainId()).
                    collect(Collectors.toList()));
            staffIdList.addAll(task.getSupervisorIdList());

            task.setAuditorIdList(domainLinks.stream().
                    filter(item->"auditorIdList".equals(item.getTaskField())).
                    map(item->item.getDomainId()).
                    collect(Collectors.toList()));
            staffIdList.addAll(task.getAuditorIdList());

            task.setTagIdList(domainLinks.stream().
                    filter(item->"tagIdList".equals(item.getTaskField())).
                    map(item->item.getDomainId()).
                    collect(Collectors.toList()));
        }

        if(StringUtils.isNotBlank(task.getCreatedById())){
            staffIdList.add(task.getCreatedById());
        }
        if(StringUtils.isNotBlank(task.getUpdatedById())){
            staffIdList.add(task.getUpdatedById());
        }
        if(StringUtils.isNotBlank(task.getDeletedById())){
            staffIdList.add(task.getDeletedById());
        }
        if(StringUtils.isNotBlank(task.getCompletedById())){
            staffIdList.add(task.getCompletedById());
        }
        if(StringUtils.isNotBlank(task.getSuspendedById())){
            staffIdList.add(task.getSuspendedById());
        }
        if(StringUtils.isNotBlank(task.getArchivedById())){
            staffIdList.add(task.getArchivedById());
        }
        if(StringUtils.isNotBlank(task.getCreatedOrgId())){
            orgIdList.add(task.getCreatedOrgId());
        }
        if(StringUtils.isNotBlank(task.getUpdatedOrgId())){
            orgIdList.add(task.getUpdatedOrgId());
        }
        if(StringUtils.isNotBlank(task.getDeletedOrgId())){
            orgIdList.add(task.getDeletedOrgId());
        }

        if(!CollectionUtils.isEmpty(task.getTagIdList())){
            TaskTagQueryDto tagParams = TaskTagQueryDto.builder().tenantId(holder.getTenantId()).id(task.getTagIdList()).build();
            List<TaskTagItemDto> tagList = taskTagService.findTaskTagList(holder, tagParams, new Limitable());
            task.setTagList(tagList);
        }

        if(!CollectionUtils.isEmpty(staffIdList)){
            StaffQueryDto staffParams = StaffQueryDto.builder().tenantId(holder.getTenantId()).id(staffIdList).build();

            List<StaffItemDto> staffList = staffService.findStaffList(holder, staffParams, new Limitable());
            Map<String, StaffItemDto> staffHash = staffList.stream().collect(Collectors.toMap(StaffItemDto::getId, item->item));

            if(!CollectionUtils.isEmpty(task.getAssigneeIdList())){
                task.setAssigneeList(task.getAssigneeIdList().stream().map((id)->staffHash.get(id)).filter(item->item!=null).collect(Collectors.toList()));
            }
            if(!CollectionUtils.isEmpty(task.getParticipatorIdList())){
                task.setParticipatorList(task.getParticipatorIdList().stream().map((id)->staffHash.get(id)).filter(item->item!=null).collect(Collectors.toList()));
            }
            if(!CollectionUtils.isEmpty(task.getSupervisorIdList())){
                task.setSupervisorList(task.getSupervisorIdList().stream().map((id)->staffHash.get(id)).filter(item->item!=null).collect(Collectors.toList()));
            }
            if(!CollectionUtils.isEmpty(task.getAuditorIdList())){
                task.setAuditorList(task.getAuditorIdList().stream().map((id)->staffHash.get(id)).filter(item->item!=null).collect(Collectors.toList()));
            }
            task.setCreatedBy(staffHash.get(task.getCreatedById()));
            task.setUpdatedBy(staffHash.get(task.getUpdatedById()));
            task.setDeletedBy(staffHash.get(task.getDeletedById()));
            task.setCompletedBy(staffHash.get(task.getCompletedById()));
            task.setSuspendedBy(staffHash.get(task.getSuspendedById()));
            task.setArchivedBy(staffHash.get(task.getArchivedById()));
        }

        if(!CollectionUtils.isEmpty(orgIdList)){
            OrganizationQueryDto orgParams = OrganizationQueryDto.builder().tenantId(holder.getTenantId()).id(orgIdList).build();

            List<OrganizationItemDto> orgList = organizationService.findOrganizationList(holder, orgParams, new Limitable());
            Map<String, OrganizationItemDto> orgHash = orgList.stream().collect(Collectors.toMap(OrganizationItemDto::getId, item->item));

            task.setCreatedOrg(orgHash.get(task.getCreatedOrgId()));
            task.setUpdatedOrg(orgHash.get(task.getUpdatedOrgId()));
            task.setDeletedOrg(orgHash.get(task.getDeletedOrgId()));
        }

        if(!CollectionUtils.isEmpty(fileLinks)){
            task.setImageIdList(fileLinks.stream().
                    filter(img->TmFileConst.TM_F_TASK_IMAGE.equals(img.getDomainField())).
                    map(img->img.getFileId()).
                    collect(Collectors.toList()));
            task.setImageList(task.getImageIdList().stream().map(id->fileInfoHash.get(id)).collect(Collectors.toList()));

            task.setAttachmentIdList(fileLinks.stream().
                    filter(att->TmFileConst.TM_F_TASK_ATTACH.equals(att.getDomainField())).
                    map(att->att.getFileId()).
                    collect(Collectors.toList()));
            task.setAttachmentList(task.getAttachmentIdList().stream().map(id->fileInfoHash.get(id)).collect(Collectors.toList()));
        }

        return task;
    }

    @Override
    public Task loadTaskById(ContextHolder holder, String taskId) {

        Task task = taskRepo.loadTaskById(taskId);

        TaskDomainLinkQueryDto taskDomainLinkParams = TaskDomainLinkQueryDto.builder().tenantId(holder.getTenantId()).taskId(Arrays.asList(taskId)).build();
        FileInfoLinkQueryDto fileInfoLinkParams = FileInfoLinkQueryDto.builder().tenantId(holder.getTenantId()).
                domainType(Arrays.asList(TmFileConst.TM_M_TASK)).domainId(Arrays.asList(taskId)).build();

        List<TaskDomainLink> domainLinks = taskDomainLinkRepo.loadTaskDomainLinkList(taskDomainLinkParams);
        List<FileInfoLink> fileLinks = fileInfoLinkService.loadFileInfoLink(holder, fileInfoLinkParams);


        if(!CollectionUtils.isEmpty(domainLinks)){
            task.setAssigneeIdList(domainLinks.stream().
                    filter(item->"assigneeIdList".equals(item.getTaskField())).
                    map(item->item.getDomainId()).
                    collect(Collectors.toList()));

            task.setSupervisorIdList(domainLinks.stream().
                    filter(item->"supervisorIdList".equals(item.getTaskField())).
                    map(item->item.getDomainId()).
                    collect(Collectors.toList()));

            task.setParticipatorIdList(domainLinks.stream().
                    filter(item->"participatorIdList".equals(item.getTaskField())).
                    map(item->item.getDomainId()).
                    collect(Collectors.toList()));

            task.setTagIdList(domainLinks.stream().
                    filter(item->"tagIdList".equals(item.getTaskField())).
                    map(item->item.getDomainId()).
                    collect(Collectors.toList()));
        }

        if(!CollectionUtils.isEmpty(fileLinks)){
            task.setImageIdList(fileLinks.stream().
                    filter(img->TmFileConst.TM_F_TASK_IMAGE.equals(img.getDomainField())).
                    map(img->img.getFileId()).
                    collect(Collectors.toList()));

            task.setAttachmentIdList(fileLinks.stream().
                    filter(img->TmFileConst.TM_F_TASK_ATTACH.equals(img.getDomainField())).
                    map(img->img.getFileId()).
                    collect(Collectors.toList()));
        }

        return task;
    }

    @Override
    public List<TaskItemDto> findTaskList(ContextHolder holder, TaskQueryDto params, Limitable limitable) {

        params.setTenantId(holder.getTenantId());
        params.setCurrentStaffId(holder.getStaffId());
        params.setCurrentTime(new Date());
        if(params.getSortBy()==null){
            params.setSortBy(TaskSortByEnum.CREATED_TIME_ASC);
        }

        PageHelper.offsetPage(limitable.getOffset(), limitable.getLimit());

        List<TaskItemDto> list = taskQuery.findTaskList(params);

        fillLinkedDomains(holder, list);
        fillTaskFileInfo(holder, list);

        return list;
    }

    @Override
    public PageInfo<TaskItemDto> findTaskPage(ContextHolder holder, TaskQueryDto params, Pageable pageable) {

        params.setTenantId(holder.getTenantId());
        params.setCurrentStaffId(holder.getStaffId());
        params.setCurrentTime(new Date());
        if(params.getSortBy()==null){
            params.setSortBy(TaskSortByEnum.CREATED_TIME_ASC);
        }

        PageHelper.startPage(pageable.getPage(), pageable.getPageSize());

        List<TaskItemDto> list = taskQuery.findTaskList(params);

        fillLinkedDomains(holder, list);
        fillTaskFileInfo(holder, list);

        return new PageInfo<>(list);
    }

    @Override
    @Transactional
    public void completeTask(ContextHolder holder, String taskId) {

        Task task = taskRepo.loadTaskById(taskId);

        boolean taskFinished = true;

        if(TaskTypeEnum.CORPORATE.equals(task.getTaskType())){
            TaskDomainLinkQueryDto linkParams = TaskDomainLinkQueryDto.builder().
                    tenantId(holder.getTenantId()).
                    taskId(Arrays.asList(taskId)).
                    taskField(Arrays.asList("assigneeIdList")).
                    domainType(Arrays.asList(Staff.class.getSimpleName())).
                    build();
            List<TaskDomainLink> links = taskDomainLinkRepo.loadTaskDomainLinkList(linkParams);

            Optional<TaskDomainLink> taskDomainLink = links.stream().
                    filter((link)->(holder.getStaffId().equals(link.getDomainId()))).
                    findFirst();

            taskDomainLink.ifPresent((link)->{
                link.setCompleted(true);
                link.setCompletedTime(new Date());
                taskDomainLinkRepo.editLink(link);
            });

            for(TaskDomainLink link : links){
                if(!link.getCompleted()){
                    taskFinished = false;
                }
            }
        }

        if(taskFinished || TaskTypeEnum.NORMAL.equals(task.getTaskType())){
            task.setProgressStatus(100);
            task.setCompleted(true);
            task.setCompletedById(holder.getStaffId());
            task.setCompletedTime(new Date());
            task.setUpdatedById(holder.getStaffId());
            task.setUpdatedOrgId(holder.getOrgId());
            task.setUpdatedTime(new Date());

            PositionDto currentPosition = positionService.findPositionById(holder, holder.getPositionId());
            ContextUtils.applyAwaredContext(currentPosition, task, UpdatedAwared.class);

            taskRepo.editTaskCompletionInfo(task);

            TaskDto taskDto = findTaskById(holder, taskId);
            taskDispatcher.dispatchTaskCompletedEvent(taskDto);
        }
    }

    @Override
    @Transactional
    public void auditTask(ContextHolder holder, String taskId) {

        Task task = taskRepo.loadTaskById(taskId);

        if(!task.getCompleted()){
            throw new TaskIncompletedException();
        }

        if(task.getAudited()){
            return;
        }

        task.setAudited(true);
        task.setAuditedById(holder.getStaffId());
        task.setAuditedTime(new Date());

        ContextUtils.applyAwaredContext(holder, task, UpdatedAwared.class);

        taskRepo.editTaskAuditInfo(task);

        TaskDto taskDto = findTaskById(holder, taskId);
        taskDispatcher.dispatchTaskAuditedEvent(taskDto);
    }

    @Override
    @Transactional
    public void revokeTaskAudit(ContextHolder holder, String taskId) {

        Task task = taskRepo.loadTaskById(taskId);

        if(!task.getAudited()){
            return;
        }

        task.setAudited(false);
        task.setAuditedById(null);
        task.setAuditedTime(null);

        ContextUtils.applyAwaredContext(holder, task, UpdatedAwared.class);

        taskRepo.editTaskAuditInfo(task);

        TaskDto taskDto = findTaskById(holder, taskId);
        taskDispatcher.dispatchTaskAuditRevokedEvent(taskDto);
    }

    @Override
    @Transactional
    public void restartTask(ContextHolder holder, String taskId) {

        Task task = taskRepo.loadTaskById(taskId);

        task.setProgressStatus(0);
        task.setCompleted(false);
        task.setCompletedById(null);
        task.setCompletedTime(null);
        task.setOpenTimes(task.getOpenTimes()+1);
        task.setUpdatedById(holder.getStaffId());
        task.setUpdatedOrgId(holder.getOrgId());
        task.setUpdatedTime(new Date());

        TaskDomainLinkQueryDto linkParams = TaskDomainLinkQueryDto.builder().
                tenantId(holder.getTenantId()).
                taskId(Arrays.asList(taskId)).
                taskField(Arrays.asList("assigneeIdList")).
                domainType(Arrays.asList(Staff.class.getSimpleName())).
                build();

        List<TaskDomainLink> links = taskDomainLinkRepo.loadTaskDomainLinkList(linkParams);

        links.stream().forEach(link->{
            link.setCompleted(false);
            link.setCompletedTime(null);

            taskDomainLinkRepo.editLink(link);
        });

        PositionDto currentPosition = positionService.findPositionById(holder, holder.getPositionId());
        ContextUtils.applyAwaredContext(currentPosition, task, UpdatedAwared.class);

        taskRepo.editTaskCompletionInfo(task);

        TaskDto taskDto = findTaskById(holder, taskId);
        taskDispatcher.dispatchTaskRestartedEvent(taskDto);
    }

    @Override
    @Transactional
    public void suspendTask(ContextHolder holder, String taskId) {

        Task task = taskRepo.loadTaskById(taskId);

        task.setSuspended(true);
        task.setSuspendedById(holder.getStaffId());
        task.setSuspendedTime(new Date());
        task.setUpdatedById(holder.getStaffId());
        task.setUpdatedOrgId(holder.getOrgId());
        task.setUpdatedTime(new Date());

        PositionDto currentPosition = positionService.findPositionById(holder, holder.getPositionId());
        ContextUtils.applyAwaredContext(currentPosition, task, UpdatedAwared.class);

        taskRepo.editTaskSuspensionInfo(task);

        TaskDto taskDto = findTaskById(holder, taskId);
        taskDispatcher.dispatchTaskSuspendedEvent(taskDto);
    }

    @Override
    @Transactional
    public void markTaskUnreachable(ContextHolder holder, TaskCommentValueDto commentDto) {
        Task task = taskRepo.loadTaskById(commentDto.getTaskId());

        task.setUnreachable(true);

        PositionDto currentPosition = positionService.findPositionById(holder, holder.getPositionId());
        ContextUtils.applyAwaredContext(currentPosition, task, UpdatedAwared.class);

        taskRepo.patchEditTask(task);

        TaskOperateLog log = new TaskOperateLog();

        log.setId(IdGen.generate());
        log.setTenantId(holder.getTenantId());
        log.setTaskId(commentDto.getTaskId());
        log.setOpType(TaskOperateTypeEnum.MARK_UNREACHABLE);
        log.setDescription(TaskOperateTypeEnum.MARK_UNREACHABLE.getDescription() + ": " + commentDto.getComment());
        log.setOperateById(holder.getStaffId());
        log.setOperateTime(new Date());

        taskOperateLogRepo.addTaskOperateLog(log);
    }

    @Override
    @Transactional
    public void markTaskReachable(ContextHolder holder, TaskCommentValueDto commentDto) {
        Task task = taskRepo.loadTaskById(commentDto.getTaskId());

        task.setUnreachable(false);

        PositionDto currentPosition = positionService.findPositionById(holder, holder.getPositionId());
        ContextUtils.applyAwaredContext(currentPosition, task, UpdatedAwared.class);

        taskRepo.patchEditTask(task);

        TaskOperateLog log = new TaskOperateLog();

        log.setId(IdGen.generate());
        log.setTenantId(holder.getTenantId());
        log.setTaskId(commentDto.getTaskId());
        log.setOpType(TaskOperateTypeEnum.MARK_REACHABLE);
        log.setDescription(TaskOperateTypeEnum.MARK_REACHABLE.getDescription() + ": " + commentDto.getComment());
        log.setOperateById(holder.getStaffId());
        log.setOperateTime(new Date());

        taskOperateLogRepo.addTaskOperateLog(log);
    }

    @Override
    @Transactional
    public void resumeTask(ContextHolder holder, String taskId) {
        Task task = taskRepo.loadTaskById(taskId);

        task.setSuspended(false);
        task.setSuspendedById(null);
        task.setSuspendedTime(null);
        task.setUpdatedById(holder.getStaffId());
        task.setUpdatedOrgId(holder.getOrgId());
        task.setUpdatedTime(new Date());

        PositionDto currentPosition = positionService.findPositionById(holder, holder.getPositionId());
        ContextUtils.applyAwaredContext(currentPosition, task, UpdatedAwared.class);

        taskRepo.editTaskSuspensionInfo(task);

        TaskDto taskDto = findTaskById(holder, taskId);
        taskDispatcher.dispatchTaskResumeEvent(taskDto);
    }

    @Override
    @Transactional
    public void archiveTask(ContextHolder holder, String taskId) {
        Task task = taskRepo.loadTaskById(taskId);

        task.setArchived(true);
        task.setArchivedById(holder.getStaffId());
        task.setArchivedTime(new Date());
        task.setUpdatedById(holder.getStaffId());
        task.setUpdatedOrgId(holder.getOrgId());
        task.setUpdatedTime(new Date());

        PositionDto currentPosition = positionService.findPositionById(holder, holder.getPositionId());
        ContextUtils.applyAwaredContext(currentPosition, task, UpdatedAwared.class);

        taskRepo.editTaskArchiveInfo(task);

        TaskDto taskDto = findTaskById(holder, taskId);
        taskDispatcher.dispatchTaskArchivedEvent(taskDto);
    }

    @Override
    @Transactional
    public void unarchiveTask(ContextHolder holder, String taskId) {
        Task task = taskRepo.loadTaskById(taskId);

        task.setArchived(false);
        task.setArchivedById(null);
        task.setArchivedTime(null);
        task.setUpdatedById(holder.getStaffId());
        task.setUpdatedOrgId(holder.getOrgId());
        task.setUpdatedTime(new Date());

        PositionDto currentPosition = positionService.findPositionById(holder, holder.getPositionId());
        ContextUtils.applyAwaredContext(currentPosition, task, UpdatedAwared.class);

        taskRepo.editTaskArchiveInfo(task);

        TaskDto taskDto = findTaskById(holder, taskId);
        taskDispatcher.dispatchTaskUnarchivedEvent(taskDto);
    }

    @Override
    @Transactional
    public void commentTaskById(ContextHolder holder, TaskCommentValueDto commentDto) {

        TaskOperateLog log = new TaskOperateLog();

        log.setId(IdGen.generate());
        log.setTenantId(holder.getTenantId());
        log.setTaskId(commentDto.getTaskId());
        log.setDescription(commentDto.getComment());

        if("PROGRESS".equals(commentDto.getCommentType())){
            log.setOpType(TaskOperateTypeEnum.PROGRESS);
        }else{
            log.setOpType(TaskOperateTypeEnum.COMMENT);
        }

        log.setOperateById(holder.getStaffId());
        log.setOperateTime(new Date());

        taskOperateLogRepo.addTaskOperateLog(log);
    }

    @Override
    @Transactional
    public void editTaskGroupById(ContextHolder holder, TaskDomainLinkValueDto links) {

        taskStaffDomainLinkRepo.deleteLinksByTaskInfo(holder.getTenantId(), links.getTaskId(), holder.getStaffId(),
                Arrays.asList("groupIdList"), Arrays.asList(TaskGroup.class.getSimpleName()));

        if(CollectionUtils.isEmpty(links.getDomainId())){
            return;
        }

        Lists.partition(links.getDomainId(), 50).stream().forEach(list->{

            List<TaskStaffDomainLink> linkList = new ArrayList<>(list.size());

            for(int i=0; i<list.size(); i++){
                TaskStaffDomainLink link = new TaskStaffDomainLink();

                link.setId(IdGen.generate());
                link.setTenantId(holder.getTenantId());
                link.setTaskId(links.getTaskId());
                link.setStaffId(holder.getStaffId());
                link.setTaskField("groupIdList");
                link.setDomainId(list.get(i));
                link.setDomainType(TaskGroup.class.getSimpleName());
                link.setSortNo(i+1);

                linkList.add(link);
            }

            taskStaffDomainLinkRepo.addLinks(linkList);
        });
    }

    @Override
    public TaskCountsDto countsOwnerTask(ContextHolder holder, String staffId) {

        TaskCountsDto counts = taskQuery.countsOwnerTask(holder.getTenantId(), staffId, new Date());

        if(counts==null){
            counts = new TaskCountsDto(0L, 0L, 0L);
        }

        return counts;
    }

    @Override
    public TaskCountsDto countsParticipatorTask(ContextHolder holder, String staffId) {

        TaskCountsDto counts = taskQuery.countsParticipatorTask(holder.getTenantId(), staffId, new Date());

        if(counts==null){
            counts = new TaskCountsDto(0L, 0L, 0L);
        }

        return counts;
    }

    @Override
    public TaskCountsDto countsAssigneeTask(ContextHolder holder, String staffId) {

        TaskCountsDto counts = taskQuery.countsAssigneeTask(holder.getTenantId(), staffId, new Date());

        if(counts==null){
            counts = new TaskCountsDto(0L, 0L, 0L);
        }

        return counts;
    }

    @Override
    public Long countsAuditorTask(ContextHolder holder, String staffId) {

        Long amount = taskQuery.countsAuditorTask(holder.getTenantId(), staffId, new Date());

        if(amount==null){
            amount = 0L;
        }

        return amount;
    }

    @Override
    public TaskCountsDto countsSupervisorTask(ContextHolder holder, String staffId) {

        TaskCountsDto counts = taskQuery.countsSupervisorTask(holder.getTenantId(), staffId, new Date());

        if(counts==null){
            counts = new TaskCountsDto(0L, 0L, 0L);
        }

        return counts;
    }

    @Override
    public TaskAssigneeReportDto findStaffTaskBounsPoints(ContextHolder holder, String staffId, String projectId, Date beginTime, Date endTime) {

        List<TaskAssigneeReportDto> list = taskQuery.reportTaskByAssignee(holder.getTenantId(), staffId, projectId, beginTime, endTime, holder.getStaffId(), new Date());

        return CollectionUtils.isNotEmpty(list)?list.get(0):new TaskAssigneeReportDto();
    }

    @Override
    public Long countStaffCompletedTask(ContextHolder holder, String staffId, String projectId, Date beginTime, Date endTime) {

        Long result = taskQuery.countStaffCompletedTask(holder.getTenantId(), staffId, projectId, beginTime, endTime);

        return result!=null?result:0L;
    }

    @Override
    public PageInfo<TaskAssigneeReportDto> reportTaskByAssignee(ContextHolder holder, String staffId, String projectId, Date beginTime, Date endTime, Pageable pageable) {

        PageHelper.startPage(pageable.getPage(), pageable.getPageSize());
        List<TaskAssigneeReportDto> list = taskQuery.reportTaskByAssignee(holder.getTenantId(), staffId, projectId, beginTime, endTime, holder.getStaffId(), new Date());

        if(!list.isEmpty()){
            List<String> staffIdList = list.stream().map(item->item.getAssigneeId()).distinct().collect(Collectors.toList());
            StaffQueryDto staffParams = StaffQueryDto.builder().tenantId(holder.getTenantId()).id(staffIdList).build();
            List<StaffItemDto> staffList = staffService.findStaffList(holder, staffParams, new Limitable());

            Map<String, StaffItemDto> staffMap = staffList.stream().collect(Collectors.toMap(StaffItemDto::getId, item->item));

            list.stream().forEach((item)->{
                item.setAssignee(staffMap.get(item.getAssigneeId()));
            });
        }

        return new PageInfo<>(list);
    }

    @Override
    public PageInfo<TaskProjectReportDto> reportTaskByProject(ContextHolder holder, String staffId, String projectId, Date beginTime, Date endTime, Pageable pageable) {
        PageHelper.startPage(pageable.getPage(), pageable.getPageSize());
        List<TaskProjectReportDto> list = taskQuery.reportTaskByProject(holder.getTenantId(), staffId, projectId, beginTime, endTime, holder.getStaffId(), new Date());

        if(!list.isEmpty()){
            List<String> projectIdList = list.stream().map(item->item.getProjectId()).distinct().collect(Collectors.toList());
            ProjectQueryDto projectParams = ProjectQueryDto.builder().tenantId(holder.getTenantId()).id(projectIdList).build();
            List<ProjectItemDto> projectList = projectService.findProjectList(holder, projectParams, new Limitable());

            Map<String, ProjectItemDto> staffMap = projectList.stream().collect(Collectors.toMap(ProjectItemDto::getId, item->item));

            list.stream().forEach((item)->{
                item.setProject(staffMap.get(item.getProjectId()));
            });
        }

        return new PageInfo<>(list);
    }

    protected List<TaskDomainLink> createTaskDomainLink(ContextHolder holder, Task task){
        List<TaskDomainLink> links = new ArrayList<>();

        if(!CollectionUtils.isEmpty(task.getAssigneeIdList())){
            for(int i=0; i<task.getAssigneeIdList().size(); i++){
                TaskDomainLink link = new TaskDomainLink();

                link.setId(IdGen.generate());
                link.setTenantId(holder.getTenantId());
                link.setTaskId(task.getId());
                link.setDomainType(Staff.class.getSimpleName());
                link.setTaskField("assigneeIdList");
                link.setDomainId(task.getAssigneeIdList().get(i));
                link.setSortNo(i+1);
                link.setCompleted(false);

                links.add(link);
            }
        }

        if(!CollectionUtils.isEmpty(task.getSupervisorIdList())){
            for(int i=0; i<task.getSupervisorIdList().size(); i++){
                TaskDomainLink link = new TaskDomainLink();

                link.setId(IdGen.generate());
                link.setTenantId(holder.getTenantId());
                link.setTaskId(task.getId());
                link.setDomainType(Staff.class.getSimpleName());
                link.setTaskField("supervisorIdList");
                link.setDomainId(task.getSupervisorIdList().get(i));
                link.setSortNo(i+1);
                link.setCompleted(false);

                links.add(link);
            }
        }

        if(!CollectionUtils.isEmpty(task.getParticipatorIdList())){
            for(int i=0; i<task.getParticipatorIdList().size(); i++){
                TaskDomainLink link = new TaskDomainLink();

                link.setId(IdGen.generate());
                link.setTenantId(holder.getTenantId());
                link.setTaskId(task.getId());
                link.setDomainType(Staff.class.getSimpleName());
                link.setTaskField("participatorIdList");
                link.setDomainId(task.getParticipatorIdList().get(i));
                link.setSortNo(i+1);
                link.setCompleted(false);

                links.add(link);
            }
        }

        if(!CollectionUtils.isEmpty(task.getTagIdList())){
            for(int i=0; i<task.getTagIdList().size(); i++){
                TaskDomainLink link = new TaskDomainLink();

                link.setId(IdGen.generate());
                link.setTenantId(holder.getTenantId());
                link.setTaskId(task.getId());
                link.setDomainType(TaskTag.class.getSimpleName());
                link.setTaskField("tagIdList");
                link.setDomainId(task.getTagIdList().get(i));
                link.setSortNo(i+1);
                link.setCompleted(false);

                links.add(link);
            }
        }

        return links;
    }

    protected void addTaskDomainLinkList(List<TaskDomainLink> links){

        List<List<TaskDomainLink>> lists = Lists.partition(links, 50);

        lists.stream().forEach((list)->{
            taskDomainLinkRepo.addLinks(list);
        });
    }

    protected List<FileInfoLink> createFileInfoLink(ContextHolder holder, Task task){
        List<FileInfoLink> fileInfoLinkList = new ArrayList<>();

        if(!CollectionUtils.isEmpty(task.getImageIdList())){
            task.getImageIdList().stream().forEach((item)->{
                FileInfoLink fileInfoLink = new FileInfoLink();

                fileInfoLink.setTenantId(holder.getTenantId());
                fileInfoLink.setFileId(item);
                fileInfoLink.setDomainType(TmFileConst.TM_M_TASK);
                fileInfoLink.setDomainField(TmFileConst.TM_F_TASK_IMAGE);
                fileInfoLink.setDomainId(task.getId());

                fileInfoLinkList.add(fileInfoLink);
            });
        }

        if(!CollectionUtils.isEmpty(task.getAttachmentIdList())){
            task.getAttachmentIdList().stream().forEach((item)->{
                FileInfoLink fileInfoLink = new FileInfoLink();

                fileInfoLink.setTenantId(holder.getTenantId());
                fileInfoLink.setFileId(item);
                fileInfoLink.setDomainType(TmFileConst.TM_M_TASK);
                fileInfoLink.setDomainField(TmFileConst.TM_F_TASK_ATTACH);
                fileInfoLink.setDomainId(task.getId());

                fileInfoLinkList.add(fileInfoLink);
            });
        }

        return fileInfoLinkList;
    }

    protected void fillLinkedDomains(ContextHolder holder, List<TaskItemDto> list){
        List<String> taskIdList = list.stream().map(item->item.getId()).collect(Collectors.toList());
        Map<String, TaskItemDto> taskHash = list.stream().collect(Collectors.toMap(TaskItemDto::getId, item->item));

        TaskDomainLinkQueryDto linkParams = TaskDomainLinkQueryDto.builder().tenantId(holder.getTenantId()).taskId(taskIdList).build();
        List<TaskDomainLink> linkList = taskDomainLinkRepo.loadTaskDomainLinkList(linkParams);

        List<String> staffIdList =linkList.stream()
                .filter(item->item.getDomainType().equals(Staff.class.getSimpleName()))
                .map(item->item.getDomainId())
                .collect(Collectors.toList());
        List<String> tagIdList = linkList.stream()
                .filter(item->item.getDomainType().equals(TaskTag.class.getSimpleName()))
                .map(item->item.getDomainId())
                .collect(Collectors.toList());

        linkList.stream().forEach((item)->{
            TaskItemDto task = taskHash.get(item.getTaskId());

            if(task==null){
                return;
            }

            if(item.getTaskField().equals("assigneeIdList")){
                if(task.getAssigneeIdList()==null){
                    task.setAssigneeIdList(new ArrayList<>());
                }
                task.getAssigneeIdList().add(item.getDomainId());
            }

            if(item.getTaskField().equals("supervisorIdList")){
                if(task.getSupervisorIdList()==null){
                    task.setSupervisorIdList(new ArrayList<>());
                }
                task.getSupervisorIdList().add(item.getDomainId());
            }

            if(item.getTaskField().equals("participatorIdList")){
                if(task.getParticipatorIdList()==null){
                    task.setParticipatorIdList(new ArrayList<>());
                }
                task.getParticipatorIdList().add(item.getDomainId());
            }

            if(item.getTaskField().equals("auditorIdList")){
                if(task.getAuditorIdList()==null){
                    task.setAuditorIdList(new ArrayList<>());
                }
                task.getAuditorIdList().add(item.getDomainId());
            }

            if(item.getTaskField().equals("tagIdList")){
                if(task.getTagIdList()==null){
                    task.setTagIdList(new ArrayList<>());
                }
                task.getTagIdList().add(item.getDomainId());
            }
        });


        StaffQueryDto staffParams = StaffQueryDto.builder().tenantId(holder.getTenantId()).id(staffIdList).build();
        List<StaffItemDto> staffList = staffService.findStaffList(holder, staffParams, new Limitable());
        Map<String, StaffItemDto> staffHash = staffList.stream().collect(Collectors.toMap(item->item.getId(), item->item));

        TaskTagQueryDto tagParams = TaskTagQueryDto.builder().tenantId(holder.getTenantId()).id(tagIdList).build();
        List<TaskTagItemDto> tagList = taskTagService.findTaskTagList(holder, tagParams, new Limitable());
        Map<String, TaskTagItemDto> tagHash = tagList.stream().collect(Collectors.toMap(TaskTagItemDto::getId, item->item));

        TaskStaffDomainLinkQueryDto staffLinkParams = TaskStaffDomainLinkQueryDto.builder().tenantId(holder.getTenantId()).
                taskId(taskIdList).staffId(Arrays.asList(holder.getStaffId())).build();
        List<TaskStaffDomainLink> staffLinkList = taskStaffDomainLinkRepo.loadTaskStaffDomainLinkList(staffLinkParams);

        list.stream().forEach((task)->{
            if(!CollectionUtils.isEmpty(task.getAssigneeIdList())){
                List<StaffItemDto> items =  task.getAssigneeIdList().stream().map((item)->{
                    return staffHash.get(item);
                }).collect(Collectors.toList());

                task.setAssigneeList(items);
            }

            if(!CollectionUtils.isEmpty(task.getSupervisorIdList())){
                List<StaffItemDto> items =  task.getSupervisorIdList().stream().map((item)->{
                    return staffHash.get(item);
                }).collect(Collectors.toList());

                task.setSupervisorList(items);
            }

            if(!CollectionUtils.isEmpty(task.getParticipatorIdList())){
                List<StaffItemDto> items =  task.getParticipatorIdList().stream().map((item)->{
                    return staffHash.get(item);
                }).collect(Collectors.toList());

                task.setParticipatorList(items);
            }

            if(!CollectionUtils.isEmpty(task.getAuditorIdList())){
                List<StaffItemDto> items =  task.getAuditorIdList().stream().map((item)->{
                    return staffHash.get(item);
                }).collect(Collectors.toList());

                task.setAuditorList(items);
            }

            if(!CollectionUtils.isEmpty(task.getTagIdList())){
                List<TaskTagItemDto> items = task.getTagIdList().stream().map((item)->{
                    return tagHash.get(item);
                }).collect(Collectors.toList());

                task.setTagList(items);
            }
        });

        staffLinkList.stream().filter(link->{
            return TaskGroup.class.getSimpleName().equals(link.getDomainType());
        }).forEach(link->{
            TaskItemDto task = taskHash.get(link.getTaskId());

            if(task==null){
                return;
            }

            if(CollectionUtils.isEmpty(task.getGroupIdList())){
                task.setGroupIdList(new LinkedList<>());
            }

            task.getGroupIdList().add(link.getDomainId());
        });
    }

    protected void fillTaskFileInfo(ContextHolder holder, List<TaskItemDto> list){

        List<String> taskIdList = list.stream().map(item->item.getId()).collect(Collectors.toList());

        FileInfoLinkQueryDto linkParams = FileInfoLinkQueryDto.builder().tenantId(holder.getTenantId()).domainType(Arrays.asList(TmFileConst.TM_M_TASK)).domainId(taskIdList).build();
        List<FileInfoLink> links = fileInfoLinkService.loadFileInfoLink(holder, linkParams);

        if(CollectionUtils.isEmpty(links)){
            return;
        }

        FileInfoQueryDto fileInfoParams = FileInfoQueryDto.builder().tenantId(holder.getTenantId()).id(links.stream().map(link->link.getFileId()).collect(Collectors.toList())).build();
        List<FileInfoItemDto> fileInfoList = fileService.findFileInfoList(holder, fileInfoParams, new Limitable());

        Map<String, List<FileInfoLink>> taskFileLinkHash = new HashMap<>();
        Map<String, FileInfoItemDto> taskFileHash = fileInfoList.stream().collect(Collectors.toMap(FileInfoItemDto::getId, item->item));

        links.stream().forEach((link)->{
            if(!taskFileLinkHash.containsKey(link.getDomainId())){
                List<FileInfoLink> taskFileLinks = new LinkedList<>();

                taskFileLinkHash.put(link.getDomainId(), taskFileLinks);
            }
        });

        list.stream().forEach(task->{
            List<FileInfoLink> taskFileLinks = taskFileLinkHash.get(task.getId());

            if(!CollectionUtils.isEmpty(taskFileLinks)){
                List<String> imageIdLinks = taskFileLinks.stream().filter((link)->{
                   return TmFileConst.TM_F_TASK_IMAGE.equals(link.getDomainField());
                }).map(link->link.getFileId()).collect(Collectors.toList());
                task.setImageIdList(imageIdLinks);
                task.setImageList(imageIdLinks.stream().map(imageId->taskFileHash.get(imageId)).collect(Collectors.toList()));

                List<String> attachmentIdLinks = taskFileLinks.stream().filter((link)->{
                    return TmFileConst.TM_F_TASK_ATTACH.equals(link.getDomainField());
                }).map(link->link.getFileId()).collect(Collectors.toList());
                task.setAttachmentIdList(attachmentIdLinks);
                task.setImageList(imageIdLinks.stream().map(attachmentId->taskFileHash.get(attachmentId)).collect(Collectors.toList()));
            }
        });

    }
}
