import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function RecentSheets() {
  return (
    <div className="space-y-8">
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/placeholder.svg" alt="Avatar" />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Strength Training - Beginner</p>
          <p className="text-sm text-muted-foreground">Created 2 days ago</p>
        </div>
        <div className="ml-auto font-medium">3 clients</div>
      </div>
      <div className="flex items-center">
        <Avatar className="flex h-9 w-9 items-center justify-center space-y-0 border">
          <AvatarImage src="/placeholder.svg" alt="Avatar" />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Hypertrophy Program</p>
          <p className="text-sm text-muted-foreground">Created 5 days ago</p>
        </div>
        <div className="ml-auto font-medium">2 clients</div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/placeholder.svg" alt="Avatar" />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Weight Loss Circuit</p>
          <p className="text-sm text-muted-foreground">Created 1 week ago</p>
        </div>
        <div className="ml-auto font-medium">5 clients</div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/placeholder.svg" alt="Avatar" />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Endurance Training</p>
          <p className="text-sm text-muted-foreground">Created 2 weeks ago</p>
        </div>
        <div className="ml-auto font-medium">1 client</div>
      </div>
    </div>
  )
}

