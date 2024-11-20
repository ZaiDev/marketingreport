import React from 'react';
import { CheckCircle2, Circle, Loader2 } from 'lucide-react';

type Step = {
  id: number;
  label: string;
  status: 'pending' | 'active' | 'completed';
  timeEstimate: number;
};

export function FormProgress({ currentStep }: { currentStep: number }) {
  const steps: Step[] = [
    { id: 1, label: 'Analyzing Business Profile', status: 'pending', timeEstimate: 45 },
    { id: 2, label: 'Developing Strategy', status: 'pending', timeEstimate: 60 },
    { id: 3, label: 'Generating Report', status: 'pending', timeEstimate: 30 },
  ];

  // Calculate remaining time based on current step
  const getRemainingTime = (stepId: number) => {
    const currentStepData = steps.find(step => step.id === stepId);
    return currentStepData ? currentStepData.timeEstimate : 0;
  };

  return (
    <div className="w-full max-w-3xl mx-auto my-8">
      <div className="relative">
        {/* Progress Line */}
        <div className="absolute top-5 left-0 w-full h-1 bg-gray-200">
          <div 
            className="h-full bg-emerald-500 transition-all duration-500"
            style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
          />
        </div>

        {/* Steps */}
        <div className="relative flex justify-between">
          {steps.map((step) => {
            const isActive = step.id === currentStep;
            const isCompleted = step.id < currentStep;

            return (
              <div key={step.id} className="flex flex-col items-center">
                <div className="relative flex items-center justify-center w-10 h-10 rounded-full bg-white border-2 border-gray-200">
                  {isCompleted ? (
                    <CheckCircle2 className="w-8 h-8 text-emerald-500" />
                  ) : isActive ? (
                    <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
                  ) : (
                    <Circle className="w-8 h-8 text-gray-400" />
                  )}
                </div>
                <div className="mt-2 text-sm font-medium text-center">
                  <div className={`${isActive ? 'text-blue-600' : isCompleted ? 'text-emerald-600' : 'text-gray-500'}`}>
                    {step.label}
                  </div>
                  {isActive && (
                    <div className="text-xs text-gray-500">
                      ~{getRemainingTime(step.id)} seconds remaining
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}