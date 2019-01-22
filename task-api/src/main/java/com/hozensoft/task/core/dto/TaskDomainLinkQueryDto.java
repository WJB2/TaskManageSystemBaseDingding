package com.hozensoft.task.core.dto;

import lombok.*;

import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class TaskDomainLinkQueryDto {

    private String tenantId;

    private List<String> taskId;

    private List<String> excludeTaskId;

    private List<String> taskField;

    private List<String> excludeTaskField;

    private List<String> domainType;

    private List<String> excludeDomainType;

    private List<String> domainId;

    private List<String> excludeDomainId;
}
