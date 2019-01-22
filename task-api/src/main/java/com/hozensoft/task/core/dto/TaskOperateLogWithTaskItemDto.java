package com.hozensoft.task.core.dto;

import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
public class TaskOperateLogWithTaskItemDto extends TaskOperateLogItemDto implements Serializable {


    private Long logAmount;

    private TaskItemDto task;
}
