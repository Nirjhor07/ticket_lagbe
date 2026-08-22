"use client";

import React, { useState } from "react";
import {
  Form,
  Fieldset,
  TextField,
  Label,
  Input,
  Select,
  ListBox,
  Button,
} from "@heroui/react";

import { useRouter } from "next/navigation";
import {
  ArrowRight,
  Compass,
  FolderArrowUp,
  Globe,
  PersonFill,
  Picture,
  Tag,
  Ticket,
  TrashBin,
} from "@gravity-ui/icons";
import { toast } from "react-toastify";
import { createTicket } from "@/lib/actions/createTicket";

export default function AddTicketForm({ user: vendor }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [selectedPerks, setSelectedPerks] = useState([]);

  // Media source state: "upload" or "url"
  const [imageUploadType, setImageUploadType] = useState("upload");
  const [imageFile, setImageFile] = useState(null);
  const [imageUrlInput, setImageUrlInput] = useState("");
  const [imagePreview, setImagePreview] = useState(null);

  const [transportType, setTransportType] = useState("");
  const [errors, setErrors] = useState({});

  // Light theme input styles
  const textInputClass =
    "w-full text-slate-900 bg-slate-50/60 border border-slate-200 hover:border-slate-300 focus:bg-white focus:border-[#2563eb] focus:ring-4 focus:ring-[#2563eb]/10 rounded-xl h-11 px-3 text-sm placeholder:text-slate-400 outline-none transition-all";
  const readonlyInputClass =
    "w-full text-slate-500 bg-slate-100/80 border border-slate-200 rounded-xl h-11 px-3 text-sm outline-none cursor-not-allowed select-none font-medium";

  const triggerClasses =
    "w-full flex items-center justify-between bg-slate-50/60 border border-slate-200 hover:border-slate-300 focus:bg-white focus:border-[#2563eb] focus:ring-4 focus:ring-[#2563eb]/10 h-11 rounded-xl px-3 text-slate-900 transition-all text-sm outline-none";
  const popoverClasses =
    "bg-white border border-slate-200 text-slate-900 rounded-xl shadow-xl p-1.5 z-50";
  const listItemClasses =
    "flex items-center justify-between p-2.5 rounded-lg hover:bg-[#2563eb]/10 hover:text-[#2563eb] cursor-pointer text-sm text-slate-700 outline-none transition-all font-medium";

  // Handle transport type selection safely
  const handleTransportChange = (keys) => {
    let selectedValue = "";
    if (typeof keys === "string") {
      selectedValue = keys;
    } else if (keys instanceof Set || Array.isArray(keys)) {
      selectedValue = Array.from(keys)[0] || "";
    } else if (keys && typeof keys === "object") {
      selectedValue = Object.values(keys)[0] || "";
    }

    setTransportType(selectedValue);
    if (selectedValue) {
      setErrors((prev) => ({ ...prev, transportType: undefined }));
    }
  };

  // Handle local image selection
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
      setErrors((prev) => ({ ...prev, image: undefined }));
    }
  };

  // Handle direct image URL input & preview
  const handleUrlChange = (e) => {
    const url = e.target.value;
    setImageUrlInput(url);
    setImagePreview(url.trim() ? url.trim() : null);
    if (url.trim()) {
      setErrors((prev) => ({ ...prev, image: undefined }));
    }
  };

  const removeImage = () => {
    setImageFile(null);
    setImageUrlInput("");
    setImagePreview(null);
  };

  // Upload image file directly to imgbb
  const uploadToImgbb = async (file) => {
    const apiKey = process.env.NEXT_PUBLIC_IMGBB;
    if (!apiKey) {
      throw new Error(
        "ImgBB API key is missing. Add NEXT_PUBLIC_IMGBB in .env",
      );
    }

    const imgFormData = new FormData();
    imgFormData.append("image", file);

    const res = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
      method: "POST",
      body: imgFormData,
    });

    const data = await res.json();
    if (!data.success) {
      throw new Error(data.error?.message || "Failed to upload image to ImgBB");
    }
    return data.data.url;
  };

  // Handle toggling of individual perks
  const handlePerkToggle = (perkValue) => {
    setSelectedPerks((prev) =>
      prev.includes(perkValue)
        ? prev.filter((item) => item !== perkValue)
        : [...prev, perkValue],
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    // Validation
    const newErrors = {};
    if (!data.title?.trim()) newErrors.title = "Ticket title is required";
    if (!data.fromLocation?.trim())
      newErrors.fromLocation = "Departure location is required";
    if (!data.toLocation?.trim())
      newErrors.toLocation = "Destination location is required";
    if (!transportType) newErrors.transportType = "Transport type is required";
    if (!data.price || Number(data.price) <= 0)
      newErrors.price = "Enter a valid unit price";
    if (!data.quantity || Number(data.quantity) <= 0)
      newErrors.quantity = "Enter available quantity";
    if (!data.departureDateTime)
      newErrors.departureDateTime = "Departure date & time is required";

    // Image validation
    if (imageUploadType === "upload" && !imageFile) {
      newErrors.image = "Ticket / Transport image file is required";
    } else if (imageUploadType === "url" && !imageUrlInput.trim()) {
      newErrors.image = "Direct Image URL is required";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      setLoading(true);

      // Resolve final image URL
      let finalImageUrl = "";
      if (imageUploadType === "upload") {
        finalImageUrl = await uploadToImgbb(imageFile);
      } else {
        finalImageUrl = imageUrlInput.trim();
      }

      // Exact values prepared for database
      const payload = {
        title: data.title,
        fromLocation: data.fromLocation,
        toLocation: data.toLocation,
        transportType: transportType, // Full string e.g. "Flight", "Bus", "Train", "Ferry"
        price: parseFloat(data.price),
        quantity: parseInt(data.quantity, 10),
        totalCost: parseFloat(data.price) * parseInt(data.quantity, 10),
        departureDateTime: new Date(data.departureDateTime).toISOString(),
        perks: selectedPerks,
        imageUrl: finalImageUrl,
        vendorId: vendor.id,
        vendorName: vendor.name,
        vendorEmail: vendor.email,
        status: "pending",
        advertisementStatus: "inactive",
      };

      // console.log("Prepared Ticket Payload:", payload);

      // Call the server action to create the ticket
      const res = await createTicket(payload);
      //   console.log("Server Response:", res);

      if (res?.success || res?.insertedId) {
        toast.success("Ticket added successfully! Status is set to pending.");
        e.target.reset();
        setSelectedPerks([]);
        setImageFile(null);
        setImageUrlInput("");
        setImagePreview(null);
        setTransportType("");
        router.push("/dashboard/vendor/addedtickets");
      } else {
        toast.error(res?.message || "Failed to add ticket. Please try again.");
      }
    } catch (err) {
      const redirectDigest = String(err?.digest || err?.message || "");
      if (redirectDigest.includes("NEXT_REDIRECT")) {
        if (redirectDigest.includes("/forbidden")) {
          router.push("/forbidden");
          return;
        }
        if (redirectDigest.includes("/unauthorized")) {
          router.push("/unauthorized");
          return;
        }
      }

      console.error(err);
      toast.error(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f4f7fb] py-10 px-4 sm:px-6 lg:px-8 flex justify-center items-start">
      <div className="w-full max-w-3xl bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-9 shadow-xl shadow-slate-200/50">
        {/* Header */}
        <div className="border-b border-slate-100 pb-6 mb-7 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#2563eb]/10 text-[#2563eb] text-xs font-bold uppercase tracking-wider mb-2">
              <Ticket size={14} /> Ticket Management
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Add New Ticket
            </h1>
            <p className="text-slate-500 text-sm mt-1">
              Create a route ticket listing. All listings go through
              verification.
            </p>
          </div>

          <div className="inline-flex items-center gap-2 self-start sm:self-center bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs">
            <PersonFill size={16} className="text-[#2563eb]" />
            <div>
              <span className="text-slate-400 block text-[10px] leading-3 uppercase font-bold">
                Status
              </span>
              <span className="font-bold text-amber-500">
                posted ticket status will be pending until admin approval
              </span>
            </div>
          </div>
        </div>

        <Form
          onSubmit={handleSubmit}
          className="space-y-7"
          validationBehavior="aria"
        >
          {/* SECTION 1: Vendor Information */}
          <Fieldset className="space-y-3 w-full">
            <legend className="text-xs font-bold uppercase tracking-wider text-[#2563eb]">
              1. Vendor Information
            </legend>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <TextField
                name="vendorName"
                isReadOnly
                className="flex flex-col gap-1.5 w-full"
              >
                <Label className="text-slate-600 font-semibold text-xs">
                  Vendor Name (Readonly)
                </Label>
                <Input
                  name="vendorName"
                  value={vendor.name}
                  readOnly
                  className={readonlyInputClass}
                />
              </TextField>

              <TextField
                name="vendorEmail"
                isReadOnly
                className="flex flex-col gap-1.5 w-full"
              >
                <Label className="text-slate-600 font-semibold text-xs">
                  Vendor Email (Readonly)
                </Label>
                <Input
                  name="vendorEmail"
                  value={vendor.email}
                  readOnly
                  className={readonlyInputClass}
                />
              </TextField>
            </div>
          </Fieldset>

          {/* SECTION 2: Route & Journey Details */}
          <Fieldset className="space-y-4 w-full pt-5 border-t border-slate-100">
            <legend className="text-xs font-bold uppercase tracking-wider text-[#2563eb]">
              2. Route & Journey Details
            </legend>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-2">
                <TextField
                  name="title"
                  isInvalid={!!errors.title}
                  className="flex flex-col gap-1.5 w-full"
                >
                  <Label className="text-slate-700 font-semibold text-sm">
                    Ticket Title
                  </Label>
                  <Input
                    name="title"
                    placeholder="e.g. Express AC Sleeper Service"
                    className={textInputClass}
                  />
                  {errors.title && (
                    <span className="text-xs font-medium text-rose-500 mt-1">
                      {errors.title}
                    </span>
                  )}
                </TextField>
              </div>

              <div className="sm:col-span-1">
                <Select
                  className="w-full"
                  name="transportType"
                  selectedKeys={
                    transportType ? new Set([transportType]) : new Set()
                  }
                  onSelectionChange={handleTransportChange}
                  isInvalid={!!errors.transportType}
                >
                  <Label className="text-slate-700 font-semibold text-sm mb-1.5 block">
                    Transport Type
                  </Label>
                  <Select.Trigger className={triggerClasses}>
                    <Select.Value placeholder="Select Type">
                      {transportType || "Select Type"}
                    </Select.Value>
                    <Select.Indicator />
                  </Select.Trigger>
                  <Select.Popover className={popoverClasses}>
                    <ListBox className="outline-none">
                      <ListBox.Item
                        id="Bus"
                        key="Bus"
                        textValue="Bus"
                        className={listItemClasses}
                      >
                        Bus
                      </ListBox.Item>
                      <ListBox.Item
                        id="Train"
                        key="Train"
                        textValue="Train"
                        className={listItemClasses}
                      >
                        Train
                      </ListBox.Item>
                      <ListBox.Item
                        id="Flight"
                        key="Flight"
                        textValue="Flight"
                        className={listItemClasses}
                      >
                        Flight
                      </ListBox.Item>
                      <ListBox.Item
                        id="Ferry"
                        key="Ferry"
                        textValue="Ferry"
                        className={listItemClasses}
                      >
                        Ferry
                      </ListBox.Item>
                    </ListBox>
                  </Select.Popover>
                </Select>
                {errors.transportType && (
                  <span className="text-xs font-medium text-rose-500 mt-1 block">
                    {errors.transportType}
                  </span>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <TextField
                name="fromLocation"
                isInvalid={!!errors.fromLocation}
                className="flex flex-col gap-1.5 w-full"
              >
                <Label className="text-slate-700 font-semibold text-sm">
                  From (Departure Location)
                </Label>
                <div className="relative flex items-center">
                  <Compass
                    size={16}
                    className="absolute left-3.5 text-slate-400 pointer-events-none"
                  />
                  <Input
                    name="fromLocation"
                    placeholder="e.g. New York, Terminal A"
                    className={`${textInputClass} pl-10`}
                  />
                </div>
                {errors.fromLocation && (
                  <span className="text-xs font-medium text-rose-500 mt-1">
                    {errors.fromLocation}
                  </span>
                )}
              </TextField>

              <TextField
                name="toLocation"
                isInvalid={!!errors.toLocation}
                className="flex flex-col gap-1.5 w-full"
              >
                <Label className="text-slate-700 font-semibold text-sm">
                  To (Destination Location)
                </Label>
                <div className="relative flex items-center">
                  <ArrowRight
                    size={16}
                    className="absolute left-3.5 text-slate-400 pointer-events-none"
                  />
                  <Input
                    name="toLocation"
                    placeholder="e.g. Boston, Central Depot"
                    className={`${textInputClass} pl-10`}
                  />
                </div>
                {errors.toLocation && (
                  <span className="text-xs font-medium text-rose-500 mt-1">
                    {errors.toLocation}
                  </span>
                )}
              </TextField>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <TextField
                name="price"
                isInvalid={!!errors.price}
                className="flex flex-col gap-1.5 w-full"
              >
                <Label className="text-slate-700 font-semibold text-sm">
                  Price (Per Unit)
                </Label>
                <div className="relative flex items-center">
                  <Tag
                    size={16}
                    className="absolute left-3.5 text-slate-400 pointer-events-none"
                  />
                  <Input
                    name="price"
                    type="number"
                    step="0.01"
                    min="0"
                    placeholder="45.00"
                    className={`${textInputClass} pl-10`}
                  />
                </div>
                {errors.price && (
                  <span className="text-xs font-medium text-rose-500 mt-1">
                    {errors.price}
                  </span>
                )}
              </TextField>

              <TextField
                name="quantity"
                isInvalid={!!errors.quantity}
                className="flex flex-col gap-1.5 w-full"
              >
                <Label className="text-slate-700 font-semibold text-sm">
                  Ticket Quantity
                </Label>
                <Input
                  name="quantity"
                  type="number"
                  min="1"
                  placeholder="40"
                  className={textInputClass}
                />
                {errors.quantity && (
                  <span className="text-xs font-medium text-rose-500 mt-1">
                    {errors.quantity}
                  </span>
                )}
              </TextField>

              <TextField
                name="departureDateTime"
                isInvalid={!!errors.departureDateTime}
                className="flex flex-col gap-1.5 w-full"
              >
                <Label className="text-slate-700 font-semibold text-sm">
                  Departure Date & Time
                </Label>
                <Input
                  name="departureDateTime"
                  type="datetime-local"
                  className={textInputClass}
                />
                {errors.departureDateTime && (
                  <span className="text-xs font-medium text-rose-500 mt-1">
                    {errors.departureDateTime}
                  </span>
                )}
              </TextField>
            </div>
          </Fieldset>

          {/* SECTION 3: Perks & Amenities */}
          <Fieldset className="space-y-3 w-full pt-5 border-t border-slate-100">
            <legend className="text-xs font-bold uppercase tracking-wider text-[#2563eb]">
              3. Perks & Amenities
            </legend>
            <p className="text-xs text-slate-500 font-medium">
              Select all features available on this trip:
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-1">
              {[
                { label: "Air Conditioning (AC)", value: "AC" },
                { label: "Complimentary Breakfast", value: "Breakfast" },
                { label: "High-Speed Wi-Fi", value: "WiFi" },
                { label: "Water Bottle", value: "Water" },
                { label: "Charging Ports", value: "Charging Ports" },
                { label: "Sleeper Berth", value: "Sleeper" },
              ].map((perk) => {
                const isSelected = selectedPerks.includes(perk.value);

                return (
                  <button
                    key={perk.value}
                    type="button"
                    onClick={() => handlePerkToggle(perk.value)}
                    className={`flex items-center gap-2.5 p-3 rounded-xl border text-left text-xs font-semibold transition-all duration-150 cursor-pointer select-none ${
                      isSelected
                        ? "bg-[#2563eb]/10 border-[#2563eb] text-[#2563eb] shadow-sm shadow-[#2563eb]/10"
                        : "bg-slate-50/70 border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-100/60"
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded flex items-center justify-center border transition-all ${
                        isSelected
                          ? "bg-[#2563eb] border-[#2563eb] text-white"
                          : "border-slate-300 bg-white"
                      }`}
                    >
                      {isSelected && (
                        <svg
                          className="w-3 h-3 text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={3}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      )}
                    </div>
                    <span>{perk.label}</span>
                  </button>
                );
              })}
            </div>
          </Fieldset>

          {/* SECTION 4: Media Upload & Image URL */}
          <Fieldset className="space-y-4 w-full pt-5 border-t border-slate-100">
            <div className="flex items-center justify-between">
              <legend className="text-xs font-bold uppercase tracking-wider text-[#2563eb]">
                4. Ticket / Transport Media
              </legend>

              {/* Upload Type Switch Buttons */}
              <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200">
                <button
                  type="button"
                  onClick={() => {
                    setImageUploadType("upload");
                    removeImage();
                  }}
                  className={`flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
                    imageUploadType === "upload"
                      ? "bg-white text-[#2563eb] shadow-sm"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  <FolderArrowUp size={13} />
                  Upload File
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setImageUploadType("url");
                    removeImage();
                  }}
                  className={`flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
                    imageUploadType === "url"
                      ? "bg-white text-[#2563eb] shadow-sm"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  <Globe size={13} />
                  Image URL
                </button>
              </div>
            </div>

            {/* If URL Mode is Selected */}
            {imageUploadType === "url" ? (
              <div className="space-y-3">
                <TextField
                  name="imageUrl"
                  isInvalid={!!errors.image}
                  className="flex flex-col gap-1.5 w-full"
                >
                  <Label className="text-slate-700 font-semibold text-sm">
                    Direct Image URL
                  </Label>
                  <div className="relative flex items-center">
                    <Picture
                      size={16}
                      className="absolute left-3.5 text-slate-400 pointer-events-none"
                    />
                    <Input
                      name="imageUrl"
                      value={imageUrlInput}
                      onChange={handleUrlChange}
                      placeholder="https://example.com/images/bus-preview.jpg"
                      className={`${textInputClass} pl-10`}
                    />
                  </div>
                </TextField>

                {imagePreview && (
                  <div className="relative w-full max-w-sm mx-auto flex flex-col items-center bg-slate-50 border border-slate-200 rounded-xl p-3">
                    <img
                      src={imagePreview}
                      alt="URL Preview"
                      className="w-full h-44 object-contain rounded-lg bg-white p-1"
                      onError={() => setImagePreview(null)}
                    />
                    <button
                      type="button"
                      onClick={removeImage}
                      className="mt-2 text-xs font-semibold text-rose-600 hover:text-rose-700 flex items-center gap-1"
                    >
                      <TrashBin size={13} /> Clear URL
                    </button>
                  </div>
                )}
              </div>
            ) : (
              /* If File Upload Mode is Selected */
              <div className="border-2 border-dashed border-slate-200 hover:border-[#2563eb] rounded-2xl p-5 flex flex-col items-center justify-center text-center transition-all bg-slate-50/50">
                {imagePreview ? (
                  <div className="relative group w-full max-w-sm mx-auto flex flex-col items-center">
                    <img
                      src={imagePreview}
                      alt="Ticket Preview"
                      className="w-full h-48 object-contain rounded-xl border border-slate-200 bg-white p-2 shadow-sm"
                    />
                    <div className="mt-3 flex items-center gap-2">
                      <label
                        htmlFor="ticket-image-input"
                        className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold cursor-pointer transition-colors"
                      >
                        Replace Image
                      </label>
                      <button
                        type="button"
                        onClick={removeImage}
                        className="px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
                      >
                        <TrashBin size={14} /> Remove
                      </button>
                    </div>
                  </div>
                ) : (
                  <label
                    htmlFor="ticket-image-input"
                    className="flex flex-col items-center justify-center cursor-pointer w-full py-4"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-[#2563eb]/10 text-[#2563eb] flex items-center justify-center mb-2.5 transition-transform hover:scale-105">
                      <FolderArrowUp size={22} />
                    </div>
                    <span className="text-sm font-semibold text-slate-800">
                      Click to upload transport / ticket image
                    </span>
                    <span className="text-xs text-slate-400 mt-1">
                      PNG, JPG, WebP up to 5MB (Uploaded to ImgBB)
                    </span>
                  </label>
                )}
                <input
                  id="ticket-image-input"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </div>
            )}

            {errors.image && (
              <span className="text-xs font-medium text-rose-500 mt-1 block">
                {errors.image}
              </span>
            )}
          </Fieldset>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-6 border-t border-slate-100">
            <Button
              type="button"
              variant="bordered"
              onClick={() => router.back()}
              className="border-slate-200 text-slate-600 hover:bg-slate-100 rounded-xl px-5 font-semibold h-11 transition-all"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              isLoading={loading}
              className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-semibold rounded-xl px-7 transition-all h-11 shadow-lg shadow-[#2563eb]/25 active:scale-[0.98]"
            >
              {loading ? "Uploading & Submitting..." : "Add Ticket"}
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}
