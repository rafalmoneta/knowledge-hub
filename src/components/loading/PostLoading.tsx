import React from "react";

const PostLoading = () => {
  return (
    <div className="animate-pulse">
      <div className="h-9 w-3/4 rounded bg-gray-200 dark:bg-gray-700" />
      <div className="mt-6 flex items-center gap-4">
        <div className="h-12 w-12 rounded-full bg-gray-200 dark:bg-gray-700" />
        <div className="flex-1">
          <div className="h-4 w-24 rounded bg-gray-200 dark:bg-gray-700" />
          <div className="mt-2 h-3 w-32 rounded bg-gray-200 dark:bg-gray-700" />
        </div>
      </div>
      <div className="mt-7 space-y-3">
        {/* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment */}
        {[...Array(5)].map((_, idx) => (
          <React.Fragment key={idx}>
            <div className="grid grid-cols-3 gap-4 pt-8">
              <div className="col-span-2 h-5 rounded bg-gray-200 dark:bg-gray-700" />
              <div className="col-span-1 h-5 rounded bg-gray-200 dark:bg-gray-700" />
            </div>
            <div className="h-5 w-1/2 rounded bg-gray-200 dark:bg-gray-700" />
            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-1 h-5 rounded bg-gray-200 dark:bg-gray-700" />
              <div className="col-span-2 h-5 rounded bg-gray-200 dark:bg-gray-700" />
            </div>
            <div className="h-5 w-3/5 rounded bg-gray-200 dark:bg-gray-700" />
          </React.Fragment>
        ))}
      </div>
      <div className="mt-6 flex gap-4">
        <div className="h-button w-16 rounded-full border border-secondary" />
        <div className="h-button w-16 rounded-full border border-secondary" />
      </div>
    </div>
  );
};

export default PostLoading;
