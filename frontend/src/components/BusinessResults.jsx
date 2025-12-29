import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Building2, ArrowRight, User, TrendingUp } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

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
            <p className="text-xs text-blue-100 mt-2">
              Este monto permanece en tu negocio para operación y crecimiento
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Personal Transfer */}
      <Card className="card-elegant border-2 border-border">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base font-semibold">
            <User className="h-5 w-5" />
            Transferir a Mi Cuenta
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex items-baseline justify-between">
              <span className="text-sm text-muted-foreground">Mi Sueldo</span>
              <span className="text-xs bg-muted px-2 py-1 rounded-full text-muted-foreground">30%</span>
            </div>
            <p className="amount-display text-foreground">{formatCurrency(results.personalTransfer)}</p>
          </div>
        </CardContent>
      </Card>

      {/* Info Alert */}
      <Alert className="border-blue-200 bg-blue-50/50">
        <TrendingUp className="h-4 w-4 text-blue-600" />
        <AlertDescription className="text-sm text-blue-900">
          <strong className="font-semibold">Próximo paso:</strong> Usa el monto de {formatCurrency(results.personalTransfer)} como 
          ingreso en el <strong>Modo Personal</strong> para calcular tu distribución completa.
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default BusinessResults;
