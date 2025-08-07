import { useState } from "react";
import Header from "@/components/Header";
import Dashboard from "@/components/Dashboard";
import ServiceExplorer from "@/components/ServiceExplorer";
import ServiceComparison from "@/components/ServiceComparison";
import CostEstimator from "@/components/CostEstimator";
import RegionExplorer from "@/components/RegionExplorer";

const Index = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  const renderContent = () => {
    const [tabName, params] = activeTab.split('?');
    const urlParams = new URLSearchParams(params || '');
    const category = urlParams.get('category');
    
    switch (tabName) {
      case "dashboard":
        return <Dashboard onNavigate={setActiveTab} />;
      case "explorer":
        return <ServiceExplorer initialCategory={category} />;
      case "compare":
        return <ServiceComparison />;
      case "estimator":
        return <CostEstimator />;
      case "regions":
        return <RegionExplorer />;
      default:
        return <Dashboard onNavigate={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="container mx-auto px-2 sm:px-4 py-4 sm:py-6 lg:py-8">
        {renderContent()}
      </main>
    </div>
  );
};

export default Index;
