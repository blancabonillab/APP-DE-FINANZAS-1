import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trash2, CreditCard, DollarSign, Building2, User, Download, Upload, Info } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
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

  const handleExportCSV = () => {
    if (records.length === 0) {
      toast.error('No hay datos para exportar');
      return;
    }

    // CSV Header
    let csv = 'Fecha,Hora,Tipo,Monto Total,Transferencia Personal,Deudas,Ahorros\n';

    // Add records
    records.forEach(record => {
      const date = new Date(record.date);
      const dateStr = date.toLocaleDateString('es-ES');
      const timeStr = date.toLocaleTimeString('es-ES');
      const tipo = record.type === 'business' ? 'Negocio' : 'Personal';

      csv += `${dateStr},${timeStr},${tipo},${record.amount},${record.personalTransfer || 0},${record.debts || 0},${record.savings || 0}\n`;
    });

    // Create download link
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);

    link.setAttribute('href', url);
    link.setAttribute('download', 'mis_finanzas_backup.csv');
    link.style.visibility = 'hidden';

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast.success('✅ Datos exportados correctamente');
  };

  const handleImportCSV = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.csv';

    input.onchange = async (e) => {
      const file = e.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const csv = event.target.result;
          const lines = csv.split('\n');

          // Skip header
          const dataLines = lines.slice(1).filter(line => line.trim());

          if (dataLines.length === 0) {
            toast.error('El archivo CSV está vacío');
            return;
          }

          const newRecords = [];

          dataLines.forEach(line => {
            const parts = line.split(',');
            if (parts.length >= 7) {
              const [dateStr, timeStr, tipo, amount, personalTransfer, debts, savings] = parts;

              // Parse date
              const [day, month, year] = dateStr.trim().split('/');
              const [hours, minutes, seconds] = timeStr.trim().split(':');
              const date = new Date(year, month - 1, day, hours, minutes, seconds || 0);

              newRecords.push({
                date: date.toISOString(),
                type: tipo.trim() === 'Negocio' ? 'business' : 'personal',
                amount: parseFloat(amount),
                personalTransfer: parseFloat(personalTransfer) || 0,
                debts: parseFloat(debts) || 0,
                savings: parseFloat(savings) || 0
              });
            }
          });

          if (newRecords.length > 0) {
            // Ask if they want to replace or merge
            const replace = window.confirm(
              `Se encontraron ${newRecords.length} registros.\n\n` +
              `¿Deseas REEMPLAZAR todos tus datos actuales?\n\n` +
              `- OK = Reemplazar todo\n` +
              `- Cancelar = Agregar a los datos existentes`
            );

            if (replace) {
              localStorage.setItem('financialRecords', JSON.stringify(newRecords));
            } else {
              const existingRecords = JSON.parse(localStorage.getItem('financialRecords') || '[]');
              const mergedRecords = [...existingRecords, ...newRecords];
              localStorage.setItem('financialRecords', JSON.stringify(mergedRecords));
            }

            loadData();
            toast.success(`✅ ${newRecords.length} registros importados correctamente`);
          } else {
            toast.error('No se pudieron leer los datos del archivo');
          }
        } catch (error) {
          console.error('Error importando CSV:', error);
          toast.error('Error al importar el archivo. Verifica que sea un CSV válido.');
        }
      };

      reader.readAsText(file);
    };

    input.click();
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
              {records.slice(-10).reverse().map((record, displayIndex) => {
                // Calculate the actual index in the original array
                const actualIndex = records.length - 1 - displayIndex;
                const date = new Date(record.date);
                const dateStr = date.toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' });
                const timeStr = date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
                
                return (
                  <div key={displayIndex} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg hover:bg-muted transition-all group">
                    <div className="flex items-center gap-3 flex-1">
                      <div className={`${record.type === 'business' ? 'bg-primary' : 'bg-foreground'} text-white w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0`}>
                        {record.type === 'business' ? (
                          <Building2 className="w-6 h-6" />
                        ) : (
                          <User className="w-6 h-6" />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-foreground">{record.type === 'business' ? 'Negocio' : 'Personal'}</p>
                        <p className="text-xs text-muted-foreground">{dateStr} • {timeStr}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <p className="font-bold text-foreground number-display">{formatCurrency(record.amount)}</p>
                        {record.debts > 0 && <p className="text-xs text-orange-600">Deuda: {formatCurrency(record.debts)}</p>}
                        {record.savings > 0 && <p className="text-xs text-green-600">Ahorro: {formatCurrency(record.savings)}</p>}
                      </div>
                      <Button
                        onClick={() => handleDeleteRecord(actualIndex)}
                        variant="ghost"
                        size="sm"
                        className="opacity-0 group-hover:opacity-100 transition-opacity text-destructive hover:text-destructive hover:bg-destructive/10"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Backup Section */}
      <Card className="card-elegant">
        <CardHeader>
          <CardTitle className="text-lg font-bold flex items-center gap-2">
            <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
            </svg>
            Respaldo de Datos
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Exporta tus datos para hacer respaldo o transferirlos a otro dispositivo
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              onClick={handleExportCSV}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white"
              disabled={records.length === 0}
            >
              <Download className="w-4 h-4 mr-2" />
              Exportar a Excel (CSV)
            </Button>
            <Button
              onClick={handleImportCSV}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
            >
              <Upload className="w-4 h-4 mr-2" />
              Importar Respaldo
            </Button>
          </div>

          <Alert className="border-blue-200 bg-blue-50/50">
            <Info className="h-4 w-4 text-blue-600" />
            <AlertDescription className="text-sm text-blue-900">
              <strong>💡 Consejo:</strong> Exporta tus datos regularmente para no perderlos si borras el caché del navegador.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </div>
  );
};

export default Progress;
