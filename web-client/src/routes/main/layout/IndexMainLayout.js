import React, { PureComponent } from 'react';
import { Layout, Tabs, Icon } from 'antd';
import { connect } from 'dva';
import { Route, routerRedux } from 'dva/router';
import Debounce from 'lodash-decorators/debounce';
import Bind from 'lodash-decorators/bind';
import MainHeader from './../../../components/main/header/MainHeader';
import MainSiderBar from './../../../components/main/siderbar/MainSiderBar';
import ContentWrapper from './../../../components/main/content/ContentWrapper';
import InitializingLayout from './InitializingLayout';
import MainLoginLayout from './MainLoginLayout';

import { DEFAULT_HOME_PATH } from './../../../utils/GlobalConst';

import styles from './MainLayout.less';

const { Content } = Layout;
const { TabPane } = Tabs;

@connect(models => ({
  global: models.global,
  loading: models.loading.models.global,
}))
class MainLayout extends PureComponent {
  componentWillMount() {
    const { routerData, dispatch } = this.props;

    dispatch({
      type: 'global/updateState',
      payload: {
        routerData,
      },
    });
  }

  @Bind
  @Debounce(400)
  onMenuClick(menu) {
    const { dispatch } = this.props;
    const path = menu.linkPath;
    const title = (
      <span>
        {menu.icon ? <Icon type={menu.icon} /> : null} {menu.name}
      </span>
    );

    if (path) {
      dispatch({
        type: 'global/addOrReplaceTab',
        payload: {
          path,
          title,
        },
      });
    }
  }

  renderMain() {
    const { dispatch, global, routerData, location } = this.props;
    const {
      sidebarCollapsed,
      currentMenus,
      currentPosition,
      currentModule,
      authenticated,
      componentsMap = {},
      componentTitleList = [],
    } = global;

    const layoutStyle = {};

    if (!authenticated) {
      layoutStyle.filter = 'blur(2px)';
    }

    return (
      <div style={{ width: '100%', height: '100%' }}>
        {!authenticated ? <MainLoginLayout dispatch={dispatch} global={global} /> : null}
        <Layout style={layoutStyle}>
          <MainSiderBar
            sidebarCollapsed={sidebarCollapsed}
            menus={currentMenus}
            currentPosition={currentPosition}
            dispatch={dispatch}
            currentModule={currentModule}
            onMenuClick={menu => {
              this.onMenuClick(menu);
            }}
          />
          <Content className={styles.body_container}>
            <Layout>
              <MainHeader
                sidebarCollapsed={sidebarCollapsed}
                dispatch={dispatch}
                currentPosition={currentPosition}
                modules={global.modules}
              />
              <Content className={styles.content_container_wrap}>
                <div className={styles.content_container}>
                  <div style={{ display: 'none' }}>
                    {Object.keys(routerData)
                      .filter(path => {
                        return path !== '/' && path !== '/user/login';
                      })
                      .map(path => {
                        return (
                          <Route
                            key={path}
                            path={path}
                            exact
                            render={props => {
                              if (!componentsMap[props.location.pathname]) {
                                const router = routerData[path];
                                dispatch({
                                  type: 'global/updateComponent',
                                  payload: {
                                    path: props.location.pathname,
                                    props,
                                    component: router.component,
                                  },
                                });
                              }

                              return null;
                            }}
                          />
                        );
                      })}

                    <Route
                      path="/home"
                      exact
                      component={() => {
                        return <div>Home Page</div>;
                      }}
                    />
                  </div>
                  <Tabs
                    hideAdd
                    type="editable-card"
                    className={styles.content}
                    tabBarStyle={{
                      marginBottom: 0,
                      paddingLeft: 4,
                      paddingRight: 4,
                    }}
                    activeKey={location.pathname !== '/' ? location.pathname : DEFAULT_HOME_PATH}
                    onEdit={(activeKey, action) => {
                      if (action === 'remove') {
                        dispatch({
                          type: 'global/removeTab',
                          payload: {
                            path: activeKey,
                          },
                        });
                      }
                    }}
                    onTabClick={activeKey => {
                      if (activeKey !== location.pathname) {
                        dispatch(routerRedux.push(activeKey));
                      }
                    }}
                  >
                    <TabPane
                      className={styles.content_item}
                      closable={false}
                      tab={
                        <span>
                          <Icon style={{ fontSize: 14 }} type="cloud" />工作台
                        </span>
                      }
                      key={DEFAULT_HOME_PATH}
                    >
                      <ContentWrapper />
                    </TabPane>

                    {componentTitleList
                      .filter(titleInfo => {
                        return componentsMap[titleInfo.path];
                      })
                      .map(titleInfo => {
                        const { component: Component, props } = componentsMap[titleInfo.path];
                        return (
                          <TabPane
                            className={styles.content_item}
                            closable
                            tab={<span>{titleInfo.title}</span>}
                            key={titleInfo.path}
                          >
                            <ContentWrapper>
                              {Component ? <Component {...props} /> : null}
                            </ContentWrapper>
                          </TabPane>
                        );
                      })}
                  </Tabs>
                </div>
              </Content>
            </Layout>
          </Content>
        </Layout>
      </div>
    );
  }

  render() {
    const { global } = this.props;

    return global.initialized ? this.renderMain() : <InitializingLayout />;
  }
}

export default MainLayout;
