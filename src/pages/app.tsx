import { NextPageWithLayout } from "./page";
import PrimaryLayout from "@/components/layouts/primary/PrimaryLayout";
import { Button, Grid, Input, Radio, Typography } from "@arco-design/web-react";
import Link from "next/link";

const { Row, Col } = Grid;

const App: NextPageWithLayout = () => {
    return (
        <div className="w-3/5">
            <Row>
                <Col span={24}>
                    <Typography.Title heading={3}>1. Type your prompt or <Link href="/editor" style={{ color: 'orange' }}>use editor</Link></Typography.Title>
                </Col>
            </Row>
            <Row gutter={20} className="mb-12">
                <Col span={24}>
                    <Input className="h-10" size="large" placeholder="Type your prompt..." allowClear showWordLimit maxLength={200} />
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                    <Typography.Title heading={3}>2. Select a pretrained model</Typography.Title>
                </Col>
            </Row>
            <Row gutter={20} justify="center" align="start" className="mb-12">
                <Col span={24}>
                    <Radio.Group type="button" name="model">
                        <Radio value="1">Option 1</Radio>
                        <Radio value="2">Option 2</Radio>
                        <Radio value="3">Option 3</Radio>
                        <Radio value="4">Option 4</Radio>
                        <Radio value="5">Option 5</Radio>
                        <Radio value="6">Option 6</Radio>
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
                    <Button size='large' type='primary'>Generate</Button>
                </Col>
            </Row>
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