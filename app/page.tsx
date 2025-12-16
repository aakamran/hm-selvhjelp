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
  const riskLevel = totalScore <= 9 ? 'Svært høy risiko' : 
                    totalScore <= 12 ? 'Høy risiko' : 
                    totalScore <= 14 ? 'Moderat risiko' : 
                    'Lav risiko';

  const riskColor = totalScore <= 9 ? 'text-red-600 bg-red-50' : 
                    totalScore <= 12 ? 'text-orange-600 bg-orange-50' : 
                    totalScore <= 14 ? 'text-yellow-600 bg-yellow-50' : 
                    'text-green-600 bg-green-50';

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Braden Scale for Trykksårrisiko
          </h1>
          <p className="text-gray-600 mb-6">
            Vurdering av risiko for utvikling av trykksår
          </p>
          
          {/* Score Summary */}
          <div className={`${riskColor} rounded-lg p-4 mb-8 border-2`}>
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium opacity-80">Total poengsum</p>
                <p className="text-3xl font-bold">{totalScore} / 23</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium opacity-80">Risikonivå</p>
                <p className="text-xl font-bold">{riskLevel}</p>
              </div>
            </div>
          </div>

          {/* Subscale 1: Sensory Perception */}
          <div className="mb-8 p-6 bg-gray-50 rounded-xl border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              1. Sensorisk persepsjon
            </h2>
            <p className="text-sm text-gray-600 mb-4">
              Evne til å oppfatte og reagere betydningsfullt på trykkrelatert ubehag
            </p>
            <div className="space-y-3">
              {[
                { value: 1, label: 'Fullstendig begrenset', desc: 'Reagerer ikke (ikke våken, ikke reagerer) på smerte. Større del av kroppen har redusert følelse for smerte eller ubehag.' },
                { value: 2, label: 'Svært begrenset', desc: 'Reagerer kun på smerte. Kan ikke kommunisere ubehag unntatt ved å klage eller bevege seg. Større del av kroppen har redusert følelse for smerte eller ubehag.' },
                { value: 3, label: 'Lett begrenset', desc: 'Reagerer på verbale kommandoer, men kan ikke alltid kommunisere ubehag eller behovet for å bli flyttet. Har noen sensoriske mangler som kan begrense evnen til å føle smerte eller ubehag i én eller to ekstremiteter.' },
                { value: 4, label: 'Ingen begrensning', desc: 'Reagerer normalt på verbale kommandoer. Har ingen sensoriske mangler som begrenser evnen til å føle eller uttrykke smerte eller ubehag.' },
              ].map(option => (
                <label key={option.value} className="flex items-start p-4 bg-white rounded-lg border-2 cursor-pointer hover:border-blue-400 transition-colors">
                  <input
                    type="radio"
                    name="sensoryPerception"
                    value={option.value}
                    checked={scores.sensoryPerception === option.value}
                    onChange={() => updateScore('sensoryPerception', option.value)}
                    className="mt-1 mr-4 w-5 h-5 text-blue-600"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-gray-900">{option.value} poeng:</span>
                      <span className="font-medium text-gray-800">{option.label}</span>
                    </div>
                    <p className="text-sm text-gray-600">{option.desc}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Subscale 2: Moisture */}
          <div className="mb-8 p-6 bg-gray-50 rounded-xl border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              2. Fuktighet
            </h2>
            <p className="text-sm text-gray-600 mb-4">
              Graden som huden er eksponert for fuktighet
            </p>
            <div className="space-y-3">
              {[
                { value: 1, label: 'Konstant fuktig', desc: 'Huden er konstant fuktig av svette, urin, etc. Fuktighet oppdages hver gang pasienten flyttes eller snus.' },
                { value: 2, label: 'Ofte fuktig', desc: 'Huden er ofte, men ikke alltid fuktig. Sengetøy må skiftes minst én gang per skift.' },
                { value: 3, label: 'Av og til fuktig', desc: 'Huden er av og til fuktig, noe som krever et ekstra sengetøyskifte omtrent én gang per dag.' },
                { value: 4, label: 'Sjelden fuktig', desc: 'Huden er vanligvis tørr. Sengetøy skiftes kun ved rutinemessige intervaller.' },
              ].map(option => (
                <label key={option.value} className="flex items-start p-4 bg-white rounded-lg border-2 cursor-pointer hover:border-blue-400 transition-colors">
                  <input
                    type="radio"
                    name="moisture"
                    value={option.value}
                    checked={scores.moisture === option.value}
                    onChange={() => updateScore('moisture', option.value)}
                    className="mt-1 mr-4 w-5 h-5 text-blue-600"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-gray-900">{option.value} poeng:</span>
                      <span className="font-medium text-gray-800">{option.label}</span>
                    </div>
                    <p className="text-sm text-gray-600">{option.desc}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Subscale 3: Activity */}
          <div className="mb-8 p-6 bg-gray-50 rounded-xl border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              3. Aktivitet
            </h2>
            <p className="text-sm text-gray-600 mb-4">
              Graden av fysisk aktivitet
            </p>
            <div className="space-y-3">
              {[
                { value: 1, label: 'Fast i seng', desc: 'Begrenset til seng.' },
                { value: 2, label: 'Sitter i stol', desc: 'Aktiviteten er begrenset til å sitte. Kan ikke gå. Kan eller kan ikke være i stand til å stå selv. Hvis i rullestol, har begrenset evne til å bevege seg selv.' },
                { value: 3, label: 'Går av og til', desc: 'Går av og til i løpet av dagen, men for meget korte distanser, med eller uten hjelp. Tilbringer størstedelen av hver skift i seng eller stol.' },
                { value: 4, label: 'Går ofte', desc: 'Går utenfor rommet minst to ganger per dag og inne i rommet minst én gang hver andre time under våken tid.' },
              ].map(option => (
                <label key={option.value} className="flex items-start p-4 bg-white rounded-lg border-2 cursor-pointer hover:border-blue-400 transition-colors">
                  <input
                    type="radio"
                    name="activity"
                    value={option.value}
                    checked={scores.activity === option.value}
                    onChange={() => updateScore('activity', option.value)}
                    className="mt-1 mr-4 w-5 h-5 text-blue-600"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-gray-900">{option.value} poeng:</span>
                      <span className="font-medium text-gray-800">{option.label}</span>
                    </div>
                    <p className="text-sm text-gray-600">{option.desc}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Subscale 4: Mobility */}
          <div className="mb-8 p-6 bg-gray-50 rounded-xl border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              4. Mobilitet
            </h2>
            <p className="text-sm text-gray-600 mb-4">
              Evne til å endre og kontrollere kroppsposisjon
            </p>
            <div className="space-y-3">
              {[
                { value: 1, label: 'Fullstendig ubevegelig', desc: 'Kan ikke gjøre selv små endringer i kroppsposisjon eller ekstremiteter uten hjelp.' },
                { value: 2, label: 'Svært begrenset', desc: 'Gjør av og til små endringer i kroppsposisjon eller ekstremiteter, men ikke ofte eller betydelig nok uten hjelp.' },
                { value: 3, label: 'Lett begrenset', desc: 'Gjør ofte små endringer i kroppsposisjon eller ekstremiteter selv, men bare av og til betydelige endringer uten hjelp.' },
                { value: 4, label: 'Ingen begrensning', desc: 'Gjør betydelige og hyppige endringer i posisjon uten hjelp.' },
              ].map(option => (
                <label key={option.value} className="flex items-start p-4 bg-white rounded-lg border-2 cursor-pointer hover:border-blue-400 transition-colors">
                  <input
                    type="radio"
                    name="mobility"
                    value={option.value}
                    checked={scores.mobility === option.value}
                    onChange={() => updateScore('mobility', option.value)}
                    className="mt-1 mr-4 w-5 h-5 text-blue-600"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-gray-900">{option.value} poeng:</span>
                      <span className="font-medium text-gray-800">{option.label}</span>
                    </div>
                    <p className="text-sm text-gray-600">{option.desc}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Subscale 5: Nutrition */}
          <div className="mb-8 p-6 bg-gray-50 rounded-xl border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              5. Ernæring
            </h2>
            <p className="text-sm text-gray-600 mb-4">
              Vanlig matinntak
            </p>
            <div className="space-y-3">
              {[
                { value: 1, label: 'Svært dårlig', desc: 'Spiser aldri et fullstendig måltid. Spiser sjelden mer enn 1/3 av maten som tilbys. Spiser 2 måltider eller færre per dag med protein (kjøtt eller melkeprodukter). Tar væske dårlig. Tar ikke flytende kosttilskudd. Er fastende og/eller på klar væske eller intravenøs i mer enn 5 dager.' },
                { value: 2, label: 'Sannsynligvis utilstrekkelig', desc: 'Spiser sjelden et fullstendig måltid og spiser vanligvis kun omtrent 1/2 av maten som tilbys. Proteininntak inkluderer kun 3 måltider per dag eller mangler. Tar flytende kosttilskudd eller er på en sondeernæring eller total parenteral ernæring (TPN) som sannsynligvis gir utilstrekkelig ernæring.' },
                { value: 3, label: 'Adekvatt', desc: 'Spiser mer enn halvparten av de fleste måltider. Tar totalt 4 måltider per dag med protein (kjøtt, fisk, egg, melk, ost, yoghurt). Spiser av og til mellom måltider. Tar ikke kosttilskudd, eller er på sondeernæring eller TPN som sannsynligvis gir adekvat ernæring.' },
                { value: 4, label: 'Utmerket', desc: 'Spiser de fleste av hvert måltid. Spiser aldri mindre enn 3/4 av maten som tilbys i hvert måltid. Tar totalt 4 eller flere måltider med protein per dag. Spiser av og til mellom måltider. Tar ikke kosttilskudd.' },
              ].map(option => (
                <label key={option.value} className="flex items-start p-4 bg-white rounded-lg border-2 cursor-pointer hover:border-blue-400 transition-colors">
                  <input
                    type="radio"
                    name="nutrition"
                    value={option.value}
                    checked={scores.nutrition === option.value}
                    onChange={() => updateScore('nutrition', option.value)}
                    className="mt-1 mr-4 w-5 h-5 text-blue-600"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-gray-900">{option.value} poeng:</span>
                      <span className="font-medium text-gray-800">{option.label}</span>
                    </div>
                    <p className="text-sm text-gray-600">{option.desc}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Subscale 6: Friction and Shear */}
          <div className="mb-8 p-6 bg-gray-50 rounded-xl border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              6. Friksjon og skjær
            </h2>
            <p className="text-sm text-gray-600 mb-4">
              Friksjon og skjær
            </p>
            <div className="space-y-3">
              {[
                { value: 1, label: 'Problem', desc: 'Krever moderat til maksimal hjelp for å bevege seg. Minimum eller ingen evne til å løfte kroppen selv mot tyngdekraften. Må skli eller dras i seng eller stol. Spastisitet, kontrakturer eller rykking forårsaker nesten konstant friksjon.' },
                { value: 2, label: 'Potensielt problem', desc: 'Beveger seg tungt eller krever minimal hjelp. Under bevegelse kan huden gli noe mot sengetøy, stol, rester eller andre enheter. Relativt god kroppsposisjon, men glir av og til ned i seng eller stol.' },
                { value: 3, label: 'Ingen tilsynelatende problem', desc: 'Beveger seg i seng og stol uavhengig og har tilstrekkelig muskelstyrke til å løfte seg selv fullstendig under bevegelse. Opprettholder god kroppsposisjon i seng eller stol til enhver tid.' },
              ].map(option => (
                <label key={option.value} className="flex items-start p-4 bg-white rounded-lg border-2 cursor-pointer hover:border-blue-400 transition-colors">
                  <input
                    type="radio"
                    name="frictionShear"
                    value={option.value}
                    checked={scores.frictionShear === option.value}
                    onChange={() => updateScore('frictionShear', option.value)}
                    className="mt-1 mr-4 w-5 h-5 text-blue-600"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-gray-900">{option.value} poeng:</span>
                      <span className="font-medium text-gray-800">{option.label}</span>
                    </div>
                    <p className="text-sm text-gray-600">{option.desc}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Reset Button */}
          <div className="flex justify-center">
            <button
              onClick={() => setScores({
                sensoryPerception: null,
                moisture: null,
                activity: null,
                mobility: null,
                nutrition: null,
                frictionShear: null,
              })}
              className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg font-medium hover:bg-gray-300 transition-colors"
            >
              Nullstill skjema
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
