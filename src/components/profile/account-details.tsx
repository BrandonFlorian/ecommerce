"use client";

import { useForm, SubmitHandler, Form } from "react-hook-form";
import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Button,
  Avatar,
  Badge,
  Input,
  Autocomplete,
  AutocompleteItem,
  CardFooter,
} from "@nextui-org/react";
import { Icon } from "@iconify/react";

import { countries } from "@/utils/constants";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ProfileFormProps } from "./types";
import { toast } from "sonner";
const schema = yup
  .object({
    id: yup.string().required(),
    first_name: yup.string().notRequired(),
    last_name: yup.string().notRequired(),
    email: yup.string().email().required(),
    username: yup.string().required(),
    phone_number: yup.string().notRequired(),
    profile_image_url: yup.string().notRequired(),
  })
  .required();

export default function ProfileForm({
  profileFormData,
  ...props
}: Readonly<ProfileFormProps>) {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm<ProfilePayload>({
    defaultValues: profileFormData,
    resolver: yupResolver<ProfilePayload>(
      schema as yup.ObjectSchema<ProfilePayload>
    ),
  });
  const onSubmit: SubmitHandler<ProfilePayload> = async (
    payload: ProfilePayload
  ) => {
    setLoading(true);
    const { id, first_name, last_name, email, username, phone_number } =
      payload;
    const response = await fetch(`/api/profile?id=${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
        first_name,
        last_name,
        email,
        username,
        phone_number,
      }),
    }).catch((error) => console.error("Fetch error:", error));
    if (!response) {
      console.error("Server responded with an error:", response);
      return;
    }
    const data = await response.json();
    setLoading(false);
    toast("Profile Updated");
  };

  return (
    <Card className="max-w-xl p-2" {...props}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardHeader className="flex flex-col items-start px-4 pb-0 pt-4">
          <p className="text-large">Account Details</p>
          <div className="flex gap-4 py-4">
            <Badge
              //disableOutline
              classNames={{
                badge: "w-5 h-5",
              }}
              color="primary"
              content={
                <Button
                  isIconOnly
                  className="p-0 text-primary-foreground"
                  radius="full"
                  size="sm"
                  variant="light"
                >
                  <Icon icon="solar:pen-2-linear" />
                </Button>
              }
              placement="bottom-right"
              shape="circle"
            >
              <Avatar
                className="h-14 w-14"
                src="https://i.pravatar.cc/150?u=a04258114e29026708c"
              />
            </Badge>
            <div className="flex flex-col items-start justify-center">
              <p className="font-medium">Tony Reichert</p>
              <span className="text-small text-default-500">
                Professional Designer
              </span>
            </div>
          </div>
          <p className="text-small text-default-400">
            The photo will be used for your profile, and will be visible to
            other users of the platform.
          </p>
        </CardHeader>
        <CardBody className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {/* Username */}
          <Input
            label="Username"
            labelPlacement="outside"
            placeholder="Enter username"
            defaultValue={profileFormData?.username}
            {...register("username")}
          />
          {/* Email */}
          <Input
            label="Email"
            labelPlacement="outside"
            placeholder="Enter email"
            defaultValue={profileFormData?.email}
            {...register("email")}
          />
          {/* First Name */}
          <Input
            label="First Name"
            labelPlacement="outside"
            placeholder="Enter first name"
            defaultValue={profileFormData?.first_name}
            {...register("first_name")}
          />
          {/* Last Name */}
          <Input
            label="Last Name"
            labelPlacement="outside"
            placeholder="Enter last name"
            defaultValue={profileFormData?.last_name}
            {...register("last_name")}
          />
          {/* Phone Number */}
          <Input
            label="Phone Number"
            labelPlacement="outside"
            placeholder="Enter phone number"
            defaultValue={profileFormData?.phone_number}
            {...register("phone_number")}
          />
          {/* Country */}
          {/* <Autocomplete
            defaultItems={countries}
            label="Country"
            labelPlacement="outside"
            placeholder="Select country"
            showScrollIndicators={false}
          >
            {(item) => (
              <AutocompleteItem
                key={item.code}
                startContent={
                  <Avatar
                    alt="Country Flag"
                    className="h-6 w-6"
                    src={`https://flagcdn.com/${item.code.toLowerCase()}.svg`}
                  />
                }
                value={item.code}
              >
                {item.name}
              </AutocompleteItem>
            )}
          </Autocomplete> */}
          {/* State */}
          {/* <Input
            label="State"
            labelPlacement="outside"
            placeholder="Enter state"
          /> */}
          {/* Address */}
          {/* <Input
            label="Address"
            labelPlacement="outside"
            placeholder="Enter address"
          /> */}
          {/* Zip Code */}
          {/* <Input
            label="Zip Code"
            labelPlacement="outside"
            placeholder="Enter zip code"
          /> */}
        </CardBody>

        <CardFooter className="mt-4 justify-end gap-2">
          <Button radius="full" variant="bordered">
            Cancel
          </Button>
          <Button
            color="primary"
            radius="full"
            type="submit"
            isLoading={loading}
          >
            Save Changes
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
