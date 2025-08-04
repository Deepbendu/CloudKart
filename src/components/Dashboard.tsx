import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Cloud, 
  Server, 
  Database, 
  Zap, 
  Shield, 
  DollarSign, 
  Globe, 
  TrendingUp,
  ArrowRight 
} from "lucide-react";

const Dashboard = ({ onNavigate }) => {
  const providerStats = [
    { name: "AWS", services: 42, color: "bg-aws", icon: Cloud },
    { name: "Azure", services: 38, color: "bg-azure", icon: Cloud },
    { name: "GCP", services: 35, color: "bg-gcp-primary", icon: Cloud },
  ];

  const categories = [
    { name: "Compute", icon: Server, count: 28, color: "text-blue-600", category: "Compute" },
    { name: "Storage", icon: Database, count: 21, color: "text-green-600", category: "Storage" },
    { name: "AI/ML", icon: Zap, count: 19, color: "text-purple-600", category: "AI/ML" },
    { name: "Security", icon: Shield, count: 16, color: "text-red-600", category: "Security" },
  ];

  const quickActions = [
    {
      title: "Explore Services",
      description: "Browse 100+ cloud services",
      icon: Cloud,
      action: () => onNavigate("explorer"),
      variant: "hero",
    },
    {
      title: "Compare Services",
      description: "Side-by-side feature comparison",
      icon: TrendingUp,
      action: () => onNavigate("compare"),
      variant: "comparison",
    },
    {
      title: "Estimate Costs",
      description: "Calculate monthly cloud costs",
      icon: DollarSign,
      action: () => onNavigate("estimator"),
      variant: "azure",
    },
    {
      title: "Check Regions",
      description: "Service availability by region",
      icon: Globe,
      action: () => onNavigate("regions"),
      variant: "gcp",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="bg-gradient-hero text-white rounded-lg sm:rounded-xl p-4 sm:p-6 md:p-8 shadow-large">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4">
            Compare Cloud Services
          </h1>
          <p className="text-sm sm:text-lg md:text-xl lg:text-2xl mb-6 sm:mb-8 opacity-90">
            Find the best cloud solutions across AWS, Azure, and Google Cloud
          </p>
          <div className="flex flex-col xs:flex-row gap-3 sm:gap-4 justify-center max-w-md sm:max-w-none mx-auto">
            <Button 
              variant="secondary" 
              size="xl"
              onClick={() => onNavigate("explorer")}
              className="group"
            >
              Start Exploring
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              variant="outline" 
              size="xl"
              className="bg-white/10 border-white/20 text-white hover:bg-white/20"
              onClick={() => onNavigate("compare")}
            >
              Compare Now
            </Button>
          </div>
        </div>
      </div>

      {/* Provider Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {providerStats.map((provider) => {
          const IconComponent = provider.icon;
          return (
            <Card key={provider.name} className="hover:shadow-medium transition-all duration-300 transform hover:-translate-y-1">
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <div className={`${provider.color} p-2 sm:p-3 rounded-lg`}>
                      <IconComponent className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg sm:text-xl font-semibold">{provider.name}</h3>
                      <p className="text-sm text-muted-foreground">{provider.services} services</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xl sm:text-2xl font-bold text-foreground">
                      {provider.services}
                    </div>
                    <div className="text-xs sm:text-sm text-muted-foreground">services</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Categories Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Service Categories</CardTitle>
          <CardDescription>
            Services organized by category across all providers
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            {categories.map((category) => {
              const IconComponent = category.icon;
              return (
                <div
                  key={category.name}
                  className="flex items-center space-x-2 sm:space-x-3 p-3 sm:p-4 rounded-lg bg-gradient-card hover:shadow-soft transition-all duration-300 cursor-pointer"
                  onClick={() => onNavigate(`explorer?category=${category.category}`)}
                >
                  <IconComponent className={`h-6 w-6 sm:h-8 sm:w-8 ${category.color}`} />
                  <div>
                    <h4 className="text-sm sm:text-base font-semibold">{category.name}</h4>
                    <p className="text-xs sm:text-sm text-muted-foreground">{category.count} services</p>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {quickActions.map((action) => {
          const IconComponent = action.icon;
          return (
            <Card 
              key={action.title} 
              className="cursor-pointer hover:shadow-medium transition-all duration-300 transform hover:-translate-y-1"
              onClick={action.action}
            >
              <CardContent className="p-4 sm:p-6 text-center">
                <div className="mb-3 sm:mb-4">
                  <IconComponent className="h-10 w-10 sm:h-12 sm:w-12 mx-auto text-primary" />
                </div>
                <h3 className="text-base sm:text-lg font-semibold mb-2">{action.title}</h3>
                <p className="text-muted-foreground text-xs sm:text-sm mb-3 sm:mb-4">{action.description}</p>
                <Button variant="default" size="sm" className="w-full bg-gradient-hero text-white hover:opacity-90 text-xs sm:text-sm">
                  Get Started
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default Dashboard;