import z from "zod";
import { toast } from "sonner";

import { AgentGetOne } from "@/modules/agents/types";

import { useTRPC } from "@/trpc/client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { agentInsertSchema } from "@/modules/agents/schema";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
    Form,
    FormField,
    FormControl,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form";

import { Textarea } from "@/components/ui/textarea";

import { GeneratedAvatar } from "@/components/generated-avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface AgentFormProps {
    onSuccess: () => void;
    onCancel: () => void;
    initialValues?: AgentGetOne;
}

export const AgentForm = ({
    onSuccess,
    onCancel,
    initialValues
}: AgentFormProps) => {

    const trpc = useTRPC();
    const queryClient = useQueryClient();

    const createAgent = useMutation(
        trpc.agents.create.mutationOptions({
            onSuccess: async () => {
                await queryClient.invalidateQueries(
                    trpc.agents.getAll.queryOptions(),
                );

                if (initialValues?.id) {
                    await queryClient.invalidateQueries(
                        trpc.agents.getOne.queryOptions({
                            id: initialValues.id
                        }),
                    );
                }

                toast.success("Create successful");
                onSuccess?.();
            },
            onError: (error) => {
                toast.error("Create failed", error);
                //TODO - check if error code is forbidden, redirect to /upgrade
            }
        })
    );

    const form = useForm<z.infer<typeof agentInsertSchema>>({
        resolver: zodResolver(agentInsertSchema),
        defaultValues: {
            name: initialValues?.name ?? "",
            instructions: initialValues?.instructions ?? "",
        }
    });

    const isEdit = !!initialValues?.id;
    const isPending = createAgent.isPending;

    const onSubmit = (values: z.infer<typeof agentInsertSchema>) => {
        if (isEdit) {
            console.log("TODO: update agent");
        } else {
            createAgent.mutate(values);
        }
    };

    return (
        <Form {...form}>
            <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
                <GeneratedAvatar />
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    type="text"
                                    placeholder="e.g. Math tutor"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="instructions"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Instructions</FormLabel>
                            <FormControl>
                                <Textarea placeholder="You are a helpful assistant that can answer questions and help with assignments." {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="flex  justify-between gap-x-2">
                    {onCancel && (
                        <Button
                            variant='ghost'
                            disabled={isPending}
                            type="button"
                            onClick={() => onCancel()}
                        >
                            Cancel
                        </Button>
                    )}
                    <Button
                        disabled={isPending}
                        type="submit"
                    >
                        {isEdit ? "Update Agent" : "Create Agent"}
                    </Button>

                </div>
            </form>
        </Form>
    );
};
