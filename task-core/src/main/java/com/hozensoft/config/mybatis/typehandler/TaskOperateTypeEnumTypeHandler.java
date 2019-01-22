package com.hozensoft.config.mybatis.typehandler;

import java.sql.CallableStatement;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import com.hozensoft.task.enumeration.TaskOperateTypeEnum;
import org.apache.ibatis.type.JdbcType;
import org.apache.ibatis.type.MappedJdbcTypes;
import org.apache.ibatis.type.MappedTypes;
import org.apache.ibatis.type.TypeHandler;


/**
 * @author JRabbit
 *
 */
@MappedTypes(TaskOperateTypeEnum.class)
@MappedJdbcTypes({ JdbcType.INTEGER, JdbcType.BIGINT, JdbcType.NUMERIC })
public class TaskOperateTypeEnumTypeHandler implements TypeHandler<TaskOperateTypeEnum> {

	/*
	 * (non-Javadoc)
	 * 
	 * @see org.apache.ibatis.type.TypeHandler#setParameter(java.sql.
	 * PreparedStatement, int, java.lang.Object,
	 * org.apache.ibatis.type.JdbcType)
	 */
	@Override
	public void setParameter(PreparedStatement ps, int i, TaskOperateTypeEnum status, JdbcType jdbcType) throws SQLException {

		ps.setInt(i, status.getValue());
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see org.apache.ibatis.type.TypeHandler#getResult(java.sql.ResultSet,
	 * java.lang.String)
	 */
	@Override
	public TaskOperateTypeEnum getResult(ResultSet rs, String columnName) throws SQLException {

		int result = rs.getInt(columnName);

		return TaskOperateTypeEnum.valueOf(result);
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see org.apache.ibatis.type.TypeHandler#getResult(java.sql.ResultSet,
	 * int)
	 */
	@Override
	public TaskOperateTypeEnum getResult(ResultSet rs, int columnIndex) throws SQLException {

		int result = rs.getInt(columnIndex);

		return TaskOperateTypeEnum.valueOf(result);
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * org.apache.ibatis.type.TypeHandler#getResult(java.sql.CallableStatement,
	 * int)
	 */
	@Override
	public TaskOperateTypeEnum getResult(CallableStatement cs, int columnIndex) throws SQLException {

		int result = cs.getInt(columnIndex);

		return TaskOperateTypeEnum.valueOf(result);
	}
}


