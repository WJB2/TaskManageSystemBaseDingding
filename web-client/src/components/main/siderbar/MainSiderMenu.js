import React, { PureComponent } from 'react';
import { Menu, Icon } from 'antd';

import styles from './MainSiderMenu.less';

const { SubMenu } = Menu;
const MenuItem = Menu.Item;

class MainSiderMenu extends PureComponent {
  loopMenus(menus) {
    return menus.map(menu => {
      if (menu.children && menu.children.length > 0) {
        return (
          <SubMenu
            key={menu.id}
            title={
              <span>
                {menu.icon ? <Icon type={menu.icon} /> : null}
                <span>{menu.name}</span>
              </span>
            }
          >
            {this.loopMenus(menu.children)}
          </SubMenu>
        );
      } else {
        return (
          <MenuItem key={menu.id} menu={menu}>
            {menu.icon ? <Icon type={menu.icon} /> : null}
            <span>{menu.name}</span>
          </MenuItem>
        );
      }
    });
  }

  render() {
    const { menus, onMenuClick } = this.props;

    return (
      <div
        style={{
          position: 'absolute',
          width: '100%',
          height: 'calc(100% - 48px)',
          overflow: 'auto',
        }}
      >
        <Menu
          mode="inline"
          className={styles.menu}
          onClick={({ item }) => {
            const { menu } = item.props;

            onMenuClick(menu);
          }}
        >
          {this.loopMenus(menus)}
        </Menu>
      </div>
    );
  }
}

export default MainSiderMenu;
