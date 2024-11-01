import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useDialog } from "@/context/DialogContext";

export function WrapperDelete() {
  const { isDeleteDialogOpen, closeDeleteDialog, onDeleteRef } = useDialog();

  const handleDelete = () => {
    if (onDeleteRef.current) {
      onDeleteRef.current();
    }
    closeDeleteDialog();
  };

  return (
    <AlertDialog open={isDeleteDialogOpen} onOpenChange={closeDeleteDialog}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={closeDeleteDialog}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
