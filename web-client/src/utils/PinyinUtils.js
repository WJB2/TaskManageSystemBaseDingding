
require("pinyin4js");


/**
 * 获取文本简拼
 *
 * @param text
 */
function getShortPinyin(text){

  return PinyinHelper.convertToPinyinString(text, '', PinyinFormat.FIRST_LETTER);
}

/**
 * 获取文本的全拼音，返回数组，如果是多音字则返回全部组合
 *
 * @param text
 */
function getFullPinyin(text) {

  return PinyinHelper.convertToPinyinString(text, '', PinyinFormat.WITHOUT_TONE);
}

/**
 * 获取文本简拼/全拼， 返回组数，如果有多音字则返回全部组合
 * @param text
 */
function getAllPinyin(text){

  return [getShortPinyin(text), getFullPinyin(text)];
}

/**
 * 判定给定拼音是否符合条件
 *
 * @param text
 * @param pinyinArray
 */
function isMatch(pinyin, pinyinArray) {

  for(let i=0, l=pinyinArray.length; i<l; i++){
    if(pinyinArray[i].indexOf(pinyin)>=0){
      return true;
    }
  }

  return false;
}

export default {
  getShortPinyin,
  getFullPinyin,
  getAllPinyin,
  isMatch
}
