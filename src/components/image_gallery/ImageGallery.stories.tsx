import { ComponentStory, ComponentMeta } from '@storybook/react';
import ImageGallery, { IImageGallery } from './ImageGallery';
import { mockImageGalleryProps } from './ImageGallery.mocks'

export default {
    title: 'components/ImageGallery',
    component: ImageGallery,
    argTypes: {},
} as ComponentMeta<typeof ImageGallery>;

const Template: ComponentStory<typeof ImageGallery> = (args) => (
    <ImageGallery {...args} />
);

export const Base = Template.bind({});

Base.args = {
    ...mockImageGalleryProps.base,
} as IImageGallery;
