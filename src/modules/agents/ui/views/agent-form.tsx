import { AgentGetOne } from "@/modules/agents/types";

import { useTRPC } from "@/trpc/client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useRouter } from "next/router";

import z from "zod";
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

interface AgentFormProps {
    onSuccess: () => void;
    onCancel: () => void;
    initialValues?: AgentGetOne
}

export const AgentForm = ({
    onSuccess,
    onCancel,
    initialValues
}: AgentFormProps) => {

    const trpc = useTRPC();
    const router = useRouter();
    const queryClient = useQueryClient();

    const createAgent = useMutation(
        trpc.agents.create.mutationOptions({
            onSuccess: () => { },
            onError: () => { }
        })
    )

    const form = useForm<z.infer<typeof agentInsertSchema>>({
        resolver: zodResolver(agentInsertSchema),
        defaultValues: {
            name: initialValues?.name ?? "",
            instructions: initialValues?.instructions ?? "",
        }
    });

    const isEdit = !!initialValues?.id;
    const isPending = createAgent.isPending;

    // Submit handler for the form
    const onSubmit = (values: z.infer<typeof agentInsertSchema>) => {
        if (isEdit) {
            console.log("TODO: updateagent");
        } else {
            createAgent.mutate(values);
        }
    };

    <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>

        <Form {...form}>
            <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Textarea placeholder="Enter agent name" {...field} />
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
                                <Textarea placeholder="Enter agent instructions" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {/* Form fields go here */}
                <button type="submit" onClick={onSuccess}>Submit</button>
                <button type="button" onClick={onCancel}>Cancel</button>
            </form>
        </Form>
        );
}