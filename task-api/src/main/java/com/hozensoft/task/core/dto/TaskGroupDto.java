package com.hozensoft.task.core.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TaskGroupDto {

    private String id;

    private String tenantId;

    private String name;

    private String staffId;

    private Integer sortNo;
}
