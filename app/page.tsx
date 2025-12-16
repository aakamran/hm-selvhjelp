'use client';

import { useState } from 'react';

interface BradenScore {
  sensoryPerception: number | null;
  moisture: number | null;
  activity: number | null;
  mobility: number | null;
  nutrition: number | null;
  frictionShear: number | null;
}

export default function Home() {
  const [scores, setScores] = useState<BradenScore>({
    sensoryPerception: null,
    moisture: null,
    activity: null,
    mobility: null,
    nutrition: null,
    frictionShear: null,
  });

  const updateScore = (category: keyof BradenScore, value: number) => {
    setScores(prev => ({ ...prev, [category]: value }));
  };

  const totalScore = Object.values(scores).reduce((sum, val) => sum + (val || 0), 0);
  
  // Updated risk levels to match screenshot: 19-23, 15-18, 13-14, ≤12
  const getRiskLevel = () => {
    if (totalScore <= 12) return { level: 'Meget høy risiko', range: '≤12', color: 'red' };
    if (totalScore <= 14) return { level: 'Høy risiko', range: '13-14', color: 'orange' };
    if (totalScore <= 18) return { level: 'Moderat risiko', range: '15-18', color: 'yellow' };
    return { level: 'Lav risiko', range: '19-23', color: 'green' };
  };

  const riskInfo = getRiskLevel();

  const categories = [
    {
      key: 'sensoryPerception' as keyof BradenScore,
      title: 'Sensibilitet/sanseoppfatning/evne til å oppfatte og reagere på stimuli',
      options: [
        { value: 1, label: 'Totalt redusert' },
        { value: 2, label: 'Meget redusert' },
        { value: 3, label: 'Noe redusert' },
        { value: 4, label: 'Ikke redusert' },
      ],
    },
    {
      key: 'moisture' as keyof BradenScore,
      title: 'Fuktighet',
      options: [
        { value: 1, label: 'Fuktig mesteparten av tiden' },
        { value: 2, label: 'Fuktig' },
        { value: 3, label: 'Fuktig av og til' },
        { value: 4, label: 'Sjelden fuktig' },
      ],
    },
    {
      key: 'activity' as keyof BradenScore,
      title: 'Aktivitet',
      options: [
        { value: 1, label: 'Sengeliggende' },
        { value: 2, label: 'Stolbundet' },
        { value: 3, label: 'Går av og til' },
        { value: 4, label: 'Går ofte' },
      ],
    },
    {
      key: 'mobility' as keyof BradenScore,
      title: 'Mobilitet',
      options: [
        { value: 1, label: 'Fullstendig immobil' },
        { value: 2, label: 'Meget begrenset' },
        { value: 3, label: 'Noe begrenset' },
        { value: 4, label: 'Ingen begrensninger' },
      ],
    },
    {
      key: 'nutrition' as keyof BradenScore,
      title: 'Ernæring',
      options: [
        { value: 1, label: 'Svært dårlig' },
        { value: 2, label: 'Sannsynligvis utilstrekkelig' },
        { value: 3, label: 'Tilstrekkelig' },
        { value: 4, label: 'Meget bra' },
      ],
    },
    {
      key: 'frictionShear' as keyof BradenScore,
      title: 'Friksjon og skyvekrefter (shear)',
      options: [
        { value: 1, label: 'Problem' },
        { value: 2, label: 'Potensielt problem' },
        { value: 3, label: 'Ikke noe øyensynlig problem' },
      ],
    },
  ];

  const riskExplanations = {
    green: {
      title: 'Braden-skår: 19-23 - Liten eller ingen fare',
      text: 'Liten eller ingen risiko for trykksår. Brukeren vurderes å ha god funksjon og hudstatus. Trykkavlastende pute er vanligvis ikke nødvendig, med mindre det er spesifikke kliniske hensyn, - som eksvis at sitter mange timer uten stillingsendring, hudproblematikk etc.',
    },
    yellow: {
      title: 'Braden-skår: 15-18 - Middels fare',
      text: 'Moderat risiko for trykksår. Forebyggende tiltak anbefales, inkludert trykkavlastende sittepute. Vurder daglig observasjon av hud og stillingsendring.',
    },
    orange: {
      title: 'Braden-skår: 13-14 - Høy fare',
      text: 'Høy risiko for trykksår. Brukeren har redusert evne til å beskytte huden og trenger spesifikke tiltak. En klinisk vurdert trykkavlastende pute anbefales på det sterkeste.',
    },
    red: {
      title: 'Braden-skår: ≤12 - Meget høy fare',
      text: 'Meget høy risiko for trykksår. Umiddelbare forebyggende tiltak er nødvendig. Trykkavlastende pute (og madrass) og kontinuerlig hudobservasjon bør iverksettes uten opphold. Tverrfaglig vurdering anbefales.',
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            BRADEN SKALA
          </h1>
          <p className="text-gray-600 mb-6">
            Vurdering av risiko for utvikling av trykksår
          </p>
          
          {/* Two-column layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left column: Scoring table */}
            <div className="lg:col-span-2">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-100 border-b-2 border-gray-300">
                      <th className="p-3 text-left font-semibold text-gray-900 border-r border-gray-300">Område</th>
                      <th className="p-3 text-left font-semibold text-gray-900 border-r border-gray-300">Hvordan skåre</th>
                      <th className="p-3 text-center font-semibold text-gray-900">Skår 1-4</th>
                    </tr>
                  </thead>
                  <tbody>
                    {categories.map((category, catIdx) => (
                      <tr key={category.key} className="border-b border-gray-200">
                        <td className="p-3 align-top border-r border-gray-300 font-medium text-gray-900">
                          {catIdx + 1}. {category.title}
                        </td>
                        <td className="p-3 align-top border-r border-gray-300">
                          <div className="space-y-2">
                            {category.options.map((option) => (
                              <label key={option.value} className="flex items-start cursor-pointer hover:bg-gray-50 p-2 rounded">
                                <span className="text-sm text-gray-700">
                                  {option.value}: {option.label}
                                </span>
                              </label>
                            ))}
                          </div>
                        </td>
                        <td className="p-3 align-top">
                          <div className="flex flex-col gap-2">
                            {category.options.map((option) => (
                              <label key={option.value} className="flex items-center justify-center cursor-pointer">
                                <input
                                  type="radio"
                                  name={category.key}
                                  value={option.value}
                                  checked={scores[category.key] === option.value}
                                  onChange={() => updateScore(category.key, option.value)}
                                  className="w-5 h-5 text-blue-600"
                                />
                              </label>
                            ))}
                          </div>
                        </td>
                      </tr>
                    ))}
                    <tr className="bg-white font-bold border-t-2 border-gray-400">
                      <td colSpan={2} className="p-3 border-r border-gray-300 text-gray-900">
                        TOTAL SKÅR
                      </td>
                      <td className="p-3 text-center text-xl text-gray-900">
                        {totalScore > 0 ? totalScore : '-'}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Color-coded legend */}
              <div className="mt-6 flex flex-wrap gap-4 justify-center">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-green-500 rounded"></div>
                  <span className="text-green-700 font-medium">19-23: Lav risiko</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-yellow-500 rounded"></div>
                  <span className="text-yellow-700 font-medium">15-18: Moderat risiko</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-orange-500 rounded"></div>
                  <span className="text-orange-700 font-medium">13-14: Høy risiko</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-red-500 rounded"></div>
                  <span className="text-red-700 font-medium">≤12: Meget høy risiko</span>
                </div>
              </div>
            </div>

            {/* Right column: Risk level explanations */}
            <div className="lg:col-span-1">
              <div className="sticky top-4 space-y-4">
                {/* Current risk highlight title */}
                {totalScore > 0 && (
                  <>
                    <div className="mb-4">
                      <h2 className="text-xl font-bold text-gray-900">Nåværende vurdering</h2>
                    </div>
                    {(() => {
                      const colorClasses = {
                        red: 'border-red-500 bg-red-50 text-red-900',
                        orange: 'border-orange-500 bg-orange-50 text-orange-900',
                        yellow: 'border-yellow-500 bg-yellow-50 text-yellow-900',
                        green: 'border-green-500 bg-green-50 text-green-900',
                      };
                      const textColorClasses = {
                        red: 'text-red-800',
                        orange: 'text-orange-800',
                        yellow: 'text-yellow-800',
                        green: 'text-green-800',
                      };
                      const classes = colorClasses[riskInfo.color as keyof typeof colorClasses];
                      const textClasses = textColorClasses[riskInfo.color as keyof typeof textColorClasses];
                      
                      return (
                        <div className={`p-4 border-2 rounded-lg ${classes}`}>
                          <p className={`text-lg font-bold mb-2`}>
                            {riskInfo.level} ({riskInfo.range})
                          </p>
                          <p className={`text-sm ${textClasses}`}>
                            {riskExplanations[riskInfo.color as keyof typeof riskExplanations].text}
                          </p>
                        </div>
                      );
                    })()}
                  </>
                )}

                {/* Risk level explanations title */}
                <div className="mt-8 mb-4">
                  <h2 className="text-xl font-bold text-gray-900">Risikonivåer og tiltak</h2>
                </div>

                {/* Green section */}
                <div className="p-4 bg-green-50 border-l-4 border-green-500 rounded-r-lg">
                  <h3 className="font-bold text-green-900 mb-2">{riskExplanations.green.title}</h3>
                  <p className="text-sm text-green-800">{riskExplanations.green.text}</p>
                </div>

                {/* Yellow section */}
                <div className="p-4 bg-yellow-50 border-l-4 border-yellow-500 rounded-r-lg">
                  <h3 className="font-bold text-yellow-900 mb-2">{riskExplanations.yellow.title}</h3>
                  <p className="text-sm text-yellow-800">{riskExplanations.yellow.text}</p>
                </div>

                {/* Orange section */}
                <div className="p-4 bg-orange-50 border-l-4 border-orange-500 rounded-r-lg">
                  <h3 className="font-bold text-orange-900 mb-2">{riskExplanations.orange.title}</h3>
                  <p className="text-sm text-orange-800">{riskExplanations.orange.text}</p>
                </div>

                {/* Red section */}
                <div className="p-4 bg-red-50 border-l-4 border-red-500 rounded-r-lg">
                  <h3 className="font-bold text-red-900 mb-2">{riskExplanations.red.title}</h3>
                  <p className="text-sm text-red-800">{riskExplanations.red.text}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
