import React, { PureComponent } from 'react';
import _ from 'lodash';
import PinyinUtils from './../../../utils/PinyinUtils';

import { Modal, Avatar, Icon, Collapse, Menu, Breadcrumb, Checkbox, Tag, Button, message, Select} from 'antd';

import TreeUtils from './../../../utils/TreeUtils';

import staffService from '../../../services/system/StaffService';
import orgService from '../../../services/system/OrganizationService';
import roleService from '../../../services/system/RoleService';
import postService from '../../../services/system/PostService';
import positionService from '../../../services/system/PositionService';

const {Option} = Select;

class _StaffSelectorModal extends PureComponent{

  state = {
    staffIdList:[],
    searchText : null,
    chooseType:null,

    currentRole:null,
    currentOrg:null,
    currentPost:null,
  }

  componentWillMount(){

    const staffList = this.props.staffList||[];

    staffList.forEach(item=>{
      item._pinyin = PinyinUtils.getAllPinyin(item.name);
    });

    this.setState({
      staffList : staffList,
      staffIdList:this.props.staffIdList||[]
    })
  }

  onStaffSelect(staffIdList){

    const {maxItemCounts} = this.props;

    const originalStaffIdList = this.state.staffIdList||[];

    let freshStaffIdList = _.concat(originalStaffIdList, staffIdList);
    freshStaffIdList = _.uniq(freshStaffIdList);

    if(maxItemCounts&&freshStaffIdList.length>maxItemCounts){

      message.error('超过人数限制');

      return false;
    }

    this.setState({
      staffIdList: freshStaffIdList
    });

    return true;
  }

  onStaffDeselect(staffIdList){
    const originalStaffIdList = this.state.staffIdList||[];

    const freshStaffIdList = _.flatten(_.pullAll(originalStaffIdList, staffIdList));

    this.setState({
      staffIdList: freshStaffIdList
    });
  }

  getOrganizationPanel(){

    const {roleList, orgTree, staffList, positionList} = this.props;

    const currentOrgId = this.state.currentOrg?this.state.currentOrg.id:orgTree[0].id;
    const currentOrg = this.state.currentOrg?this.state.currentOrg:orgTree[0];

    return (
      <div>
        <div style={{padding:16}}>
          <div style={{fontSize:16, cursor:'pointer'}} onClick={()=>{
            this.setState({
              chooseType:null,
              currentOrg:null,
            })
          }}>&lt;&nbsp;&nbsp;按组织机构选择</div>
          <div >
            <Breadcrumb>
              <Breadcrumb.Item style={{fontSize:10}}>{orgTree&&orgTree[0]?orgTree[0].name:''}</Breadcrumb.Item>
            </Breadcrumb>
          </div>
        </div>
        <Menu mode="inline" defaultOpenKeys={['ROOT']}>
          {
            currentOrg&&currentOrg.children&&currentOrg.children.map((org)=>{
              return (
                <Menu.Item key={org.id} data={org} domaintype={'ORG'}>
                  <Checkbox onChange={(e)=>{
                    const orgIds = [];

                    TreeUtils.forEach([org], 'children', (node)=>{
                      orgIds.push(node.id);
                    });

                    const staffIdList = [];

                    positionList.forEach((pos)=>{
                      if(orgIds.indexOf(pos.orgId)>=0){
                        staffIdList.push(pos.staffId);
                      }
                    });

                    if(e.target.checked){
                      return this.onStaffSelect(staffIdList);
                    }else {
                      this.onStaffDeselect(staffIdList);
                    }
                  }}>{org.name}
                  </Checkbox>
                  <div style={{float:'right'}} onClick={()=>{
                    this.setState({
                      currentOrg: org
                    })
                  }}>下级</div>
                </Menu.Item>
              )
            })
          }

          {
            positionList&&positionList.filter((position)=>{
              return position.orgId===currentOrgId;
            }).map((position)=>{
              return (
                <Menu.Item key={position.staff.id} data={position.staff} domaintype={'STAFF'}>
                  <Checkbox checked={this.state.staffIdList.indexOf(position.staff.id)>=0} onChange={(e)=>{
                    if(e.target.checked){
                      this.onStaffSelect([position.staff.id]);
                    }else{
                      this.onStaffDeselect([position.staff.id]);
                    }
                  }}>
                    <Avatar>{position.staff.name}</Avatar>&nbsp;&nbsp;{position.staff.name}
                    </Checkbox>
                </Menu.Item>
              )
            })
          }
        </Menu>
      </div>
    );

  }

  getRolePanel(){

    const {roleList, orgTree, staffList, positionList} = this.props;

    if(!this.state.currentRole){
      return (
        <Menu mode="inline" defaultOpenKeys={['ROOT']} onClick={({key, item})=>{
            this.setState({
              currentRole:item.props.data
            })
        }}>
          <Menu.SubMenu key={'ROOT'} title={orgTree&&orgTree[0]?orgTree[0].name:''}  >
            {
              roleList&&roleList.map((role)=>{
                return <Menu.Item key={role.id} data={role}>{role.name}</Menu.Item>
              })
            }
          </Menu.SubMenu>
        </Menu>
      );
    }else{
      return (
        <div>
          <div style={{padding:16}}>
            <div style={{fontSize:16, cursor:'pointer'}} onClick={()=>{
              this.setState({
                chooseType:null,
                currentRole:null,
              })
            }}>&lt;&nbsp;&nbsp;按角色选择</div>
            <div >
              <Breadcrumb>
                <Breadcrumb.Item style={{fontSize:10}}>{orgTree&&orgTree[0]?orgTree[0].name:''}</Breadcrumb.Item>
                <Breadcrumb.Item style={{fontSize:10}}>{this.state.currentRole.name}</Breadcrumb.Item>
              </Breadcrumb>
            </div>
          </div>
          <Menu mode="inline" defaultOpenKeys={['ROOT']} onClick={({key, item})=>{

          }}>
            {
              positionList&&positionList.filter((position)=>{
                return position.roleId&&position.roleId.indexOf(this.state.currentRole.id)>=0;
              }).map((position)=>{
                return <Menu.Item key={position.staff.id} data={position.staff}>{position.staff.name}</Menu.Item>
              })
            }
          </Menu>
        </div>
      );
    }
  }

  getPostPanel(){
    const {roleList, postTree, staffList, positionList} = this.props;

    const currentPostId = this.state.currentPost?this.state.currentPost.id:(postTree&&postTree[0]?postTree[0].id:null);
    const currentPost = this.state.currentPost?this.state.currentPost:(postTree&&postTree[0]?postTree[0]:{});

    return (
      <div>
        <div style={{padding:16}}>
          <div style={{fontSize:16, cursor:'pointer'}} onClick={()=>{
            this.setState({
              chooseType:null,
              currentPost:null,
            })
          }}>&lt;&nbsp;&nbsp;按工作职位选择</div>
          <div >
            <Breadcrumb>
              {postTree&&postTree[0]? <Breadcrumb.Item style={{fontSize:10}}>postTree[0].name</Breadcrumb.Item>:''}
            </Breadcrumb>
          </div>
        </div>
        {
          currentPost&&<Menu mode="inline" defaultOpenKeys={['ROOT']} onClick={({key, item})=>{
            if(item.props.domaintype==='POST'){
              this.setState({
                currentOrg: item.props.data
              })
            }
          }}>
            {
              currentPost&&currentPost.children&&currentPost.children.map((post)=>{
                return <Menu.Item key={post.id} data={post} domaintype={'POST'}>{post.name}</Menu.Item>
              })
            }

            {
              positionList&&positionList.filter((position)=>{
                return position.postId&&position.postId===currentPostId;
              }).map((position)=>{
                return <Menu.Item key={position.staff.id} data={position.staff} domaintype={'STAFF'}><Avatar>{position.staff.name}</Avatar>{position.staff.name}</Menu.Item>
              })
            }
          </Menu>
        }
      </div>
    );
  }

  getChooseType(){

    const {orgTree} = this.props;

    return (
      <Menu mode="inline" defaultOpenKeys={['ROOT']}  onClick={({key})=>{
        this.setState({
          chooseType: key
        })
      }}>
        <Menu.SubMenu key={'ROOT'} title={<div><div>{orgTree&&orgTree[0]?orgTree[0].name:''}</div><div></div></div>}>
          <Menu.Item key={'ORG'}>按组织机构选择</Menu.Item>
          <Menu.Item key={'POST'}>按职位选择</Menu.Item>
          <Menu.Item key={'ROLE'}>按角色选择</Menu.Item>
        </Menu.SubMenu>
      </Menu>
    );
  }


  filterOption(items, text){
    if(!text){
      return items;
    }

    text = text.toLowerCase();

    const freshList = items.filter(item=>{

      if(item.name.indexOf(text)>=0){
        return true;
      }

      return PinyinUtils.isMatch(text, item._pinyin);
    });

    return freshList;
  }

  render(){

    const staffList = this.state.staffList;
    const { onSelect, onCancel} = this.props;

    const staffSelectedList = _.intersectionWith(staffList, this.state.staffIdList||[], (staff, staffId)=>{
      return staff.id===staffId;
    });

    return (
      <Modal footer={null} visible={true} title={'选人'} width={720} {...this.props} bodyStyle={{padding:0}}>
        <div style={{height:480}}>
          <div style={{width:'50%', float:'left', borderRight:'1px solid #efefef', height:480, padding:8}}>
            <div style={{height:420, padding:8, border:'1px solid #efefef'}}>
              {
                staffSelectedList.map((staff)=>{
                  return <Tag key={staff.id} style={{marginBottom:8}}>{staff.name} <Icon type="close" onClick={()=>{
                    this.onStaffDeselect([staff.id]);
                  }} /></Tag>
                })
              }
              <Select showSearch
                      value={null}
                      showArrow={false}
                      autoFocus={true}
                      autoClearSearchValue={true}
                      style={{width:'100%'}}
                      filterOption={false}
                      onChange={(value)=>{
                        this.onStaffSelect([value])
                      }}
                      onSearch={(value)=>{
                        this.setState({
                          searchText: value
                        })
                      }}
              >
                {
                  this.filterOption(staffList, this.state.searchText).map(item=>{
                    return (<Option key={item.id} value={item.id}>{item.name}</Option>);
                  })
                }
              </Select>
            </div>
            <div style={{textAlign:'right', paddingTop:8}}>
              <Button type={'primary'} onClick={()=>{
                if(onSelect){
                  onSelect(this.state.staffIdList);
                }
              }}>选择</Button> <Button onClick={()=>{
                if(onCancel){
                  onCancel();
                }
              }}>取消</Button>
            </div>
          </div>
          <div style={{width:'50%', float:'left', height:480, overflow:'auto'}}>
            {
              this.state.chooseType===null&&this.getChooseType()
            }
            {
              this.state.chooseType==='ORG'&&this.getOrganizationPanel()
            }
            {
              this.state.chooseType==='POST'&&this.getPostPanel()
            }
            {
              this.state.chooseType==='ROLE'&&this.getRolePanel()
            }
          </div>
          <div style={{clear:'both'}}/>
        </div>
      </Modal>
    );
  }
}

class StaffSelector extends PureComponent {
  state = {
    value:null,
    visible:false,
    staffList:null,
    roleList:null,
    orgTree:null,
    postTree:null,
    positionList:null,
  };



  buildTreeRecursive(parent){
    if(parent.children&&parent.children.length>0){
      for(let i=0; i<parent.children.length; i++){
        parent.children[i].parent=parent;

        if(parent.children[i].children && parent.children[i].children.length>0){
          this.buildTreeRecursive(parent.children[i])
        }
      }
    }
  }

  async componentWillMount() {
    const staffList = await staffService.findStaffList();
    const orgTree = await orgService.findOrganizationTree();
    const roleList = await roleService.findRoleList();
    const postTree = await postService.findPostTree();
    const positionList = await positionService.findPositionList();

    if(orgTree){
      for(let i=0; i<orgTree.length; i++){
        this.buildTreeRecursive(orgTree[i]);
      }
    }

    if(postTree){
      for(let i=0; i<postTree.length; i++){
        this.buildTreeRecursive(postTree[i]);
      }
    }

    this.setState({
      value: this.props.value||[],
      staffList,
      orgTree,
      roleList,
      postTree,
      positionList
    });
  }

  componentDidMount(){
    if(this.props.onRef){
      this.props.onRef(this);
    }
  }

  render() {

    //mode可以是multiple或single
    const {mode, maxItemCounts} = this.props;

    const val = this.state.value?(typeof this.state.value==='string'?[this.state.value]:this.state.value):[];

    const staffSelectedList = _.intersectionWith(this.state.staffList||[], val, (staff, staffId)=>{
      return staff.id===staffId;
    });

    return (
      <div>
        {
          staffSelectedList.map((staff)=>{
            return <Avatar key={staff.id} style={{marginBottom:8}}>{staff.name}</Avatar>
          })
        }
        <Icon type="plus-circle" onClick={()=>{
          this.setState({
            visible:true
          })
        }}/>
        {this.state.visible&&<_StaffSelectorModal
          onSelect={(staffIdList)=>{

            if(mode==='multiple'){
              if(this.props.onChange){
                this.props.onChange(staffIdList);
              }
              this.setState({
                value:staffIdList,
                visible:false,
              });
            }else{
              if(this.props.onChange){
                this.props.onChange(staffIdList&&staffIdList[0]?staffIdList[0]:null);
              }

              this.setState({
                value:(staffIdList&&staffIdList[0]?staffIdList[0]:null),
                visible:false,
              });
            }
          }}
          maxItemCounts={mode==='multiple'?(maxItemCounts?maxItemCounts:0):1}
          staffIdList={this.state.value}
          onCancel={()=>{this.setState({visible:false})}}
          staffList={this.state.staffList}
          orgTree={this.state.orgTree}
          roleList={this.state.roleList}
          postTree={this.state.postTree}
          positionList={this.state.positionList}
        />}
      </div>
    );
  }
}

export default StaffSelector;
