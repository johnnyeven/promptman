import { NextPageWithLayout } from "./page";
import PrimaryLayout from "@/components/layouts/primary/PrimaryLayout";
import { Button, Grid, Image, Input, Radio, Typography } from "@arco-design/web-react";
import Link from "next/link";
import { useState } from "react";
import { isArray } from "util";
import config from "@/lib/config"

const { Row, Col } = Grid;

const App: NextPageWithLayout = () => {
    const [isWorking, setIsWorking] = useState(false);
    const [isResult, setIsResult] = useState(false);
    const [prompt, setPrompt] = useState('');
    const [model, setModel] = useState('openjourney');
    const [imageEncoded, setImageEncoded] = useState('');

    const handleClick = () => {
        getPredictResult();
    }
    const getApi = (modelName: string) => {
        let api = '';
        config.models.forEach((m) => {
            if (m.name === modelName) {
                api = m.api;
            }
        });
        return api;
    }
    const getPredictResult = async () => {
        console.log(prompt);
        setIsWorking(true);
        setIsResult(false);
        let api = getApi(model);
        if (api === '') {
            setIsWorking(false);
            return;
        }
        const res = await fetch(api, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                data: [
                    prompt
                ]
            })
        });
        const data = await res.json();
        if (data.data && isArray(data.data) && data.data.length > 0) {
            console.log(data.data[0]);
            setImageEncoded(data.data[0]);
            setIsResult(true);
        }
        setIsWorking(false);
    }
    const getGenerateResult = () => {
        if (!isWorking && isResult) {
            return (
                <Row gutter={20} justify="center" align="start" className="mb-12">
                    <Col span={8}>
                        <Image src={imageEncoded} width="100%" />
                    </Col>
                </Row>
            )
        }
    }
    return (
        <div className="w-3/5">
            <Row>
                <Col span={24}>
                    <Typography.Title heading={3}>1. Type your prompt or <Link href="/editor" style={{ color: 'orange' }}>use editor</Link></Typography.Title>
                </Col>
            </Row>
            <Row gutter={20} className="mb-12">
                <Col span={24}>
                    <Input className="h-10" value={prompt} onChange={setPrompt} size="large" placeholder="Type your prompt..." allowClear showWordLimit maxLength={200} />
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                    <Typography.Title heading={3}>2. Select a pretrained model</Typography.Title>
                </Col>
            </Row>
            <Row gutter={20} justify="center" align="start" className="mb-12">
                <Col span={24}>
                    <Radio.Group type="button" name="model" value={model} onChange={setModel}>
                        {config.models.map((model) => {
                            return (
                                <Radio key={model.name} value={model.name}>{model.name}</Radio>
                            )
                        })}
                    </Radio.Group>
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                    <Typography.Title heading={3}>3. Run</Typography.Title>
                </Col>
            </Row>
            <Row gutter={20} justify="center" align="start" className="mb-12">
                <Col span={24}>
                    <Button size='large' type='primary' onClick={handleClick} loading={isWorking}>Generate</Button>
                </Col>
            </Row>
            {getGenerateResult()}
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