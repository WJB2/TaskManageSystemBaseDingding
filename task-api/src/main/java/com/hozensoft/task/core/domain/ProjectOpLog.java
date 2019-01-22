package com.hozensoft.task.core.domain;

import com.hozensoft.task.enumeration.ProjectOpTypeEnum;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class ProjectOpLog {

    private String id;

    private String tenantId;

    private String projectId;

    private ProjectOpTypeEnum opType;

    private Date opTime;

    private String opBy;

    private String opOrg;

    private String summary;
}
