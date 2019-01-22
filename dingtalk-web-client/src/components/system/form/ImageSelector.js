import React, { PureComponent } from 'react';
import {  Upload, Icon, Tag, Modal } from 'antd';

import fileService from './../../../services/system/FileService';

class ImageSelector extends PureComponent {

  state = {
    value:null,
    fileList: [],
    fileInfo:{},
    visible:false,
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

  componentDidMount(){
    if(this.props.onRef){
      this.props.onRef(this);
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
            return (
              <div key={fileInfo.id}>
                  <img onClick={()=>{
                    this.setState({
                      visible: !this.state.visible,
                      fileInfo: fileInfo
                    });
                  }} src={`/api/system/file/download/${fileInfo.id}`} width={80} height={80} style={{float:'left', marginRight:8, marginBottom:8}}/>
              </div>
            )
          })
        }
        <Upload showUploadList={false} action={'/api/system/file'} withCredentials={true} onChange={({file})=>{
          if(file.status==='done' && file.response){
            this.addFile(file.response);
          }
        }}>
          {!disabled&&<Tag><Icon type={'plus'}/></Tag>}
        </Upload>
        <Modal width={800} visible={this.state.visible} title={this.state.fileInfo.name} footer={null} onCancel={()=>{
          this.setState({
            visible:false
          });
        }}>
          <div >
            <img src={`/api/system/file/download/${this.state.fileInfo.id}`} width={750}/>
          </div>
        </Modal>
      </div>
    );
  }
}

export default ImageSelector;
