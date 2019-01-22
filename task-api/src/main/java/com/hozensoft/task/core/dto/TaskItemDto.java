package com.hozensoft.task.core.dto;


import com.hozensoft.system.core.dto.OrganizationItemDto;
import com.hozensoft.system.core.dto.StaffItemDto;
import com.hozensoft.system.file.dto.FileInfoItemDto;
import com.hozensoft.task.enumeration.TaskTypeEnum;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

@Getter
@Setter
public class TaskItemDto {

    /**
     * ID
     */
    private String id;

    /**
     * 租户ID
     */
    private String tenantId;

    /**
     * 所属项目ID
     */
    private String projectId;


    /**
     * 项目信息
     */
    private ProjectDto project;

    /**
     * 任务类型
     */
    private TaskTypeEnum taskType;

    /**
     * 任务标题
     */
    private String title;

    private String content;

    /**
     * 创建人积分
     */
    private BigDecimal ownerBonusPoints;

    /**
     * 责任人积分
     */
    private BigDecimal assigneeBonusPoints;

    /**
     * 参与人积分
     */
    private BigDecimal participatorBonusPoints;

    /**
     * 图片文件ID列表
     */
    private List<String> imageIdList;
    private List<FileInfoItemDto> imageList;

    /**
     * 附件ID列表
     */
    private List<String> attachmentIdList;
    private List<FileInfoItemDto> attachmentList;

    /**
     * 责任人列表
     */
    private List<String> assigneeIdList;
    private List<StaffItemDto> assigneeList;

    /**
     * 参与人列表
     */
    private List<String> participatorIdList;
    private List<StaffItemDto> participatorList;

    /**
     * 关注人列表
     */
    private List<String> supervisorIdList;
    private List<StaffItemDto> supervisorList;

    /**
     * 审核人列表
     */
    private List<String> auditorIdList;
    private List<StaffItemDto> auditorList;

    private List<String> tagIdList;
    private List<TaskTagItemDto> tagList;

    private List<String> groupIdList;

    /**
     * 任务进度
     */
    private Integer progressStatus;

    /**
     * 任务开始时间
     */
    private Date beginTime;

    /**
     * 任务结束时间
     */
    private Date endTime;

    /**
     * 是否完成
     */
    private Boolean completed;
    private String completedById;
    private StaffItemDto completedBy;
    private Date completedTime;

    /**
     * 是否审核
     */
    private Boolean audited;
    private String auditedById;
    private StaffItemDto auditedBy;
    private Date auditedTime;

    /**
     * 归档标记
     */
    private Boolean archived;
    private String archivedById;
    private StaffItemDto archivedBy;
    private Date archivedTime;

    /**
     * 是否挂起
     */
    private Boolean suspended;
    private String suspendedById;
    private StaffItemDto suspendedBy;
    private Date suspendedTime;

    private Boolean unreachable;

    private Integer openTimes;

    /**
     * 父任务ID
     */
    private String parentId;


    /**
     *任务描述
     */
    private String description;



    /**
     * 逻辑删除标记
     */
    private Boolean deletedFlag;

    private String createdById;

    private StaffItemDto createdBy;

    private String createdOrgId;

    private OrganizationItemDto createdOrg;

    private Date createdTime;

    private String updatedById;

    private StaffItemDto updatedBy;

    private String updatedOrgId;

    private OrganizationItemDto updatedOrg;

    private Date updatedTime;

    private String deletedById;

    private StaffItemDto deletedBy;

    private String deletedOrgId;

    private OrganizationItemDto deletedOrg;

    private Date deletedTime;

}
