const ACTIVE = 'ACTIVE';
const LOCKED = 'LOCKED';
const DISABLED = 'DISABLED';

function getDisplayText(value) {
  if (!value) {
    return '正常';
  }

  if (value === 'ACTIVE') {
    return '正常';
  }

  if (value === 'LOCKED') {
    return '锁定';
  }

  if (value === 'DISABLED') {
    return '禁用';
  }
}

export default {
  ACTIVE,
  LOCKED,
  DISABLED,
  getDisplayText,
};
