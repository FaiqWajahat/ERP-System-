'use client'
import React from 'react';
import { ClipboardList, CheckCircle, Package, Truck, Home, Star } from 'lucide-react';

export default function OrderSteps() {
  const steps = [
    {
      id: 'ordered',
      title: 'Ordered',
      description: 'Samuel E. Clark ordered it via app',
      time: '4 days',
      icon: ClipboardList,
    },
    {
      id: 'accepted',
      title: 'Accepted',
      description: "Cafe day's accept order",
      time: '3 days',
      icon: CheckCircle,
    },
    {
      id: 'ready_to_dispatch',
      title: 'Ready to dispatch',
      description: 'Packaging done with instructions',
      time: '23 hours',
      icon: Package,
    },
    {
      id: 'on_the_way',
      title: 'On the Way',
      description: "Way's truck goes for delivery",
      time: '2 hours',
      icon: Truck,
    },
    {
      id: 'delivered',
      title: 'Delivered',
      description: 'Order put your door at snap',
      time: '24 minutes',
      icon: Home,
    },
  ];

  const [currentStatus, setCurrentStatus] = React.useState('delivered');
  const currentStepIndex = steps.findIndex(step => step.id === currentStatus);

  return (
    <div className="w-full">
      <div className="w-full bg-base-100 rounded-xl shadow-lg p-4 sm:p-6 lg:p-6">
        
        <header className="text-center py-2 px-4 bg-base-200 mb-6 sm:mb-8 rounded-sm">
          <h1 className="text-sm sm:text-md font-semibold text-base-content">Track Order</h1>
        </header>
        
        {/* Vertical Layout for Small and Large Screens */}
        <div className="flex flex-col md:hidden lg:flex">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isCompleted = index < currentStepIndex;
            const isCurrent = step.id === currentStatus;

            return (
              <div key={step.id} className="relative">
                {/* Connecting Line - Vertical */}
                {index < steps.length - 1 && (
                  <div className="absolute left-5 top-12 w-0.5 h-20 bg-base-300">
                    {isCompleted && (
                      <div className="w-full h-full bg-primary transition-all duration-500" />
                    )}
                  </div>
                )}

                {/* Step Row */}
                <div className="flex items-start gap-4 sm:gap-5 pb-6">
                  {/* Icon */}
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                      isCurrent
                        ? 'bg-primary text-primary-content shadow-md'
                        : isCompleted
                        ? 'bg-primary text-primary-content'
                        : 'bg-base-300 text-base-content'
                    }`}
                  >
                    <Icon className="w-5 h-5" strokeWidth={2} />
                  </div>

                  {/* Content */}
                  <div className="flex-1 pt-1">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3
                          className={`text-sm  font-semibold mb-1 transition-colors ${
                            isCurrent || isCompleted
                              ? 'text-base-content'
                              : 'text-base-content opacity-50'
                          }`}
                        >
                          {step.title}
                        </h3>
                        <p
                          className={`text-xs transition-colors ${
                            isCurrent || isCompleted
                              ? 'text-base-content opacity-60'
                              : 'text-base-content opacity-40'
                          }`}
                        >
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Review Section - Vertical */}
          {currentStatus === 'delivered' && (
            <div className="flex items-start gap-4 sm:gap-5 mt-2 pb-6">
              <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 bg-success bg-opacity-15 text-success">
                <Star className="w-5 h-5 text-success-content" strokeWidth={2} />
              </div>
              <div className="flex-1 pt-1">
                <button className="btn btn-sm btn-outline border-success text-success hover:bg-success hover:text-success-content hover:border-success transition-all duration-300 gap-2 px-4 rounded-md font-medium">
                  <Star className="w-4 h-4" strokeWidth={2} />
                  Review order
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Horizontal Layout for Medium Screens */}
        <div className="hidden md:flex lg:hidden flex-col">
          <div className="flex items-start justify-between relative px-4">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isCompleted = index < currentStepIndex;
              const isCurrent = step.id === currentStatus;

              return (
                <div key={step.id} className="relative flex-1 flex flex-col items-center">
                  {/* Connecting Line - Horizontal */}
                  {index < steps.length - 1 && (
                    <div className="absolute left-1/2 top-5 h-0.5 w-full bg-base-300">
                      {isCompleted && (
                        <div className="h-full bg-primary transition-all duration-500" style={{width: '100%'}} />
                      )}
                    </div>
                  )}

                  {/* Step Column */}
                  <div className="flex flex-col items-center z-10">
                    {/* Icon */}
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 mb-3 ${
                        isCurrent
                          ? 'bg-primary text-primary-content shadow-md'
                          : isCompleted
                          ? 'bg-primary text-primary-content'
                          : 'bg-base-300 text-base-content'
                      }`}
                    >
                      <Icon className="w-5 h-5" strokeWidth={2} />
                    </div>

                    {/* Content */}
                    <div className="text-center">
                      <h3
                        className={`text-xs font-semibold mb-1 transition-colors ${
                          isCurrent || isCompleted
                            ? 'text-base-content'
                            : 'text-base-content opacity-50'
                        }`}
                      >
                        {step.title}
                      </h3>
                      <p
                        className={`text-xs transition-colors ${
                          isCurrent || isCompleted
                            ? 'text-base-content opacity-60'
                            : 'text-base-content opacity-40'
                        }`}
                      >
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Review Section - Horizontal */}
          {currentStatus === 'delivered' && (
            <div className="flex items-center justify-center gap-3 mt-8">
              <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 bg-success bg-opacity-15 text-success">
                <Star className="w-5 h-5 text-success-content" strokeWidth={2} />
              </div>
              <button className="btn btn-sm btn-outline border-success text-success hover:bg-success hover:text-success-content hover:border-success transition-all duration-300 gap-2 px-4 rounded-md font-medium">
                <Star className="w-4 h-4" strokeWidth={2} />
                Review order
              </button>
            </div>
          )}
        </div>
        
      </div>
    </div>
  );
}