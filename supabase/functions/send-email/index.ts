import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface EmailRequest {
  to: string;
  subject: string;
  type: 'team_invitation' | 'confirmation' | 'notification' | '2fa_code';
  data?: {
    name?: string;
    inviterName?: string;
    role?: string;
    code?: string;
    message?: string;
  };
}

const handler = async (req: Request): Promise<Response> => {
  console.log('Email function called with method:', req.method);

  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { to, subject, type, data }: EmailRequest = await req.json();
    console.log('Email request:', { to, subject, type, data });

    let html = '';

    switch (type) {
      case 'team_invitation':
        html = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: linear-gradient(135deg, #3b82f6, #1d4ed8); padding: 30px; text-align: center; border-radius: 12px 12px 0 0;">
              <h1 style="color: white; margin: 0; font-size: 28px;">Team Invitation</h1>
            </div>
            <div style="background: white; padding: 30px; border-radius: 0 0 12px 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.1);">
              <h2 style="color: #1f2937; margin-bottom: 20px;">You're invited to join our team!</h2>
              <p style="color: #4b5563; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
                Hi ${data?.name || 'there'},
              </p>
              <p style="color: #4b5563; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
                ${data?.inviterName || 'Someone'} has invited you to join their team as a ${data?.role || 'Team Member'}.
              </p>
              <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <p style="color: #1f2937; font-weight: 600; margin: 0;">Role: ${data?.role || 'Team Member'}</p>
              </div>
              <p style="color: #4b5563; font-size: 16px; line-height: 1.6;">
                Welcome to the team! We're excited to have you on board.
              </p>
            </div>
          </div>
        `;
        break;

      case 'confirmation':
        html = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: linear-gradient(135deg, #10b981, #059669); padding: 30px; text-align: center; border-radius: 12px 12px 0 0;">
              <h1 style="color: white; margin: 0; font-size: 28px;">Welcome to NexaFlow!</h1>
            </div>
            <div style="background: white; padding: 30px; border-radius: 0 0 12px 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.1);">
              <h2 style="color: #1f2937; margin-bottom: 20px;">Confirm your email address</h2>
              <p style="color: #4b5563; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
                Thank you for signing up! Please confirm your email address to get started with NexaFlow.
              </p>
              <p style="color: #4b5563; font-size: 16px; line-height: 1.6;">
                Your account has been created successfully. You can now log in and start managing your tasks and projects.
              </p>
            </div>
          </div>
        `;
        break;

      case '2fa_code':
        html = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: linear-gradient(135deg, #f59e0b, #d97706); padding: 30px; text-align: center; border-radius: 12px 12px 0 0;">
              <h1 style="color: white; margin: 0; font-size: 28px;">Two-Factor Authentication</h1>
            </div>
            <div style="background: white; padding: 30px; border-radius: 0 0 12px 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.1);">
              <h2 style="color: #1f2937; margin-bottom: 20px;">Your verification code</h2>
              <p style="color: #4b5563; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
                Use this code to complete your two-factor authentication:
              </p>
              <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0; text-align: center;">
                <p style="color: #1f2937; font-size: 32px; font-weight: bold; margin: 0; letter-spacing: 4px;">${data?.code}</p>
              </div>
              <p style="color: #ef4444; font-size: 14px; text-align: center;">
                This code will expire in 10 minutes.
              </p>
            </div>
          </div>
        `;
        break;

      case 'notification':
        html = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: linear-gradient(135deg, #6366f1, #4f46e5); padding: 30px; text-align: center; border-radius: 12px 12px 0 0;">
              <h1 style="color: white; margin: 0; font-size: 28px;">Notification</h1>
            </div>
            <div style="background: white; padding: 30px; border-radius: 0 0 12px 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.1);">
              <p style="color: #4b5563; font-size: 16px; line-height: 1.6;">
                ${data?.message || 'You have a new notification from NexaFlow.'}
              </p>
            </div>
          </div>
        `;
        break;
    }

    const emailResponse = await resend.emails.send({
      from: "NexaFlow <onboarding@resend.dev>",
      to: Array.isArray(to) ? to : [to],
      subject: subject,
      html: html,
    });

    console.log("Email sent successfully:", emailResponse);

    // Check for Resend errors and provide helpful feedback
    if (emailResponse.error) {
      console.error("Resend error:", emailResponse.error);
      
      // Handle the common domain verification error
      if (emailResponse.error.message && emailResponse.error.message.includes('verify a domain')) {
        throw new Error("Email sending requires domain verification. Please verify your domain at resend.com/domains or contact support.");
      }
      
      throw new Error(emailResponse.error.message || "Failed to send email");
    }

    return new Response(JSON.stringify({ success: true, data: emailResponse }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);