import express from 'express';
import { analyzeBusinessProfile } from '../agents/business-analyzer';
import { developStrategy } from '../agents/strategy-developer';
import { formatReport } from '../agents/report-formatter';
import { generatePDF } from '../utils/pdf-generator';

const router = express.Router();

router.post('/generate-report', async (req, res) => {
  try {
    // Step 1: Business Analysis
    const businessAnalysis = await analyzeBusinessProfile(req.body);
    
    // Step 2: Strategy Development
    const strategy = await developStrategy(req.body, businessAnalysis);
    
    // Step 3: Report Formatting
    const report = await formatReport(req.body, businessAnalysis, strategy);
    
    // Step 4: Generate PDF
    const pdfBuffer = await generatePDF(report);
    
    res.json({
      businessAnalysis,
      strategy,
      report,
      pdf: pdfBuffer.toString('base64')
    });
  } catch (error) {
    console.error('Error generating report:', error);
    res.status(500).json({ error: error.message });
  }
});

export default router;