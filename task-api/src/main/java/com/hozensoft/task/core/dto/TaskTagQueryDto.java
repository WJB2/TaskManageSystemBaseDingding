package com.hozensoft.task.core.dto;

import com.hozensoft.task.enumeration.TaskTagTypeEnum;
import lombok.*;

import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class TaskTagQueryDto {
    /**
     * ID
     */
    private List<String> id;

    /**
     * 租户ID
     */
    private String tenantId;

    /**
     * 标签类型
     */
    private TaskTagTypeEnum tagType;

    /**
     * 标签内容
     */
    private String name;


}
