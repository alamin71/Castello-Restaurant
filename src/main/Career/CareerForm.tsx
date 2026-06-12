"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

type CareerFormValues = {
    fullName: string;
    email: string;
    phone: string;
    message: string;
};

export default function CareerForm() {
    const [resumeFile, setResumeFile] = useState<File | null>(null);
    const [submitted, setSubmitted] = useState(false);

    const form = useForm<CareerFormValues>({
        defaultValues: {
            fullName: "",
            email: "",
            phone: "",
            message: "",
        },
        mode: "onTouched",
    });

    const onSubmit = async (data: CareerFormValues) => {
        await new Promise((r) => setTimeout(r, 1000));

        console.log({
            ...data,
            resume: resumeFile?.name,
        });

        setSubmitted(true);

        setTimeout(() => {
            setSubmitted(false);
            form.reset();
            setResumeFile(null);
        }, 3000);
    };

    return (
        <section className="w-full px-4 py-10 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">
                <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-16">

                    {/* Left Content */}
                    <div className="w-full lg:w-1/2 text-white">
                        <div className="mb-4 h-0.5 w-32 sm:w-52 bg-secondary" />

                        <h1 className="mb-4 text-3xl font-bold leading-tight sm:text-4xl">
                            Apply Now
                        </h1>

                        <p className="max-w-xl text-sm leading-relaxed text-zinc-300 sm:text-base">
                            Submit your application and CV to explore exciting
                            career opportunities with us. Your journey starts
                            here.
                        </p>
                    </div>

                    {/* Form Card */}
                    <div className="w-full lg:w-1/2 rounded-2xl bg-primary p-5 shadow-2xl sm:p-8">
                        {submitted ? (
                            <div className="flex flex-col items-center justify-center gap-3 py-14 text-center">
                                <p className="text-lg font-semibold text-zinc-200">
                                    Application Submitted!
                                </p>

                                <p className="text-sm text-zinc-400">
                                    We&apos;ll be in touch soon.
                                </p>
                            </div>
                        ) : (
                            <Form {...form}>
                                <form
                                    onSubmit={form.handleSubmit(onSubmit)}
                                    className="flex flex-col gap-5"
                                    noValidate
                                >
                                    {/* Full Name */}
                                    <FormField
                                        control={form.control}
                                        name="fullName"
                                        rules={{
                                            required: "Full name is required",
                                            minLength: {
                                                value: 2,
                                                message: "Name is too short",
                                            },
                                        }}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Full Name</FormLabel>

                                                <FormControl>
                                                    <Input
                                                        placeholder="Type your full name"
                                                        {...field}
                                                    />
                                                </FormControl>

                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    {/* Email */}
                                    <FormField
                                        control={form.control}
                                        name="email"
                                        rules={{
                                            required: "Email is required",
                                            pattern: {
                                                value:
                                                    /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                                message:
                                                    "Enter a valid email address",
                                            },
                                        }}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    Email Address
                                                </FormLabel>

                                                <FormControl>
                                                    <Input
                                                        type="email"
                                                        placeholder="Enter your email address"
                                                        {...field}
                                                    />
                                                </FormControl>

                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    {/* Phone + Resume */}
                                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                                        {/* Phone */}
                                        <FormField
                                            control={form.control}
                                            name="phone"
                                            rules={{
                                                required:
                                                    "Phone number is required",
                                                pattern: {
                                                    value:
                                                        /^[+\d\s\-()]{7,20}$/,
                                                    message:
                                                        "Enter a valid phone number",
                                                },
                                            }}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>
                                                        Phone Number
                                                    </FormLabel>

                                                    <FormControl>
                                                        <Input
                                                            type="tel"
                                                            placeholder="Enter your phone number"
                                                            {...field}
                                                        />
                                                    </FormControl>

                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        {/* Resume Upload */}
                                        <div className="flex flex-col gap-2">
                                            <FormLabel>
                                                Upload Resume
                                            </FormLabel>

                                            <label
                                                htmlFor="resume-upload"
                                                className={`flex h-11 w-full cursor-pointer items-center rounded-lg border border-white/20 px-3 text-sm transition-colors
                                                ${resumeFile
                                                        ? "text-secondary"
                                                        : "text-muted-foreground"
                                                    }`}
                                            >
                                                <span className="truncate">
                                                    {resumeFile
                                                        ? resumeFile.name
                                                        : "Upload your resume"}
                                                </span>
                                            </label>

                                            <input
                                                id="resume-upload"
                                                type="file"
                                                accept=".pdf,.doc,.docx"
                                                className="hidden"
                                                onChange={(e) =>
                                                    setResumeFile(
                                                        e.target.files?.[0] ||
                                                        null
                                                    )
                                                }
                                            />
                                        </div>
                                    </div>

                                    {/* Message */}
                                    <FormField
                                        control={form.control}
                                        name="message"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    Others Information
                                                </FormLabel>

                                                <FormControl>
                                                    <Textarea
                                                        placeholder="Type your message here"
                                                        rows={5}
                                                        className="border border-white/20 text-white placeholder:text-muted-foreground"
                                                        {...field}
                                                    />
                                                </FormControl>

                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    {/* Submit */}
                                    <div className="pt-2 flex justify-center">
                                        <Button
                                            type="submit"
                                            disabled={
                                                form.formState.isSubmitting
                                            }
                                            className="w-full rounded-lg bg-white px-6 py-6 text-base font-semibold text-zinc-900 hover:bg-zinc-100 sm:w-auto"
                                        >
                                            {form.formState.isSubmitting
                                                ? "Submitting…"
                                                : "Apply Now"}
                                        </Button>
                                    </div>
                                </form>
                            </Form>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}