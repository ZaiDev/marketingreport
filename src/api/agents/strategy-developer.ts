import { OpenAI } from 'openai';
import { z } from 'zod';
import type { BusinessAnalysis } from './business-analyzer';

const StrategySchema = z.object({
  strategic_objectives: z.array(z.object({
    objective: z.string(),
    kpis: z.array(z.string()),
    target_milestones: z.array(z.string())
  })),
  budget_allocation: z.array(z.object({
    channel: z.string(),
    allocation: z.string(),
    expected_roi: z.string()
  })),
  channel_strategy: z.array(z.object({
    channel: z.string(),
    content_types: z.array(z.string()),
    metrics: z.array(z.string()),
    frequency: z.string()
  })),
  action_items: z.array(z.object({
    title: z.string(),
    description: z.string(),
    timeline: z.string(),
    resources_needed: z.array(z.string()),
    expected_outcome: z.string(),
    budget: z.string(),
    priority_level: z.string()
  }))
});

export type MarketingStrategy = z.infer<typeof StrategySchema>;

const formatStrategyPrompt = (data: any, businessAnalysis: BusinessAnalysis) => `
You are an expert marketing strategist responsible for developing comprehensive marketing plans. Using the business analysis provided and marketing parameters, create a detailed strategic marketing plan.

Business Analysis: ${JSON.stringify(businessAnalysis, null, 2)}

Marketing Parameters:
Monthly Budget: ${data.marketingBudget}
Timeline: ${data.timeline}
Main Goal: ${data.mainGoal} (${data.subGoal})
Target Customer Description: ${data.targetCustomer}

Follow these steps to develop your marketing strategy:

1. Goal Analysis:
   - Break down the main goal into specific, measurable objectives
   - Establish KPIs for each objective
   - Set milestone targets aligned with the timeline

2. Budget Allocation:
   - Divide budget across different marketing channels
   - Prioritize high-impact activities
   - Include contingency allocation

3. Channel Strategy:
   - Identify primary and secondary marketing channels
   - Specify content types for each channel
   - Define channel-specific success metrics

4. Action Plan Development:
   - Create detailed implementation steps
   - Establish timeline for each activity
   - Define resource requirements

Format your response as a JSON object matching the specified schema.
`;

export async function developStrategy(data: any, businessAnalysis: BusinessAnalysis): Promise<MarketingStrategy> {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
  });
  
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4-turbo-preview",
      messages: [
        {
          role: "system",
          content: "You are an expert marketing strategist specializing in comprehensive marketing plans."
        },
        {
          role: "user",
          content: formatStrategyPrompt(data, businessAnalysis)
        }
      ],
      temperature: 0.7,
      max_tokens: 2500
    });
    
    const result = JSON.parse(response.choices[0].message.content);
    return StrategySchema.parse(result);
  } catch (error) {
    console.error('Error in strategy development:', error);
    throw error;
  }
}