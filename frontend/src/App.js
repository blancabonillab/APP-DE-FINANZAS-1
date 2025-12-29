import React, { useState } from 'react';
import '@/App.css';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Calculator from '@/components/Calculator';
import Progress from '@/components/Progress';
import { Calculator as CalculatorIcon, TrendingUp } from 'lucide-react';

function App() {
  const [activeTab, setActiveTab] = useState('calculator');
  const [refreshProgress, setRefreshProgress] = useState(0);

  const handleDataSaved = () => {
    // Trigger progress refresh
    setRefreshProgress(prev => prev + 1);
  };

  return (
    <div className="App min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-card shadow-sm border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            Gestión Financiera
          </h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6 max-w-4xl">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="calculator" className="flex items-center gap-2">
              <CalculatorIcon className="w-4 h-4" />
              Calculadora
            </TabsTrigger>
            <TabsTrigger value="progress" className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Progreso
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="calculator">
            <Calculator onDataSaved={handleDataSaved} />
          </TabsContent>
          
          <TabsContent value="progress">
            <Progress key={refreshProgress} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default App;
