import type { Meta, StoryObj } from '@storybook/react';

import { SpellCard } from './SpellCard';

const meta = {
  title: 'SpellCard',
  component: SpellCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
  },
  args: {
  }
} satisfies Meta<typeof SpellCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    active: false,
    spell: {
      components: ['S', 'V'],
      castingTimes: [{
        total: 1,
        actionType: 'action'
      }],
      concentration: false,
      creatures: [],
      description: [],
      descriptionHigherLevel: [],
      durationTimes: [{
        total: 0,
        actionType: 'instantaneous'
      }],
      level: 0,
      magicSchool: 'evocation',
      materials: '',
      name: 'Sacred Flame',
      range: '60ft.',
      ritual: false,
      source: 'Player\'s Handbook',
      system: 'D&D 2014',
    }
  }
};