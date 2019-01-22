import React,{PureComponent} from 'react';

import { List,InputItem,Checkbox,SearchBar } from 'antd-mobile';

import styles from './TaskIndex.less';
import fileService from "../../services/system/FileService";
import DingTalkUtils from '../../utils/DingTalkUtils';

const txt = import('./../../assets/images/txt.jpg');
const excel = import('./../../assets/images/excel.png');
const word = import('./../../assets/images/word.jpg');
const weizhi=import('./../../assets/images/se.png');

const Item = List.Item;

class AttachmentSelector extends PureComponent{

  state={
    paneVisible:false,
    imageAccept:'*/*',
    localFiles:[],
  }

  async componentWillMount(){
    if(this.props.value){
      const fileList = await fileService.findFileList({
        id: this.props.value
      });

      this.setState({
        localFiles:fileList,
      });
    }
  }

  handleClick(){
    this.setState({
      paneVisible:true,
    })
  }

  handleAgent(fileIdList){
    this.props.onChange(fileIdList)
  }

  async handleUpload(e){

    this.attachmentRef.click();

    if(await DingTalkUtils.isIos()){
      this.attachmentRef.click();
    }

  }

  async changeFile(e){//选择完图片后
    console.log("选完")

    const localFiles=[];

    const fileIdList=[];

    for(let i=0;i<Object.keys(this.attachmentRef.files).length;i++){

      localFiles.push(this.attachmentRef.files[i]);

      console.log(this.attachmentRef.files[i])

      const formData = new FormData();

      formData.append('file',this.attachmentRef.files[i]);

      const {id} =await fileService.addFile(formData);

      fileIdList.push(id);

    }

    this.setState({
      localFiles:localFiles,
    })

    this.props.onChange(fileIdList);
  }

  render(){

    const {
      paneVisible,
      imageAccept,
      localFiles
    }=this.state;

    const fileConfig={
      imageAccept:imageAccept,
      onHandleClick:this.handleClick.bind(this),
      onHandleAgent:this.handleAgent.bind(this)
    }

    const {
      downloadFile
    }=this.props;

    return(
      <div className={styles.attachmentContent}>

        <div className={styles.attachmentSelector}>
        <div className={"iconfont"} style={{width:'1.2rem',paddingLeft:'0.2rem',fontSize:'0.6rem',color:'grey',boxSizing:'border-box'}}>&#xe781;</div>
        <div className={styles.attachmentName}>附件</div>
        <div className={styles.attachmentMain}  onClick={()=>{this.handleUpload()}}>
          <div className={styles.attachmentRight}>
            <div className={styles.attachmentRightLeft}>上传</div>
            <div className={"iconfont"}>&#xe636;</div>
          </div>
        </div>
          <div style={{display:'none'}}><input type={"file"} onChange={(e)=>this.changeFile(e)} accept={"*/*"} ref={ref=>this.attachmentRef=ref}/></div>
        </div>

        {
          localFiles.map((item,index)=>(
            <div className={styles.fileItem} key={index} apture={"microphone"} onClick={()=>{this.props.downloadFile(item.id)}} multiple="multiple">
              <img src={item.name.substring(item.name.length-3)==="doc"||item.name.substring(item.name.length-3)==="ocx"?word:item.name.substring(item.name.length-3)==="xls"||item.name.substring(item.name.length-3)==="lsx"?excel:item.name.substring(item.name.length-3)==="txt"?txt:weizhi} alt={"txt"} width={20} height={20} />
              <div className={styles.fileName}>{item.name}</div>
            </div>
          ))
        }

      </div>
    )
  }
}

export default AttachmentSelector;
