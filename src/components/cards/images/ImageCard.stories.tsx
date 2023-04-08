import { ComponentStory, ComponentMeta } from '@storybook/react';
import ImageCard, { IImageCard } from './ImageCard';
import { mockImageCardProps } from './ImageCard.mocks'

export default {
    title: 'templates/ImageCard',
    component: ImageCard,
    argTypes: {},
} as ComponentMeta<typeof ImageCard>;

const Template: ComponentStory<typeof ImageCard> = (args) => (
    <ImageCard {...args} />
);

export const Base = Template.bind({});

Base.args = {
    ...mockImageCardProps.base,
} as IImageCard;
