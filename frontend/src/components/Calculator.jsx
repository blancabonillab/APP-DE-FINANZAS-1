import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Building2, User, RotateCcw, TrendingUp, Info } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { toast } from 'sonner';
import BusinessResults from '@/components/BusinessResults';
import PersonalResults from '@/components/PersonalResults';

export const Calculator = ({ onDataSaved }) => {
  const [mode, setMode] = useState('business');
  const [amount, setAmount] = useState('');
  const [results, setResults] = useState(null);

  const calculateBusiness = (value) => {
    const total = parseFloat(value);
    const reinvestment = total * 0.70;
    const personalTransfer = total * 0.30;
    
    // Aplicar cálculo personal sobre el 30%
    const taxes = personalTransfer * 0.15;
    const netReal = personalTransfer - taxes;
    const maser = netReal * 0.10;
    const remainder = netReal - maser;
    const house = remainder * 0.60;
    const debts = remainder * 0.30;
    const investment = remainder * 0.10;
    
    return {
      total,
      reinvestment,
      personalTransfer,
      taxes,
      netReal,
      maser,
      remainder,
      house,
      debts,
      investment
    };
  };

  const calculatePersonal = (value) => {
    const total = parseFloat(value);
    const taxes = total * 0.15;
    const netReal = total - taxes;
    const maser = netReal * 0.10;
    const remainder = netReal - maser;
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

  const saveToLocalStorage = (data) => {
    const records = JSON.parse(localStorage.getItem('financialRecords') || '[]');
    records.push(data);
    localStorage.setItem('financialRecords', JSON.stringify(records));
  };

  const handleCalculateAndSave = () => {
    if (!amount || parseFloat(amount) <= 0) {
      toast.error('Por favor ingresa un monto válido');
      return;
    }
    
    const numericAmount = parseFloat(amount);
    
    if (mode === 'business') {
      const result = calculateBusiness(numericAmount);
      setResults(result);
      
      // Save to localStorage
      saveToLocalStorage({
        date: new Date().toISOString(),
        type: 'business',
        amount: numericAmount,
        personalTransfer: result.personalTransfer,
        debts: 0,
        savings: 0
      });
    } else {
      const result = calculatePersonal(numericAmount);
      setResults(result);
      
      // Save to localStorage
      saveToLocalStorage({
        date: new Date().toISOString(),
        type: 'personal',
        amount: numericAmount,
        personalTransfer: 0,
        debts: result.debts,
        savings: result.investment
      });
    }
    
    toast.success('¡Registro guardado exitosamente!');
    onDataSaved();
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
    <div className="space-y-6">
      {/* Mode Toggle */}
      <Card className="card-elegant">
        <CardContent className="p-2">
          <div className="flex gap-2">
            <button
              onClick={() => handleModeChange('business')}
              className={`flex-1 flex items-center justify-center gap-2 px-6 py-4 rounded-lg font-semibold text-base transition-all duration-300 ${
                mode === 'business'
                  ? 'bg-primary text-primary-foreground shadow-lg scale-105'
                  : 'bg-transparent text-muted-foreground hover:bg-muted'
              }`}
            >
              <Building2 className="h-5 w-5" />
              <span>Negocio</span>
            </button>
            
            <div className="h-10 w-px bg-border self-center" />
            
            <button
              onClick={() => handleModeChange('personal')}
              className={`flex-1 flex items-center justify-center gap-2 px-6 py-4 rounded-lg font-semibold text-base transition-all duration-300 ${
                mode === 'personal'
                  ? 'bg-foreground text-background shadow-lg scale-105'
                  : 'bg-transparent text-muted-foreground hover:bg-muted'
              }`}
            >
              <User className="h-5 w-5" />
              <span>Personal</span>
            </button>
          </div>
        </CardContent>
      </Card>

      {/* Input Card */}
      <Card className="card-elegant">
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
                    handleCalculateAndSave();
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
              onClick={handleCalculateAndSave} 
              className="btn-primary flex-1"
              disabled={!amount || parseFloat(amount) <= 0}
            >
              <TrendingUp className="h-4 w-4 mr-2" />
              Registrar y Guardar
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
        <Alert className="border-blue-200 bg-blue-50/50">
          <Info className="h-4 w-4 text-blue-600" />
          <AlertDescription className="text-sm text-blue-900">
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
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default Calculator;
