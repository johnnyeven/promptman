import { Menu } from "@arco-design/web-react";

const MenuItem = Menu.Item;

export default function NavMenu() {
    return (
        <Menu mode='horizontal' theme='dark' defaultSelectedKeys={['1']}>
            <MenuItem key='1'>Home</MenuItem>
            <MenuItem key='2'>Gallery</MenuItem>
            <MenuItem key='3'>Editor</MenuItem>
        </Menu>
    );
}