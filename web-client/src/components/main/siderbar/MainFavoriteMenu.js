import React, { PureComponent } from 'react';

import { Menu, Icon } from 'antd';

import styles from './MainSiderMenu.less';

const MenuItem = Menu.Item;

class MainFavoriteMenu extends PureComponent {
  render() {
    const { favoriteMenus, onMenuClick } = this.props;
    const menus = favoriteMenus || [];

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
          {menus.map(menu => {
            return (
              <MenuItem key={menu.id} menu={menu}>
                {menu.icon ? <Icon type={menu.icon} /> : null}
                <span>{menu.name}</span>
              </MenuItem>
            );
          })}
        </Menu>
      </div>
    );
  }
}

export default MainFavoriteMenu;
