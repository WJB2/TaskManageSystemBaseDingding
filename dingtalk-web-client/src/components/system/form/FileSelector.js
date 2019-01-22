import React, { PureComponent } from 'react';
import {  Upload, Icon, Tag } from 'antd';

import fileService from './../../../services/system/FileService';

class FileSelector extends PureComponent {

  state = {
    value:null,
    fileList: [],
  };

  async componentWillMount(){
    if(this.props.value){
      const fileList = await fileService.findFileList({
        id: this.props.value
      })

      this.setState({
        value:this.props.value,
        fileList:fileList
      });
    }
  }

  addFile(fileInfo){
    const fileList = this.state.fileList||[];
    const nFileList = [];
    const value = [];

    let has = false;

    for(let i=0; i<fileList.length; i++){
      if(fileInfo.id===fileList[i].id){
        has=true;
      }
      nFileList.push(fileList[i]);
    }

    if(!has){
      nFileList.push(fileInfo);
    }

    for(let i=0; i<nFileList.length; i++){
      value.push(nFileList[i].id);
    }

    this.props.onChange(value);
    this.setState({
      fileList:nFileList,
      value:value
    });
  }

  render() {
    const {disabled} = this.props;
    return (
      <div>
        {
          this.state.fileList && this.state.fileList.map((fileInfo)=>{
            return <div key={fileInfo.id}><a href={`/api/open/file/${fileInfo.tenantId}/${fileInfo.id}`} target={'_blank'}>{fileInfo.name}</a></div>
          })
        }
        <Upload showUploadList={false} action={'/api/system/file'} withCredentials={true} onChange={({file})=>{
          if(file.status==='done' && file.response){
            this.addFile(file.response);
          }
        }}>
          {!disabled&&<Tag><Icon type={'plus'}/></Tag>}
        </Upload>
      </div>
    );
  }
}

export default FileSelector;
