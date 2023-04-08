import { Layout } from "@arco-design/web-react";
import NavMenu from '@/components/nav_menu';

import "@arco-design/web-react/dist/css/arco.css";

const Header = Layout.Header;
const Content = Layout.Content;

export default function Gallery() {
    return (
        <Layout className="font-mono">
            <Header className="flex flex-col top-0 left-0 fixed w-full">
                <NavMenu activeIndex={"2"} />
            </Header>
            <Content>

            </Content>
        </Layout>
    )
}