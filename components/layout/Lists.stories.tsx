import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { List, ListItem, InfiniteScroll, VirtualizedList } from './Lists';
import { Activity, Beaker, CheckCircle2 } from 'lucide-react';

const meta: Meta = {
  title: 'Layout/Lists',
  tags: ['autodocs'],
};

export default meta;

export const UnorderedList: StoryObj<typeof List> = {
  render: () => (
    <List>
      <ListItem>Patient has no known drug allergies.</ListItem>
      <ListItem>Follow up appointment scheduled for next week.</ListItem>
      <ListItem>Lab results pending for CBC and Lipid Panel.</ListItem>
    </List>
  ),
};

export const OrderedList: StoryObj<typeof List> = {
  render: () => (
    <List ordered spacing="md">
      <ListItem>Review patient intake forms.</ListItem>
      <ListItem>Conduct initial physical examination.</ListItem>
      <ListItem>Prescribe necessary medications and finalize care plan.</ListItem>
    </List>
  ),
};

export const IconList: StoryObj<typeof List> = {
  render: () => (
    <List spacing="md">
      <ListItem icon={<Activity className="w-4 h-4 text-urvos-brand" />}>
        Normal sinus rhythm on recent ECG.
      </ListItem>
      <ListItem icon={<Beaker className="w-4 h-4 text-urvos-brand" />}>
        Awaiting pathology results from biopsy.
      </ListItem>
      <ListItem icon={<CheckCircle2 className="w-4 h-4 text-green-500" />}>
        Cleared for outpatient surgery.
      </ListItem>
    </List>
  ),
};

export const InfiniteScrollExample: StoryObj<typeof InfiniteScroll> = {
  render: () => {
    const [items, setItems] = useState<number[]>(Array.from({ length: 10 }).map((_, i) => i));
    const [isLoading, setIsLoading] = useState(false);
    const hasMore = items.length < 30;

    const loadMore = () => {
      if (isLoading || !hasMore) return;
      setIsLoading(true);
      setTimeout(() => {
        setItems((prev) => [...prev, ...Array.from({ length: 10 }).map((_, i) => prev.length + i)]);
        setIsLoading(false);
      }, 1000);
    };

    return (
      <div className="h-64 overflow-y-auto border border-urvos-border p-4 rounded-md">
        <InfiniteScroll onLoadMore={loadMore} hasMore={hasMore} isLoading={isLoading}>
          <List spacing="sm">
            {items.map((i) => (
              <ListItem key={i}>Scroll item {i}</ListItem>
            ))}
          </List>
        </InfiniteScroll>
      </div>
    );
  },
};

export const VirtualizedListExample: StoryObj<typeof VirtualizedList> = {
  render: () => {
    const items = Array.from({ length: 10000 }).map((_, i) => `Virtual Row ${i}`);
    return (
      <div className="w-full max-w-md">
        <VirtualizedList
          items={items}
          itemHeight={40}
          height="300px"
          renderItem={(item, index) => (
            <div
              className={`flex items-center px-4 h-full ${
                index % 2 === 0 ? 'bg-urvos-surface' : 'bg-urvos-surface-soft'
              }`}
            >
              <span className="text-sm text-urvos-ink">{item}</span>
            </div>
          )}
        />
      </div>
    );
  },
};
