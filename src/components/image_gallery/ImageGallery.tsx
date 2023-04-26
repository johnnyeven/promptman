import React, { useEffect, useRef, useState } from "react";
import { Grid, Image } from "@arco-design/web-react";
const { Row, Col } = Grid;

export interface IImageGallery {
    tasksId: any[];
}

const ImageGallery: React.FC<IImageGallery> = ({ tasksId }) => {
    const isMounted = useRef(true)
    const [taskContainer, setTaskContainer] = useState<any[][]>([]);

    useEffect(() => {
        console.log('image gallery mounted' + tasksId)
        // 获取历史任务
        if (tasksId.length == 0) return

        const url = '/task-scheduler/v0/tasks?tasks_id=' + tasksId.join('|')
        fetch(url, { method: 'GET' })
            .then(response => response.json())
            .then(data => {
                if (isMounted.current) {
                    let mapper = [];
                    for (let i = 0; i < data.data.length; i += 3) {
                        mapper.push(data.data.slice(i, i + 3));
                    }
                    setTaskContainer(mapper);
                }
            })
        return () => {
            setTaskContainer([])
            isMounted.current = false
        }
    }, [tasksId])

    return <>
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
}

export default ImageGallery;