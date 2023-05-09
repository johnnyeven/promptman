import React, { useEffect, useState, useRef } from "react";
import useWebSocket from 'react-use-websocket';
import { Grid, Image, Progress, Spin } from "@arco-design/web-react";
import style from './ImageGallery.module.css';
import Decimal from "decimal.js";
const { Row, Col } = Grid;

export interface IImageGallery {
    token: string;
}

const ImageGallery: React.FC<IImageGallery> = ({ token }) => {
    const didMount = useRef(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [taskContainer, setTaskContainer] = useState<any[][]>([]);
    const [unscheduledTasksId, setUnscheduledTasksId] = useState<number[]>([]);

    const socketUrl = process.env.WS_PROXY_URL || ''
    const { sendJsonMessage, lastJsonMessage } = useWebSocket(socketUrl, {
        shouldReconnect: () => {
            return didMount.current === true
        },
        reconnectInterval: 5000,
        reconnectAttempts: 5,
    });

    useEffect(() => {
        didMount.current = true
        // 获取历史任务
        if (!token || token == '') return

        const url = '/task-scheduler/v0/tasks'
        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                return response.json()
            })
            .then(data => {
                setIsLoading(false)
                let unscheduledTasksId: number[] = [];
                for (let i = 0; i < data.data.length; i++) {
                    if (data.data[i].status != 'FINISHED' && data.data[i].status != 'FAILED') {
                        unscheduledTasksId.push(data.data[i].id)
                    }
                }
                if (unscheduledTasksId.length > 0) setUnscheduledTasksId(unscheduledTasksId);

                if (data.data.length > 0) {
                    setTaskContainer(data.data);
                }
            })
            .catch(error => {
                setIsLoading(false)
                console.log(error)
            })
        return () => {
            didMount.current = false
        }
    }, [])

    useEffect(() => {
        for (let i = 0; i < unscheduledTasksId.length; i++) {
            sendJsonMessage({ task_id: unscheduledTasksId[i] });
        }
    }, [unscheduledTasksId])

    useEffect(() => {
        if (lastJsonMessage == null) return
        let task = lastJsonMessage as any
        let tasks = [...taskContainer]
        for (let i = 0; i < tasks.length; i++) {
            for (let j = 0; j < tasks[i].length; j++) {
                if (tasks[i][j].id == task.task_id) {
                    if (task.status == 'FINISHED') {
                        tasks[i][j].status = task.status
                        tasks[i][j].image1 = task.result
                        tasks[i][j].current_step = task.step
                        tasks[i][j].max_steps = task.max_steps
                    } else if (task.status == 'PROCESSING') {
                        tasks[i][j].status = task.status
                        tasks[i][j].current_step = task.step
                        tasks[i][j].max_steps = task.max_steps
                    } else if (task.status == 'INIT') {
                        tasks[i][j].status = task.status
                        tasks[i][j].queue = task.queue
                    }
                }
            }
        }
        setTaskContainer(tasks)
    }, [lastJsonMessage])

    if (isLoading) {
        return <div className="flex w-full justify-center">
            <Spin dot />
        </div>
    }
    return <Row gutter={20} justify="start" align="start" className="mb-12">
        {
            taskContainer.map((task: any) => {
                let parameter = JSON.parse(task.parameter)
                if (task.status == 'INIT') {
                    return <Col span={8} key={task.id} className={style['image-gallery-task']}>
                        <div className={[style['image-gallery-skeleton'], 'flex', 'justify-center'].join(' ')}>
                            <div className={style['image-gallery-not-ready']}>
                                <Spin size={64} className={style['image-gallery-not-ready_content']} />
                            </div>
                        </div>
                    </Col>
                } else if (task.status == 'PROCESSING') {
                    const currentStep = new Decimal(task.current_step || 0)
                    const percent = currentStep.dividedBy(task.max_steps).mul(100).floor().toNumber()
                    return <Col span={8} key={task.id} className={style['image-gallery-task']}>
                        <div className={[style['image-gallery-skeleton'], 'flex', 'justify-center'].join(' ')}>
                            <div className={style['image-gallery-not-ready']}>
                                <Progress type='circle' percent={percent} className={style['image-gallery-not-ready_content']} />
                            </div>
                        </div>
                    </Col>
                } else if (task.status == 'FINISHED') {
                    return <Col span={8} key={task.id} className={style['image-gallery-task']}>
                        <Image
                            src={task.image1}
                            width="100%"
                            loader={true}
                            style={{ borderRadius: '8px' }}
                            title={parameter.prompt}
                        />
                    </Col>
                } else {
                    return <Col span={8} key={task.id} className={style['image-gallery-task']}>
                        <div className={style['image-gallery-skeleton']}></div>
                    </Col>
                }
            })
        }
    </Row>
}

export default ImageGallery;