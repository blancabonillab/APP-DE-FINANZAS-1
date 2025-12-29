import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Building2, User, RotateCcw, TrendingUp, Home, CreditCard, Sprout, DollarSign, AlertCircle, Info } from 'lucide-react';
import ModeToggle from '@/components/ModeToggle';
import BusinessResults from '@/components/BusinessResults';
import PersonalResults from '@/components/PersonalResults';

export default function FinancialCalculator() {
  const [mode, setMode] = useState('business'); // 'business' or 'personal'
  const [amount, setAmount] = useState('');
  const [results, setResults] = useState(null);

  const calculateBusiness = (value) => {
    const total = parseFloat(value);
    const reinvestment = total * 0.70;
    const personalTransfer = total * 0.30;
    
    return {
      total,
      reinvestment,
      personalTransfer
    };
  };

  const calculatePersonal = (value) => {
    const total = parseFloat(value);
    
    // Step 1: Taxes (15%)
    const taxes = total * 0.15;
    
    // Step 2: Net Real
    const netReal = total - taxes;
    
    // Step 3: Maser (10% of Net Real)
    const maser = netReal * 0.10;
    
    // Step 4: Remainder
    const remainder = netReal - maser;
    
    // Step 5: Distribution
    const house = remainder * 0.60;
    const debts = remainder * 0.30;
    const investment = remainder * 0.10;
    
    return {
      total,
      taxes,
      netReal,
      maser,
      remainder,
      house,
      debts,
      investment
    };
  };

  const handleCalculate = () => {
    if (!amount || parseFloat(amount) <= 0) {
      return;
    }
    
    const numericAmount = parseFloat(amount);
    
    if (mode === 'business') {
      setResults(calculateBusiness(numericAmount));
    } else {
      setResults(calculatePersonal(numericAmount));
    }
  };

  const handleReset = () => {
    setAmount('');
    setResults(null);
  };

  const handleModeChange = (newMode) => {
    setMode(newMode);
    setAmount('');
    setResults(null);
  };

  return (
    <div className={`min-h-screen transition-all duration-500 ${
      mode === 'business' 
        ? 'bg-gradient-to-br from-blue-50 via-blue-50/50 to-blue-100/30' 
        : 'bg-gradient-to-br from-gray-50 via-white to-gray-50'
    }`}>
      {/* Header */}
      <div className="w-full border-b bg-card/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl sm:text-2xl font-bold text-foreground flex items-center gap-2">
              <DollarSign className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
              Gestión Financiera
            </h1>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 sm:py-8 max-w-4xl">
        {/* Mode Toggle */}
        <ModeToggle mode={mode} onModeChange={handleModeChange} />

        {/* Input Card */}
        <Card className="card-elegant mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
              {mode === 'business' ? (
                <>
                  <Building2 className="h-5 w-5 text-primary" />
                  Ingreso de Venta Bruta
                </>
              ) : (
                <>
                  <User className="h-5 w-5 text-foreground" />
                  Ingreso Recibido
                </>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="amount" className="text-sm font-medium">
                {mode === 'business' ? 'Monto de Venta Bruta' : 'Ingreso Recibido'}
              </Label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl font-bold text-muted-foreground">
                  $
                </span>
                <Input
                  id="amount"
                  type="number"
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      handleCalculate();
                    }
                  }}
                  className="input-financial pl-10 text-xl"
                  step="0.01"
                  min="0"
                />
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <Button 
                onClick={handleCalculate} 
                className="btn-primary flex-1"
                disabled={!amount || parseFloat(amount) <= 0}
              >
                <TrendingUp className="h-4 w-4 mr-2" />
                Calcular
              </Button>
              <Button 
                onClick={handleReset} 
                variant="outline"
                className="btn-secondary"
              >
                <RotateCcw className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        {results && (
          <div className="animate-in slide-in-from-bottom-4 duration-500">
            {mode === 'business' ? (
              <BusinessResults results={results} />
            ) : (
              <PersonalResults results={results} />
            )}
          </div>
        )}

        {/* Info Banner */}
        {!results && (
          <Card className="card-elegant bg-muted/50 border-dashed">
            <CardContent className="py-6">
              <div className="flex items-start gap-3 text-sm text-muted-foreground">
                <Info className="h-5 w-5 mt-0.5 flex-shrink-0" />
                <div>
                  {mode === 'business' ? (
                    <p>
                      En <span className="font-semibold text-primary">modo Negocio</span>, 
                      el 70% se destina a reinversión/operación y el 30% se transfiere a tu cuenta personal.
                    </p>
                  ) : (
                    <p>
                      En <span className="font-semibold text-foreground">modo Personal</span>, 
                      se calculan impuestos, diezmo (Maser), y se distribuye el remanente entre casa, 
                      ataque a deudas e inversión.
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
