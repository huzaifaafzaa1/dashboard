import * as React from "react"
import { SquareTerminal, LayoutDashboard } from "lucide-react"
import Link from "next/link"

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

// Customized data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: SquareTerminal,
      plan: "Enterprise",
    },
  ],
  navMain: [
    {
      title: "Products",
      url: "#",
      icon: SquareTerminal,
      items: [
        {
          title: "All Products",
          url: "/dashboard/allproducts",
        },
        {
          title: "Add Products",
          url: "/dashboard/addproducts",
        },
      ],
    },
  ],
  projects: [],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        {/* Direct Dashboard Link */}
        <div className="p-2">
          <Link href="/dashboard" className="flex items-center space-x-2 text-sm font-medium">
            <LayoutDashboard className="w-5 h-5" />
            <span>Dashboard</span>
          </Link>
        </div>

        {/* Main Navigation Items */}
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
