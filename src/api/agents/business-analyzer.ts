import { OpenAI } from 'openai';
import { z } from 'zod';

const BusinessAnalysisSchema = z.object({
  market_position: z.object({
    industry_standing: z.string(),
    market_tier: z.string(),
    penetration_rate: z.string(),
    key_differentiators: z.array(z.string())
  }),
  business_model: z.object({
    sales_cycle_length: z.string(),
    revenue_patterns: z.array(z.string()),
    acquisition_channels: z.array(z.string())
  }),
  competitive_analysis: z.object({
    main_competitors: z.array(z.string()),
    competitive_advantages: z.array(z.string()),
    market_gaps: z.array(z.string())
  }),
  growth_assessment: z.object({
    tam_size: z.string(),
    expansion_opportunities: z.array(z.string()),
    scaling_factors: z.array(z.string())
  })
});

export type BusinessAnalysis = z.infer<typeof BusinessAnalysisSchema>;

const formatBusinessAnalyzerPrompt = (data: any) => `
You are an expert business analyst with extensive experience in market research and strategic planning. Analyze the following business profile with exceptional detail and strategic insight:

Company Type: ${data.companyType}
Industry/Vertical: ${data.industry}
Annual Revenue: ${data.annualRevenue}
Average Deal Size: ${data.avgDealSize}
Target Customer Description: ${data.targetCustomer}

Provide a comprehensive analysis following these exact steps:

1. Market Position Analysis:
   - Evaluate the company's position within their industry vertical
   - Identify the market tier (enterprise, mid-market, SMB) based on deal size
   - Assess market penetration potential based on revenue

2. Business Model Evaluation:
   - Analyze sales cycle based on deal size and industry
   - Identify revenue patterns and growth opportunities
   - Evaluate customer acquisition channels

3. Competitive Landscape:
   - Determine likely competitors based on industry and company size
   - Identify potential competitive advantages
   - Analyze market differentiation opportunities

4. Growth Potential:
   - Calculate total addressable market (TAM)
   - Identify expansion opportunities
   - Evaluate scaling potential

Format your response as a JSON object matching the specified schema.
`;

export async function analyzeBusinessProfile(data: any): Promise<BusinessAnalysis> {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
  });
  
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4-turbo-preview",
      messages: [
        {
          role: "system",
          content: "You are an expert business analyst specializing in marketing strategy."
        },
        {
          role: "user",
          content: formatBusinessAnalyzerPrompt(data)
        }
      ],
      temperature: 0.7,
      max_tokens: 2000
    });
    
    const result = JSON.parse(response.choices[0].message.content);
    return BusinessAnalysisSchema.parse(result);
  } catch (error) {
    console.error('Error in business analysis:', error);
    throw error;
  }
}