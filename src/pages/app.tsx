import { NextPageWithLayout } from "./page";
import PrimaryLayout from "@/components/layouts/primary/PrimaryLayout";
import { Button, Grid, Input, Radio, Typography } from "@arco-design/web-react";
import Link from "next/link";
import { useState, useCallback, useEffect, useRef } from "react";
import config from "@/lib/config"
import ImageGallery from "@/components/image_gallery/ImageGallery";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { useSession } from "next-auth/react";
import { getToken } from "next-auth/jwt";
import { GetServerSidePropsContext } from "next";
import { useProviderDataContext } from "@/context";

const { Row, Col } = Grid;

const App: NextPageWithLayout = (props: any) => {
    useSession({ required: true })

    const { token, providers } = props
    const { setProviders } = useProviderDataContext()
    const { t } = useTranslation('app')
    const didMount = useRef(false);
    const [repaintGallery, setRepaintGallery] = useState(0);
    const [isWorking, setIsWorking] = useState(false);
    const [prompt, setPrompt] = useState('');
    const [model, setModel] = useState('openjourney');

    setProviders(providers)

    useEffect(() => {
        didMount.current = true;

        return () => {
            setPrompt('')
            setModel('openjourney')
            setIsWorking(false)
            didMount.current = false;
        }
    }, [])

    // create task
    const createTask = useCallback(async () => {
        if (isWorking) return
        setIsWorking(true);
        let request = {
            prompt: prompt,
            model: model
        }
        try {
            const url = '/task-scheduler/v0/tasks'
            let response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(request)
            })
            if (response.status == 200 || response.status == 201) {
                setRepaintGallery(repaintGallery + 1)
            }
        } catch (error) {
            console.log(error)
        } finally {
            setIsWorking(false);
        }
    }, [isWorking, prompt, model])

    return (
        <div className="w-3/5">
            <Row>
                <Col span={24}>
                    <Typography.Title heading={3}>{t('page.head.first.segment1')}<Link href="/editor" style={{ color: 'orange' }}>{t('page.head.first.segment2')}</Link></Typography.Title>
                </Col>
            </Row>
            <Row gutter={20} className="mb-12">
                <Col span={24}>
                    <Input className="h-10" value={prompt} onChange={setPrompt} size="large" placeholder="Type your prompt..." allowClear showWordLimit maxLength={200} />
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                    <Typography.Title heading={3}>{t('page.head.second')}</Typography.Title>
                </Col>
            </Row>
            <Row gutter={20} justify="center" align="start" className="mb-12">
                <Col span={24}>
                    <Radio.Group type="button" name="model" value={model} onChange={setModel}>
                        {config.models.map((model) => {
                            return (
                                <Radio key={model.name} value={model.name}>{model.desc}</Radio>
                            )
                        })}
                    </Radio.Group>
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                    <Typography.Title heading={3}>{t('page.head.third')}</Typography.Title>
                </Col>
            </Row>
            <Row gutter={20} justify="center" align="start" className="mb-12">
                <Col span={24}>
                    <Button size='large' type='primary' onClick={createTask} loading={isWorking}>{t('page.button')}</Button>
                </Col>
            </Row>
            <ImageGallery key={repaintGallery} token={token} />
        </div>
    )
};

export default App;

App.getLayout = (page) => {
    return (
        <PrimaryLayout>
            {page}
        </PrimaryLayout>
    );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const token = await getToken({ req: context.req, raw: true, secret: process.env.JWT_SECRET })
    return {
        props: {
            token,
            ...(await serverSideTranslations(context.locale || '', ['common', 'locale_switcher', 'user_control', 'app'])),
        }
    }
}
