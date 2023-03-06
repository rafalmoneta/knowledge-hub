import type { RouterOutputs } from "@/utils/api";

const EventCard = ({
  event,
  hideJoinButton = false,
}: {
  event: RouterOutputs["event"]["get"];
  hideJoinButton?: boolean;
}) => {
  return (
    <div>
      <div className="relative min-h-[400px] w-full rounded-2xl text-white">
        <div className="absolute top-0 bottom-0 left-0 right-0 z-10 rounded-2xl bg-gradient-to-r from-blue-700 via-blue-600 to-blue-400" />
        <div className="absolute bottom-5 z-20">
          <div className="flex max-w-[600px] flex-col gap-2 p-4">
            <h2 className="mb-2 text-2xl font-bold tracking-tight md:text-3xl">
              {event?.title}
            </h2>
            <p className="font-semibold">
              Location: <span className="font-normal">{event?.location}</span>
            </p>
            <p className="font-semibold">
              Starts:{" "}
              <span className="font-normal">
                {event?.startDate.toLocaleString()}
              </span>
            </p>
            <p className="font-semibold">
              Speaker:{" "}
              <span className="font-normal">{event?.speaker.name}</span>
            </p>
          </div>
        </div>
        {!hideJoinButton ? (
          <div className="absolute bottom-5 right-5 z-20 mb-4">
            <a
              href={event?.meeting ? event.meeting : "#"}
              className="focus-ring inline-flex h-[34px] items-center justify-center rounded-md border border-white bg-transparent px-4 text-sm font-semibold transition-colors"
            >
              <span className="">Join Event</span>
            </a>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default EventCard;
