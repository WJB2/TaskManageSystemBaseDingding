import { ImagePicker } from 'antd-mobile';

import React,{PureComponent} from 'react';

import styles from './PaneIndex.less';

import fileService from "../../services/system/FileService";

import ComponentUtils from '../../utils/ComponentUtils';

class ImagePane extends PureComponent{

  state={
    fileId:null,//图片ID
    selectVisible:false,//是否显示
    files:[],//文件
    onlyId:null,
    fileIdList:[],
  }

  async componentWillMount(){

    if(this.props.fileList){
      for(let i=0;i<this.props.fileList.length;i++){
        this.props.fileList[i].url=`/api/system/file/download/${this.props.fileList[i].id}`
      }

      this.setState({
        files:this.props.fileList,
      })
    }
  }

  async componentDidMount(){
    console.log(this.handleAuto);
    if(ComponentUtils.isEmpty(this.state.files)){
      this.handleAuto.fileSelectorInput.click();
    }
  }

  async handleSelectedFiles(files, type, index){

    clearTimeout(this.state.onlyId);

    const _self=this;

    const onHandleAgent=this.props.onHandleAgent;

    console.log(files);

    this.setState({
        files:files,
    })

    const id=setTimeout(async function(){

        console.log('setTimeout执行中...');

        const fileIdList=[];

        for(let i=0;i<files.length;i++) {
          const formData = new FormData();
          formData.append('file', files[i].file);
          console.log(files[i])
          const {id} =await fileService.addFile(formData);
          fileIdList.push(id);
        }

        onHandleAgent(fileIdList);

        _self.setState({
          onlyId:id,
        })

    },1000);


  }

  onImageClick(index,files){
    console.log(index);
    console.log(files);
  }

  render(){

    const {
      imageAccept
    }=this.props;

    return(
      <div className={styles.filePane}>
        <ImagePicker
          files={this.state.files}
          accept={imageAccept}
          ref={ref => this.handleAuto=ref}
          selectable={true}
          onChange={this.handleSelectedFiles.bind(this)}
          onImageClick={this.onImageClick.bind(this)}>
        </ImagePicker>
      </div>
    )
  }

}

export default ImagePane;
