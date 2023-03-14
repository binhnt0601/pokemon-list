---
to: src/components/<%= level %>/<%= name %>/index.stories.tsx
---
import { Story, Meta } from '@storybook/react/types-6-0';

import { <%= h.toPascalCase(name) %>, Props } from '.';

export default {
	title: 'Components/<%= level %>/<%= h.toPascalCase(name) %>',
	component: <%= h.toPascalCase(name) %>,
} as Meta;

const Template: Story<Props> = ({ modifiers, children }) => (
	<<%= h.toPascalCase(name) %> modifiers={modifiers}>{children}</<%= h.toPascalCase(name) %>>
);

export const Normal = Template.bind({});

Normal.args = {};
