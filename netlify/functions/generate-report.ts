import { Handler } from '@netlify/functions';
import { analyzeBusinessProfile } from '../../src/api/agents/business-analyzer';
import { developStrategy } from '../../src/api/agents/strategy-developer';
import { formatReport } from '../../src/api/agents/report-formatter';
import { generatePDF } from '../../src/api/utils/pdf-generator';

export const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: 'Method Not Allowed'
    };
  }

  try {
    const data = JSON.parse(event.body || '{}');

    // Step 1: Business Analysis
    const businessAnalysis = await analyzeBusinessProfile(data);
    
    // Step 2: Strategy Development
    const strategy = await developStrategy(data, businessAnalysis);
    
    // Step 3: Report Formatting
    const report = await formatReport(data, businessAnalysis, strategy);
    
    // Step 4: Generate PDF
    const pdfBuffer = await generatePDF(report);
    
    return {
      statusCode: 200,
      body: JSON.stringify({
        businessAnalysis,
        strategy,
        report,
        pdf: pdfBuffer.toString('base64')
      })
    };
  } catch (error) {
    console.error('Error generating report:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
}