import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ReportRequest {
  reportType: 'productivity' | 'project_summary' | 'team_performance';
  format: 'csv' | 'pdf';
  dateRange?: {
    start: string;
    end: string;
  };
}

const handler = async (req: Request): Promise<Response> => {
  console.log('Export report function called with method:', req.method);

  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        global: {
          headers: { Authorization: req.headers.get('Authorization')! },
        },
      }
    );

    // Get user from token
    const {
      data: { user },
      error: userError,
    } = await supabaseClient.auth.getUser();

    if (userError || !user) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { reportType, format, dateRange }: ReportRequest = await req.json();
    console.log('Report request:', { reportType, format, dateRange });

    let data: any[] = [];
    let filename = '';
    let headers: string[] = [];

    // Fetch data based on report type
    switch (reportType) {
      case 'productivity':
        const { data: tasks } = await supabaseClient
          .from('tasks')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });
        
        data = tasks || [];
        filename = `productivity-report-${new Date().toISOString().split('T')[0]}`;
        headers = ['Title', 'Status', 'Priority', 'Due Date', 'Created At', 'Updated At'];
        break;

      case 'project_summary':
        const { data: projects } = await supabaseClient
          .from('projects')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });
        
        data = projects || [];
        filename = `project-summary-${new Date().toISOString().split('T')[0]}`;
        headers = ['Name', 'Status', 'Progress', 'Start Date', 'End Date', 'Created At'];
        break;

      case 'team_performance':
        const { data: teamMembers } = await supabaseClient
          .from('team_members')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });
        
        data = teamMembers || [];
        filename = `team-performance-${new Date().toISOString().split('T')[0]}`;
        headers = ['Name', 'Role', 'Status', 'Email', 'Created At'];
        break;
    }

    if (format === 'csv') {
      // Generate CSV
      let csvContent = headers.join(',') + '\n';
      
      data.forEach(item => {
        const row = headers.map(header => {
          const key = header.toLowerCase().replace(' ', '_');
          const value = item[key] || '';
          return `"${value.toString().replace(/"/g, '""')}"`;
        }).join(',');
        csvContent += row + '\n';
      });

      return new Response(csvContent, {
        status: 200,
        headers: {
          ...corsHeaders,
          "Content-Type": "text/csv",
          "Content-Disposition": `attachment; filename="${filename}.csv"`,
        },
      });
    } else {
      // For PDF, return JSON data that frontend can process
      return new Response(JSON.stringify({ 
        success: true, 
        data,
        headers,
        filename: `${filename}.pdf`,
        message: 'Report data ready for PDF generation'
      }), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      });
    }

  } catch (error: any) {
    console.error("Error in export-report function:", error);
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