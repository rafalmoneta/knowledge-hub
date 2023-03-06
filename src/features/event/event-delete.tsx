import React from "react";
import { trpc } from "@/utils/api";
import {
  Dialog,
  DialogActions,
  DialogCloseButton,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "../../components/dialog";
import { Button } from "../../components/button";
import { useRouter } from "next/router";

const ConfirmDeleteEventDialog = ({
  eventId,
  isOpen,
  onClose,
}: {
  eventId: string;
  isOpen: boolean;
  onClose: () => void;
}) => {
  const router = useRouter();
  const cancelRef = React.useRef<HTMLButtonElement>(null);
  const deleteEventMutation = trpc.event.delete.useMutation({
    async onSuccess() {
      await router.push(`/events`);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return (
    <>
      <Dialog isOpen={isOpen} onClose={onClose} initialFocus={cancelRef}>
        <DialogContent>
          <DialogTitle>Delete Event</DialogTitle>

          <DialogDescription className="mt-6">
            Are you sure you want to delete this Event? This action cannot be
            undone.
          </DialogDescription>

          <DialogCloseButton onClick={onClose} />
        </DialogContent>

        <DialogActions>
          <Button
            variant="secondary"
            className="!text-red-500"
            isLoading={deleteEventMutation.isLoading}
            loadingChildren="Deleting Event"
            onClick={() => {
              deleteEventMutation.mutate({ id: eventId });
            }}
          >
            Delete Event
          </Button>

          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ConfirmDeleteEventDialog;
