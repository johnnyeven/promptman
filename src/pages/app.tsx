import { NextPageWithLayout } from "./page";
import PrimaryLayout from "@/components/layouts/primary/PrimaryLayout";
import { Button, Grid, Input, Radio, Typography } from "@arco-design/web-react";
import Link from "next/link";
import { useState, useCallback, useEffect, createContext } from "react";
import config from "@/lib/config"
import ImageGallery from "@/components/image_gallery/ImageGallery";

const { Row, Col } = Grid;

const App: NextPageWithLayout = () => {
    const [isWorking, setIsWorking] = useState(false);
    const [prompt, setPrompt] = useState('');
    const [model, setModel] = useState('openjourney');
    const [tasksId, setTasksId] = useState<any[]>([]);

    useEffect(() => {
        console.log('app mounted')
        let id = JSON.parse(window.localStorage.getItem('tasks_id') || '[]')
        console.log(id)
        setTasksId(id)
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
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(request)
            })
            if (response.status == 200 || response.status == 201) {
                let data = await response.json();
                let tasks = JSON.parse(window.localStorage.getItem('tasks_id') || '[]');
                tasks.push(data.task_id);
                window.localStorage.setItem('tasks_id', JSON.stringify(tasks));
                setTasksId(tasks);
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
                                <Radio key={model.name} value={model.name}>{model.desc}</Radio>
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
                    <Button size='large' type='primary' onClick={createTask} loading={isWorking}>Generate</Button>
                </Col>
            </Row>
            <ImageGallery tasksId={tasksId} />
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