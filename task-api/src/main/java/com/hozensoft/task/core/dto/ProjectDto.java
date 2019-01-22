package com.hozensoft.task.core.dto;

import com.hozensoft.system.core.dto.*;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;
import java.util.List;

@Getter
@Setter
@ApiModel(value = "项目管理")
public class ProjectDto {
    /**
     * ID
     */
    @ApiModelProperty(value="ID", required = false)
    private String id;

    /**
     * 租户ID
     */
    @ApiModelProperty(value = "租户ID", hidden = true)
    private String tenantId;

    /**
     * 所属部门
     */
    @ApiModelProperty(value = "所属部门" ,required = true)
    private List<String> orgIdList;

    private List<OrganizationItemDto> orgList;

    /**
     * 项目成员
     */
    @ApiModelProperty(value = "项目成员" ,required = true)
    private List<String> memberIdList;
    private List<StaffItemDto> memberList;

    /**
     * 责任人列表
     */
    @ApiModelProperty(value = "项目责任人" ,required = true)
    private List<String> assigneeIdList;
    private List<StaffItemDto> assigneeList;

    /**
     * 项目参与人
     */
    @ApiModelProperty(value = "项目参与人" ,required = true)
    private List<String> participatorIdList;
    private List<StaffItemDto> participatorList;

    /**
     * 项目关注人
     */
    @ApiModelProperty(value = "项目关注人" ,required = true)
    private List<String> supervisorIdList;
    private List<StaffItemDto> supervisorList;

    /**
     * 项目名称
     */
    @ApiModelProperty(value = "项目名称", required = true)
    private String name;

    /**
     * 项目描述
     */
    @ApiModelProperty(value = "项目描述", required = true)
    private String description;

    /**
     * 开始时间
     */
    @ApiModelProperty(value = "开始时间", required = true)
    private Date beginTime;

    /**
     * 结束时间
     */
    @ApiModelProperty(value = "结束时间", required = true)
    private Date endTime;

    /**
     * 标记
     */
    @ApiModelProperty (value = "标记", required = true)
    private String label;

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
