'use client'

import { Button } from "@components/ui/button"
import { ContextMenu, ContextMenuContent, ContextMenuTrigger } from "@components/ui/context-menu"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@components/ui/form";
import { Input } from "@components/ui/input";
import { useToast } from "@components/ui/use-toast"
import { zodResolver } from "@hookform/resolvers/zod";
import { useApiRequest } from "@lib/hooks/api.request";
import { UrlEnum } from "@lib/url.fetch/url.fetch";
import { RoleSchema } from "@localTypes/role/role";
import RoleQueryDto from "@localTypes/role/role.query.dto";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useState } from "react";
import { useForm } from "react-hook-form";
import { useQueryClient } from "react-query";
import { z } from "zod";

interface RoleProps {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    id:number
  }
  
  const RoleDialog: React.FC<RoleProps> = ({ open, setOpen,id }) => {
    const route         = useRouter();
    const { toast }     = useToast();
    const queryClient   = useQueryClient();
    const { create,errorDetail } = useApiRequest<z.infer<typeof RoleSchema>,RoleQueryDto>(UrlEnum.ROLE);
    const form = useForm<z.infer<typeof RoleSchema>>({
        resolver: zodResolver(RoleSchema),
        defaultValues: {
          id:null,
          description:""
        },
      })

      async function onSubmit(data: z.infer<typeof RoleSchema>) {
        console.log(data)
        //form.reset()
        
        try {
            await create(data);
            toast({
            title: "Rol guardado",
            duration:2000
            /*description: (
                <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                <code className="text-white">{JSON.stringify(data, null, 2)}</code>
                </pre>
            ),*/
            });
            queryClient.invalidateQueries(['data']);
            route.back()
        } catch (e: any) {
            toast({
                title: e.message,
                duration:2000,
                variant: "destructive",
                /*description: (
                    <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                    <code className="text-white">{JSON.stringify(data, null, 2)}</code>
                    </pre>
                ),*/
                })
        }
        
        
      }
    
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
            </DialogDescription>
            </DialogHeader>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
                    <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Descripción</FormLabel>
                        <FormControl>
                            <Input placeholder="Descripción" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                </form>
            </Form>
            <DialogFooter>
            <Button type="submit" onClick={form.handleSubmit(onSubmit) /*route.back()*/}>Guardar</Button>
            </DialogFooter>
        </DialogContent>
        </Dialog>

    </>)
}
export default RoleDialog;