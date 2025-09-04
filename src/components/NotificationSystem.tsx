import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

interface NotificationContextType {
  showSuccessNotification: (title: string, description?: string) => void;
  showErrorNotification: (title: string, description?: string) => void;
  showInfoNotification: (title: string, description?: string) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const useNotificationSystem = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotificationSystem must be used within a NotificationProvider');
  }
  return context;
};

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const { toast } = useToast();
  const { user } = useAuth();

  // Create notifications in database
  const createNotification = async (title: string, message: string, type: string = 'info') => {
    if (!user) return;
    
    try {
      const { error } = await supabase
        .from('notifications')
        .insert([
          {
            user_id: user.id,
            title,
            message,
            type,
            read: false
          }
        ]);
      
      if (error) {
        console.error('Error creating notification:', error);
      }
    } catch (error) {
      console.error('Error creating notification:', error);
    }
  };

  const showSuccessNotification = (title: string, description?: string) => {
    toast({
      title,
      description,
      className: "bg-green-50 border-green-200 text-green-800",
    });
    
    if (description) {
      createNotification(title, description, 'success');
    }
  };

  const showErrorNotification = (title: string, description?: string) => {
    toast({
      title,
      description,
      variant: "destructive"
    });
    
    if (description) {
      createNotification(title, description, 'error');
    }
  };

  const showInfoNotification = (title: string, description?: string) => {
    toast({
      title,
      description,
    });
    
    if (description) {
      createNotification(title, description, 'info');
    }
  };

  const value = {
    showSuccessNotification,
    showErrorNotification,
    showInfoNotification
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};