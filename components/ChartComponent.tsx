import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import type { ChartConfiguration } from 'chart.js/auto';

interface ChartComponentProps {
  config: ChartConfiguration;
}

const ChartComponent: React.FC<ChartComponentProps> = ({ config }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chartInstanceRef = useRef<Chart | null>(null);

  useEffect(() => {
    if (canvasRef.current) {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
      
      chartInstanceRef.current = new Chart(canvasRef.current, config);
    }

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
        chartInstanceRef.current = null;
      }
    };
  }, [config]);

  return <canvas ref={canvasRef} />;
};

export default ChartComponent;
