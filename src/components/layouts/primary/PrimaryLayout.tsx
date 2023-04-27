import React from "react";
import Head from 'next/head';
import { Layout } from '@arco-design/web-react';
import NavMenu from '../../../components/nav_menu';

import styles from './PrimaryLayout.module.css';
import "@arco-design/web-react/dist/css/arco.css";

const Header = Layout.Header;
const Content = Layout.Content;

export interface IPrimaryLayout extends React.ComponentPropsWithoutRef<'div'> { }

const PrimaryLayout: React.FC<IPrimaryLayout> = ({ children }) => {
    return (
        <>
            <Head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="description" content="Prompaint is a tool specifically designed for hobbyists writing StableDiffusion Prompt. You can easily view, share, and run these prompts with one click, while providing a prompt design tool that allows you to easily create a prompt that meets your needs and share it with others." />
                <meta name="keywords" content="prompt, stable diffusion, promptman, Prompaint" />
                <meta name="author" content="Johnny Even" />
                <meta property="og:title" content="Prompaint" />
                <meta property="og:description" content="Prompaint is a tool specifically designed for hobbyists writing StableDiffusion Prompt. You can easily view, share, and run these prompts with one click, while providing a prompt design tool that allows you to easily create a prompt that meets your needs and share it with others." />
                <meta property="og:url" content="https://www.prompaint.com/" />
                <meta property="og:site_name" content="Prompaint" />
                <meta property="og:type" content="website" />
                <title>{'胖胖提示词大师'}</title>
            </Head>
            <Layout className={[styles.layout, "font-mono"]}>
                <Header className="flex flex-col top-0 left-0 fixed w-full z-50">
                    <NavMenu />
                </Header>
                <Content className="flex min-h-screen flex-col items-center justify-between p-24">
                    {children}
                </Content>
            </Layout>
        </>
    );
};

export default PrimaryLayout;