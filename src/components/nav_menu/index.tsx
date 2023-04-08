import { Menu } from "@arco-design/web-react";
import Link from "next/link";

const MenuItem = Menu.Item;

export default function NavMenu({ activeIndex = "1" }) {
    return (
        <Menu mode='horizontal' theme='dark' defaultSelectedKeys={[activeIndex]} style={{ borderBottom: 'rgb(50, 50, 50) 1px solid' }}>
            <MenuItem key='1'><Link href={'/'}>Home</Link></MenuItem>
            <MenuItem key='2'><Link href={'/gallery'}>Gallery</Link></MenuItem>
            <MenuItem key='3'><Link href={'/editor'}>Editor</Link></MenuItem>
        </Menu>
    );
}