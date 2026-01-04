import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const PlantStages = {
  EMPTY: { min: 0, max: 0, name: 'Inicio', message: 'Empieza a sembrar hoy' },
  SPROUT: { min: 1, max: 499, name: 'Brote', message: '¡Tu semilla está germinando!' },
  FLOWER: { min: 500, max: 1999, name: 'Floreciendo', message: '¡Tu esfuerzo está floreciendo!' },
  TREE: { min: 2000, max: 4999, name: 'Creciendo', message: '¡Tu árbol financiero crece fuerte!' },
  ABUNDANT: { min: 5000, max: Infinity, name: 'Abundancia', message: '¡Cosecha de abundancia!' }
};

const getPlantStage = (amount) => {
  if (amount === 0) return PlantStages.EMPTY;
  if (amount < 500) return PlantStages.SPROUT;
  if (amount < 2000) return PlantStages.FLOWER;
  if (amount < 5000) return PlantStages.TREE;
  return PlantStages.ABUNDANT;
};

// SVG Components for each stage
const EmptyField = () => (
  <svg viewBox="0 0 200 200" className="w-full h-full">
    {/* Ground */}
    <ellipse cx="100" cy="160" rx="80" ry="20" fill="#8B7355" opacity="0.6"/>
    <ellipse cx="100" cy="155" rx="75" ry="18" fill="#A0826D"/>
    
    {/* Seeds */}
    <circle cx="85" cy="150" r="3" fill="#F4E4C1" className="animate-pulse"/>
    <circle cx="100" cy="148" r="3" fill="#F4E4C1" className="animate-pulse" style={{animationDelay: '0.2s'}}/>
    <circle cx="115" cy="152" r="3" fill="#F4E4C1" className="animate-pulse" style={{animationDelay: '0.4s'}}/>
    
    {/* Sparkles */}
    <g className="animate-pulse">
      <circle cx="70" cy="120" r="2" fill="#FFD700" opacity="0.8"/>
      <circle cx="130" cy="125" r="2" fill="#FFD700" opacity="0.8"/>
    </g>
  </svg>
);

const SproutPlant = () => (
  <svg viewBox="0 0 200 200" className="w-full h-full">
    {/* Ground */}
    <ellipse cx="100" cy="160" rx="80" ry="20" fill="#8B7355" opacity="0.6"/>
    <ellipse cx="100" cy="155" rx="75" ry="18" fill="#A0826D"/>
    
    {/* Sprout */}
    <g className="animate-bounce-slow">
      {/* Stem */}
      <path d="M 100 155 Q 98 130, 100 110" stroke="#4CAF50" strokeWidth="4" fill="none" strokeLinecap="round"/>
      
      {/* Left leaf */}
      <ellipse cx="90" cy="130" rx="12" ry="8" fill="#66BB6A" transform="rotate(-30 90 130)"/>
      
      {/* Right leaf */}
      <ellipse cx="110" cy="125" rx="12" ry="8" fill="#66BB6A" transform="rotate(30 110 125)"/>
      
      {/* Top leaves */}
      <ellipse cx="95" cy="115" rx="10" ry="7" fill="#81C784" transform="rotate(-20 95 115)"/>
      <ellipse cx="105" cy="112" rx="10" ry="7" fill="#81C784" transform="rotate(20 105 112)"/>
    </g>
    
    {/* Sparkles */}
    <g className="animate-pulse">
      <circle cx="75" cy="110" r="2" fill="#FFD700"/>
      <circle cx="125" cy="115" r="2" fill="#FFD700"/>
      <circle cx="100" cy="95" r="2" fill="#FFD700"/>
    </g>
  </svg>
);

const FlowerPlant = () => (
  <svg viewBox="0 0 200 200" className="w-full h-full">
    {/* Ground */}
    <ellipse cx="100" cy="170" rx="85" ry="22" fill="#8B7355" opacity="0.6"/>
    <ellipse cx="100" cy="165" rx="80" ry="20" fill="#A0826D"/>
    
    {/* Stem */}
    <path d="M 100 165 Q 98 120, 100 70" stroke="#4CAF50" strokeWidth="5" fill="none" strokeLinecap="round"/>
    
    {/* Leaves */}
    <ellipse cx="85" cy="130" rx="15" ry="10" fill="#66BB6A" transform="rotate(-35 85 130)"/>
    <ellipse cx="115" cy="120" rx="15" ry="10" fill="#66BB6A" transform="rotate(35 115 120)"/>
    <ellipse cx="88" cy="100" rx="14" ry="9" fill="#81C784" transform="rotate(-30 88 100)"/>
    <ellipse cx="112" cy="95" rx="14" ry="9" fill="#81C784" transform="rotate(30 112 95)"/>
    
    {/* Flower - animated */}
    <g className="animate-flower-bloom">
      {/* Petals */}
      <ellipse cx="100" cy="55" rx="12" ry="18" fill="#FF6B9D" transform="rotate(0 100 55)"/>
      <ellipse cx="100" cy="55" rx="12" ry="18" fill="#FF8FAB" transform="rotate(72 100 55)"/>
      <ellipse cx="100" cy="55" rx="12" ry="18" fill="#FFB3C1" transform="rotate(144 100 55)"/>
      <ellipse cx="100" cy="55" rx="12" ry="18" fill="#FF6B9D" transform="rotate(216 100 55)"/>
      <ellipse cx="100" cy="55" rx="12" ry="18" fill="#FF8FAB" transform="rotate(288 100 55)"/>
      
      {/* Center */}
      <circle cx="100" cy="55" r="8" fill="#FFD700"/>
      <circle cx="100" cy="55" r="5" fill="#FFA000"/>
    </g>
    
    {/* Sparkles */}
    <g className="animate-pulse">
      <circle cx="70" cy="80" r="2.5" fill="#FFD700"/>
      <circle cx="130" cy="75" r="2.5" fill="#FFD700"/>
      <circle cx="85" cy="50" r="2" fill="#FFD700"/>
      <circle cx="115" cy="45" r="2" fill="#FFD700"/>
    </g>
  </svg>
);

const TreePlant = () => (
  <svg viewBox="0 0 200 200" className="w-full h-full">
    {/* Ground */}
    <ellipse cx="100" cy="175" rx="90" ry="25" fill="#8B7355" opacity="0.6"/>
    <ellipse cx="100" cy="170" rx="85" ry="23" fill="#A0826D"/>
    
    {/* Trunk */}
    <rect x="90" y="120" width="20" height="50" fill="#8B4513" rx="3"/>
    <rect x="92" y="122" width="16" height="46" fill="#A0522D" rx="2"/>
    
    {/* Tree crown layers */}
    <g className="animate-sway">
      {/* Bottom layer */}
      <ellipse cx="100" cy="110" rx="50" ry="35" fill="#2E7D32"/>
      <ellipse cx="100" cy="105" rx="48" ry="33" fill="#388E3C"/>
      
      {/* Middle layer */}
      <ellipse cx="100" cy="85" rx="45" ry="32" fill="#43A047"/>
      <ellipse cx="100" cy="80" rx="43" ry="30" fill="#4CAF50"/>
      
      {/* Top layer */}
      <ellipse cx="100" cy="65" rx="35" ry="25" fill="#66BB6A"/>
      <ellipse cx="100" cy="60" rx="30" ry="20" fill="#81C784"/>
      
      {/* Highlight */}
      <ellipse cx="95" cy="70" rx="15" ry="12" fill="#A5D6A7" opacity="0.7"/>
    </g>
    
    {/* Sparkles */}
    <g className="animate-pulse">
      <circle cx="65" cy="90" r="3" fill="#FFD700"/>
      <circle cx="135" cy="95" r="3" fill="#FFD700"/>
      <circle cx="100" cy="50" r="2.5" fill="#FFD700"/>
      <circle cx="80" cy="70" r="2" fill="#FFD700"/>
      <circle cx="120" cy="75" r="2" fill="#FFD700"/>
    </g>
  </svg>
);

const AbundantTree = () => (
  <svg viewBox="0 0 200 200" className="w-full h-full">
    {/* Ground */}
    <ellipse cx="100" cy="180" rx="95" ry="25" fill="#8B7355" opacity="0.6"/>
    <ellipse cx="100" cy="175" rx="90" ry="23" fill="#A0826D"/>
    
    {/* Trunk */}
    <rect x="88" y="130" width="24" height="45" fill="#8B4513" rx="4"/>
    <rect x="90" y="132" width="20" height="41" fill="#A0522D" rx="3"/>
    
    {/* Tree crown - large and lush */}
    <g className="animate-sway">
      {/* Bottom layer */}
      <ellipse cx="100" cy="120" rx="60" ry="40" fill="#1B5E20"/>
      <ellipse cx="100" cy="115" rx="58" ry="38" fill="#2E7D32"/>
      
      {/* Middle layer */}
      <ellipse cx="100" cy="95" rx="55" ry="38" fill="#388E3C"/>
      <ellipse cx="100" cy="90" rx="53" ry="36" fill="#43A047"/>
      
      {/* Top layer */}
      <ellipse cx="100" cy="70" rx="45" ry="30" fill="#4CAF50"/>
      <ellipse cx="100" cy="65" rx="40" ry="25" fill="#66BB6A"/>
      
      {/* Highlight */}
      <ellipse cx="90" cy="75" rx="20" ry="15" fill="#81C784" opacity="0.7"/>
    </g>
    
    {/* Fruits - animated */}
    <g className="animate-bounce-slow">
      <circle cx="75" cy="100" r="6" fill="#FF5252"/>
      <circle cx="74" cy="99" r="3" fill="#FF8A80" opacity="0.8"/>
    </g>
    <g className="animate-bounce-slow" style={{animationDelay: '0.2s'}}>
      <circle cx="125" cy="105" r="6" fill="#FF5252"/>
      <circle cx="124" cy="104" r="3" fill="#FF8A80" opacity="0.8"/>
    </g>
    <g className="animate-bounce-slow" style={{animationDelay: '0.4s'}}>
      <circle cx="95" cy="85" r="5" fill="#FF6B6B"/>
      <circle cx="94" cy="84" r="2.5" fill="#FF8A80" opacity="0.8"/>
    </g>
    <g className="animate-bounce-slow" style={{animationDelay: '0.6s'}}>
      <circle cx="115" cy="80" r="5" fill="#FF6B6B"/>
      <circle cx="114" cy="79" r="2.5" fill="#FF8A80" opacity="0.8"/>
    </g>
    <g className="animate-bounce-slow" style={{animationDelay: '0.3s'}}>
      <circle cx="100" cy="95" r="5.5" fill="#FF5252"/>
      <circle cx="99" cy="94" r="3" fill="#FF8A80" opacity="0.8"/>
    </g>
    
    {/* Sparkles - more abundant */}
    <g className="animate-pulse">
      <circle cx="60" cy="105" r="3" fill="#FFD700"/>
      <circle cx="140" cy="110" r="3" fill="#FFD700"/>
      <circle cx="100" cy="55" r="3" fill="#FFD700"/>
      <circle cx="75" cy="75" r="2.5" fill="#FFD700"/>
      <circle cx="125" cy="70" r="2.5" fill="#FFD700"/>
      <circle cx="85" cy="90" r="2" fill="#FFD700"/>
      <circle cx="115" cy="95" r="2" fill="#FFD700"/>
    </g>
  </svg>
);

export const MiSiembra = ({ totalSavings }) => {
  const stage = getPlantStage(totalSavings);
  
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('es-EC', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  };

  const getPlantComponent = () => {
    if (totalSavings === 0) return <EmptyField />;
    if (totalSavings < 500) return <SproutPlant />;
    if (totalSavings < 2000) return <FlowerPlant />;
    if (totalSavings < 5000) return <TreePlant />;
    return <AbundantTree />;
  };

  const getBackgroundGradient = () => {
    if (totalSavings === 0) return 'from-amber-50 via-yellow-50 to-amber-100';
    if (totalSavings < 500) return 'from-green-50 via-emerald-50 to-green-100';
    if (totalSavings < 2000) return 'from-pink-50 via-rose-50 to-pink-100';
    if (totalSavings < 5000) return 'from-green-100 via-emerald-100 to-green-200';
    return 'from-green-200 via-emerald-200 to-green-300';
  };

  return (
    <Card className="card-elegant overflow-hidden">
      <CardHeader>
        <CardTitle className="text-lg font-bold flex items-center gap-2">
          <span className="text-2xl">🌱</span>
          Mi Siembra (Ahorro Total)
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className={`relative bg-gradient-to-br ${getBackgroundGradient()} rounded-2xl p-8 min-h-[400px] flex flex-col items-center justify-center transition-all duration-1000`}>
          {/* Plant illustration */}
          <div className="w-full max-w-md h-64 mb-6 plant-container">
            {getPlantComponent()}
          </div>
          
          {/* Amount */}
          <div className="text-center space-y-2 animate-fade-in">
            <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
              {stage.name}
            </p>
            <p className="text-5xl sm:text-6xl font-bold number-display text-foreground">
              {formatCurrency(totalSavings)}
            </p>
            <p className="text-base text-muted-foreground font-medium mt-4">
              {stage.message}
            </p>
          </div>
          
          {/* Progress indicator */}
          {totalSavings > 0 && (
            <div className="mt-8 w-full max-w-md">
              <div className="flex justify-between text-xs text-muted-foreground mb-2">
                <span>Etapa actual</span>
                {totalSavings < 5000 && (
                  <span>Próxima meta: {formatCurrency(stage.max + 1)}</span>
                )}
              </div>
              <div className="w-full bg-white/50 rounded-full h-3 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-green-500 to-green-600 h-full rounded-full transition-all duration-1000 ease-out"
                  style={{
                    width: totalSavings >= 5000 ? '100%' : `${((totalSavings - stage.min) / (stage.max - stage.min)) * 100}%`
                  }}
                />
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default MiSiembra;
