import { OpenAI } from 'openai';
import { z } from 'zod';
import type { BusinessAnalysis } from './business-analyzer';
import type { MarketingStrategy } from './strategy-developer';

const ReportSchema = z.object({
  sections: z.array(z.object({
    title: z.string(),
    content: z.string(),
    visualizations: z.array(z.string()),
    tables: z.array(z.string())
  })),
  styling: z.object({
    fonts: z.array(z.string()),
    colors: z.array(z.string()),
    layouts: z.array(z.string())
  })
});

export type FormattedReport = z.infer<typeof ReportSchema>;

const formatReportPrompt = (
  data: any,
  businessAnalysis: BusinessAnalysis,
  strategy: MarketingStrategy
) => `
You are an expert report writer specializing in creating clear, actionable marketing plans. Transform the following strategic data into a comprehensive marketing report.

Business Analysis: ${JSON.stringify(businessAnalysis, null, 2)}
Marketing Strategy: ${JSON.stringify(strategy, null, 2)}
Client Parameters: ${JSON.stringify(data, null, 2)}

Create a detailed report following this structure:

1. Executive Summary
2. Business Analysis
3. Marketing Strategy
4. Implementation Plan
5. ROI Projections

Format your response as a structured HTML document that can be converted to PDF, following the specified schema.
`;

export async function formatReport(
  data: any,
  businessAnalysis: BusinessAnalysis,
  strategy: MarketingStrategy
): Promise<FormattedReport> {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
  });
  
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4-turbo-preview",
      messages: [
        {
          role: "system",
          content: "You are an expert report writer specializing in marketing strategy reports."
        },
        {
          role: "user",
          content: formatReportPrompt(data, businessAnalysis, strategy)
        }
      ],
      temperature: 0.7,
      max_tokens: 3000
    });
    
    const result = JSON.parse(response.choices[0].message.content);
    return ReportSchema.parse(result);
  } catch (error) {
    console.error('Error in report formatting:', error);
    throw error;
  }
}