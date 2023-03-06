export const DateDisplay = ({ date }: { date: Date }) => {
  return (
    <>
      <dt className="sr-only">Published on</dt>
      <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
        <time dateTime={date.toISOString()}>
          {new Date(date).toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </time>
      </dd>
    </>
  );
};
