package com.hozensoft.task.core.domain;

import com.hozensoft.task.enumeration.TaskTypeEnum;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

@Getter
@Setter
public class Task {

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
     * 上级任务ID
     */
    private String parentId;

    /**
     * 任务类型
     */
    private TaskTypeEnum taskType;

    /**
     * 任务标题
     */
    private String title;

    /**
     * 任务内容
     */
    private String content;

    /**
     * 任务图片列表
     */
    private List<String> imageIdList;

    /**
     * 任务标签ID列表
     */
    private List<String> tagIdList;

    /**
     * 负责人列表
     */
    private List<String> assigneeIdList;

    /**
     * 参与人列表
     */
    private List<String> participatorIdList;

    /**
     * 关注人列表
     */
    private List<String> supervisorIdList;

    /**
     * 审核人列表
     */
    private List<String> auditorIdList;

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
     * 附件列表
     */
    private List<String> attachmentIdList;

    /**
     * 无法完成标记
     */
    private Boolean unreachable;

    /**
     * 是否完成
     */
    private Boolean completed;

    /**
     * 任务完成人
     */
    private String completedById;

    /**
     * 完成时间
     */
    private Date completedTime;

    /**
     * 审核标记
     */
    private Boolean audited;

    /**
     * 审核人
     */
    private String auditedById;

    /**
     * 审核时间
     */
    private Date auditedTime;

    /**
     * 归档标记
     */
    private Boolean archived;

    /**
     * 归档人
     */
    private String archivedById;

    /**
     * 归档时间
     */
    private Date archivedTime;

    /**
     * 挂起
     */
    private Boolean suspended;

    /**
     * 挂起人
     */
    private String suspendedById;

    /**
     * 挂起时间
     */
    private Date suspendedTime;

    /**
     * 重启次数
     */
    private Integer openTimes;

    /**
     *任务描述
     */
    private String description;

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

    public Boolean getAudited(){
        return audited!=null?audited:false;
    }
}
