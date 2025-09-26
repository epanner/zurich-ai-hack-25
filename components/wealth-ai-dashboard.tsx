"use client"

import { useState } from "react"
import {
  Calendar,
  DollarSign,
  FileText,
  LineChart,
  Menu,
  PieChart,
  Settings,
  ShieldAlert,
  User,
  Users,
  ChevronDown,
  Sparkles,
  MessageSquare,
  Clock,
  Phone,
  Video,
  Mail,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useIsMobile } from "@/hooks/use-mobile"
import { useClientSelection } from "@/hooks/useClientSelection"
import { useAIChat } from "@/hooks/useAIChat"
import { AIChat } from "@/components/AIChat"
import { ClientInfo } from "@/components/ClientInfo"
import { DetailedCustomerInfo } from "@/components/DetailedCustomerInfo"
import { AIRecommendedActions } from "@/components/AIRecommendedActions"
import { EnlargedView } from "@/components/EnlargedView"
import { NotificationsPopover } from "@/components/NotificationsPopover"

// Add import for format function
import { format } from "date-fns"

// Add import for MeetingScheduler component
import { MeetingScheduler } from "@/components/MeetingScheduler"

export default function FinanceProDashboard() {
  const isMobile = useIsMobile()
  const [activeTab, setActiveTab] = useState("insights")
  const [enlargedBox, setEnlargedBox] = useState<string | null>(null)
  const [selectedConversationId, setSelectedConversationId] = useState<string | null>(null)

  const { selectedClientId, clientData, clientSearchQuery, filteredClients, handleClientChange, setClientSearchQuery } =
    useClientSelection()

  const {
    messages,
    inputValue,
    isLoading,
    showAIChat,
    messagesEndRef,
    selectedMainPreset,
    showRefinedPresets,
    setInputValue,
    toggleAIChat,
    handleSubmitMessage,
    handleActionButtonClick,
    handleActionClick,
    handleMainPresetSelect,
    handleRefinedPresetSelect,
    resetPresetSelection,
    resetChat,
  } = useAIChat(clientData)

  const toggleEnlargeBox = (boxId: string | null) => {
    setEnlargedBox(enlargedBox === boxId ? null : boxId)
  }

  const marketData = {
    indices: {
      sp500: {
        value: "4,500",
        change: 0.5,
        status: "up",
      },
      nasdaq: {
        value: "14,000",
        change: 0.8,
        status: "up",
      },
      dowJones: {
        value: "34,500",
        change: -0.2,
        status: "down",
      },
      russell2000: {
        value: "2,000",
        change: 0.3,
        status: "up",
      },
    },
  }

  // Add state for meeting scheduler
  const [showMeetingScheduler, setShowMeetingScheduler] = useState(false)

  // Add functions to handle meetings
  const handleScheduleMeeting = (date: Date, title: string, notes: string) => {
    // In a real app, this would call an API to save the meeting
    console.log("Scheduling meeting:", { date, title, notes, client: clientData.name })

    // For demo purposes, we'll just add it to the client's upcoming events
    const newEvent = {
      date: format(date, "MMM d, yyyy"),
      title: title,
    }

    // This is just for UI demonstration - in a real app, you'd update the backend
    clientData.upcomingEvents = [newEvent, ...clientData.upcomingEvents]
  }

  const handleCancelMeeting = (index: number) => {
    // In a real app, this would call an API to cancel the meeting
    console.log("Cancelling meeting at index:", index)

    // Create a copy of the upcomingEvents array
    const updatedEvents = [...clientData.upcomingEvents]
    // Remove the event at the specified index
    updatedEvents.splice(index, 1)
    // Update the clientData with the new array
    clientData.upcomingEvents = updatedEvents

    // Force a re-render
    setShowMeetingScheduler(false)
    setTimeout(() => setShowMeetingScheduler(true), 10)
  }

  const selectedConversation = selectedConversationId
    ? clientData.conversations.find((conv) => conv.id === selectedConversationId)
    : null

  const getConversationIcon = (type: string) => {
    switch (type) {
      case "call":
        return <Phone className="h-4 w-4" />
      case "meeting":
        return <Video className="h-4 w-4" />
      case "email":
        return <Mail className="h-4 w-4" />
      case "chat":
        return <MessageSquare className="h-4 w-4" />
      default:
        return <MessageSquare className="h-4 w-4" />
    }
  }

  return (
    <div className="flex h-screen w-full flex-col bg-background dark">
      <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-slate-900 px-4 md:px-6 dark:bg-slate-900 light:bg-white light:border-slate-200">
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="md:hidden dark:bg-slate-800 dark:border-slate-700 light:bg-white light:border-slate-200 bg-transparent"
            >
              <Menu className="h-5 w-5 dark:text-white light:text-slate-900" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent
            side="left"
            className="w-72 dark:bg-slate-900 dark:text-white light:bg-white light:text-slate-900"
          >
            <nav className="grid gap-2 text-lg font-medium">
              <a href="#" className="flex items-center gap-2 text-lg font-semibold">
                <LineChart className="h-6 w-6" />
                <span className="font-bold">FinancePro</span>
              </a>
              <Separator className="my-2 dark:bg-slate-800 light:bg-slate-200" />
              <a
                href="#"
                className="flex items-center gap-3 rounded-lg dark:bg-slate-800 light:bg-slate-100 px-3 py-2 text-primary"
              >
                <User className="h-5 w-5" />
                Client Dashboard
              </a>
              <a
                href="#"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:text-primary"
              >
                <Users className="h-5 w-5" />
                All Clients
              </a>
              <a
                href="#"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:text-primary"
              >
                <PieChart className="h-5 w-5" />
                Portfolios
              </a>
              <a
                href="#"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:text-primary"
              >
                <ShieldAlert className="h-5 w-5" />
                Risk Management
              </a>
              <a
                href="#"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:text-primary"
              >
                <DollarSign className="h-5 w-5" />
                Tax Planning
              </a>
              <a
                href="#"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:text-primary"
              >
                <FileText className="h-5 w-5" />
                Reports
              </a>
              <a
                href="#"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:text-primary"
              >
                <Settings className="h-5 w-5" />
                Settings
              </a>
            </nav>
          </SheetContent>
        </Sheet>
        <a href="#" className="flex items-center gap-2 md:ml-0">
          <LineChart className="h-6 w-6 dark:text-white light:text-slate-900" />
          <span className="font-bold hidden md:inline-block dark:text-white light:text-slate-900">FinancePro</span>
        </a>

        <div className="flex items-center mx-2">
          <img src="/images/ubs-logo.jpg" alt="UBS" className="h-6" />
        </div>

        {/* Full-width AI search bar */}
        <div className="flex-1 px-2">
          <div className="relative w-full cursor-pointer" onClick={toggleAIChat}>
            <div className="relative flex items-center">
              <div className="absolute left-3 flex items-center pointer-events-none">
                <Sparkles className="h-5 w-5 text-[#af2018]" />
              </div>
              <div className="w-full rounded-lg dark:bg-slate-800 dark:border-slate-700 light:bg-slate-100 light:border-slate-200 border py-2 pl-10 pr-4 dark:text-white light:text-slate-900">
                Ask FinancePro anything about {clientData.name}...
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div>
                  <NotificationsPopover />
                </div>
              </TooltipTrigger>
              <TooltipContent>Notifications</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="rounded-full dark:bg-slate-800 dark:border-slate-700 dark:hover:bg-slate-700 light:bg-white light:border-slate-200 light:hover:bg-slate-100 bg-transparent"
              >
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder-user.jpg" alt="User" />
                  <AvatarFallback>WM</AvatarFallback>
                </Avatar>
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="dark:bg-slate-800 dark:text-white dark:border-slate-700 light:bg-white light:text-slate-900 light:border-slate-200"
            >
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator className="dark:bg-slate-700 light:bg-slate-200" />
              <DropdownMenuItem className="dark:hover:bg-slate-700 light:hover:bg-slate-100">Profile</DropdownMenuItem>
              <DropdownMenuItem className="dark:hover:bg-slate-700 light:hover:bg-slate-100">Settings</DropdownMenuItem>
              <DropdownMenuItem className="dark:hover:bg-slate-700 light:hover:bg-slate-100">Help</DropdownMenuItem>
              <DropdownMenuSeparator className="dark:bg-slate-700 light:bg-slate-200" />
              <DropdownMenuItem className="dark:hover:bg-slate-700 light:hover:bg-slate-100">Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      {/* Full-screen AI chat overlay */}
      {showAIChat && (
        <AIChat
          clientData={clientData}
          messages={messages}
          inputValue={inputValue}
          isLoading={isLoading}
          messagesEndRef={messagesEndRef}
          selectedMainPreset={selectedMainPreset}
          showRefinedPresets={showRefinedPresets}
          setInputValue={setInputValue}
          toggleAIChat={toggleAIChat}
          handleSubmitMessage={handleSubmitMessage}
          handleActionClick={handleActionClick}
          handleMainPresetSelect={handleMainPresetSelect}
          handleRefinedPresetSelect={handleRefinedPresetSelect}
          resetPresetSelection={resetPresetSelection}
          resetChat={resetChat}
        />
      )}

      <div className="flex flex-1 overflow-hidden bg-slate-950">
        {/* Sidebar */}
        <aside className="hidden w-[280px] flex-col border-r border-slate-800 bg-slate-900 md:flex">
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-1 dark:bg-slate-800 dark:border-slate-700 dark:text-white dark:hover:bg-slate-700 light:bg-white light:border-slate-200 light:text-slate-900 light:hover:bg-slate-100 bg-transparent"
                  >
                    <span>Clients</span>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="w-[280px] dark:bg-slate-800 dark:border-slate-700 dark:text-white light:bg-white light:text-slate-900 light:border-slate-200"
                >
                  <div className="p-2">
                    <Input
                      placeholder="Search clients..."
                      value={clientSearchQuery}
                      onChange={(e) => setClientSearchQuery(e.target.value)}
                      className="dark:bg-slate-700 dark:border-slate-600 dark:text-white light:bg-white light:border-slate-200 light:text-slate-900"
                    />
                  </div>
                  <DropdownMenuSeparator className="dark:bg-slate-700 light:bg-slate-200" />
                  <div className="max-h-[200px] overflow-y-auto">
                    {filteredClients.map((client) => (
                      <DropdownMenuItem
                        key={client.id}
                        onClick={() => handleClientChange(client.id)}
                        className={`${selectedClientId === client.id ? "dark:bg-slate-700 light:bg-slate-100" : ""} dark:hover:bg-slate-700 light:hover:bg-slate-100`}
                      >
                        <div className="flex items-center">
                          <Avatar className="h-6 w-6 mr-2">
                            <AvatarImage src={client.avatar || "/placeholder.svg"} alt={client.name} />
                            <AvatarFallback>{client.initials}</AvatarFallback>
                          </Avatar>
                          {client.name}
                        </div>
                      </DropdownMenuItem>
                    ))}
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <ClientInfo client={clientData} />

            <Separator className="my-4 bg-slate-800" />

            <div className="space-y-2">
              <h3 className="text-sm font-medium text-slate-400 mb-3">Last Conversations</h3>
              <div className="space-y-1 max-h-[400px] overflow-y-auto">
                {clientData.conversations.map((conversation) => (
                  <Button
                    key={conversation.id}
                    variant="ghost"
                    className={`w-full justify-start p-3 h-auto ${
                      selectedConversationId === conversation.id
                        ? "bg-[#af2018] text-white hover:bg-[#8a1a13]"
                        : "text-slate-400 hover:text-white hover:bg-slate-800"
                    }`}
                    onClick={() => setSelectedConversationId(conversation.id)}
                  >
                    <div className="flex items-start gap-3 w-full">
                      <div className="flex-shrink-0 mt-0.5">{getConversationIcon(conversation.type)}</div>
                      <div className="flex-1 text-left">
                        <div className="text-sm font-medium truncate">{conversation.title}</div>
                        <div className="text-xs opacity-70 mt-1">
                          {new Date(conversation.date).toLocaleDateString()}
                        </div>
                        <div className="text-xs opacity-60 mt-1 flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {conversation.duration}
                        </div>
                      </div>
                    </div>
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </aside>

        <main className="flex flex-1 flex-col overflow-hidden">
          <div className="flex flex-1 flex-col overflow-hidden">
            {/* Client header for mobile */}
            <div className="md:hidden p-4 border-b border-slate-800">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-between mb-2 bg-slate-800 border-slate-700 text-white"
                  >
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={clientData.avatar || "/placeholder.svg"} alt={clientData.name} />
                        <AvatarFallback>{clientData.initials}</AvatarFallback>
                      </Avatar>
                      <span>{clientData.name}</span>
                    </div>
                    <ChevronDown className="h-4 w-4 opacity-50" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-[calc(100vw-2rem)] bg-slate-800 border-slate-700 text-white">
                  <DropdownMenuLabel>Select Client</DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-slate-700" />
                  {filteredClients.map((client) => (
                    <DropdownMenuItem
                      key={client.id}
                      onClick={() => handleClientChange(client.id)}
                      className={`${selectedClientId === client.id ? "bg-slate-700" : ""} hover:bg-slate-700`}
                    >
                      <div className="flex items-center">
                        <Avatar className="h-6 w-6 mr-2">
                          <AvatarImage src={client.avatar || "/placeholder.svg"} alt={client.name} />
                          <AvatarFallback>{client.initials}</AvatarFallback>
                        </Avatar>
                        {client.name}
                      </div>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              <div className="rounded-lg border border-slate-800 bg-slate-900 p-3">
                <div className="space-y-2 text-sm">
                  <div className="grid grid-cols-2 gap-1">
                    <div className="text-slate-400">Age:</div>
                    <div className="text-white">{clientData.age}</div>
                  </div>
                  <div className="grid grid-cols-2 gap-1">
                    <div className="text-slate-400">Status:</div>
                    <div className="text-white">{clientData.maritalStatus}</div>
                  </div>
                  <div className="grid grid-cols-2 gap-1">
                    <div className="text-slate-400">Risk:</div>
                    <div className="text-white">{clientData.riskProfile}</div>
                  </div>
                  <div className="grid grid-cols-2 gap-1">
                    <div className="text-slate-400">Last Contact:</div>
                    <div className="text-white">{new Date(clientData.lastContact).toLocaleDateString()}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile tabs */}
            <div className="md:hidden p-2 border-b border-slate-800 bg-slate-900">
              <Tabs defaultValue="insights" onValueChange={setActiveTab}>
                <TabsList className="grid grid-cols-3 w-full bg-slate-800">
                  <TabsTrigger value="insights" className="data-[state=active]:bg-[#af2018]">
                    Insights
                  </TabsTrigger>
                  <TabsTrigger value="portfolio" className="data-[state=active]:bg-[#af2018]">
                    Portfolio
                  </TabsTrigger>
                  <TabsTrigger value="market" className="data-[state=active]:bg-[#af2018]">
                    Market
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            {/* Main content area */}
            <div className="flex-1 overflow-y-auto p-4 md:p-6 bg-slate-950">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h1 className="text-2xl font-bold tracking-tight text-white">Client Insights</h1>
                  <p className="text-slate-400">
                    AI-powered insights for {clientData.name} based on financial data and market conditions
                    {selectedConversation && (
                      <span className="block text-sm mt-1">
                        Viewing insights from: {selectedConversation.title} (
                        {new Date(selectedConversation.date).toLocaleDateString()})
                      </span>
                    )}
                  </p>
                </div>
              </div>

              {/* New fixed row with three boxes - darker styling */}
              <div className="grid gap-4 mb-6 md:grid-cols-3">
                {/* Box 1: Detailed Customer Info */}
                <DetailedCustomerInfo
                  client={clientData}
                  isEnlarged={enlargedBox === "customerInfo"}
                  onToggleEnlarge={() => toggleEnlargeBox("customerInfo")}
                  onActionClick={handleActionButtonClick}
                />

                {/* Box 2: Calendar */}
                <Card className="bg-slate-900 border-slate-800 text-white shadow-md flex flex-col">
                  <CardHeader className="pb-2 border-b border-slate-800">
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-base text-white">Calendar</CardTitle>
                        <CardDescription className="text-slate-400">Recent and upcoming interactions</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-3 px-3 flex-1">
                    <div className="space-y-3">
                      <div>
                        <h4 className="text-sm font-medium mb-2 text-[#af2018]">Recent Interactions</h4>
                        <div className="space-y-3">
                          <div className="flex items-start gap-2">
                            <Calendar className="h-4 w-4 text-slate-400 mt-0.5 flex-shrink-0" />
                            <div>
                              <p className="text-sm font-medium text-white">
                                {new Date(2025, 2, 20).toLocaleDateString()}
                              </p>
                              <p className="text-xs text-slate-400">{clientData.recentActivity}</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-2">
                            <Calendar className="h-4 w-4 text-slate-400 mt-0.5 flex-shrink-0" />
                            <div>
                              <p className="text-sm font-medium text-white">
                                {new Date(2025, 2, 6).toLocaleDateString()}
                              </p>
                              <p className="text-xs text-slate-400">Quarterly portfolio review call</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <Separator className="bg-slate-800" />

                      <div>
                        <h4 className="text-sm font-medium mb-2 text-[#af2018]">Upcoming Meetings</h4>
                        <div className="space-y-3">
                          {clientData.upcomingEvents.slice(0, 2).map((event, index) => (
                            <div key={index} className="flex items-start gap-2">
                              <Calendar className="h-4 w-4 text-[#af2018] mt-0.5 flex-shrink-0" />
                              <div>
                                <p className="text-sm font-medium text-white">{event.date}</p>
                                <p className="text-xs text-slate-400">{event.title}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="mt-auto">
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full bg-slate-800 border-slate-700 text-white hover:bg-slate-700"
                      onClick={() => setShowMeetingScheduler(true)}
                    >
                      Schedule Meeting
                    </Button>
                  </CardFooter>
                </Card>

                {/* Box 3: AI-recommended Actions */}
                <AIRecommendedActions
                  client={clientData}
                  isEnlarged={enlargedBox === "actions"}
                  onToggleEnlarge={() => toggleEnlargeBox("actions")}
                  onActionClick={handleActionButtonClick}
                />
              </div>

              <div className="mb-6">
                <Card className="bg-slate-900 border-slate-800 text-white shadow-md">
                  <CardHeader className="pb-4 border-b border-slate-800">
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-lg text-white">AI Transcript Summary</CardTitle>
                        <CardDescription className="text-slate-400">
                          {selectedConversation
                            ? `Summary from ${selectedConversation.title} on ${new Date(selectedConversation.date).toLocaleDateString()}`
                            : "Select a conversation to view AI-generated summary"}
                        </CardDescription>
                      </div>
                      {selectedConversation && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="bg-slate-800 border-slate-700 text-white hover:bg-slate-700"
                        >
                          View Full Transcript
                        </Button>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="pt-4">
                    {selectedConversation ? (
                      <div className="space-y-4">
                        <div className="flex items-center gap-2 text-sm text-slate-400">
                          {getConversationIcon(selectedConversation.type)}
                          <span className="capitalize">{selectedConversation.type}</span>
                          <span>•</span>
                          <Clock className="h-4 w-4" />
                          <span>{selectedConversation.duration}</span>
                        </div>
                        <p className="text-slate-200 leading-relaxed">{selectedConversation.summary}</p>
                        <div className="pt-2 border-t border-slate-800">
                          <h4 className="text-sm font-medium text-[#af2018] mb-2">Key Discussion Points:</h4>
                          <ul className="text-sm text-slate-300 space-y-1">
                            <li>• Portfolio performance and rebalancing strategy</li>
                            <li>• Risk assessment and investment timeline</li>
                            <li>• Tax optimization opportunities</li>
                            <li>• Future planning and goal alignment</li>
                          </ul>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-8 text-slate-400">
                        <MessageSquare className="h-12 w-12 mx-auto mb-3 opacity-50" />
                        <p>Select a conversation from the sidebar to view the AI-generated summary and insights.</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Meeting scheduler dialog */}
      <MeetingScheduler
        isOpen={showMeetingScheduler}
        onClose={() => setShowMeetingScheduler(false)}
        clientName={clientData.name}
        recentMeetings={[
          { date: new Date(2025, 2, 15), title: "Quarterly Portfolio Review" },
          { date: new Date(2025, 1, 5), title: "Tax Planning Session" },
        ]}
        upcomingMeetings={clientData.upcomingEvents.map((event) => ({
          date: new Date(event.date),
          title: event.title,
        }))}
        onScheduleMeeting={handleScheduleMeeting}
        onCancelMeeting={handleCancelMeeting}
      />

      {/* Enlarged view component */}
      <EnlargedView
        boxType={enlargedBox}
        client={clientData}
        onClose={() => toggleEnlargeBox(null)}
        onActionClick={handleActionButtonClick}
      />
    </div>
  )
}
