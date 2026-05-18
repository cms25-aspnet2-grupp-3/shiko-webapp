"use client";

import Image from "next/image";
import type { Profile } from "./lib/data/profile-data";
import { useState } from "react";

type ProfileFormProps = Readonly<{
    profile: Profile;
}>;

type FormData = {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    bio: string;
};

export default function ProfileForm({ profile }: ProfileFormProps) {

    const initialFormData: FormData = {
        firstName: profile.firstName,
        lastName: profile.lastName,
        phoneNumber: profile.phoneNumber ?? "",
        bio: profile.bio ?? "",
    };
    const [formData, setFormData] = useState<FormData>(initialFormData);
    const [originalData, setOriginalData] = useState<FormData>(initialFormData);

    function handleInputChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    }

    function handleCancel() {
        console.log("Cancel clicked", originalData);
        setFormData({ ...originalData });
    }

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        console.log("Saving changes...", formData);

        setOriginalData(formData);
    }


    return (
        <form className="rounded-2xl bg-white p-6 shadow-sm" onSubmit={handleSubmit}>
            <div className="w-full mb-6 mt-2 ml-0 flex gap-5 flex flex-col gap-6">
                <div className="flex items-center gap-6">
                    <div className="h-15 w-15 overflow-hidden flex items-center justify-center rounded-md border border-gray-200">
                        {profile.profileIcon && (
                            <Image
                                src={profile.profileIcon}
                                alt="Profile Icon"
                                className="object-cover"
                                width={20}
                                height={20}
                            />
                        )}
                    </div>
                    <button
                        type="button"
                        className="rounded-md border border-gray-200  px-4 py-2 text-sm text-gray-700 hover:bg-[#BAC4D9] hover:text-white cursor-pointer"
                    >
                        Upload photo
                    </button>
                </div>
                <div className="space-y-5">
                    <div>
                        <label className="mb-2 block text-sm font-medium">
                            First name*
                        </label>
                        <input
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            className="w-full rounded-lg px-4 py-3 text-sm rounded-md border border-gray-200 focus:outline-[#ED5735]"
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium">
                            Last name*
                        </label>
                        <input
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            className="w-full rounded-lg px-4 py-3 text-sm rounded-md border border-gray-200 focus:outline-[#ED5735]"
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium">
                            Phone number
                        </label>
                        <input
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleInputChange}
                            placeholder="Enter phone number"
                            className="w-full rounded-lg px-4 py-3 text-sm rounded-md border border-gray-200 focus:outline-[#ED5735]"
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium">
                            Description
                        </label>
                        <textarea
                            name="bio"
                            value={formData.bio}
                            onChange={handleInputChange}
                            rows={6}
                            className="w-full resize-none rounded-lg border px-4 py-3 text-sm rounded-md border border-gray-200 focus:outline-[#ED5735]"
                        />
                    </div>
                </div>

                <div className="mt-6 flex gap-3">
                    <button
                        type="button"
                        className="rounded-md bg-[#E9ECF3] hover:bg-[#BAC4D9] px-6 py-2 text-sm text-gray-400 cursor-pointer"
                        onClick={handleCancel}
                    >
                        Cancel
                    </button>

                    <button
                        type="submit"
                        className="rounded-md bg-[#ED5735] hover:bg-[#D44A2A] px-8 py-2 text-sm text-white cursor-pointer"
                    >
                        Save
                    </button>
                </div>
            </div>
        </form>
    )
}