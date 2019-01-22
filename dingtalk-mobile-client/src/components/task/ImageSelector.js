import React,{PureComponent} from 'react';
import styles from './TaskIndex.less';
import {Toast} from 'antd-mobile';

import ComponentUtils from '../../utils/ComponentUtils';

import fileService from '../../services/system/FileService';
import DingTalkUtils from "../../utils/DingTalkUtils";

import $ from 'jquery';

class ImageSelector extends PureComponent{

  state={
    paneVisible:false,
    imageAccept:'image/*',
    fileList:null,
    localFiles:[],
  }

  async componentWillMount(){
    if(this.props.value){
      console.log(this.props.value)
      const fileList = await fileService.findFileList({
        id: this.props.value
      });
      const fileIdList=[];
      fileList.map((item,index)=>{
        fileIdList.push(item.id)
      })
      this.setState({
        localFiles:fileIdList
      });
    }
  }

  async handleUpload(e){

    this.imageRef.click();

    if(await DingTalkUtils.isIos()){
      this.imageRef.click();
    }

  }

  async changeFile(e){//选择完图片后
    console.log("选完")

    const localFiles=[];

    const fileIdList=[];

    for(let i=0;i<Object.keys(this.imageRef.files).length;i++){

      localFiles.push(this.imageRef.files[i]);

      console.log(this.imageRef.files[i])

      const formData = new FormData();

      formData.append('file',this.imageRef.files[i]);

      const {id} =await fileService.addFile(formData);

      fileIdList.push(id);

    }

    this.setState({
      localFiles:fileIdList,
    })

    this.props.onChange(fileIdList);

  }

  handlePreview(imageId,width,height){
    console.log(imageId);
    console.log(width);
    this.imageShow.setAttribute("src",`/api/system/file/download/${imageId}`);//设置元素的src属性
    /*获取当前点击图片的真实大小,并显示弹出层及真实大小*/
    $(image).attr("src",`/api/system/file/download/${imageId}`).on('load',function () {
      let windowW=window.innerWidth;
      let windowH=window.innerHeight;
      var scale=0.8;//缩放尺寸 当图片真实宽度和高度大于串口宽度和高度时进行缩放
      let imageHeight,imageWidth;
      if(80>windowH*scale){//判断图片高度
        imageHeight=window*scale;
        imageWidth=imageHeight/80*80;;
        if(imageWidth>windowW*scale){//如果宽度大于窗口宽度
          imageWidth = window*scale;
        }
      }else if(80>windowW*scale) {//如图片高度合适，判断图片宽度
        imageWidth  = windowW*scale;//如大于窗口宽度，图片宽度进行缩放
        imageHeight = imageWidth/80*80;//等比例缩放高度
      }else if (80<windowW*scale || 80<windowH*scale) {//如果图片真实高度和宽度都符合要求，高宽不变
        imageWidth = windowW*scale;
        imageHeight = windowH*scale;
      }

      $(image).css("width",imageWidth);//以最终的宽度对图片缩放
      $(image).css("height",imageHeight);//以最终的宽度对图片缩放

      let w = (windowW-imageWidth)/2;//计算图片与窗口左边距
      let h = (windowH-imageHeight)/2;//计算图片与窗口上边距


      $(innerDiv).css({"top":h, "left":w});//设置#innerdiv的top和left属性

      $(outerDiv).fadeIn("fast");//淡入显示#outerdiv及.pimg

    })


    $(outerDiv).click(function(){//再次点击淡出消失弹出层
      $(this).fadeOut("fast");
    });
  }

  render(){

    const {
      localFiles
    }=this.state;

    console.log(localFiles);

    return(
      <div className={styles.imageSelector}>

        <div className={"iconfont"} style={{fontSize:'0.5rem',boxSizing:'border-box',padding:'0.2rem 0.5rem',color:'#55ABE9'}} onClick={()=>{
          this.handleUpload();
        }}>&#xe640;</div>

        <div style={{display:'none'}}><input type={"file"} onChange={(e)=>this.changeFile(e)} accept={"*/*"} ref={ref=>this.imageRef=ref}/></div>

        {
          this.state.localFiles.map((fileInfo,index)=>(
            <div className={styles.imageItem} key={index}>
              <img src={`/api/system/file/download/${fileInfo}`}
                   width={80}
                   height={80}
                   onClick={(e)=>this.handlePreview(fileInfo)}
              />
            </div>
          ))
        }

        <div ref={ref => this.outerDiv=ref} id={"outerDiv"} style={{position:'fixed',top:0,left:0,background:'rgba(0,0,0,0.7)',zIndex:20,width:'100%',height:'100%',display:'none'}}>
          <div ref={ref => this.innerDiv=ref} id={"innerDiv"} style={{position:'absolute'}}>
            <img ref={ref => this.imageShow=ref} id={"image"} style={{border:'5px solid #fff'}} src={""} />
          </div>
        </div>


      </div>
    )
  }
}

export default ImageSelector;
