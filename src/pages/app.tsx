import { NextPageWithLayout } from "./page";
import PrimaryLayout from "@/components/layouts/primary/PrimaryLayout";
import { Button, Grid, Image, Input, Radio, Typography } from "@arco-design/web-react";
import Link from "next/link";
import { useState, useCallback, useRef, useEffect } from "react";
import config from "@/lib/config"
import axios from "axios";

const { Row, Col } = Grid;

const App: NextPageWithLayout = () => {
    const isMounted = useRef(true)
    const [isWorking, setIsWorking] = useState(true);
    const [prompt, setPrompt] = useState('');
    const [model, setModel] = useState('openjourney');
    const [tasksId, setTasksId] = useState<number[]>([]);
    const [tasks, setTasks] = useState<any[]>([]);

    useEffect(() => {
        // 获取历史任务
        let storageTasks = JSON.parse(window.localStorage.getItem('tasks_id') || '[]');
        let tasksId: number[] = []
        storageTasks.forEach((task_id: any) => {
            tasksId.push(task_id)
        })
        setTasksId(tasksId as never);
        return () => {
            setTasksId([])
            setTasks([])
            setIsWorking(true)
            setPrompt('')
            setModel('openjourney')
            isMounted.current = false
        }
    }, [])

    // batch get tasks
    useEffect(() => {
        if (tasksId.length == 0) return
        const fetch = async () => {
            const url = '/task-scheduler/v0/tasks'
            let response = await axios.get(url, {
                params: {
                    'tasks_id': tasksId.join('|')
                }
            })
            if (response.status == 200) {
                return response.data
            }
        }
        fetch()
            .catch((error) => {
                console.log(error)
            })
            .then((data) => {
                if (isMounted.current) {
                    setTasks([...tasks, ...data.data])
                    setIsWorking(false);
                }
            })
    }, [tasksId])

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
            }
        } catch (error) {
            console.log(error)
        } finally {
            setIsWorking(false);
        }
    }, [isWorking])

    const getGenerateResult = () => {
        let taskContainer = [];
        for (let i = 0; i < tasks.length; i += 3) {
            taskContainer.push(tasks.slice(i, i + 3));
        }

        return (
            <>
                {
                    taskContainer.map((row: any, index: number) => (
                        <Row gutter={20} justify="start" align="start" className="mb-12" key={index}>
                            {
                                row.map((task: any) => (
                                    <Col span={8} key={task.id}>
                                        <Image src={task.image1} width="100%" style={{ background: "#FFFFFF" }} />
                                    </Col>
                                ))
                            }
                        </Row>
                    ))
                }
            </>
        )
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