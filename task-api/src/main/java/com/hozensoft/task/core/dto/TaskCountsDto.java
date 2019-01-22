package com.hozensoft.task.core.dto;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@ApiModel("任务计数")
@Getter
@Setter
public class TaskCountsDto {

    @ApiModelProperty(value="未开始任务数")
    private Long unbegin;

    @ApiModelProperty(value="进行中任务数")
    private Long underway;

    @ApiModelProperty(value="已经过期任务")
    private Long expired;
}
