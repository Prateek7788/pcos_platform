import React, { useState } from 'react';
import { Brain, AlertTriangle, CheckCircle, Info } from 'lucide-react';

interface AssessmentData {
  age: number;
  bmi: number;
  irregularPeriods: boolean;
  acne: boolean;
  excessHairGrowth: boolean;
  weightGain: boolean;
  hairLoss: boolean;
  darkSkinPatches: boolean;
  familyHistory: boolean;
  insulinResistance: boolean;
}

interface Result {
  riskLevel: 'Low' | 'Moderate' | 'High';
  score: number;
  recommendations: string[];
  nextSteps: string[];
}

const PredictionPage: React.FC = () => {
  const [assessmentData, setAssessmentData] = useState<AssessmentData>({
    age: 25,
    bmi: 22,
    irregularPeriods: false,
    acne: false,
    excessHairGrowth: false,
    weightGain: false,
    hairLoss: false,
    darkSkinPatches: false,
    familyHistory: false,
    insulinResistance: false
  });

  const [result, setResult] = useState<Result | null>(null);
  const [showResult, setShowResult] = useState(false);

  const calculateRisk = (): Result => {
    let score = 0;
    
    // Age factor (peak PCOS diagnosis age 20-30)
    if (assessmentData.age >= 18 && assessmentData.age <= 35) {
      score += 1;
    }
    
    // BMI factor
    if (assessmentData.bmi >= 25) {
      score += 2;
    } else if (assessmentData.bmi >= 30) {
      score += 3;
    }
    
    // Symptom scoring
    const symptoms = [
      'irregularPeriods',
      'acne',
      'excessHairGrowth',
      'weightGain',
      'hairLoss',
      'darkSkinPatches',
      'familyHistory',
      'insulinResistance'
    ] as const;
    
    symptoms.forEach(symptom => {
      if (assessmentData[symptom]) {
        // Weight certain symptoms more heavily
        if (symptom === 'irregularPeriods' || symptom === 'excessHairGrowth') {
          score += 3;
        } else if (symptom === 'familyHistory' || symptom === 'insulinResistance') {
          score += 2;
        } else {
          score += 1;
        }
      }
    });

    let riskLevel: 'Low' | 'Moderate' | 'High';
    let recommendations: string[];
    let nextSteps: string[];

    if (score <= 3) {
      riskLevel = 'Low';
      recommendations = [
        'Maintain a healthy lifestyle with regular exercise',
        'Follow a balanced diet rich in whole foods',
        'Monitor your menstrual cycle regularly',
        'Stay aware of PCOS symptoms for early detection'
      ];
      nextSteps = [
        'Continue with regular health check-ups',
        'Maintain current healthy habits',
        'Consider annual gynecological exams'
      ];
    } else if (score <= 7) {
      riskLevel = 'Moderate';
      recommendations = [
        'Schedule a consultation with a healthcare provider',
        'Consider comprehensive hormonal testing',
        'Adopt anti-inflammatory diet patterns',
        'Incorporate regular physical activity into your routine',
        'Monitor symptoms and track menstrual cycles'
      ];
      nextSteps = [
        'Book appointment with gynecologist or endocrinologist',
        'Prepare symptom history for your doctor visit',
        'Consider blood work for hormonal evaluation'
      ];
    } else {
      riskLevel = 'High';
      recommendations = [
        'Seek immediate medical evaluation from a specialist',
        'Request comprehensive PCOS testing panel',
        'Begin lifestyle interventions under medical guidance',
        'Consider working with a registered dietitian',
        'Explore stress management techniques'
      ];
      nextSteps = [
        'Schedule urgent appointment with healthcare provider',
        'Request referral to reproductive endocrinologist',
        'Begin documenting all symptoms and cycle patterns',
        'Consider support groups or counseling'
      ];
    }

    return { riskLevel, score, recommendations, nextSteps };
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const calculatedResult = calculateRisk();
    setResult(calculatedResult);
    setShowResult(true);
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'Low': return 'text-green-600 bg-green-100';
      case 'Moderate': return 'text-yellow-600 bg-yellow-100';
      case 'High': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getRiskIcon = (risk: string) => {
    switch (risk) {
      case 'Low': return <CheckCircle className="h-8 w-8 text-green-600" />;
      case 'Moderate': return <Info className="h-8 w-8 text-yellow-600" />;
      case 'High': return <AlertTriangle className="h-8 w-8 text-red-600" />;
      default: return <Info className="h-8 w-8 text-gray-600" />;
    }
  };

  if (showResult && result) {
    return (
      <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Assessment Results</h1>
          </div>

          {/* Risk Level Card */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <div className="text-center">
              <div className="flex justify-center mb-4">
                {getRiskIcon(result.riskLevel)}
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Your PCOS Risk Level
              </h2>
              <div className={`inline-block px-6 py-3 rounded-full text-xl font-bold ${getRiskColor(result.riskLevel)}`}>
                {result.riskLevel} Risk
              </div>
              <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
                Based on your responses, this assessment suggests a {result.riskLevel.toLowerCase()} likelihood of PCOS. 
                Remember, this is not a medical diagnosis and should not replace professional medical evaluation.
              </p>
            </div>
          </div>

          {/* Recommendations */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Recommendations</h3>
              <ul className="space-y-3">
                {result.recommendations.map((rec, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <span className="text-purple-500 mt-1">•</span>
                    <span className="text-gray-700">{rec}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Next Steps</h3>
              <ul className="space-y-3">
                {result.nextSteps.map((step, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <span className="text-blue-500 mt-1">•</span>
                    <span className="text-gray-700">{step}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <button
              onClick={() => setShowResult(false)}
              className="bg-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
            >
              Take Assessment Again
            </button>
            <button
              onClick={() => window.print()}
              className="border border-purple-600 text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-purple-50 transition-colors"
            >
              Print Results
            </button>
          </div>

          {/* Important Disclaimer */}
          <div className="mt-8 bg-red-50 border border-red-200 rounded-xl p-6">
            <div className="flex items-center mb-3">
              <AlertTriangle className="h-6 w-6 text-red-600 mr-2" />
              <h3 className="text-lg font-semibold text-red-800">Important Medical Disclaimer</h3>
            </div>
            <p className="text-red-700">
              This assessment is for educational purposes only and is not a substitute for professional medical advice, 
              diagnosis, or treatment. Only a qualified healthcare provider can diagnose PCOS through proper medical 
              evaluation, including physical examination and laboratory tests. If you have concerns about PCOS or 
              related symptoms, please consult with a healthcare professional immediately.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="bg-purple-100 p-4 rounded-full">
              <Brain className="h-12 w-12 text-purple-600" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            PCOS Risk Assessment
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Complete this assessment to understand your potential risk factors for PCOS. 
            This tool is for educational purposes and cannot replace professional medical evaluation.
          </p>
        </div>

        {/* Assessment Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-8">
          <div className="space-y-8">
            {/* Basic Information */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">Basic Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Age
                  </label>
                  <input
                    type="number"
                    min="13"
                    max="60"
                    value={assessmentData.age}
                    onChange={(e) => setAssessmentData({
                      ...assessmentData,
                      age: parseInt(e.target.value)
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    BMI (Body Mass Index)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    min="15"
                    max="50"
                    value={assessmentData.bmi}
                    onChange={(e) => setAssessmentData({
                      ...assessmentData,
                      bmi: parseFloat(e.target.value)
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Calculate: weight (kg) ÷ height (m)²
                  </p>
                </div>
              </div>
            </div>

            {/* Symptoms */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">Symptoms & Health History</h2>
              <div className="space-y-4">
                {([
                  { key: 'irregularPeriods', label: 'Do you have irregular or missing periods?', description: 'Cycles longer than 35 days or fewer than 8 periods per year' },
                  { key: 'acne', label: 'Do you have persistent acne?', description: 'Especially around jawline, chin, or upper neck' },
                  { key: 'excessHairGrowth', label: 'Do you have excess hair growth?', description: 'On face, chest, back, or other areas (hirsutism)' },
                  { key: 'weightGain', label: 'Do you have difficulty maintaining weight?', description: 'Unexplained weight gain or difficulty losing weight' },
                  { key: 'hairLoss', label: 'Do you experience hair thinning or loss?', description: 'Male-pattern baldness or thinning on crown' },
                  { key: 'darkSkinPatches', label: 'Do you have dark skin patches?', description: 'Dark, velvety patches on neck, armpits, or groin (acanthosis nigricans)' },
                  { key: 'familyHistory', label: 'Do you have a family history of PCOS?', description: 'Mother, sister, or other female relatives with PCOS' },
                  { key: 'insulinResistance', label: 'Do you have signs of insulin resistance?', description: 'Diabetes, pre-diabetes, or difficulty with blood sugar control' }
                ] as const).map((symptom) => (
                  <div key={symptom.key} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start space-x-3">
                      <input
                        type="checkbox"
                        id={symptom.key}
                        checked={assessmentData[symptom.key]}
                        onChange={(e) => setAssessmentData({
                          ...assessmentData,
                          [symptom.key]: e.target.checked
                        })}
                        className="mt-1 h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                      />
                      <div className="flex-1">
                        <label htmlFor={symptom.key} className="font-medium text-gray-900 cursor-pointer">
                          {symptom.label}
                        </label>
                        <p className="text-sm text-gray-600 mt-1">{symptom.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-lg text-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-colors"
              >
                Get My Assessment Results
              </button>
            </div>
          </div>
        </form>

        {/* Disclaimer */}
        <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-xl p-6">
          <div className="flex items-center mb-3">
            <AlertTriangle className="h-5 w-5 text-yellow-600 mr-2" />
            <h3 className="text-lg font-semibold text-yellow-800">Before You Begin</h3>
          </div>
          <p className="text-yellow-700">
            This assessment is a screening tool and cannot diagnose PCOS. Only a qualified healthcare provider 
            can provide an accurate diagnosis through proper medical evaluation. If you have concerns about 
            your symptoms, please consult with a healthcare professional regardless of your assessment results.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PredictionPage;