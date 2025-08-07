import { Button } from "@/components/ui/button";
import { Cloud, Menu } from "lucide-react";

const Header = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: "dashboard", label: "Home" },
    { id: "explorer", label: "Cloud Services" },
    { id: "compare", label: "Cloud Compare" },
    { id: "estimator", label: "Migration Planner" },
    { id: "regions", label: "Global Regions" },
  ];

  return (
    <header className="border-b bg-white shadow-soft sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-hero p-2 rounded-lg">
              <Cloud className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-hero bg-clip-text text-transparent">
                CloudKart
              </h1>
              <p className="text-sm text-muted-foreground">Multi-Cloud Comparison Hub</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {tabs.map((tab) => (
              <Button
                key={tab.id}
                variant={activeTab === tab.id ? "default" : "ghost"}
                size="sm"
                onClick={() => onTabChange(tab.id)}
                className="transition-all duration-200"
              >
                {tab.label}
              </Button>
            ))}
          </nav>

          {/* Mobile menu button */}
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        </div>

        {/* Mobile navigation */}
        <nav className="md:hidden mt-4 flex flex-wrap gap-2">
          {tabs.map((tab) => (
            <Button
              key={tab.id}
              variant={activeTab === tab.id ? "default" : "ghost"}
              size="sm"
              onClick={() => onTabChange(tab.id)}
              className="text-xs"
            >
              {tab.label}
            </Button>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;