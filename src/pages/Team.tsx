import { AppLayout } from "@/components/Layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/ui/status-badge";
import { Users, UserPlus, Mail, MessageCircle } from "lucide-react";
import { InviteMemberDialog } from "@/components/InviteMemberDialog";

const Team = () => {
  const teamMembers = [
    { name: "Alex Johnson", role: "Product Manager", status: "high", avatar: "AJ" },
    { name: "Sarah Wilson", role: "Designer", status: "medium", avatar: "SW" },
    { name: "Mike Chen", role: "Developer", status: "high", avatar: "MC" },
    { name: "Emma Kim", role: "QA Engineer", status: "low", avatar: "EK" },
  ];

  return (
    <AppLayout>
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Team</h1>
            <p className="text-muted-foreground">Manage your team members and collaboration</p>
          </div>
          <InviteMemberDialog>
            <Button className="bg-primary hover:bg-primary-hover">
              <UserPlus className="mr-2 h-4 w-4" />
              Invite Member
            </Button>
          </InviteMemberDialog>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {teamMembers.map((member, index) => (
            <Card key={index} className="bg-surface border-card-border shadow-card">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-primary-foreground font-bold">{member.avatar}</span>
                </div>
                <h3 className="font-semibold text-foreground">{member.name}</h3>
                <p className="text-muted-foreground text-sm">{member.role}</p>
                <div className="mt-3 flex justify-center">
                  <StatusBadge status={member.status as any} />
                </div>
                <div className="mt-4 flex space-x-2">
                  <Button size="sm" variant="outline">
                    <Mail className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="outline">
                    <MessageCircle className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AppLayout>
  );
};

export default Team;