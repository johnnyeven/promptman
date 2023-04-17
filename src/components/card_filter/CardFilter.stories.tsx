import { ComponentStory, ComponentMeta } from '@storybook/react';
import CardFilter, { ICardFilter } from './CardFilter';
import { mockCardFilterProps } from './CardFilter.mocks'

export default {
    title: 'components/CardFilter',
    component: CardFilter,
    argTypes: {},
} as ComponentMeta<typeof CardFilter>;

const Template: ComponentStory<typeof CardFilter> = (args) => (
    <CardFilter {...args} />
);

export const Base = Template.bind({});

Base.args = {
    ...mockCardFilterProps.base,
} as ICardFilter;
