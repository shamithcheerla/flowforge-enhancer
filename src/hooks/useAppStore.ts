import { useState, useEffect } from 'react';

export interface Task {
  id: number;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'todo' | 'in-progress' | 'review' | 'completed';
  assignee: string;
  dueDate: string | null;
  createdAt: Date;
}

export interface Project {
  id: number;
  name: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  progress: number;
  team: string[];
  dueDate: string;
  endDate: string;
  status: 'planning' | 'active' | 'completed' | 'on-hold';
  createdAt: Date;
}

export interface Event {
  id: number;
  title: string;
  description: string;
  date: Date;
  time: string;
  type: 'meeting' | 'deadline' | 'reminder' | 'event';
  createdAt: Date;
}

export interface Goal {
  id: number;
  title: string;
  description: string;
  target: number;
  current: number;
  deadline: string;
  status: 'active' | 'completed' | 'paused';
  createdAt: Date;
}

interface AppState {
  tasks: Task[];
  projects: Project[];
  events: Event[];
  goals: Goal[];
  user: {
    name: string;
    email: string;
    role: string;
  };
  notifications: any[];
  isTimerRunning: boolean;
  timerSeconds: number;
  currentTask: string;
}

const STORAGE_KEY = 'nexaflow_app_state';

const initialState: AppState = {
  tasks: [
    {
      id: 1,
      title: "Update user interface design",
      description: "Redesign the main dashboard for better user experience",
      priority: "high",
      status: "in-progress",
      assignee: "Alex Johnson",
      dueDate: "2024-01-25",
      createdAt: new Date()
    },
    {
      id: 2,
      title: "Review marketing proposals",
      description: "Evaluate Q1 marketing strategies and proposals",
      priority: "medium",
      status: "todo",
      assignee: "Sarah Williams",
      dueDate: "2024-01-30",
      createdAt: new Date()
    }
  ],
  projects: [
    {
      id: 1,
      name: "Website Redesign",
      title: "Website Redesign",
      description: "Complete overhaul of company website",
      priority: "high",
      progress: 75,
      team: ["Alex Johnson", "Sarah Williams"],
      dueDate: "2024-02-15",
      endDate: "2024-02-15",
      status: "active",
      createdAt: new Date()
    }
  ],
  events: [
    {
      id: 1,
      title: "Team Meeting",
      description: "Weekly team sync",
      date: new Date(),
      time: "10:00 AM",
      type: "meeting",
      createdAt: new Date()
    }
  ],
  goals: [
    {
      id: 1,
      title: "Complete 50 Tasks",
      description: "Finish 50 tasks this month",
      target: 50,
      current: 32,
      deadline: "2024-01-31",
      status: "active",
      createdAt: new Date()
    }
  ],
  user: {
    name: "Alex Johnson",
    email: "alex@nexaflow.com",
    role: "Product Manager"
  },
  notifications: [],
  isTimerRunning: false,
  timerSeconds: 0,
  currentTask: ""
};

export function useAppStore() {
  const [state, setState] = useState<AppState>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsedState = JSON.parse(saved);
      // Ensure notifications is always an array
      if (!Array.isArray(parsedState.notifications)) {
        parsedState.notifications = [];
      }
      return parsedState;
    }
    return initialState;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const addTask = (task: Omit<Task, 'id' | 'createdAt'>) => {
    const newTask = {
      ...task,
      id: Date.now(),
      createdAt: new Date()
    };
    setState(prev => ({
      ...prev,
      tasks: [...prev.tasks, newTask]
    }));
    addNotification({
      type: "task",
      title: "New task created",
      message: `Task "${task.title}" has been created`,
      icon: "CheckSquare"
    });
  };

  const updateTask = (id: number, updates: Partial<Task>) => {
    setState(prev => ({
      ...prev,
      tasks: prev.tasks.map(task => 
        task.id === id ? { ...task, ...updates } : task
      )
    }));
  };

  const deleteTask = (id: number) => {
    setState(prev => ({
      ...prev,
      tasks: prev.tasks.filter(task => task.id !== id)
    }));
  };

  const addProject = (project: Omit<Project, 'id' | 'createdAt'>) => {
    const newProject = {
      ...project,
      id: Date.now(),
      createdAt: new Date()
    };
    setState(prev => ({
      ...prev,
      projects: [...prev.projects, newProject]
    }));
    addNotification({
      type: "project",
      title: "New project created",
      message: `Project "${project.name || project.title}" has been created`,
      icon: "FolderKanban"
    });
  };

  const updateProject = (id: number, updates: Partial<Project>) => {
    setState(prev => ({
      ...prev,
      projects: prev.projects.map(project => 
        project.id === id ? { ...project, ...updates } : project
      )
    }));
  };

  const addEvent = (event: Omit<Event, 'id' | 'createdAt'>) => {
    const newEvent = {
      ...event,
      id: Date.now(),
      createdAt: new Date()
    };
    setState(prev => ({
      ...prev,
      events: [...prev.events, newEvent]
    }));
    addNotification({
      type: "event",
      title: "New event created",
      message: `Event "${event.title}" has been scheduled`,
      icon: "Calendar"
    });
  };

  const addGoal = (goal: Omit<Goal, 'id' | 'createdAt'>) => {
    setState(prev => ({
      ...prev,
      goals: [...prev.goals, {
        ...goal,
        id: Date.now(),
        createdAt: new Date()
      }]
    }));
  };

  const startTimer = (taskName: string) => {
    setState(prev => ({
      ...prev,
      isTimerRunning: true,
      currentTask: taskName
    }));
  };

  const pauseTimer = () => {
    setState(prev => ({
      ...prev,
      isTimerRunning: false
    }));
  };

  const stopTimer = () => {
    setState(prev => ({
      ...prev,
      isTimerRunning: false,
      timerSeconds: 0,
      currentTask: ""
    }));
  };

  const updateTimer = (seconds: number) => {
    setState(prev => ({
      ...prev,
      timerSeconds: seconds
    }));
  };

  return {
    ...state,
    addTask,
    updateTask,
    deleteTask,
    addProject,
    updateProject,
    addEvent,
    addGoal,
    startTimer,
    pauseTimer,
    stopTimer,
    updateTimer,
    user: state.user,
    notifications: state.notifications,
    setUser,
    addNotification
  };

  function setUser(newUser: { name: string; email: string; role: string }) {
    setState(prev => ({
      ...prev,
      user: newUser
    }));
  }

  function addNotification(notification: any) {
    const newNotification = {
      id: Date.now(),
      ...notification,
      time: "Just now",
      unread: true
    };
    setState(prev => ({
      ...prev,
      notifications: [newNotification, ...(Array.isArray(prev.notifications) ? prev.notifications : [])]
    }));
  }
}