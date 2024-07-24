'use client'
import { Button } from "@components/ui/button"
import { ContextMenu, ContextMenuContent, ContextMenuTrigger } from "@components/ui/context-menu"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@components/ui/dialog"
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useState } from "react";

interface RoleProps {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    id:number
  }
  
  const RoleDialog: React.FC<RoleProps> = ({ open, setOpen,id }) => {
    const route = useRouter();

    const setOpenOwner = (state:boolean) => {
        if (!state) {
            route.back()
        }
    }
    return (<>
    <Dialog open={open} onOpenChange={setOpenOwner} >
        
        <DialogContent>
            <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
                This action cannot be undone. Are you sure you want to permanently
                delete this id {id} from our servers?
            </DialogDescription>
            </DialogHeader>
            <DialogFooter>
            <Button type="submit" onClick={() => route.back()}>Confirm delete {id}</Button>
            </DialogFooter>
        </DialogContent>
        </Dialog>

    </>)
}
export default RoleDialog;