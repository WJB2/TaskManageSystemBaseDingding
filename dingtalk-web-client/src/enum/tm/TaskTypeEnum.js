const NORMAL = 'NORMAL';
const CORPORATE = 'CORPORATE';

function getDisplayText(value) {
  if (!value) {
    return '普通任务';
  }

  if (value === 'NORMAL') {
    return '普通任务';
  }

  if (value === 'CORPORATE') {
    return '协作任务';
  }
}

export default {
  NORMAL,
  CORPORATE,
  getDisplayText,
};
