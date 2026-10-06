"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form"
import { Switch } from "@/components/ui/switch"

const channels = [
  { key: "email", label: "Email" },
  { key: "slack", label: "Slack" },
  { key: "inApp", label: "In-app" },
] as const

const events = [
  { key: "newUser", label: "New User" },
  { key: "systemAlert", label: "System Alert" },
  { key: "weeklyDigest", label: "Weekly Digest" },
] as const

const channelSchema = z.object({
  email: z.boolean(),
  slack: z.boolean(),
  inApp: z.boolean(),
})

const notificationsFormSchema = z.object({
  newUser: channelSchema,
  systemAlert: channelSchema,
  weeklyDigest: channelSchema,
})

type NotificationsFormValues = z.infer<typeof notificationsFormSchema>

const defaultChannels = { email: false, slack: false, inApp: false }

export function NotificationsForm() {
  const form = useForm<NotificationsFormValues>({
    resolver: zodResolver(notificationsFormSchema),
    defaultValues: {
      newUser: { ...defaultChannels },
      systemAlert: { ...defaultChannels },
      weeklyDigest: { ...defaultChannels },
    },
  })

  function onSubmit() {
    toast.success("Notification settings saved")
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Notifications</CardTitle>
        <CardDescription>
          Choose how you want to be notified for each type of event.
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-6">
            {events.map((event) => (
              <div
                key={event.key}
                className="space-y-4 rounded-lg border p-4"
              >
                <p className="text-sm font-medium">{event.label}</p>
                <div className="grid gap-4 sm:grid-cols-3">
                  {channels.map((channel) => (
                    <FormField
                      key={channel.key}
                      control={form.control}
                      name={`${event.key}.${channel.key}`}
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between space-y-0">
                          <FormLabel className="font-normal">
                            {channel.label}
                          </FormLabel>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  ))}
                </div>
              </div>
            ))}
          </CardContent>
          <CardFooter>
            <Button type="submit">Save changes</Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  )
}
