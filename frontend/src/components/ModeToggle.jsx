import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Building2, User } from 'lucide-react';

export const ModeToggle = ({ mode, onModeChange }) => {
  return (
    <Card className="card-elegant mb-6 overflow-hidden">
      <CardContent className="p-2">
        <div className="flex items-center justify-center gap-2">
          <button
            onClick={() => onModeChange('business')}
            className={`flex-1 flex items-center justify-center gap-2 px-6 py-4 rounded-lg font-semibold text-base transition-all duration-300 ${
              mode === 'business'
                ? 'bg-primary text-primary-foreground shadow-lg scale-105'
                : 'bg-transparent text-muted-foreground hover:bg-muted'
            }`}
          >
            <Building2 className="h-5 w-5" />
            <span className="hidden sm:inline">Negocio</span>
            <span className="sm:hidden">🏢</span>
          </button>
          
          <div className="h-10 w-px bg-border" />
          
          <button
            onClick={() => onModeChange('personal')}
            className={`flex-1 flex items-center justify-center gap-2 px-6 py-4 rounded-lg font-semibold text-base transition-all duration-300 ${
              mode === 'personal'
                ? 'bg-foreground text-background shadow-lg scale-105'
                : 'bg-transparent text-muted-foreground hover:bg-muted'
            }`}
          >
            <User className="h-5 w-5" />
            <span className="hidden sm:inline">Personal</span>
            <span className="sm:hidden">👤</span>
          </button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ModeToggle;
