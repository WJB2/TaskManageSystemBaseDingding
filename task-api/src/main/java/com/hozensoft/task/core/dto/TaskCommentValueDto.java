package com.hozensoft.task.core.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TaskCommentValueDto {

    private String taskId;

    private String commentType;

    private String comment;
}
