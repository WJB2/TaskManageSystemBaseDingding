package com.hozensoft.task.core.dto;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class TaskBonusPointsValueDto {

    private String id;

    private BigDecimal ownerBonusPoints;

    private BigDecimal assigneeBonusPoints;

    private BigDecimal participatorBonusPoints;
}
