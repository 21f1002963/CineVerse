"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import Image from "next/image";
import { api, ENDPOINT } from "@/lib/api";
import { LucideLoader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { userLoggedInDetails } from "@/redux/userSlice";
import { useDispatch } from "react-redux";
import { toast } from "@/components/ui/use-toast";

export default function LoginForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

  const onSubmit = async () => {
    setLoading(true);
    try {
      const res = await api.post(ENDPOINT.signup, {
        name: name,
        email: email,
        password: password,
        confirmPassword: confirmPassword,
      });
      if (res.data.status === "success") {
        router.push("/signup-success");
      } else {
        toast({
          title: res.data.message || "Signup failed",
          variant: "destructive",
        });
      }
    } catch (err) {
      console.log("err: ", err);
      toast({
        title: err.response?.data?.message || "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1a1a2e] via-[#23234b] to-[#0f3460]">
      <div className="flex flex-col items-center w-full">
        <Image src="/cineverse-logo.svg" alt="CineVerse Logo" width={80} height={80} className="mb-6 drop-shadow-lg" />
        <Card className="mx-auto w-full max-w-sm shadow-2xl rounded-2xl border-0 bg-[#23234b]/90 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-3xl font-extrabold text-center text-white">Create your CineVerse account</CardTitle>
            <CardDescription className="text-center text-gray-300">
              Enter your information to create an account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6">
              <div className="grid gap-2">
                <Label htmlFor="name" className="text-white">Full Name</Label>
                <Input
                  id="name"
                  placeholder="Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="focus:ring-2 focus:ring-pink-500"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email" className="text-white">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="focus:ring-2 focus:ring-pink-500"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password" className="text-white">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="focus:ring-2 focus:ring-pink-500"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="confirm-password" className="text-white">Confirm Password</Label>
                <Input
                  id="confirm-password"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="focus:ring-2 focus:ring-pink-500"
                />
              </div>
              <Button onClick={onSubmit} className="w-full bg-pink-600 hover:bg-pink-700 text-white font-semibold py-2 rounded-lg transition-all">
                Create an account
                {loading && (
                  <LucideLoader2 className="animate-spin ml-2 w-4 h-4" />
                )}
              </Button>
            </div>
            <div className="mt-4 text-center text-sm text-gray-300">
              Already have an account?{' '}
              <Link href="/login" className="underline text-pink-400 hover:text-pink-300 font-semibold">
                Sign in
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
