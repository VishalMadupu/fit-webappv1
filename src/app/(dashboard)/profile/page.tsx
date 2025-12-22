"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  FaUser,
  FaEnvelope,
  FaMapMarkerAlt,
  FaPencilAlt,
  FaSave,
  FaTimes,
  FaCamera,
  FaLock,
} from "react-icons/fa";
import { Card, Button, Input, Avatar } from "@/components/ui";
import { useAuthStore } from "@/lib/store";
import { authService } from "@/services/auth/authService";

export default function ProfilePage() {
  const router = useRouter();
  const { user, updateUser, logout } = useAuthStore();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [formData, setFormData] = useState({
    full_name: user?.full_name || "",
    email: user?.email || "",
    username: user?.username || "",
    bio: user?.bio || "",
    location: user?.location || "",
  });

  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState(
    user?.profile_picture || ""
  );

  useEffect(() => {
    if (user) {
      setFormData({
        full_name: user.full_name || "",
        email: user.email || "",
        username: user.username || "",
        bio: user.bio || "",
        location: user.location || "",
      });
      setAvatarPreview(user.profile_picture || "");
    }
  }, [user]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setAvatarFile(file);

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdateProfile = async () => {
    setIsLoading(true);
    setError("");
    setSuccessMessage("");

    try {
      // Update profile information
      const updatedUser = await authService.updateProfile({
        full_name: formData.full_name,
        bio: formData.bio,
        location: formData.location,
      });

      // Update avatar if selected
      if (avatarFile) {
        await authService.updateAvatar(avatarFile);
      }

      // Update local state
      updateUser({
        full_name: formData.full_name,
        bio: formData.bio,
        location: formData.location,
        profile_picture: avatarPreview,
      });

      setSuccessMessage("Profile updated successfully!");
      setIsEditing(false);
    } catch (err: any) {
      setError(
        err.response?.data?.detail ||
          "Failed to update profile. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (
      !window.confirm(
        "Are you sure you want to delete your account? This action cannot be undone."
      )
    ) {
      return;
    }

    const password = prompt(
      "Please enter your password to confirm account deletion:"
    );
    if (!password) return;

    try {
      await authService.deleteAccount(password);
      alert("Your account has been deleted successfully.");
      router.push("/login");
    } catch (err: any) {
      setError(
        err.response?.data?.detail ||
          "Failed to delete account. Please try again."
      );
    }
  };

  if (!user) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <Card className="p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Please log in</h2>
          <p className="text-gray-400 mb-6">
            You need to be logged in to view your profile
          </p>
          <Link href="/login">
            <Button>Go to Login</Button>
          </Link>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Profile Header */}
      <div className="flex flex-col md:flex-row items-center gap-6 p-6 bg-gray-900/50 rounded-2xl">
        <div className="relative">
          <Avatar
            src={avatarPreview || undefined}
            name={user.full_name || user.username || "User"}
            size="xl"
          />
          {isEditing && (
            <label className="absolute bottom-0 right-0 bg-orange-500 p-2 rounded-full cursor-pointer">
              <FaCamera className="text-white" />
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleAvatarChange}
              />
            </label>
          )}
        </div>

        <div className="text-center md:text-left">
          <h1 className="text-2xl sm:text-3xl font-bold text-white">
            {formData.full_name || user.username}
          </h1>
          <p className="text-gray-400 mt-1">@{user.username}</p>
          <p className="text-gray-500 mt-2">{user.email}</p>
        </div>

        <div className="flex gap-3 mt-4 md:mt-0 md:ml-auto">
          {!isEditing ? (
            <Button
              leftIcon={<FaPencilAlt />}
              onClick={() => setIsEditing(true)}
            >
              Edit Profile
            </Button>
          ) : (
            <>
              <Button
                variant="outline"
                leftIcon={<FaTimes />}
                onClick={() => {
                  setIsEditing(false);
                  // Reset form to original values
                  setFormData({
                    full_name: user.full_name || "",
                    email: user.email || "",
                    username: user.username || "",
                    bio: user.bio || "",
                    location: user.location || "",
                  });
                  setAvatarPreview(user.profile_picture || "");
                }}
              >
                Cancel
              </Button>
              <Button
                leftIcon={<FaSave />}
                onClick={handleUpdateProfile}
                isLoading={isLoading}
              >
                Save
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Success/Error Messages */}
      {error && (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400">
          {error}
        </div>
      )}

      {successMessage && (
        <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400">
          {successMessage}
        </div>
      )}

      {/* Profile Form */}
      <Card className="p-6">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Full Name
            </label>
            {isEditing ? (
              <Input
                name="full_name"
                value={formData.full_name}
                onChange={handleInputChange}
                leftIcon={<FaUser />}
                placeholder="Enter your full name"
              />
            ) : (
              <p className="text-white">{user.full_name || "Not provided"}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Username
            </label>
            {isEditing ? (
              <Input
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                leftIcon={<FaUser />}
                placeholder="Enter your username"
                disabled
              />
            ) : (
              <p className="text-white">@{user.username}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Email
            </label>
            {isEditing ? (
              <Input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                leftIcon={<FaEnvelope />}
                placeholder="Enter your email"
                disabled
              />
            ) : (
              <p className="text-white">{user.email}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Location
            </label>
            {isEditing ? (
              <Input
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                leftIcon={<FaMapMarkerAlt />}
                placeholder="Enter your location"
              />
            ) : (
              <p className="text-white">{user.location || "Not provided"}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Bio
            </label>
            {isEditing ? (
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleInputChange}
                className="w-full p-3 rounded-xl bg-gray-800/50 border border-gray-700/50 text-white focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none transition-colors resize-none"
                rows={4}
                placeholder="Tell us about yourself"
              />
            ) : (
              <p className="text-white">{user.bio || "No bio provided"}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Member Since
            </label>
            <p className="text-white">
              {new Date(user.created_at).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
        </div>
      </Card>

      {/* Account Settings */}
      <Card className="p-6">
        <h2 className="text-xl font-bold text-white mb-4">Account Settings</h2>

        <div className="space-y-4">
          <Link href="/change-password">
            <Button
              variant="outline"
              leftIcon={<FaLock />}
              className="w-full sm:w-auto"
            >
              Change Password
            </Button>
          </Link>

          <Button
            variant="danger"
            onClick={handleDeleteAccount}
            className="w-full sm:w-auto"
          >
            Delete Account
          </Button>

          <Button
            variant="outline"
            onClick={() => {
              authService.logout();
              router.push("/login");
            }}
            className="w-full sm:w-auto"
          >
            Logout
          </Button>
        </div>
      </Card>
    </div>
  );
}
