import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trash2, CreditCard, DollarSign, Building2, User } from 'lucide-react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { toast } from 'sonner';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export const Progress = () => {
  const [records, setRecords] = useState([]);
  const [totalDebt, setTotalDebt] = useState(0);
  const [totalSavings, setTotalSavings] = useState(0);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    const data = JSON.parse(localStorage.getItem('financialRecords') || '[]');
    setRecords(data);

    // Calculate totals
    let debt = 0;
    let savings = 0;
    data.forEach(record => {
      debt += record.debts || 0;
      savings += record.savings || 0;
    });
    setTotalDebt(debt);
    setTotalSavings(savings);
  };

  const handleClearData = () => {
    if (window.confirm('¿Estás seguro de que quieres borrar todos los datos? Esta acción no se puede deshacer.')) {
      localStorage.removeItem('financialRecords');
      loadData();
      toast.success('Todos los datos han sido borrados');
    }
  };

  const handleDeleteRecord = (index) => {
    if (window.confirm('¿Deseas eliminar este registro?')) {
      const data = JSON.parse(localStorage.getItem('financialRecords') || '[]');
      const deletedRecord = data[index];
      data.splice(index, 1);
      localStorage.setItem('financialRecords', JSON.stringify(data));
      loadData();
      toast.success('Registro eliminado correctamente');
    }
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('es-EC', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  };

  // Prepare chart data
  const getChartData = () => {
    if (records.length === 0) {
      return {
        labels: [],
        datasets: []
      };
    }

    // Aggregate by date
    const dataByDate = {};
    records.forEach(record => {
      const date = new Date(record.date).toLocaleDateString('es-ES', { day: '2-digit', month: 'short' });
      if (!dataByDate[date]) {
        dataByDate[date] = { debts: 0, savings: 0 };
      }
      dataByDate[date].debts += record.debts || 0;
      dataByDate[date].savings += record.savings || 0;
    });

    const labels = Object.keys(dataByDate);
    const debtsData = labels.map(date => dataByDate[date].debts);
    const savingsData = labels.map(date => dataByDate[date].savings);

    return {
      labels,
      datasets: [
        {
          label: 'Ataque a Deudas',
          data: debtsData,
          borderColor: 'rgb(249, 115, 22)',
          backgroundColor: 'rgba(249, 115, 22, 0.1)',
          borderWidth: 3,
          tension: 0.3,
          fill: true
        },
        {
          label: 'Semilla/Inversión',
          data: savingsData,
          borderColor: 'rgb(34, 197, 94)',
          backgroundColor: 'rgba(34, 197, 94, 0.1)',
          borderWidth: 3,
          tension: 0.3,
          fill: true
        }
      ]
    };
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          padding: 20,
          font: {
            size: 12,
            weight: 'bold'
          }
        }
      },
      tooltip: {
        mode: 'index',
        intersect: false,
        callbacks: {
          label: function(context) {
            return context.dataset.label + ': ' + formatCurrency(context.parsed.y);
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(value) {
            return '$' + value.toLocaleString('es-EC');
          }
        }
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Card className="card-gradient-warning rounded-xl shadow-lg text-white border-0">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 mb-2">
              <CreditCard className="w-6 h-6" />
              <span className="text-sm font-semibold opacity-95">Total Pagado a Deudas</span>
            </div>
            <p className="text-4xl font-bold number-display mb-1">{formatCurrency(totalDebt)}</p>
            <p className="text-xs opacity-80">Acumulado histórico</p>
          </CardContent>
        </Card>

        <Card className="card-gradient-success rounded-xl shadow-lg text-white border-0">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 mb-2">
              <DollarSign className="w-6 h-6" />
              <span className="text-sm font-semibold opacity-95">Total Ahorrado/Inversión</span>
            </div>
            <p className="text-4xl font-bold number-display mb-1">{formatCurrency(totalSavings)}</p>
            <p className="text-xs opacity-80">Acumulado histórico</p>
          </CardContent>
        </Card>
      </div>

      {/* Chart */}
      {records.length > 0 && (
        <Card className="card-elegant">
          <CardHeader>
            <CardTitle className="text-lg font-bold">Evolución Financiera</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative h-64">
              <Line data={getChartData()} options={chartOptions} />
            </div>
          </CardContent>
        </Card>
      )}

      {/* History */}
      <Card className="card-elegant">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-bold">Historial Reciente</CardTitle>
            {records.length > 0 && (
              <Button
                onClick={handleClearData}
                variant="outline"
                size="sm"
                className="text-destructive hover:text-destructive"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Borrar Datos
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          {records.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <svg className="w-16 h-16 mx-auto mb-4 text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
              <p className="text-lg font-medium">No hay registros aún</p>
              <p className="text-sm mt-2">Comienza registrando tus ingresos en la Calculadora</p>
            </div>
          ) : (
            <div className="space-y-3">
              {records.slice(-10).reverse().map((record, index) => {
                const date = new Date(record.date);
                const dateStr = date.toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' });
                const timeStr = date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
                
                return (
                  <div key={index} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg hover:bg-muted transition-all">
                    <div className="flex items-center gap-3">
                      <div className={`${record.type === 'business' ? 'bg-primary' : 'bg-foreground'} text-white w-12 h-12 rounded-lg flex items-center justify-center`}>
                        {record.type === 'business' ? (
                          <Building2 className="w-6 h-6" />
                        ) : (
                          <User className="w-6 h-6" />
                        )}
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">{record.type === 'business' ? 'Negocio' : 'Personal'}</p>
                        <p className="text-xs text-muted-foreground">{dateStr} • {timeStr}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-foreground number-display">{formatCurrency(record.amount)}</p>
                      {record.debts > 0 && <p className="text-xs text-orange-600">Deuda: {formatCurrency(record.debts)}</p>}
                      {record.savings > 0 && <p className="text-xs text-green-600">Ahorro: {formatCurrency(record.savings)}</p>}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Progress;
