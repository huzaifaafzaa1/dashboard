"use client"

import * as React from "react"
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
  Home,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Products", // ✅ Changed from 'name' to 'title'
      url: "#",
      icon: Bot,
      items: [
        {
          title: "Add Product", 
          url: "/dashboard/products/add",
        },
        {
          title: "All Products", 
          url: "/dashboard/products/all",
        },
      ],
    },
    {
      title: "Categories",
      url: "#",
      icon: Map,
      items: [
        {
          title: "Add Categories", 
          url: "/dashboard/categories/add",
        },
        {
          title: "All Categories", 
          url:"/dashboard/categories/all" ,
        },
      ],
    },
  ],
  projects: [
    {
      name: "Dashboard",
      url: "/dashboard",
      icon: SquareTerminal,
    },
    {
      name: "Website",
      url: "/",
      icon: Home,
    },
  ],
  
};


export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
