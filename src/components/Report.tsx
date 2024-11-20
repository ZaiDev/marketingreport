import React from 'react';
import { Download, Printer, Share2, ChevronDown } from 'lucide-react';

interface ReportProps {
  data: {
    companyType: string;
    industry: string;
    annualRevenue: string;
    avgDealSize: string;
    targetCustomer: string;
    customerSize: string;
    customerIndustry: string;
    marketingBudget: string;
    timeline: string;
    mainGoal: string;
    subGoal: string;
  };
}

export function Report({ data }: ReportProps) {
  const [expandedSections, setExpandedSections] = React.useState<string[]>(['executive-summary']);

  const toggleSection = (section: string) => {
    setExpandedSections(prev =>
      prev.includes(section)
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  const formatDate = () => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(new Date());
  };

  const generateExecutiveSummary = () => {
    return `Based on our analysis of ${data.companyType} companies in the ${data.industry} industry, 
    we've identified significant opportunities for growth through ${data.mainGoal.toLowerCase()} strategies, 
    specifically focusing on ${data.subGoal.toLowerCase()}. With a monthly budget of ${data.marketingBudget} 
    over a ${data.timeline} period, we project substantial improvements in market position and ROI.`;
  };

  const generateStrategyPoints = () => {
    const strategies = {
      'Brand Recognition': [
        'Develop comprehensive brand guidelines',
        'Launch targeted PR campaigns',
        'Increase social media presence'
      ],
      'Market Presence': [
        'Expand digital footprint',
        'Participate in industry events',
        'Develop thought leadership content'
      ],
      'Lead Generation': [
        'Implement marketing automation',
        'Create gated premium content',
        'Optimize conversion funnels'
      ],
      'Customer Loyalty': [
        'Launch customer rewards program',
        'Develop email nurture sequences',
        'Create exclusive customer content'
      ]
    }[data.subGoal] || ['Custom strategy point 1', 'Custom strategy point 2', 'Custom strategy point 3'];

    return strategies;
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl max-w-4xl mx-auto mt-8 overflow-hidden">
      {/* Report Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 px-8 py-6 text-white">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold mb-2">Marketing Strategy Report</h1>
            <p className="text-blue-100">Generated on {formatDate()}</p>
          </div>
          <div className="flex gap-3">
            <button className="p-2 hover:bg-blue-700 rounded-lg transition-colors">
              <Download className="w-5 h-5" />
            </button>
            <button className="p-2 hover:bg-blue-700 rounded-lg transition-colors">
              <Share2 className="w-5 h-5" />
            </button>
            <button className="p-2 hover:bg-blue-700 rounded-lg transition-colors">
              <Printer className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Report Content */}
      <div className="p-8 space-y-6">
        {/* Executive Summary */}
        <div className="border rounded-lg overflow-hidden">
          <button
            onClick={() => toggleSection('executive-summary')}
            className="w-full px-6 py-4 flex justify-between items-center bg-gray-50 hover:bg-gray-100 transition-colors"
          >
            <h2 className="text-lg font-semibold text-gray-900">Executive Summary</h2>
            <ChevronDown
              className={`w-5 h-5 transform transition-transform ${
                expandedSections.includes('executive-summary') ? 'rotate-180' : ''
              }`}
            />
          </button>
          {expandedSections.includes('executive-summary') && (
            <div className="px-6 py-4">
              <p className="text-gray-700 leading-relaxed">{generateExecutiveSummary()}</p>
            </div>
          )}
        </div>

        {/* Business Analysis */}
        <div className="border rounded-lg overflow-hidden">
          <button
            onClick={() => toggleSection('business-analysis')}
            className="w-full px-6 py-4 flex justify-between items-center bg-gray-50 hover:bg-gray-100 transition-colors"
          >
            <h2 className="text-lg font-semibold text-gray-900">Business Analysis</h2>
            <ChevronDown
              className={`w-5 h-5 transform transition-transform ${
                expandedSections.includes('business-analysis') ? 'rotate-180' : ''
              }`}
            />
          </button>
          {expandedSections.includes('business-analysis') && (
            <div className="px-6 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Company Profile</h3>
                  <dl className="space-y-1">
                    <div className="flex justify-between">
                      <dt className="text-gray-600">Type:</dt>
                      <dd className="font-medium">{data.companyType}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-gray-600">Industry:</dt>
                      <dd className="font-medium">{data.industry}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-gray-600">Revenue:</dt>
                      <dd className="font-medium">{data.annualRevenue}</dd>
                    </div>
                  </dl>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Target Market</h3>
                  <dl className="space-y-1">
                    <div className="flex justify-between">
                      <dt className="text-gray-600">Customer Size:</dt>
                      <dd className="font-medium">{data.customerSize}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-gray-600">Industry Focus:</dt>
                      <dd className="font-medium">{data.customerIndustry}</dd>
                    </div>
                  </dl>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Marketing Strategy */}
        <div className="border rounded-lg overflow-hidden">
          <button
            onClick={() => toggleSection('marketing-strategy')}
            className="w-full px-6 py-4 flex justify-between items-center bg-gray-50 hover:bg-gray-100 transition-colors"
          >
            <h2 className="text-lg font-semibold text-gray-900">Marketing Strategy</h2>
            <ChevronDown
              className={`w-5 h-5 transform transition-transform ${
                expandedSections.includes('marketing-strategy') ? 'rotate-180' : ''
              }`}
            />
          </button>
          {expandedSections.includes('marketing-strategy') && (
            <div className="px-6 py-4">
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Strategic Focus</h3>
                  <p className="text-gray-700">Primary Goal: {data.mainGoal}</p>
                  <p className="text-gray-700">Focus Area: {data.subGoal}</p>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Recommended Actions</h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-700">
                    {generateStrategyPoints().map((point, index) => (
                      <li key={index}>{point}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Implementation Plan */}
        <div className="border rounded-lg overflow-hidden">
          <button
            onClick={() => toggleSection('implementation')}
            className="w-full px-6 py-4 flex justify-between items-center bg-gray-50 hover:bg-gray-100 transition-colors"
          >
            <h2 className="text-lg font-semibold text-gray-900">Implementation Plan</h2>
            <ChevronDown
              className={`w-5 h-5 transform transition-transform ${
                expandedSections.includes('implementation') ? 'rotate-180' : ''
              }`}
            />
          </button>
          {expandedSections.includes('implementation') && (
            <div className="px-6 py-4">
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Timeline</h3>
                  <p className="text-gray-700">Project Duration: {data.timeline}</p>
                  <p className="text-gray-700">Monthly Budget: {data.marketingBudget}</p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-medium text-blue-900 mb-2">Key Milestones</h3>
                  <ul className="space-y-2 text-blue-800">
                    <li>Month 1: Strategy Setup and Initial Implementation</li>
                    <li>Month 2-3: Campaign Launch and Optimization</li>
                    <li>Ongoing: Monthly Performance Review and Adjustments</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ROI Projections */}
        <div className="border rounded-lg overflow-hidden">
          <button
            onClick={() => toggleSection('roi')}
            className="w-full px-6 py-4 flex justify-between items-center bg-gray-50 hover:bg-gray-100 transition-colors"
          >
            <h2 className="text-lg font-semibold text-gray-900">ROI Projections</h2>
            <ChevronDown
              className={`w-5 h-5 transform transition-transform ${
                expandedSections.includes('roi') ? 'rotate-180' : ''
              }`}
            />
          </button>
          {expandedSections.includes('roi') && (
            <div className="px-6 py-4">
              <div className="space-y-4">
                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="font-medium text-green-900 mb-2">Expected Outcomes</h3>
                  <ul className="space-y-2 text-green-800">
                    <li>Projected ROI: 2.5x - 3.5x investment</li>
                    <li>Expected Growth: 20-30% in target metrics</li>
                    <li>Market Share Increase: 5-10% in primary segments</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}