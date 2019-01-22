package com.hozensoft.task.core.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;
import java.util.List;

@Getter
@Setter
public class ProjectValueDto {
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
     * 关注人ID列表
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
     * 当前岗位ID
     */
    private String currentPositionId;



}
