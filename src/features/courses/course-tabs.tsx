"use client";

import { useState } from "react";

type CourseTabContent = {
  tabLabel: string;
  heading: string;
  body: string;
};

type CourseTabsProps = Readonly<{
  items: readonly CourseTabContent[];
}>;

export default function CourseTabs({ items }: CourseTabsProps) {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const activeTab = items[activeTabIndex] ?? null;

  if (!activeTab) {
    return null;
  }

  return (
    <div className="grid gap-4 pt-5">
      <div className="flex flex-wrap gap-4">
        {items.map((item, index) => {
          const isActive = index === activeTabIndex;

          return (
            <button
              key={item.tabLabel}
              type="button"
              onClick={() => setActiveTabIndex(index)}
              aria-pressed={isActive}
              className={`inline-flex cursor-pointer items-center rounded-md px-4 py-2 text-md font-medium ${
                isActive
                  ? "bg-gray-700 text-white"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              {item.tabLabel}
            </button>
          );
        })}
      </div>
      <div className="grid gap-2 mt-2">
        <h3 className="text-xl font-bold text-gray-900">{activeTab.heading}</h3>
        <p className="text-sm leading-7 text-gray-400">{activeTab.body}</p>
      </div>
    </div>
  );
}
