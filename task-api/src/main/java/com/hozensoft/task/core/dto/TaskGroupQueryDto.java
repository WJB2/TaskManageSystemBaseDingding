package com.hozensoft.task.core.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class TaskGroupQueryDto {

    private List<String> id;

    private String tenantId;

    private String name;

    private String staffId;

}
