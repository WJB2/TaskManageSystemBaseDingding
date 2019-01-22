/**
 * 判定用户是否已经登入
 */
function isAuthenticated() {
  return localStorage.getItem('session-authenticated');
}

/**
 * 判定用户是否拥有对应的权限
 */
function isPermit(perm, global) {

  const {authorizedPermissions} = global;

  if(!perm){
    return true;
  }

  if(!authorizedPermissions){
    return false;
  }

  if(authorizedPermissions.indexOf(perm)>=0){
    return true;
  }

  while(perm.lastIndexOf(':')>=0){
    perm = perm.substring(0, perm.lastIndexOf(':')) + ':*';

    if(authorizedPermissions.indexOf(perm)>=0){
      return true;
    }
  }

  return authorizedPermissions.indexOf('*')>=0;
}

/**
 * 判定用户是否拥有指定的角色
 */
function hasRole(role, global) {
  return role;
}

export default {
  isAuthenticated,
  isPermit,
  hasRole,
};
