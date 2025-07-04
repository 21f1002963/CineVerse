"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { api, ENDPOINT } from "@/lib/api";
import { useToast } from "@/components/ui/use-toast";
import { Dialog, DialogContent, DialogOverlay } from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import { LucideLoader2 } from "lucide-react";

const ResetPassword = () => {
  const { toast } = useToast();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [showDialog, setShowDialog] = useState(false);
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleForgotPassword = async () => {
    setLoading(true);
    try {
      const res = await api.patch(ENDPOINT.forgetpassword, { email });
      if (res.data.status === "success") {
        toast({ title: "OTP sent successfully!" });
        setShowDialog(true);
      } else {
        toast({ title: "Failed to send OTP. Try Again" });
      }
    } catch (err) {
      if (err.response?.data?.message === "no user with this email id found") {
        toast({ title: "Email doesn't exist" });
      } else {
        toast({ title: "Error sending OTP" });
        console.error("Error sending OTP:", err);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    setLoading(true);
    if (
      newPassword.length === 0 ||
      confirmNewPassword.length === 0 ||
      otp.length == 0
    ) {
      toast({ title: "Please fill all fields" });
      setLoading(false);
      return;
    }
    if (newPassword !== confirmNewPassword) {
      toast({ title: "New password and Confirm password do not match" });
      setLoading(false);
      return;
    }

    try {
      const res = await api.patch(ENDPOINT.resetPassword, {
        email,
        password: newPassword,
        confirmPassword: confirmNewPassword,
        otp,
      });

      if (res.data.status === "success") {
        toast({ title: "Password reset successfully!" });
        setShowDialog(false);
        router.push("/login");
      } else {
        toast({ title: "Failed to reset password. Try Again" });
      }
    } catch (err) {
      if (err.response.data.message === "otp is not found or wrong") {
        toast({ title: "Invalid OTP" });
      } else {
        toast({ title: "Error resetting password" });
        console.error("Error resetting password:", err);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="h-screen flex items-center justify-center">
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle className="text-xl">
              Forgot Password / Reset Password
            </CardTitle>
            <CardDescription>
              Enter your email below to get OTP.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-2">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                placeholder="m@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Button className="mt-6" onClick={handleForgotPassword}>
                Send OTP
                {loading && (
                  <LucideLoader2 className="animate-spin ml-2 w-4 h-4" />
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Dialog open={showDialog} onOpenChange={() => setShowDialog(false)}>
        <DialogOverlay>
          <DialogContent className="p-4 bg-black rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Reset Password</h2>
            <div className="grid gap-4">
              <Label htmlFor="otp">Enter OTP</Label>
              <Input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
              />
              <Label htmlFor="newPassword">New Password</Label>
              <Input
                type="password"
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
              <Label htmlFor="confirmNewPassword">Confirm New Password</Label>
              <Input
                type="password"
                placeholder="Confirm new password"
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
                required
              />
            </div>
            <div className="flex justify-end mt-4">
              <Button type="submit" onClick={handleResetPassword}>
                Submit
                {loading && (
                  <LucideLoader2 className="animate-spin ml-2 w-4 h-4" />
                )}
              </Button>
            </div>
          </DialogContent>
        </DialogOverlay>
      </Dialog>
    </>
  );
};

export default ResetPassword;
