package com.hozensoft.task.core.domain;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;
import java.util.List;

@Getter
@Setter
public class Project {

    /**
     * ID
     */
    private String id;

    /**
     * 租户ID
     */
    private String tenantId;

    /**
     * 所属部门
     */
    private List<String> orgIdList;

    /**
     * 项目成员
   */
    private List<String> memberIdList;

    /**
     * 责任人ID列表
     */
    private List<String> assigneeIdList;

    /**
     * 参与人ID列表
     */
    private List<String> participatorIdList;

    /**
     * 项目关注人
     */
    private List<String> supervisorIdList;

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
     * 项目归档次数
     */
    private Boolean archived;

    /**
     * 项目归档次数
     */
    private Integer archivedCounts;

    /**
     * 归档时间
     */
    private Date archiveTime;

    /**
     * 逻辑删除标记
     */
    private Boolean deletedFlag;

    private String createdById;

    private String createdOrgId;

    private Date createdTime;

    private String updatedById;

    private String updatedOrgId;

    private Date updatedTime;

    private String deletedById;

    private String deletedOrgId;

    private Date deletedTime;
}
