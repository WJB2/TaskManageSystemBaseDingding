
--插入默认模块数据
insert into gbl_module(id, name, icon, link_path, menu_id, sort_no)
values('18c7f44f72034ab3b27251afa1e39015', '系统管理', 'setting', '/system/user', 'fd0c794cf43e11e78c3f9a214cf093ae', 9999);

-- 插入系统导航根菜单
insert into gbl_menu(id, parent_id, code, name, name_pinyin, icon, link_path, sort_no)
values('06489b04f43e11e78c3f9a214cf093ae', null, 'R', '系统导航菜单', 'XTDHCD', null, null, 1);

insert into gbl_menu(id, parent_id, code, name, name_pinyin, icon, link_path, sort_no)
values('fd0c794cf43e11e78c3f9a214cf093ae', '06489b04f43e11e78c3f9a214cf093ae', 'SYS', '人员组织架构', 'RYZZJG', null, null, 999);

insert into gbl_menu(id, parent_id, code, name, name_pinyin, icon, link_path, permission_id, sort_no)
values('fd0c7f46f43e11e78c3f9a214cf093ae', 'fd0c794cf43e11e78c3f9a214cf093ae', 'SYS001', '组织机构维护', 'ZZJGWH', 'bars', '/system/organization', '6fa7e366f5b511e78c3f9a214cf093ae', 10);

insert into gbl_menu(id, parent_id, code, name, name_pinyin, icon, link_path, permission_id, sort_no)
values('fd0c8162f43e11e78c3f9a214cf093ae', 'fd0c794cf43e11e78c3f9a214cf093ae', 'SYS005', '工作职位维护', 'GZZWWH', 'trophy', '/system/post',  '6fa7ee6af5b511e78c3f9a214cf093ae', 20);

insert into gbl_menu(id, parent_id, code, name, name_pinyin, icon, link_path, permission_id, sort_no)
values('fd0c82b6f43e11e78c3f9a214cf093ae', 'fd0c794cf43e11e78c3f9a214cf093ae', 'SYS010', '人员角色维护', 'RYJSWH', 'team', '/system/role',  '6fa7f6c6f5b511e78c3f9a214cf093ae', 30);

insert into gbl_menu(id, parent_id, code, name, name_pinyin, icon, link_path, permission_id, sort_no)
values('fd0c83d8f43e11e78c3f9a214cf093ae', 'fd0c794cf43e11e78c3f9a214cf093ae', 'SYS015', '人员信息维护', 'RYXXWH', 'user', '/system/staff',  '0f25b2b0f5b611e78c3f9a214cf093ae', 40);

insert into gbl_menu(id, parent_id, code, name, name_pinyin, icon, link_path, permission_id, sort_no)
values('fd0c852cf43e11e78c3f9a214cf093ae', 'fd0c794cf43e11e78c3f9a214cf093ae', 'SYS020', '人员工作岗位维护', 'RYGWWH', 'idcard', '/system/position',  '0f25c034f5b611e78c3f9a214cf093ae', 50);


insert into gbl_menu(id, parent_id, code, name, name_pinyin, icon, link_path, sort_no)
values('0f669f334da74cb791223da48a7c502e', '06489b04f43e11e78c3f9a214cf093ae', 'USER', '用户个人中心', 'YHGRZX', null, null, 998);

insert into gbl_menu(id, parent_id, code, name, name_pinyin, icon, link_path, sort_no)
values('f05033544fd54139b5e78a346cfce622', '0f669f334da74cb791223da48a7c502e', 'PROFILE', '个人信息', 'GRXX', 'user', '/user/profile', 10);

insert into gbl_menu(id, parent_id, code, name, name_pinyin, icon, link_path, sort_no)
values('547d0c3aebf14b13bbf0bad5e1342503', '0f669f334da74cb791223da48a7c502e', 'EDIT_PASSWORD', '修改密码', 'XGMM', 'lock', '/user/edit-password', 20);



-- 插入默认系统权限
insert into gbl_permission(id, parent_id, wildcard, name, name_pinyin, sort_no)
values('6fa7d3b2f5b511e78c3f9a214cf093ae', null, '*', '根权限', 'XTZQX', 1);

insert into gbl_permission(id, parent_id, wildcard, name, name_pinyin, sort_no)
values('6fa7db96f5b511e78c3f9a214cf093ae', '6fa7d3b2f5b511e78c3f9a214cf093ae', 'sys:*', '人员组织架构维护权限', 'RYZZJGWHQX', 999);

insert into gbl_permission(id, parent_id, wildcard, name, name_pinyin, sort_no)
values('6fa7de0cf5b511e78c3f9a214cf093ae', '6fa7db96f5b511e78c3f9a214cf093ae', 'sys:org:*', '组织机构维护权限', 'XTGLQX', 1);

insert into gbl_permission(id, parent_id, wildcard, name, name_pinyin, sort_no)
values('6fa7df7ef5b511e78c3f9a214cf093ae', '6fa7de0cf5b511e78c3f9a214cf093ae', 'sys:org:add', '新增组织机构权限', 'XZZZJGQX', 1);

insert into gbl_permission(id, parent_id, wildcard, name, name_pinyin, sort_no)
values('6fa7e0b4f5b511e78c3f9a214cf093ae', '6fa7de0cf5b511e78c3f9a214cf093ae', 'sys:org:edit', '编辑组织机构权限', 'BJZZJGQX', 2);

insert into gbl_permission(id, parent_id, wildcard, name, name_pinyin, sort_no)
values('6fa7e1d6f5b511e78c3f9a214cf093ae', '6fa7de0cf5b511e78c3f9a214cf093ae', 'sys:org:del', '删除组织机构权限', 'SCZZJGQX', 3);

insert into gbl_permission(id, parent_id, wildcard, name, name_pinyin, sort_no)
values('6fa7e366f5b511e78c3f9a214cf093ae', '6fa7de0cf5b511e78c3f9a214cf093ae', 'sys:org:view', '查看组织机构权限', 'CKZZJGQX', 4);

insert into gbl_permission(id, parent_id, wildcard, name, name_pinyin, sort_no)
values('6fa7e88ef5b511e78c3f9a214cf093ae', '6fa7db96f5b511e78c3f9a214cf093ae', 'sys:post:*', '工作职位维护权限', 'GZZWWHQX', 2);

insert into gbl_permission(id, parent_id, wildcard, name, name_pinyin, sort_no)
values('6fa7e9d8f5b511e78c3f9a214cf093ae', '6fa7e88ef5b511e78c3f9a214cf093ae', 'sys:post:add', '新增工作职位权限', 'XZGZZWQX', 1);

insert into gbl_permission(id, parent_id, wildcard, name, name_pinyin, sort_no)
values('6fa7eafaf5b511e78c3f9a214cf093ae', '6fa7e88ef5b511e78c3f9a214cf093ae', 'sys:post:edit', '编辑工作职位权限', 'BJGZZWQX', 2);

insert into gbl_permission(id, parent_id, wildcard, name, name_pinyin, sort_no)
values('6fa7ed2af5b511e78c3f9a214cf093ae', '6fa7e88ef5b511e78c3f9a214cf093ae', 'sys:post:del', '删除工作职位权限', 'SCGZZWQX', 3);

insert into gbl_permission(id, parent_id, wildcard, name, name_pinyin, sort_no)
values('6fa7ee6af5b511e78c3f9a214cf093ae', '6fa7e88ef5b511e78c3f9a214cf093ae', 'sys:post:view', '查看工作职位权限', 'CKGZZWQX', 4);

insert into gbl_permission(id, parent_id, wildcard, name, name_pinyin, sort_no)
values('6fa7ef8cf5b511e78c3f9a214cf093ae', '6fa7db96f5b511e78c3f9a214cf093ae', 'sys:role:*', '人员角色维护权限', 'RYJSWHQX', 3);

insert into gbl_permission(id, parent_id, wildcard, name, name_pinyin, sort_no)
values('6fa7f34cf5b511e78c3f9a214cf093ae', '6fa7ef8cf5b511e78c3f9a214cf093ae', 'sys:role:add', '新增人员角色权限', 'XZRYJSQX', 1);

insert into gbl_permission(id, parent_id, wildcard, name, name_pinyin, sort_no)
values('6fa7f496f5b511e78c3f9a214cf093ae', '6fa7ef8cf5b511e78c3f9a214cf093ae', 'sys:role:edit', '编辑人员角色权限', 'BJRYJSQX', 2);

insert into gbl_permission(id, parent_id, wildcard, name, name_pinyin, sort_no)
values('6fa7f5aef5b511e78c3f9a214cf093ae', '6fa7ef8cf5b511e78c3f9a214cf093ae', 'sys:role:del', '删除人员角色权限', 'SCRYJSQX', 3);

insert into gbl_permission(id, parent_id, wildcard, name, name_pinyin, sort_no)
values('6fa7f6c6f5b511e78c3f9a214cf093ae', '6fa7ef8cf5b511e78c3f9a214cf093ae', 'sys:role:view', '查看人员角色权限', 'SCRYJSQX', 4);

insert into gbl_permission(id, parent_id, wildcard, name, name_pinyin, sort_no)
values('6fa7f7def5b511e78c3f9a214cf093ae', '6fa7db96f5b511e78c3f9a214cf093ae', 'sys:staff:*', '人员信息维护权限', 'CKXXWHQX', 4);

insert into gbl_permission(id, parent_id, wildcard, name, name_pinyin, sort_no)
values('6fa7f8f6f5b511e78c3f9a214cf093ae', '6fa7f7def5b511e78c3f9a214cf093ae', 'sys:staff:add', '新增人员信息权限', 'CKXXWHQX', 1);

insert into gbl_permission(id, parent_id, wildcard, name, name_pinyin, sort_no)
values('6fa7fc5cf5b511e78c3f9a214cf093ae', '6fa7f7def5b511e78c3f9a214cf093ae', 'sys:staff:edit', '编辑人员信息权限', 'BJXXWHQX', 2);

insert into gbl_permission(id, parent_id, wildcard, name, name_pinyin, sort_no)
values('0f25b008f5b611e78c3f9a214cf093ae', '6fa7f7def5b511e78c3f9a214cf093ae', 'sys:staff:del', '删除人员信息权限', 'SCXXWHQX', 3);

insert into gbl_permission(id, parent_id, wildcard, name, name_pinyin, sort_no)
values('0f25b2b0f5b611e78c3f9a214cf093ae', '6fa7f7def5b511e78c3f9a214cf093ae', 'sys:staff:view', '查看人员信息权限', 'CKXXWHQX', 4);

insert into gbl_permission(id, parent_id, wildcard, name, name_pinyin, sort_no)
values('0f25b404f5b611e78c3f9a214cf093ae', '6fa7db96f5b511e78c3f9a214cf093ae', 'sys:posi:*', '人员工作岗位维护权限', 'RYGZGWWHQX', 5);

insert into gbl_permission(id, parent_id, wildcard, name, name_pinyin, sort_no)
values('0f25b530f5b611e78c3f9a214cf093ae', '0f25b404f5b611e78c3f9a214cf093ae', 'sys:posi:add', '新增人员工作岗位权限', 'XZRYGZGWQX', 1);

insert into gbl_permission(id, parent_id, wildcard, name, name_pinyin, sort_no)
values('0f25ba9ef5b611e78c3f9a214cf093ae', '0f25b404f5b611e78c3f9a214cf093ae', 'sys:posi:edit', '编辑人员工作岗位权限', 'BJRYGZGWQX', 2);

insert into gbl_permission(id, parent_id, wildcard, name, name_pinyin, sort_no)
values('0f25bd82f5b611e78c3f9a214cf093ae', '0f25b404f5b611e78c3f9a214cf093ae', 'sys:posi:del', '删除人员工作岗位权限', 'SCRYGZGWQX', 3);

insert into gbl_permission(id, parent_id, wildcard, name, name_pinyin, sort_no)
values('0f25c034f5b611e78c3f9a214cf093ae', '0f25b404f5b611e78c3f9a214cf093ae', 'sys:posi:view', '查看人员工作岗位权限', 'CKRYGZGWQX', 4);






