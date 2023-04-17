import React from "react";
import { Checkbox, Grid, Select, Tag } from "@arco-design/web-react";
import styles from './CardFilter.module.css';

const Row = Grid.Row;
const Col = Grid.Col;

const Option = Select.Option;

export interface ICardFilter {
    enableSort: boolean;
    enableFilter: boolean;
}

const CardFilter: React.FC<ICardFilter> = ({ enableSort, enableFilter }) => {

    const renderSort = () => {
        if (enableSort) {
            return <Select bordered={false} size="large" placeholder="Sort type...">
                <Option key="1" value={1}>Option 1</Option>
                <Option key="2" value={2}>Option 2</Option>
                <Option key="3" value={3}>Option 3</Option>
            </Select>
        }
    }

    const renderFilter = () => {
        if (enableFilter) {
            return <Checkbox.Group>
                {
                    ['Option 1', 'Option 2', 'Option 3'].map((item, index) => {
                        return <Checkbox key={index} value={item}>
                            {
                                ({ checked }) => {
                                    return (
                                        <Tag color={checked ? 'blue' : 'gray'}>{item}</Tag>
                                    );
                                }
                            }
                        </Checkbox>
                    })
                }
            </Checkbox.Group>
        }
    }

    return (
        <div className={styles['card-filter-root']}>
            <Row>
                <Col span={24}>{renderSort()}</Col>
            </Row>
            <Row>
                <Col span={24}>{renderFilter()}</Col>
            </Row>
        </div>
    )
}

export default CardFilter;