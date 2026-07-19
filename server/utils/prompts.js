const crowdPrediction = (gateData, historicalData) => `
Analyze the current crowd data and historical patterns to predict crowd levels for the next 30, 60, and 90 minutes.
Current Gate Data: ${JSON.stringify(gateData)}
Historical Data: ${JSON.stringify(historicalData)}

Return a JSON object with this exact structure:
{
  "predictions": [
    { "gate": "Gate Name", "current": 1000, "predicted_30min": 1200, "predicted_60min": 1500 }
  ],
  "actions": ["Recommended action 1", "Recommended action 2"]
}
`;

const announcementGeneration = (context, language, category) => `
Generate a professional stadium announcement based on the following context.
Context: ${context}
Target Language: ${language}
Category: ${category}

The announcement should be clear, authoritative, and polite. 
Return a JSON object with this exact structure:
{
  "title": "Brief title of the announcement",
  "content": "The full announcement text in the requested language",
  "language": "${language}"
}
`;

const chatAssistant = (userMessage, stadiumContext) => `
You are the StadiumAI Fan Assistant for MetLife Stadium.
Stadium Layout:
- Gates A1-A4 (North), B1-B4 (East), C1-C4 (South)
- Food courts are in North and South zones
- Medical stations are near Gate A1 and Gate C3
- Metro access is at East entrance
- Parking is at West Lot

Capabilities: Navigation, Food search, Accessibility, Emergency, Lost & Found.
Be friendly, concise, and helpful. Use markdown formatting.

Current Context: ${JSON.stringify(stadiumContext)}

User Message: ${userMessage}
`;

const incidentSummary = (incidents) => `
Summarize the following active incidents, assess overall severity, and recommend actions for stadium management.
Incidents: ${JSON.stringify(incidents)}

Return a JSON object with this exact structure:
{
  "overall_severity": "low/medium/high/critical",
  "summary": "Brief summary of current situation",
  "recommended_actions": ["Action 1", "Action 2"]
}
`;

const translation = (text, targetLanguage) => `
Translate the following text to ${targetLanguage}. Maintain the original tone and meaning.
Text: ${text}
`;

const accessibilityGuidance = (userNeeds, destination) => `
Provide accessibility navigation guidance for a stadium guest.
Guest Needs: ${userNeeds}
Destination: ${destination}

Include information about elevator locations, ramp access, accessible restrooms, and service animal areas as relevant.
`;

const transportRecommendation = (currentLocation, destination, time) => `
Recommend the best transport option based on current conditions.
Current Location: ${currentLocation}
Destination: ${destination}
Time: ${time}
`;

const volunteerDeployment = (crowdData, incidents, currentDeployment) => `
Suggest optimal volunteer deployments based on current crowd density and active incidents.
Crowd Data: ${JSON.stringify(crowdData)}
Incidents: ${JSON.stringify(incidents)}
Current Deployment: ${JSON.stringify(currentDeployment)}

Return a JSON object with this structure:
{
  "redeployments": [
    { "volunteer_id": 1, "new_zone": "North", "reason": "Reason for move" }
  ]
}
`;

const operationalReport = (operationalData) => `
Generate a comprehensive operational report based on the following data.
Data: ${JSON.stringify(operationalData)}

Return a JSON object with this structure:
{
  "title": "Report Title",
  "metrics": { "key": "value" },
  "analysis": "Detailed analysis text",
  "recommendations": ["Rec 1", "Rec 2"]
}
`;

const sustainabilityInsights = (wasteData, waterData, crowdSize) => `
Analyze sustainability metrics and provide improvement recommendations.
Waste Data: ${JSON.stringify(wasteData)}
Water Data: ${JSON.stringify(waterData)}
Crowd Size: ${crowdSize}

Return a JSON object with this structure:
{
  "analysis": "Analysis text",
  "efficiency_score": 85,
  "recommendations": ["Rec 1", "Rec 2"]
}
`;

module.exports = {
  crowdPrediction,
  announcementGeneration,
  chatAssistant,
  incidentSummary,
  translation,
  accessibilityGuidance,
  transportRecommendation,
  volunteerDeployment,
  operationalReport,
  sustainabilityInsights
};
