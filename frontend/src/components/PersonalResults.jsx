import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Receipt, TrendingDown, DollarSign, Home, CreditCard, Sprout, ChevronRight } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

export const PersonalResults = ({ results }) => {
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('es-EC', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  };

  const formatPercentage = (value) => {
    return `${(value * 100).toFixed(0)}%`;
  };

  return (
    <div className="space-y-4">
      {/* Total */}
      <Card className="card-elegant border-2 border-border">
        <CardContent className="pt-6">
          <div className="text-center">
            <p className="label-text mb-2">Ingreso Total Recibido</p>
            <p className="amount-display text-foreground">{formatCurrency(results.total)}</p>
          </div>
        </CardContent>
      </Card>

      {/* Step 1: Taxes */}
      <Card className="card-elegant border-l-4 border-l-destructive">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-base font-semibold">
              <Receipt className="h-5 w-5 text-destructive" />
              Paso 1: Impuestos
            </CardTitle>
            <span className="text-xs bg-destructive/10 text-destructive px-2 py-1 rounded-full font-semibold">
              15%
            </span>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Apartar para SRI / IVA</p>
            <p className="text-2xl font-bold text-destructive">{formatCurrency(results.taxes)}</p>
          </div>
        </CardContent>
      </Card>

      {/* Step 2: Net Real */}
      <div className="flex items-center justify-center py-2">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <ChevronRight className="h-4 w-4" />
          <span className="font-medium">Neto Real: {formatCurrency(results.netReal)}</span>
          <ChevronRight className="h-4 w-4" />
        </div>
      </div>

      {/* Step 3: Maser */}
      <Card className="card-elegant border-l-4 border-l-blue-500">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-base font-semibold">
              <DollarSign className="h-5 w-5 text-blue-500" />
              Paso 3: Maser (Dar)
            </CardTitle>
            <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full font-semibold">
              10% del Neto
            </span>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">10% sobre {formatCurrency(results.netReal)}</p>
            <p className="text-2xl font-bold text-blue-600">{formatCurrency(results.maser)}</p>
          </div>
        </CardContent>
      </Card>

      {/* Step 4: Remainder */}
      <div className="flex items-center justify-center py-2">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <ChevronRight className="h-4 w-4" />
          <span className="font-medium">Remanente: {formatCurrency(results.remainder)}</span>
          <ChevronRight className="h-4 w-4" />
        </div>
      </div>

      {/* Step 5: Distribution Title */}
      <div className="pt-4 pb-2">
        <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
          <TrendingDown className="h-5 w-5" />
          Paso 5: Distribución Final
        </h3>
        <p className="text-sm text-muted-foreground mt-1">
          Del remanente de {formatCurrency(results.remainder)}
        </p>
      </div>

      {/* House/Living */}
      <Card className="card-elegant border-l-4 border-l-foreground">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-base font-semibold">
              <Home className="h-5 w-5" />
              Casa / Vivir
            </CardTitle>
            <span className="text-xs bg-muted px-2 py-1 rounded-full font-semibold">
              60%
            </span>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold text-foreground">{formatCurrency(results.house)}</p>
          <p className="text-xs text-muted-foreground mt-2">
            Para gastos de vivienda, alimentación y necesidades básicas
          </p>
        </CardContent>
      </Card>

      {/* Debt Attack */}
      <Card className="card-elegant border-l-4 border-l-orange-500 bg-gradient-to-br from-orange-50 to-white">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-base font-semibold text-orange-900">
              <CreditCard className="h-5 w-5 text-orange-600" />
              Ataque a Deudas
            </CardTitle>
            <span className="text-xs bg-orange-500 text-white px-2 py-1 rounded-full font-semibold">
              30%
            </span>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold text-orange-600">{formatCurrency(results.debts)}</p>
          <p className="text-xs text-orange-800 mt-2 font-medium">
            ⚠️ Prioridad: Pagar y reducir deudas activas
          </p>
        </CardContent>
      </Card>

      {/* Investment/Seed */}
      <Card className="card-elegant border-l-4 border-l-green-600 bg-gradient-to-br from-green-50 to-white">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-base font-semibold text-green-900">
              <Sprout className="h-5 w-5 text-green-600" />
              Semilla / Inversión
            </CardTitle>
            <span className="text-xs bg-green-600 text-white px-2 py-1 rounded-full font-semibold">
              10%
            </span>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold text-green-600">{formatCurrency(results.investment)}</p>
          <p className="text-xs text-green-800 mt-2 font-medium">
            🌱 Para ahorro e inversiones a futuro
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default PersonalResults;
