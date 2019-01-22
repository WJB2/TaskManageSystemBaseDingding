package com.hozensoft.task.core.domain;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class TaskGroup {

    private String id;

    private String tenantId;

    private String name;

    private String staffId;

    private Integer sortNo;

}
