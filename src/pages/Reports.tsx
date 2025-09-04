import { useState, useEffect } from "react";
import { AppLayout } from "@/components/Layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Download, Filter, TrendingUp, Calendar } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { DateRange } from "react-day-picker";

const Reports = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [generatingReport, setGeneratingReport] = useState<string | null>(null);
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 30 days ago
    to: new Date(),
  });
  const [reports, setReports] = useState<any[]>([]);

  useEffect(() => {
    fetchReports();
  }, [user]);

  const fetchReports = async () => {
    if (!user) return;
    
    // Mock reports data - in a real app, this would come from a reports table
    setReports([
      { id: 1, name: "Weekly Productivity Report #1", type: "productivity", createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000) },
      { id: 2, name: "Project Summary Report #1", type: "project_summary", createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000) },
      { id: 3, name: "Team Performance Report #1", type: "team_performance", createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) }
    ]);
  };

  const handleGenerateReport = async (reportType: string) => {
    if (!user || !dateRange?.from || !dateRange?.to) {
      toast({
        title: "Error",
        description: "Please select a valid date range",
        variant: "destructive"
      });
      return;
    }

    setGeneratingReport(reportType);
    
    try {
      const { data, error } = await supabase.functions.invoke('export-report', {
        body: {
          reportType: reportType.toLowerCase().replace(' ', '_'),
          format: 'pdf',
          dateRange: {
            from: dateRange.from.toISOString(),
            to: dateRange.to.toISOString()
          }
        }
      });

      if (error) throw error;

      toast({
        title: "Report Generated",
        description: `${reportType} report has been generated successfully!`
      });
      
      // Refresh reports list
      fetchReports();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to generate report",
        variant: "destructive"
      });
    } finally {
      setGeneratingReport(null);
    }
  };

  const handleExportReport = async (reportId: number, format: 'csv' | 'pdf' = 'csv') => {
    if (!user) return;
    
    try {
      const report = reports.find(r => r.id === reportId);
      if (!report) return;

      const { data, error } = await supabase.functions.invoke('export-report', {
        body: {
          reportType: report.type,
          format: format,
          dateRange: {
            from: dateRange?.from?.toISOString() || new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
            to: dateRange?.to?.toISOString() || new Date().toISOString()
          }
        }
      });

      if (error) throw error;

      if (format === 'csv' && data) {
        // Create and download CSV file
        const blob = new Blob([data], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = `${report.name.replace(/\s+/g, '_')}.csv`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      }

      toast({
        title: "Export Successful",
        description: `Report exported as ${format.toUpperCase()}`
      });
    } catch (error: any) {
      toast({
        title: "Export Failed",
        description: error.message || "Failed to export report",
        variant: "destructive"
      });
    }
  };

  const handleFilter = () => {
    if (!dateRange?.from || !dateRange?.to) {
      toast({
        title: "Error",
        description: "Please select a valid date range",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Filter Applied",
      description: `Filtered reports from ${format(dateRange.from, "PPP")} to ${format(dateRange.to, "PPP")}`
    });
  };

  return (
    <AppLayout>
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Reports</h1>
            <p className="text-muted-foreground">Generate comprehensive project reports</p>
          </div>
          <div className="flex space-x-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline">
                  <Calendar className="mr-2 h-4 w-4" />
                  {dateRange?.from ? (
                    dateRange.to ? (
                      <>
                        {format(dateRange.from, "LLL dd, y")} -{" "}
                        {format(dateRange.to, "LLL dd, y")}
                      </>
                    ) : (
                      format(dateRange.from, "LLL dd, y")
                    )
                  ) : (
                    <span>Pick a date range</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <CalendarComponent
                  initialFocus
                  mode="range"
                  defaultMonth={dateRange?.from}
                  selected={dateRange}
                  onSelect={setDateRange}
                  numberOfMonths={2}
                />
              </PopoverContent>
            </Popover>
            <Button variant="outline" onClick={handleFilter}>
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
            <Button onClick={() => handleExportReport(1, 'csv')}>
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="bg-surface border-card-border shadow-card hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                <span>Productivity Report</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">Weekly productivity analysis with time tracking data</p>
              <Button 
                className="w-full" 
                onClick={() => handleGenerateReport("Productivity Report")}
                disabled={generatingReport === "Productivity Report"}
              >
                {generatingReport === "Productivity Report" ? "Generating..." : "Generate Report"}
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-surface border-card-border shadow-card hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="h-5 w-5 text-primary" />
                <span>Project Summary</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">Detailed project progress and milestone reports</p>
              <Button 
                className="w-full" 
                onClick={() => handleGenerateReport("Project Summary")}
                disabled={generatingReport === "Project Summary"}
              >
                {generatingReport === "Project Summary" ? "Generating..." : "Generate Report"}
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-surface border-card-border shadow-card hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="h-5 w-5 text-primary" />
                <span>Team Performance</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">Team member performance and task completion rates</p>
              <Button 
                className="w-full" 
                onClick={() => handleGenerateReport("Team Performance")}
                disabled={generatingReport === "Team Performance"}
              >
                {generatingReport === "Team Performance" ? "Generating..." : "Generate Report"}
              </Button>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-surface border-card-border shadow-card">
          <CardHeader>
            <CardTitle>Recent Reports</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {reports.map((report) => (
                <div key={report.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <FileText className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <h3 className="font-medium">{report.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        Generated {format(new Date(report.createdAt), "PPP")}
                      </p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" onClick={() => handleExportReport(report.id, 'csv')}>
                      <Download className="mr-2 h-4 w-4" />
                      CSV
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleExportReport(report.id, 'pdf')}>
                      <Download className="mr-2 h-4 w-4" />
                      PDF
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default Reports;