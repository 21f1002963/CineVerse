"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import Image from "next/image";
import { api, ENDPOINT } from "@/lib/api";
import { LucideLoader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { userLoggedInDetails } from "@/redux/userSlice";
import { toast } from "@/components/ui/use-toast";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

  const userData = useSelector((state) => state.user);

  if (userData.isLoggedIn) {
    router.push("/");
    return null;
  }

  const onSubmit = async () => {
    setLoading(true);
    try {
      if (email.length === 0 || password.length === 0) {
        toast({ title: "Please fill all fields", variant: 'destructive' });
        setLoading(false);
        return;
      }
      const res = await api.post(ENDPOINT.login, {
        email: email,
        password: password,
      });
      if (res.data.status === "Success" || res.data.status === "success") {
        dispatch(userLoggedInDetails(res.data.user || res.data.message));
        router.push("/");
        toast({ title: "Login successful!" });
      } else {
        toast({ title: res.data.message || "Login failed", variant: 'destructive' });
      }
    } catch (err) {
      console.log("err: ", err);
      toast({ title: err.response?.data?.message || "Invalid credentials", variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1a1a2e] via-[#23234b] to-[#0f3460]">
      <div className="flex flex-col items-center w-full justify-center min-h-screen mt-[70px] ">
        <Card className="w-full max-w-sm shadow-2xl rounded-2xl border-0 bg-[#23234b]/90 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-3xl font-extrabold text-center text-white">Sign in</CardTitle>
            <CardDescription className="text-center text-gray-300">
              Enter your email below to login to your account.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email" className="text-white ">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="parky@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="focus:ring-2 focus:ring-pink-500 text-white"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password" className="text-white">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="focus:ring-2 focus:ring-pink-500 text-white"
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button disabled={loading} onClick={onSubmit} className="w-full bg-pink-600 hover:bg-pink-700 text-white font-semibold py-2 rounded-lg transition-all">
              Sign in
              {loading && <LucideLoader2 className="animate-spin ml-2 w-4 h-4" />}
            </Button>
          </CardFooter>
          <div className="mt-4 text-center text-sm pb-6 flex flex-col gap-2 px-6">
            <Link href="/resetPassword" className="text-pink-400 hover:underline">Forgot Password?</Link>
            <div className="text-gray-300">
              Need an account?{' '}
              <Link href="/signup" className="underline text-pink-400 hover:text-pink-300 font-semibold">
                Sign Up
              </Link>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
