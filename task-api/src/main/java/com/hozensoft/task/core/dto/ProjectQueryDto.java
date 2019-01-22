package com.hozensoft.task.core.dto;

import lombok.*;

import java.util.Date;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class ProjectQueryDto {


    /**
     * ID
     */
    private List<String> id;

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
     * 逻辑删除标记
     */
    private Boolean deletedFlag;

    /**
     * 排序
     */
    private String sortBy;
}
