package com.hozensoft.task.core.dto;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class TaskGroupValueDto {

    private String id;

    private String tenantId;

    private String name;

    private String staffId;

    private Integer sortNo;
}
