package com.hozensoft.task.core.dto;

import com.hozensoft.system.core.dto.OrganizationAttrDto;
import com.hozensoft.system.core.dto.StaffAttrDto;
import com.hozensoft.task.enumeration.TaskTypeEnum;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;


@Getter
@Setter
@ApiModel(value = "创建任务表单对象")
public class TaskValueDto {
    /**
     * ID
     */
    @ApiModelProperty(value="ID", required = false, readOnly = true)
    private String id;

    /**
     * 租户ID
     */
    @ApiModelProperty(value = "租户ID", hidden = true)
    private String tenantId;

    /**
     * 所属项目ID
     */
    @ApiModelProperty(value="所属项目ID", readOnly = false)
    private String projectId;

    /**
     * 任务类型
     */
    @ApiModelProperty(value="任务类型", required = true, readOnly = true)
    private TaskTypeEnum taskType;

    /**
     * 任务标题
     */
    @ApiModelProperty(value = "任务标题")
    private String title;

    /**
     * 任务内容
     */
    @ApiModelProperty(value = "任务内容")
    private String content;

    /**
     * 任务图片列表
     */
    @ApiModelProperty(value = "任务图片ID列表")
    private List<String> imageIdList;

    /**
     * 任务标签列表
     */
    @ApiModelProperty(value = "任务标签ID列表")
    private List<String> tagIdList;

    /**
     * 负责人列表
     */
    @ApiModelProperty(value = "责任人ID列表", required = true)
    private List<String> assigneeIdList;

    @ApiModelProperty(value = "参与人ID列表", required = true)
    private List<String> participatorIdList;

    /**
     * 关注人列表
     */
    @ApiModelProperty(value = "关注人ID列表")
    private List<String> supervisorIdList;

    /**
     * 任务积分
     */
    @ApiModelProperty(value="任务积分", readOnly = true)
    private BigDecimal bonusPoints;

    /**
     * 任务进度
     */
    @ApiModelProperty(value = "任务进度")
    private Integer progressStatus;

    /**
     * 任务开始时间
     */
    @ApiModelProperty(value="任务开始时间")
    private Date beginTime;

    /**
     * 任务结束时间
     */
    @ApiModelProperty(value="任务结束时间")
    private Date endTime;

    /**
     * 附件列表
     */
    @ApiModelProperty(value="附件ID列表")
    private List<String> attachmentIdList;

    /**
     * 父任务ID
     */
    @ApiModelProperty(value="上级任务ID")
    private String parentId;

    /**
     *任务描述
     */
    @ApiModelProperty(value="任务描述")
    private String description;

    /**
     * 当前岗位ID
     */
    @ApiModelProperty(value="当前岗位ID", hidden = true)
    private String currentPositionId;

}
