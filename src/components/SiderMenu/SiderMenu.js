import React, { PureComponent } from 'react';
import { Layout, Menu, Icon } from 'antd';
import { Link } from 'dva/router';
import pathToRegexp from 'path-to-regexp';
import { urlToList } from '../_utils/pathTools';
import style from './index.less'
const { Sider } = Layout;
const { SubMenu } = Menu;

export const getMenuMatchKeys = (flatMenuKeys, paths) =>
  paths.reduce(
    (matchKeys, path) =>
      matchKeys.concat(flatMenuKeys.filter(item => pathToRegexp(item).test(path))),
    []
  );
  const getIcon = icon => {
    // if (typeof icon === 'string') {
    //   if (icon.indexOf('http') === 0) {
    //     return <img src={icon} alt="icon" className={`${styles.icon} sider-menu-item-img`} />;
    //   }
      return <Icon type={icon} />;
    }
export const getFlatMenuKeys = menu =>
    menu.reduce((keys, item) => {
      keys.push(item.path);
      if (item.children) {
        return keys.concat(getFlatMenuKeys(item.children));
      }
      return keys;
    }, []);
export default class SiderMenu extends PureComponent {
    constructor(props) {
        super(props);
        this.flatMenuKeys = getFlatMenuKeys(props.menuData);
        this.state = {
            openKeys: this.getDefaultCollapsedSubMenus(props),
          };
      }
      componentWillReceiveProps(nextProps) {
        const { location } = this.props;
        if (nextProps.location.pathname !== location.pathname) {
          this.setState({
            openKeys: this.getDefaultCollapsedSubMenus(nextProps),
          });
        }
      }
      getDefaultCollapsedSubMenus(props) {
        const {
          location: { pathname },
        } = props || this.props;
        return getMenuMatchKeys(this.flatMenuKeys, urlToList(pathname));
      }
    // Get the currently selected menu
      getSelectedMenuKeys = () => {
        const {
          location: { pathname },
        } = this.props;
        return getMenuMatchKeys(this.flatMenuKeys, urlToList(pathname));
      };
      isMainMenu = key => {
        const { menuData } = this.props;
        return menuData.some(item => key && (item.key === key || item.path === key));
      };
      //   菜单选择
      handleOpenChange = openKeys => {
        console.log(openKeys);
        const lastOpenKey = openKeys[openKeys.length - 1];
        const moreThanOne = openKeys.filter(openKey => this.isMainMenu(openKey)).length > 1;
        this.setState({
        openKeys: moreThanOne ? [lastOpenKey] : [...openKeys],
        });
      };
          /**
         * 获得菜单子节点
         * @memberof SiderMenu
         */
        getNavMenuItems = menusData => {
            if (!menusData) {
              return [];
            }
            return menusData
              .filter(item => item.name && !item.hideInMenu)
              .map(item => {
                // make dom
                const ItemDom = this.getSubMenuOrItem(item);
                return ItemDom
              })
              .filter(item => item);
          };
            /**
         * get SubMenu or Item
         */
        getSubMenuOrItem = item => {
            if (item.children && item.children.some(child => child.name)) {
            const childrenItems = this.getNavMenuItems(item.children);
            // 当无子菜单时就不展示菜单
            if (childrenItems && childrenItems.length > 0) {
                return (
                <SubMenu
                    title={
                    item.meta.icon ? (
                        <span>
                        {getIcon(item.meta.icon)}
                        <span>{item.meta.title}</span>
                        </span>
                    ) : (
                        item.meta.title
                    )
                    }
                    key={item.path}
                >
                    {childrenItems}
                </SubMenu>
                );
            }
            return null;
            } else {
            return <Menu.Item key={item.path}>{this.getMenuItemPath(item)}</Menu.Item>;
            }
        };
        /**
         * 判断是否是http链接.返回 Link 或 a
         * Judge whether it is http link.return a or Link
         * @memberof SiderMenu
         */
        getMenuItemPath = item => {
            const itemPath = item.path
            const icon = getIcon(item.meta.icon);
            const { target, meta } = item;
            // Is it a http link
            if (/^https?:\/\//.test(itemPath)) {
            return (
                <a href={itemPath} target={target}>
                {icon}
                <span>{meta.title}</span>
                </a>
            );
            }
            const { location, onCollapse } = this.props;
            return (
            <Link
                to={itemPath}
                target={target}
                replace={itemPath === location.pathname}
            >
                {icon}
                <span>{meta.title}</span>
            </Link>
            );
        };

      render() {
        const { collapsed, onCollapse ,menuData,logo} = this.props;
        const { openKeys } = this.state;
        const theme = 'dark';
        const menuProps = collapsed
        ? {}
        : {
            openKeys,
          };
          let selectedKeys = this.getSelectedMenuKeys();
          if (!selectedKeys.length) {
            selectedKeys = [openKeys[openKeys.length - 1]];
          }
        return (
          <Sider
            trigger={null}
            collapsible
            collapsed={collapsed}
            breakpoint="lg"
            onCollapse={onCollapse}
            width={256}
          >
            <div key="logo" className={style.logo}>
              <Link to="/">
                <img src={logo}></img>
                {
                  !collapsed?(<span>Ant Design Pro V1</span>):null
                }
                
              </Link>
            </div>
            <Menu
              key="Menu"
              theme={theme}
              mode="inline"
              {...menuProps}
              onOpenChange={this.handleOpenChange}
              selectedKeys={selectedKeys}
              style={{ padding: '16px 0', width: '100%' }}
            >
             {this.getNavMenuItems(menuData)}
            </Menu>
          </Sider>
        );
      }

}