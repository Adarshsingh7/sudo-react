import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Calendar } from "@/components/ui/calendar";
import {
  Bar,
  BarChart,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function DashboardPage() {
  // Sample data for charts and tables
  const revenueData = [
    { month: "Jan", revenue: 0 },
    { month: "Feb", revenue: 2500 },
    { month: "Mar", revenue: 1500 },
    { month: "Apr", revenue: 3500 },
    { month: "May", revenue: 3000 },
    { month: "Jun", revenue: 3200 },
  ];

  const productData = [
    { name: "Product A", sales: 100 },
    { name: "Product B", sales: 200 },
    { name: "Product C", sales: 150 },
    { name: "Product D", sales: 300 },
    { name: "Product E", sales: 250 },
  ];

  const recentTransactions = [
    { id: 1, customer: "John Doe", amount: 100, status: "Completed" },
    { id: 2, customer: "Jane Smith", amount: 250, status: "Pending" },
    { id: 3, customer: "Bob Johnson", amount: 50, status: "Completed" },
    { id: 4, customer: "Alice Brown", amount: 175, status: "Failed" },
  ];

  return (
    <div className="p-4 space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>

      {/* Quick Stats */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-zinc-500 dark:text-zinc-400"
            >
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 7h5a3.5 1 7H6" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$45,231.89</div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              +20.1% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Subscriptions</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-zinc-500 dark:text-zinc-400"
            >
              <path d="M16 21v-2a4 4 0 0-4-4H6a4 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0-3-3.87M16 3.13a4 1 7.75" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+2350</div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              +180.1% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sales</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-zinc-500 dark:text-zinc-400"
            >
              <rect width="20" height="14" x="2" y="5" rx="2" />
              <path d="M2 10h20" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+12,234</div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              +19% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Now</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-zinc-500 dark:text-zinc-400"
            >
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+573</div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              +201 since last hour
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Revenue Trend and Calendar */}
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-1 md:col-span-2 lg:col-span-4">
          <CardHeader>
            <CardTitle>Revenue Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={revenueData}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#8884d8"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card className="col-span-1 md:col-span-2 lg:col-span-3">
          <CardHeader>
            <CardTitle>Upcoming Events</CardTitle>
            <CardDescription>Your schedule for the next weeks</CardDescription>
          </CardHeader>
          <CardContent>
            <Calendar className="w-full" fromDate={new Date()} />
          </CardContent>
        </Card>
      </div>

      {/* Recent Transactions and Product Performance */}
      <div className="grid gap-4 grid-cols-1 lg:grid-cols-7">
        <Card className="col-span-1 lg:col-span-4">
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
            <CardDescription>Your latest financial activities</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Customer</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentTransactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell className="font-medium">
                      {transaction.customer}
                    </TableCell>
                    <TableCell>${transaction.amount}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          transaction.status === "Completed"
                            ? "success"
                            : transaction.status === "Pending"
                              ? "warning"
                              : "destructive"
                        }
                      >
                        {transaction.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        <Card className="col-span-1 lg:col-span-3">
          <CardHeader>
            <CardTitle>Product Performance</CardTitle>
            <CardDescription>Top selling products this month</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={productData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="sales" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Team Members */}
      <Card>
        <CardHeader>
          <CardTitle>Team Members</CardTitle>
          <CardDescription>Your project collaborators</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <Avatar>
              <AvatarImage
                src="/placeholder.svg?height=40&width=40"
                alt="@johndoe"
              />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarImage
                src="/placeholder.svg?height=40&width=40"
                alt="@janesmith"
              />
              <AvatarFallback>JS</AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarImage
                src="/placeholder.svg?height=40&width=40"
                alt="@bobjonhson"
              />
              <AvatarFallback>BJ</AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarImage
                src="/placeholder.svg?height=40&width=40"
                alt="@alicebrown"
              />
              <AvatarFallback>AB</AvatarFallback>
            </Avatar>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
