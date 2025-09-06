import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Shield, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";

interface ForgotPasswordDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ForgotPasswordDialog = ({ open, onOpenChange }: ForgotPasswordDialogProps) => {
  const [step, setStep] = useState<"email" | "verify">("email");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const { resetPassword } = useAuth();

  const handleSendCode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast({
        title: "Missing Email",
        description: "Please enter your email address",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    
    // Generate 2FA code and send via email
    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();

    try {
      // Send email with 2FA code
      const { error: emailError } = await supabase.functions.invoke('send-email', {
        body: {
          type: '2fa_code',
          to: email,
          subject: 'Password Reset Code',
          data: {
            code: verificationCode
          }
        }
      });

      if (emailError) throw emailError;

      // Store the code temporarily in localStorage for verification
      localStorage.setItem('forgot_password_code', verificationCode);
      localStorage.setItem('forgot_password_email', email);
      localStorage.setItem('forgot_password_expires', (Date.now() + 10 * 60 * 1000).toString());

      toast({
        title: "Verification Code Sent",
        description: "Please check your email for the 6-digit verification code.",
      });
      
      setStep("verify");
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to send verification code",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!code) {
      toast({
        title: "Missing Code",
        description: "Please enter the verification code",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    
    try {
      const storedCode = localStorage.getItem('forgot_password_code');
      const storedEmail = localStorage.getItem('forgot_password_email');
      const storedExpires = localStorage.getItem('forgot_password_expires');

      if (!storedCode || !storedEmail || !storedExpires) {
        throw new Error("No verification code found. Please request a new one.");
      }

      if (Date.now() > parseInt(storedExpires)) {
        throw new Error("Verification code has expired. Please request a new one.");
      }

      if (code !== storedCode || email !== storedEmail) {
        throw new Error("Invalid verification code");
      }

      // Clear stored data
      localStorage.removeItem('forgot_password_code');
      localStorage.removeItem('forgot_password_email');
      localStorage.removeItem('forgot_password_expires');

      // Send password reset email via Supabase
      const { error } = await resetPassword(email);
      
      if (!error) {
        toast({
          title: "Password Reset Email Sent",
          description: "Please check your email to complete the password reset.",
        });
        onOpenChange(false);
        setStep("email");
        setEmail("");
        setCode("");
      }
    } catch (error: any) {
      toast({
        title: "Verification Failed",
        description: error.message || "Invalid verification code",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    if (step === "verify") {
      setStep("email");
    }
  };

  const handleClose = () => {
    onOpenChange(false);
    setStep("email");
    setEmail("");
    setCode("");
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            Forgot Password
          </DialogTitle>
          <DialogDescription>
            Reset your password with 2-step verification
          </DialogDescription>
        </DialogHeader>

        {step === "email" && (
          <Card className="border-none shadow-none">
            <CardHeader className="px-0 pb-4">
              <CardTitle className="text-lg flex items-center gap-2">
                <Mail className="h-4 w-4" />
                Enter Your Email
              </CardTitle>
              <CardDescription>
                We'll send you a verification code to confirm your identity
              </CardDescription>
            </CardHeader>
            <CardContent className="px-0">
              <form onSubmit={handleSendCode} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="forgot-email">Email Address</Label>
                  <Input
                    id="forgot-email"
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-background border-input"
                    required
                  />
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Sending..." : "Send Verification Code"}
                </Button>
              </form>
            </CardContent>
          </Card>
        )}

        {step === "verify" && (
          <Card className="border-none shadow-none">
            <CardHeader className="px-0 pb-4">
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleBack}
                  className="p-1 h-auto"
                >
                  <ArrowLeft className="h-4 w-4" />
                </Button>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  Enter Verification Code
                </CardTitle>
              </div>
              <CardDescription>
                Enter the 6-digit code sent to {email}
              </CardDescription>
            </CardHeader>
            <CardContent className="px-0">
              <form onSubmit={handleVerifyCode} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="verification-code">Verification Code</Label>
                  <Input
                    id="verification-code"
                    type="text"
                    placeholder="123456"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className="bg-background border-input text-center text-lg tracking-widest"
                    maxLength={6}
                    required
                  />
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Verifying..." : "Verify Code"}
                </Button>
              </form>
            </CardContent>
          </Card>
        )}
      </DialogContent>
    </Dialog>
  );
};