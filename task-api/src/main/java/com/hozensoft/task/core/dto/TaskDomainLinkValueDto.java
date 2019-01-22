package com.hozensoft.task.core.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class TaskDomainLinkValueDto {

    private String taskId;

    private List<String> domainId;
}
