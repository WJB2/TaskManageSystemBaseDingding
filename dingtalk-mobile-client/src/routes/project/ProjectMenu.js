import React,{PureComponent} from 'react';
import {SearchBar} from 'antd-mobile';
import styles from './ProjectIndex.less';

class ProjectMenu extends PureComponent{

  state={
    projectMenu:[
      {name:'名称升序',type:'NAME_ASC'},
      {name:'名称降序',type:'NAME_DESC'},
      {name:'时间升序',type:'TIME_ASC'},
      {name:'时间降序',type:'TIME_DESC'}
    ],
    currentProjectItem:'名称升序',
    isClick:false,
    isClickSearch:false,
  }

  componentDidMount() {

  }

  componentDidUpdate(e){

    if(this.state.isClickSearch){
      this.autoFocusInst.focus();
    }

  }

  handleClick(){
    this.setState({
      isClick:!this.state.isClick,
    })
  }

  handleChange(currentItem){

    this.setState({
      currentProjectItem:currentItem,
      isClick:false,
    })
  }

  handleClickIcon(){

    this.setState({
      isClickSearch:true,
    })

  }

  handleCancel(){

    this.setState({
      isClickSearch:false,
    })
    const {onHandleCancel}=this.props;

    if(onHandleCancel){
      onHandleCancel()
    }

  }

  render(){

    const { projectMenu,isClick,currentProjectItem,isClickSearch}=this.state;

    const { onSearch,onChange,onFocus,onCancel }=this.props;


    return(
      <div className={styles.projectMenu}>
        {
          isClickSearch ? <div className={styles.searchbar}><SearchBar ref={ref => this.autoFocusInst = ref}
                                     onChange={(values)=>onChange(values)}
                                     onCancel={()=>{onCancel();this.setState({isClickSearch:false})}}
                                     onFocus={(values)=>onFocus(values)} /></div>:<div className={styles.projectMenuHeader}>
            <div className={styles.projectMenuName}
                 style={isClick?{color:'#7FA9E5'}:null}
                 onClick={()=>{this.handleClick()}}
            >{currentProjectItem}</div>
            <div className={"iconfont"} onClick={()=>{this.handleClickIcon()}}>&#xe633;</div>
          </div>
        }

        {
          isClick?<div className={styles.projectmenubody} style={isClick?{maxHeight:'500px'}:{maxHeight:'0'}}>
            {
              projectMenu.map((item,index)=>(
                <div className={styles.projectmenuitem}
                     key={index}
                     style={item.name===currentProjectItem?{color:'#7FA9E5'}:null}
                     onClick={()=>{onSearch({sortBy:item.type});this.handleChange(item.name)}}>{item.name}
                  {item.name===currentProjectItem?<div className={"iconfont"} >&#xe6ba;</div>:null}
                </div>
              ))
            }
          </div>:null
        }


      </div>
    )
  }
}

export default ProjectMenu;
