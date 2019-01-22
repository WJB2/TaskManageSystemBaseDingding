package com.hozensoft.task.core.domain;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProjectDomainLink {

    private String id;

    private String tenantId;

    private String projectId;

    private String projectField;

    private String domainType;

    private String domainId;

    private Integer sortNo;
}
