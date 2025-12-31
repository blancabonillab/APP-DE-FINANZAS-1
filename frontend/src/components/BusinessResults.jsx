import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Building2, ArrowRight, User, TrendingUp, Receipt, DollarSign, Home, CreditCard, Sprout } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';

export const BusinessResults = ({ results }) => {
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('es-EC', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  };

  return (
    <div className="space-y-4">
      {/* Total */}
      <Card className="card-elegant border-2 border-primary/20 bg-gradient-to-br from-blue-50 to-white">
        <CardContent className="pt-6">
          <div className="text-center">
            <p className="label-text text-primary mb-2">Total Ingreso</p>
            <p className="amount-display text-primary">{formatCurrency(results.total)}</p>
          </div>
        </CardContent>
      </Card>

      {/* Reinvestment */}
      <Card className="card-elegant bg-gradient-to-br from-blue-600 to-blue-500 text-white border-0">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base font-semibold">
            <Building2 className="h-5 w-5" />
            Para el Negocio
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex items-baseline justify-between">
              <span className="text-sm text-blue-100">Reinversión / Costos</span>
              <span className="text-xs bg-white/20 px-2 py-1 rounded-full">70%</span>
            </div>
            <p className="amount-display">{formatCurrency(results.reinvestment)}</p>
            <p className="text-xs text-blue-100 mt-2">Este monto permanece en tu negocio</p>
          </div>
        </CardContent>
      </Card>

      {/* Personal Transfer with Breakdown */}
      <Card className="card-elegant border-2 border-border">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base font-semibold">
            <User className="h-5 w-5" />
            Transferir a Mi Cuenta Personal
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-baseline justify-between">
                <span className="text-sm text-muted-foreground">Total a Personal</span>
                <span className="text-xs bg-muted px-2 py-1 rounded-full text-muted-foreground">30%</span>
              </div>
              <p className="text-3xl font-bold text-foreground number-display">{formatCurrency(results.personalTransfer)}</p>
            </div>

            <Separator />

            {/* Breakdown del 30% */}
            <div className="space-y-3 bg-muted/50 p-4 rounded-lg">
              <p className="text-xs font-semibold text-muted-foreground uppercase">Distribución del 30%</p>
              
              {/* Impuestos */}
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <Receipt className="h-4 w-4 text-red-500" />
                  <span>Impuestos (15%)</span>
                </div>
                <span className="font-semibold">{formatCurrency(results.taxes)}</span>
              </div>

              {/* Maser */}
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-blue-500" />
                  <span>Maser (10%)</span>
                </div>
                <span className="font-semibold">{formatCurrency(results.maser)}</span>
              </div>

              <Separator className="my-2" />

              {/* Casa */}
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <Home className="h-4 w-4 text-gray-600" />
                  <span>Casa/Vivir (60%)</span>
                </div>
                <span className="font-semibold">{formatCurrency(results.house)}</span>
              </div>

              {/* Deudas */}
              <div className="flex items-center justify-between text-sm bg-orange-50 -mx-4 px-4 py-2 rounded">
                <div className="flex items-center gap-2">
                  <CreditCard className="h-4 w-4 text-orange-600" />
                  <span className="font-semibold text-orange-900">Deudas (30%)</span>
                </div>
                <span className="font-bold text-orange-600">{formatCurrency(results.debts)}</span>
              </div>

              {/* Semilla */}
              <div className="flex items-center justify-between text-sm bg-green-50 -mx-4 px-4 py-2 rounded">
                <div className="flex items-center gap-2">
                  <Sprout className="h-4 w-4 text-green-600" />
                  <span className="font-semibold text-green-900">Semilla (10%)</span>
                </div>
                <span className="font-bold text-green-600">{formatCurrency(results.investment)}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Alert */}
      <Alert className="border-blue-200 bg-blue-50/50">
        <TrendingUp className="h-4 w-4 text-blue-600" />
        <AlertDescription className="text-sm text-blue-900">
          <strong className="font-semibold">Registro completo:</strong> Los valores de Deudas ({formatCurrency(results.debts)}) 
          y Semilla/Inversión ({formatCurrency(results.investment)}) se suman a tus totales acumulados en el dashboard de Progreso.
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default BusinessResults;
