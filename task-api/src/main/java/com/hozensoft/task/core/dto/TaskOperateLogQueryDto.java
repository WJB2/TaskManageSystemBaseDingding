package com.hozensoft.task.core.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class TaskOperateLogQueryDto {

    private String tenantId;

    private List<String> id;

    private List<String> taskId;

    private List<String> operateById;
}
