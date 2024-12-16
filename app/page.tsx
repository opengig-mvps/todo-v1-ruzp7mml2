'use client' ;
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Home, Star, Users, Check, Calendar, Heart } from "lucide-react";

const LandingPage = () => {
  return (
    <div className="flex flex-col min-h-[100vh] bg-purple-50">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-purple-600 text-white">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl">
                    Organize Your Tasks Effortlessly
                  </h1>
                  <p className="max-w-[600px] text-lg md:text-xl">
                    Manage your daily tasks with ease using our intuitive and simple todo list app.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button className="bg-purple-800 hover:bg-purple-700">Get Started</Button>
                  <Button variant="outline" className="border-white text-white hover:bg-purple-700">
                    Learn More
                  </Button>
                </div>
              </div>
              <img
                src="https://fastly.picsum.photos/id/13/2500/1667.jpg?hmac=SoX9UoHhN8HyklRA4A3vcCWJMVtiBXUg0W4ljWTor7s"
                alt="Hero"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last lg:aspect-square"
              />
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Features</h2>
                <p className="max-w-[900px] text-lg md:text-xl">
                  Explore the amazing features that make our todo list app the best choice for managing your tasks.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
              <div className="flex flex-col items-center justify-center space-y-4">
                <Check className="h-12 w-12 text-purple-700" />
                <div className="space-y-1 text-center">
                  <h3 className="text-lg font-bold">Simple Interface</h3>
                  <p>
                    Our intuitive interface makes it easy to create, edit, and delete tasks quickly.
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-center justify-center space-y-4">
                <Calendar className="h-12 w-12 text-purple-700" />
                <div className="space-y-1 text-center">
                  <h3 className="text-lg font-bold">Reminder Notifications</h3>
                  <p>
                    Set reminders for your tasks and receive notifications to stay on track.
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-center justify-center space-y-4">
                <Heart className="h-12 w-12 text-purple-700" />
                <div className="space-y-1 text-center">
                  <h3 className="text-lg font-bold">Prioritize Tasks</h3>
                  <p>
                    Organize your tasks by priority to ensure you focus on what matters most.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-purple-600 text-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">User Testimonials</h2>
                <p className="max-w-[900px] text-lg md:text-xl">
                  See what our satisfied users have to say about our todo list app.
                </p>
              </div>
              <div className="grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
                <Card className="flex flex-col items-start space-y-4 p-6 bg-white text-black">
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarImage src="https://picsum.photos/seed/picsum/200/300" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium leading-none">John Doe</p>
                      <p className="text-xs text-gray-500">Product Manager</p>
                    </div>
                  </div>
                  <p>
                    "This todo list app has transformed the way I manage my tasks. The simple interface and powerful features make it a must-have tool."
                  </p>
                </Card>
                <Card className="flex flex-col items-start space-y-4 p-6 bg-white text-black">
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarImage src="https://picsum.photos/seed/picsum/200/300" />
                      <AvatarFallback>SM</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium leading-none">Sarah Miller</p>
                      <p className="text-xs text-gray-500">Designer</p>
                    </div>
                  </div>
                  <p>
                    "I love how easy it is to organize my tasks with this app. The reminder notifications keep me on track throughout the day."
                  </p>
                </Card>
                <Card className="flex flex-col items-start space-y-4 p-6 bg-white text-black">
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarImage src="https://picsum.photos/seed/picsum/200/300" />
                      <AvatarFallback>MJ</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium leading-none">Michael Johnson</p>
                      <p className="text-xs text-gray-500">Developer</p>
                    </div>
                  </div>
                  <p>
                    "The task prioritization feature is a game-changer. I can easily focus on the most important tasks and get more done in less time."
                  </p>
                </Card>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Pricing</h2>
                <p className="max-w-[900px] text-lg md:text-xl">
                  Choose the plan that best suits your needs.
                </p>
              </div>
              <div className="grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
                <Card className="flex flex-col items-start space-y-4 p-6 bg-white text-black">
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold">Basic</h3>
                    <p className="text-4xl font-bold">
                      $5<span className="text-2xl font-medium text-gray-500">/mo</span>
                    </p>
                  </div>
                  <ul className="grid gap-2 text-gray-500">
                    <li>
                      <Check className="mr-2 inline-block h-4 w-4" />
                      10 Tasks per day
                    </li>
                    <li>
                      <Check className="mr-2 inline-block h-4 w-4" />
                      Basic Support
                    </li>
                  </ul>
                  <Button className="w-full bg-purple-800 text-white">Get Started</Button>
                </Card>
                <Card className="flex flex-col items-start space-y-4 p-6 bg-purple-700 text-white">
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold">Pro</h3>
                    <p className="text-4xl font-bold">
                      $10<span className="text-2xl font-medium">/mo</span>
                    </p>
                  </div>
                  <ul className="grid gap-2">
                    <li>
                      <Check className="mr-2 inline-block h-4 w-4" />
                      50 Tasks per day
                    </li>
                    <li>
                      <Check className="mr-2 inline-block h-4 w-4" />
                      Priority Support
                    </li>
                  </ul>
                  <Button className="w-full bg-purple-900 text-white">Get Started</Button>
                </Card>
                <Card className="flex flex-col items-start space-y-4 p-6 bg-white text-black">
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold">Enterprise</h3>
                    <p className="text-4xl font-bold">
                      $20<span className="text-2xl font-medium text-gray-500">/mo</span>
                    </p>
                  </div>
                  <ul className="grid gap-2 text-gray-500">
                    <li>
                      <Check className="mr-2 inline-block h-4 w-4" />
                      Unlimited Tasks
                    </li>
                    <li>
                      <Check className="mr-2 inline-block h-4 w-4" />
                      Dedicated Support
                    </li>
                  </ul>
                  <Button className="w-full bg-purple-800 text-white">Get Started</Button>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="bg-purple-700 p-6 md:py-12 w-full text-white">
        <div className="container max-w-7xl grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 text-sm">
          <div className="grid gap-1">
            <h3 className="font-semibold">Product</h3>
            <a href="#" className="hover:underline">Features</a>
            <a href="#" className="hover:underline">Pricing</a>
            <a href="#" className="hover:underline">Download</a>
          </div>
          <div className="grid gap-1">
            <h3 className="font-semibold">Company</h3>
            <a href="#" className="hover:underline">About Us</a>
            <a href="#" className="hover:underline">Careers</a>
            <a href="#" className="hover:underline">Blog</a>
          </div>
          <div className="grid gap-1">
            <h3 className="font-semibold">Support</h3>
            <a href="#" className="hover:underline">Help Center</a>
            <a href="#" className="hover:underline">Contact Us</a>
            <a href="#" className="hover:underline">FAQs</a>
          </div>
          <div className="grid gap-1">
            <h3 className="font-semibold">Legal</h3>
            <a href="#" className="hover:underline">Privacy Policy</a>
            <a href="#" className="hover:underline">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;