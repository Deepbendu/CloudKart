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
      <div className="container mx-auto px-2 sm:px-4 py-2 sm:py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            <div className="bg-gradient-hero p-1.5 sm:p-2 rounded-lg">
              <Cloud className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
            </div>
            <div className="hidden xs:block">
              <h1 className="text-lg sm:text-2xl font-bold bg-gradient-hero bg-clip-text text-transparent">
                CloudKart
              </h1>
              <p className="text-xs sm:text-sm text-muted-foreground hidden sm:block">Shop Clouds Smartly</p>
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
        <nav className="md:hidden mt-2 sm:mt-4 flex flex-wrap gap-1 sm:gap-2">
          {tabs.map((tab) => (
            <Button
              key={tab.id}
              variant={activeTab === tab.id ? "default" : "ghost"}
              size="sm"
              onClick={() => onTabChange(tab.id)}
              className="text-xs px-2 py-1 h-7 sm:h-8"
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