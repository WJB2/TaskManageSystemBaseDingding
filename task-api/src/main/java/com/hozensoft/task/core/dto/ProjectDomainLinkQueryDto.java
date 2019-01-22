package com.hozensoft.task.core.dto;

import lombok.*;

import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class ProjectDomainLinkQueryDto {

    private String tenantId;

    private List<String> projectId;

    private List<String> excludeProjectId;

    private List<String> projectField;

    private List<String> excludeProjectField;

    private List<String> domainType;

    private List<String> excludeDomainType;

    private List<String> domainId;

    private List<String> excludeDomainId;
}
