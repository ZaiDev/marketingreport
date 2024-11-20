import React, { useState } from 'react';
import { FormProgress } from './FormProgress';
import { CurrencyInput } from './CurrencyInput';
import { SearchableDropdown } from './SearchableDropdown';
import { Report } from './Report';

const COMPANY_TYPES = ['B2B', 'B2C', 'D2C', 'SaaS', 'Service-based', 'E-commerce'];
const CUSTOMER_SIZES = ['Small Business', 'Mid-Market', 'Enterprise'];
const INDUSTRIES = [
  'Technology',
  'Healthcare',
  'Finance',
  'Manufacturing',
  'Retail',
  'Education',
  'Professional Services',
  'Real Estate',
  'Entertainment',
  'Transportation'
];
const TIMELINES = ['3 months', '6 months', '12 months'];
const MAIN_GOALS = ['Awareness', 'Conversion', 'Retention'];
const SUB_GOALS = {
  'Awareness': ['Brand Recognition', 'Market Presence', 'Thought Leadership'],
  'Conversion': ['Lead Generation', 'Sales Increase', 'Customer Acquisition'],
  'Retention': ['Customer Loyalty', 'Repeat Business', 'Referral Growth']
};

export function MarketingForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [showReport, setShowReport] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [reportData, setReportData] = useState<any>(null);
  const [formData, setFormData] = useState({
    companyType: '',
    industry: '',
    annualRevenue: '',
    avgDealSize: '',
    targetCustomer: '',
    customerSize: '',
    customerIndustry: '',
    marketingBudget: '',
    timeline: '',
    mainGoal: '',
    subGoal: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setCurrentStep(1);

    try {
      // Start business analysis
      const response = await fetch('/.netlify/functions/generate-report', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to generate report');
      }

      const data = await response.json();
      
      // Update progress as each step completes
      setCurrentStep(2); // Strategy development
      
      // Short delay to show the final progress step
      setTimeout(() => {
        setCurrentStep(3);
        setReportData(data);
        setShowReport(true);
      }, 1000);

    } catch (error) {
      console.error('Error generating report:', error);
      setError('Failed to generate report. Please try again.');
      setCurrentStep(0);
    }
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full">
          <h2 className="text-red-600 text-xl font-semibold mb-4">Error</h2>
          <p className="text-gray-700 mb-6">{error}</p>
          <button
            onClick={() => setError(null)}
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (showReport && reportData) {
    return <Report data={reportData} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      {currentStep > 0 ? (
        <FormProgress currentStep={currentStep} />
      ) : (
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Marketing Strategy Audit</h1>
            <p className="mt-2 text-lg text-gray-600">Get your custom marketing strategy analysis</p>
          </div>
          
          <form onSubmit={handleSubmit} className="bg-white shadow-xl rounded-2xl p-8">
            {/* Company Information Section */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Company Information</h2>
              <div className="space-y-4">
                <SearchableDropdown
                  label="Company Type"
                  options={COMPANY_TYPES}
                  value={formData.companyType}
                  onChange={(value) => setFormData({ ...formData, companyType: value })}
                  required
                />
                
                <SearchableDropdown
                  label="Industry/Vertical"
                  options={INDUSTRIES}
                  value={formData.industry}
                  onChange={(value) => setFormData({ ...formData, industry: value })}
                  required
                />
                
                <CurrencyInput
                  label="Annual Revenue"
                  value={formData.annualRevenue}
                  onChange={(value) => setFormData({ ...formData, annualRevenue: value })}
                  required
                />
                
                <CurrencyInput
                  label="Average Deal Size"
                  value={formData.avgDealSize}
                  onChange={(value) => setFormData({ ...formData, avgDealSize: value })}
                  required
                />
              </div>
            </div>

            {/* Customer Profile Section */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Customer Profile</h2>
              <div className="space-y-4">
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Target Customer Description
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <textarea
                    value={formData.targetCustomer}
                    onChange={(e) => setFormData({ ...formData, targetCustomer: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    rows={4}
                    required
                  />
                </div>

                <SearchableDropdown
                  label="Customer Business Size"
                  options={CUSTOMER_SIZES}
                  value={formData.customerSize}
                  onChange={(value) => setFormData({ ...formData, customerSize: value })}
                  required
                />

                <SearchableDropdown
                  label="Customer Industry"
                  options={INDUSTRIES}
                  value={formData.customerIndustry}
                  onChange={(value) => setFormData({ ...formData, customerIndustry: value })}
                  required
                />
              </div>
            </div>

            {/* Marketing Goals Section */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Marketing Goals</h2>
              <div className="space-y-4">
                <CurrencyInput
                  label="Monthly Marketing Budget"
                  value={formData.marketingBudget}
                  onChange={(value) => setFormData({ ...formData, marketingBudget: value })}
                  required
                />

                <SearchableDropdown
                  label="Project Timeline"
                  options={TIMELINES}
                  value={formData.timeline}
                  onChange={(value) => setFormData({ ...formData, timeline: value })}
                  required
                />

                <SearchableDropdown
                  label="Main Goal"
                  options={MAIN_GOALS}
                  value={formData.mainGoal}
                  onChange={(value) => setFormData({ ...formData, mainGoal: value, subGoal: '' })}
                  required
                />

                {formData.mainGoal && (
                  <SearchableDropdown
                    label="Specific Focus Area"
                    options={SUB_GOALS[formData.mainGoal as keyof typeof SUB_GOALS]}
                    value={formData.subGoal}
                    onChange={(value) => setFormData({ ...formData, subGoal: value })}
                    required
                  />
                )}
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
              >
                Generate Marketing Strategy
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}