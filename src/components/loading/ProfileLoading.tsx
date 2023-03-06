import { classNames } from "@/lib/classnames";

const ProfileLoading = () => {
  return (
    <div className="animate-pulse">
      <div className="relative rounded-lg border p-4">
        {/* <div className="h-8 w-3/4 rounded bg-gray-200 dark:bg-gray-700" /> */}
        <div
          className={classNames("flex items-center justify-between gap-4")}
        ></div>
        <div className="flex items-center gap-4">
          <div className="h-[128px] w-[128px] rounded-full bg-gray-200 dark:bg-gray-700" />
          <div className="flex-1">
            <div className="mb-2 h-8 w-64 rounded bg-gray-200 dark:bg-gray-700" />
            <div className="mb-2 h-4 w-44 rounded bg-gray-200 dark:bg-gray-700" />
            <div className="h-4 w-44 rounded bg-gray-200 dark:bg-gray-700" />
          </div>
        </div>
      </div>
      <div className="relative mt-8 rounded-lg border p-4">
        <div className="mb-2 h-8 w-64 rounded bg-gray-200 dark:bg-gray-700" />
        <div className="mt-7 space-y-3">
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-2 h-5 rounded bg-gray-200 dark:bg-gray-700" />
            <div className="col-span-1 h-5 rounded bg-gray-200 dark:bg-gray-700" />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-2 h-5 rounded bg-gray-200 dark:bg-gray-700" />
            <div className="col-span-1 h-5 rounded bg-gray-200 dark:bg-gray-700" />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-2 h-5 rounded bg-gray-200 dark:bg-gray-700" />
            <div className="col-span-1 h-5 rounded bg-gray-200 dark:bg-gray-700" />
          </div>

          <div className="h-5 w-1/2 rounded bg-gray-200 dark:bg-gray-700" />
        </div>

        <div className="mb-2 mt-8 h-8 w-64 rounded bg-gray-200 dark:bg-gray-700" />
        <div className="mt-7 space-y-3">
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-2 h-5 rounded bg-gray-200 dark:bg-gray-700" />
            <div className="col-span-1 h-5 rounded bg-gray-200 dark:bg-gray-700" />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-2 h-5 rounded bg-gray-200 dark:bg-gray-700" />
            <div className="col-span-1 h-5 rounded bg-gray-200 dark:bg-gray-700" />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-2 h-5 rounded bg-gray-200 dark:bg-gray-700" />
            <div className="col-span-1 h-5 rounded bg-gray-200 dark:bg-gray-700" />
          </div>

          <div className="h-5 w-1/2 rounded bg-gray-200 dark:bg-gray-700" />
        </div>

        <div className="mt-8 mb-2 h-8 w-64 rounded bg-gray-200 dark:bg-gray-700" />
        <div className="mt-7 space-y-3">
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-2 h-5 rounded bg-gray-200 dark:bg-gray-700" />
            <div className="col-span-1 h-5 rounded bg-gray-200 dark:bg-gray-700" />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-2 h-5 rounded bg-gray-200 dark:bg-gray-700" />
            <div className="col-span-1 h-5 rounded bg-gray-200 dark:bg-gray-700" />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-2 h-5 rounded bg-gray-200 dark:bg-gray-700" />
            <div className="col-span-1 h-5 rounded bg-gray-200 dark:bg-gray-700" />
          </div>

          <div className="h-5 w-1/2 rounded bg-gray-200 dark:bg-gray-700" />
        </div>
      </div>
    </div>
  );
};

export default ProfileLoading;
