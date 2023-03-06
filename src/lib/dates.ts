import type { RouterOutputs } from "@/utils/api";

export const isInThePast = (date: Date) => date < new Date();

export const eventIsInThePast = (
  event: RouterOutputs["event"]["feed"]["events"][0]
) => isInThePast(event.startDate);

export const eventIsNotInThePast = (
  event: RouterOutputs["event"]["feed"]["events"][0]
) => !isInThePast(event.startDate);
