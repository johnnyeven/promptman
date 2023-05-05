import React, { useEffect, useState, useRef } from "react";
import useWebSocket from 'react-use-websocket';
import { Grid, Image } from "@arco-design/web-react";
import style from './ImageGallery.module.css';
const { Row, Col } = Grid;

export interface IImageGallery {
    token: string;
}

const ImageGallery: React.FC<IImageGallery> = ({ token }) => {
    const didMount = useRef(false);
    const [taskContainer, setTaskContainer] = useState<any[][]>([]);
    const [unscheduledTasksId, setUnscheduledTasksId] = useState<number[]>([]);

    const socketUrl = process.env.WS_PROXY_URL || ''
    const { sendJsonMessage, lastJsonMessage, readyState } = useWebSocket(socketUrl, {
        onOpen: () => console.log('opened'),
        shouldReconnect: (closeEvent) => {
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
            .then(response => response.json())
            .then(data => {
                let mapper = [];
                let unscheduledTasksId: number[] = [];
                for (let i = 0; i < data.data.length; i++) {
                    if (data.data[i].status != 'FINISHED') {
                        unscheduledTasksId.push(data.data[i].id)
                    }
                }
                if (unscheduledTasksId.length > 0) setUnscheduledTasksId(unscheduledTasksId);

                for (let i = 0; i < data.data.length; i += 3) {
                    mapper.push(data.data.slice(i, i + 3));
                }
                if (mapper.length > 0) setTaskContainer(mapper);
            })
            .catch(error => console.log(error))
        return () => {
            didMount.current = false
            setTaskContainer([])
        }
    }, [])

    useEffect(() => {
        console.log('unscheduledTasksId: ' + unscheduledTasksId)
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

    useEffect(() => {
        console.log('readyState: ' + readyState)
    }, [readyState])

    return <>
        {
            taskContainer.map((row: any, index: number) => (
                <Row gutter={20} justify="start" align="start" className="mb-12" key={index}>
                    {
                        row.map((task: any) => {
                            let parameter = JSON.parse(task.parameter)
                            if (task.status == 'INIT') {
                                return <Col span={8} key={task.id}>
                                    <div className={style['image-gallery-skeleton']}></div>
                                </Col>
                            } else if (task.status == 'PROCESSING') {
                                return <Col span={8} key={task.id}>
                                    <div className={style['image-gallery-skeleton']}>
                                        <p>{task.current_step} / {task.max_steps}</p>
                                    </div>
                                </Col>
                            } else if (task.status == 'FINISHED') {
                                return <Col span={8} key={task.id}>
                                    <Image
                                        src={task.image1}
                                        width="100%"
                                        loader={true}
                                        style={{ borderRadius: '8px' }}
                                        title={parameter.prompt}
                                    />
                                </Col>
                            } else {
                                return <Col span={8} key={task.id}>
                                    <div className={style['image-gallery-skeleton']}></div>
                                </Col>
                            }
                        })
                    }
                </Row>
            ))
        }
    </>
}

export default ImageGallery;