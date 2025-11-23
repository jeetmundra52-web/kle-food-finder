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
import { AlertTriangle } from "lucide-react";

interface VendorSwitchDialogProps {
    open: boolean;
    currentVendor: string;
    currentItemCount: number;
    newVendor: string;
    newItemName: string;
    onCancel: () => void;
    onConfirm: () => void;
}

const VendorSwitchDialog = ({
    open,
    currentVendor,
    currentItemCount,
    newVendor,
    newItemName,
    onCancel,
    onConfirm,
}: VendorSwitchDialogProps) => {
    return (
        <AlertDialog open={open} onOpenChange={(isOpen) => !isOpen && onCancel()}>
            <AlertDialogContent className="max-w-md">
                <AlertDialogHeader>
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center">
                            <AlertTriangle className="w-6 h-6 text-amber-600" />
                        </div>
                        <AlertDialogTitle className="text-xl font-bold">
                            Switch Vendor?
                        </AlertDialogTitle>
                    </div>
                    <AlertDialogDescription className="text-base space-y-3 pt-2">
                        <p className="text-gray-700">
                            Your cart contains{" "}
                            <span className="font-semibold text-gray-900">
                                {currentItemCount} {currentItemCount === 1 ? "item" : "items"}
                            </span>{" "}
                            from{" "}
                            <span className="font-semibold text-gray-900">{currentVendor}</span>.
                        </p>
                        <p className="text-gray-700">
                            Adding{" "}
                            <span className="font-semibold text-gray-900">"{newItemName}"</span>{" "}
                            from{" "}
                            <span className="font-semibold text-gray-900">{newVendor}</span>{" "}
                            will clear your current cart.
                        </p>
                        <p className="font-medium text-gray-900">
                            Do you want to continue?
                        </p>
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="gap-2 sm:gap-2">
                    <AlertDialogCancel
                        onClick={onCancel}
                        className="border-gray-300 hover:bg-gray-50"
                    >
                        Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                        onClick={onConfirm}
                        className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white"
                    >
                        Clear Cart & Add
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default VendorSwitchDialog;
