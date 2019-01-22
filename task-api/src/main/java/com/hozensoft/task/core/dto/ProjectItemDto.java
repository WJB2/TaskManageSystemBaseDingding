package com.hozensoft.task.core.dto;

import com.hozensoft.system.core.domain.Organization;
import com.hozensoft.system.core.dto.OrganizationItemDto;
import com.hozensoft.system.core.dto.StaffItemDto;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;
import java.util.List;


@Getter
@Setter
public class ProjectItemDto {

    /**
     * ID
     */
    private String id;

    /**
     * 租户ID
     */
    private String tenantId;


    /**
     * 项目名称
     */
    private String name;

    /**
     * 项目描述
     */
    private String description;

    /**
     * 开始时间
     */
    private Date beginTime;

    /**
     * 结束时间
     */
    private Date endTime;

    /**
     * 标记
     */
    private String label;

    /**
     * 任务总数
     */
    private Long taskCounts;

    /**
     * 完成任务数
     */
    private Long finishedTaskCounts;

    /**
     * 未完成任务数
     */
    private Long unfinishedTaskCounts;


    /**
     * 逻辑删除标记
     */
    private Boolean deletedFlag;

    /**
     * 所属部门
     */
    private List<String> orgIdList;
    private List<OrganizationItemDto> orgList;

    /**
     * 项目成员
     */
    private List<String> memberIdList;
    private List<StaffItemDto> memberList;

    /**
     * 责任人ID
     */
    private List<String> assigneeIdList;
    private List<StaffItemDto> assigneeList;

    /**
     * 参与人ID
     */
    private List<String> participatorIdList;
    private List<StaffItemDto> participatorList;

    /**
     * 项目关注人
     */
    @ApiModelProperty(value = "项目关注人" ,required = true)
    private List<String> supervisorIdList;
    private List<StaffItemDto> supervisorList;

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
