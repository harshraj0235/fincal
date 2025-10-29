import { NewsGuideSection } from '../components/NewsGuideTemplate';

/**
 * Converts a NewsGuideSection object to HTML string for article rendering
 */
export function convertGuideToHtml(guide: NewsGuideSection): string {
  let html = '';

  // Section 1: What's New
  html += `
    <section class="mb-12">
      <div class="flex items-start gap-3 mb-4">
        <div class="p-3 bg-blue-100 rounded-lg">
          <svg class="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          </svg>
        </div>
        <div class="flex-1">
          <h2 class="text-2xl font-bold text-neutral-900 mb-2">What's New</h2>
          <p class="text-sm text-neutral-600">Latest Update • ${new Date(guide.whatsNew.date).toLocaleDateString()}</p>
        </div>
      </div>
      <div class="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-r-lg">
        <p class="text-lg text-neutral-800 leading-relaxed">${guide.whatsNew.summary}</p>
        ${guide.whatsNew.source ? `
          <a href="${guide.whatsNew.source.url}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center mt-3 text-blue-600 hover:text-blue-800 text-sm font-medium">
            Source: ${guide.whatsNew.source.name}
          </a>
        ` : ''}
      </div>
    </section>
  `;

  // Section 2: Why It Matters
  html += `
    <section class="mb-12">
      <div class="flex items-start gap-3 mb-4">
        <div class="p-3 bg-orange-100 rounded-lg">
          <svg class="h-6 w-6 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <div>
          <h2 class="text-2xl font-bold text-neutral-900">Why It Matters</h2>
        </div>
      </div>
      <div class="prose prose-lg max-w-none">
        <p class="text-neutral-800 mb-4">${guide.whyItMatters.significance}</p>
        
        <h3 class="text-xl font-semibold text-neutral-900 mb-3">Impact Areas:</h3>
        <ul class="space-y-2 mb-4">
          ${guide.whyItMatters.impact.map(item => `
            <li class="flex items-start">
              <svg class="h-5 w-5 text-green-600 mr-2 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span class="text-neutral-700">${item}</span>
            </li>
          `).join('')}
        </ul>
        
        <h3 class="text-xl font-semibold text-neutral-900 mb-3">Who's Affected:</h3>
        <div class="flex flex-wrap gap-2">
          ${guide.whyItMatters.stakeholders.map(stakeholder => `
            <span class="px-4 py-2 bg-orange-100 text-orange-800 rounded-full text-sm font-medium">
              ${stakeholder}
            </span>
          `).join('')}
        </div>
      </div>
    </section>
  `;

  // Section 3: Key Data & Facts
  html += `
    <section class="mb-12">
      <div class="flex items-start gap-3 mb-4">
        <div class="p-3 bg-green-100 rounded-lg">
          <svg class="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        </div>
        <div>
          <h2 class="text-2xl font-bold text-neutral-900">Key Data & Facts</h2>
        </div>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        ${guide.keyData.facts.map(fact => `
          <div class="bg-white border border-neutral-200 rounded-lg p-4">
            <p class="text-sm text-neutral-600 mb-1">${fact.label}</p>
            <p class="text-2xl font-bold text-neutral-900 mb-1">${fact.value}</p>
            ${fact.source ? `<p class="text-xs text-neutral-500">Source: ${fact.source}</p>` : ''}
          </div>
        `).join('')}
      </div>
      ${guide.keyData.statistics && guide.keyData.statistics.length > 0 ? `
        <div class="mt-6 bg-neutral-50 rounded-lg p-6">
          <h3 class="text-lg font-semibold text-neutral-900 mb-4">Statistics</h3>
          <div class="space-y-4">
            ${guide.keyData.statistics.map(stat => `
              <div class="flex justify-between items-center p-3 bg-white rounded border border-neutral-200">
                <div>
                  <p class="font-medium text-neutral-900">${stat.metric}</p>
                  <p class="text-sm text-neutral-600">${stat.period}</p>
                </div>
                <div class="text-right">
                  <p class="text-lg font-bold text-neutral-900">${stat.value}</p>
                  <p class="text-sm text-${stat.change.startsWith('+') ? 'green' : 'red'}-600">${stat.change}</p>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      ` : ''}
    </section>
  `;

  // Section 4: Coverage Topics
  html += `
    <section class="mb-12">
      <div class="flex items-start gap-3 mb-4">
        <div class="p-3 bg-purple-100 rounded-lg">
          <svg class="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        </div>
        <div>
          <h2 class="text-2xl font-bold text-neutral-900">Deep Dive</h2>
        </div>
      </div>
      <div class="space-y-8">
        ${guide.coverage.mainTopics.map(topic => `
          <div class="bg-white border border-neutral-200 rounded-lg p-6">
            <h3 class="text-xl font-bold text-neutral-900 mb-2">${topic.title}</h3>
            <p class="text-neutral-700 mb-4">${topic.description}</p>
            <div class="space-y-1 text-neutral-700">
              ${topic.subtopics.map(subtopic => `
                <p class="pl-4 border-l-2 border-purple-200">${subtopic}</p>
              `).join('')}
            </div>
          </div>
        `).join('')}
      </div>
    </section>
  `;

  // Section 5: Outlook
  html += `
    <section class="mb-12">
      <div class="flex items-start gap-3 mb-4">
        <div class="p-3 bg-indigo-100 rounded-lg">
          <svg class="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        </div>
        <div>
          <h2 class="text-2xl font-bold text-neutral-900">Future Outlook</h2>
        </div>
      </div>
      
      <div class="mb-6">
        <h3 class="text-lg font-semibold text-neutral-900 mb-3">What to Watch:</h3>
        <ul class="space-y-2">
          ${guide.outlook.whatToWatch.map(item => `
            <li class="flex items-start">
              <svg class="h-5 w-5 text-indigo-600 mr-2 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
              <span class="text-neutral-700">${item}</span>
            </li>
          `).join('')}
        </ul>
      </div>

      ${guide.outlook.upcomingMilestones && guide.outlook.upcomingMilestones.length > 0 ? `
        <div class="mb-6 bg-indigo-50 rounded-lg p-4">
          <h3 class="text-lg font-semibold text-neutral-900 mb-3">Upcoming Milestones:</h3>
          <div class="space-y-3">
            ${guide.outlook.upcomingMilestones.map(milestone => `
              <div class="flex justify-between items-start">
                <div>
                  <p class="font-medium text-neutral-900">${milestone.event}</p>
                  <p class="text-sm text-neutral-600">${milestone.date}</p>
                </div>
                <span class="px-2 py-1 bg-${milestone.importance === 'high' ? 'red' : milestone.importance === 'medium' ? 'yellow' : 'green'}-100 text-${milestone.importance === 'high' ? 'red' : milestone.importance === 'medium' ? 'yellow' : 'green'}-800 rounded text-xs font-medium">
                  ${milestone.importance.toUpperCase()}
                </span>
              </div>
            `).join('')}
          </div>
        </div>
      ` : ''}

      <div>
        <h3 class="text-lg font-semibold text-neutral-900 mb-3">Key Questions:</h3>
        <div class="space-y-2">
          ${guide.outlook.questions.map(question => `
            <p class="text-neutral-700 pl-4 border-l-2 border-indigo-200">${question}</p>
          `).join('')}
        </div>
      </div>
    </section>
  `;

  // Section 6: Takeaways
  html += `
    <section class="mb-12">
      <div class="flex items-start gap-3 mb-4">
        <div class="p-3 bg-yellow-100 rounded-lg">
          <svg class="h-6 w-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
        </div>
        <div>
          <h2 class="text-2xl font-bold text-neutral-900">Actionable Takeaways</h2>
        </div>
      </div>

      <div class="space-y-6">
        <div class="bg-yellow-50 rounded-lg p-6">
          <h3 class="text-lg font-semibold text-neutral-900 mb-3">For Readers:</h3>
          <ul class="space-y-2">
            ${guide.takeaway.forReaders.map(item => `
              <li class="flex items-start">
                <svg class="h-5 w-5 text-yellow-600 mr-2 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                <span class="text-neutral-700">${item}</span>
              </li>
            `).join('')}
          </ul>
        </div>

        ${guide.takeaway.forBusinesses && guide.takeaway.forBusinesses.length > 0 ? `
          <div class="bg-blue-50 rounded-lg p-6">
            <h3 class="text-lg font-semibold text-neutral-900 mb-3">For Businesses:</h3>
            <ul class="space-y-2">
              ${guide.takeaway.forBusinesses.map(item => `
                <li class="flex items-start">
                  <svg class="h-5 w-5 text-blue-600 mr-2 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span class="text-neutral-700">${item}</span>
                </li>
              `).join('')}
            </ul>
          </div>
        ` : ''}

        ${guide.takeaway.forInvestors && guide.takeaway.forInvestors.length > 0 ? `
          <div class="bg-green-50 rounded-lg p-6">
            <h3 class="text-lg font-semibold text-neutral-900 mb-3">For Investors:</h3>
            <ul class="space-y-2">
              ${guide.takeaway.forInvestors.map(item => `
                <li class="flex items-start">
                  <svg class="h-5 w-5 text-green-600 mr-2 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span class="text-neutral-700">${item}</span>
                </li>
              `).join('')}
            </ul>
          </div>
        ` : ''}
      </div>
    </section>
  `;

  // Section 7: E-E-A-T (Sources & Disclaimer)
  html += `
    <section class="mb-12">
      <div class="bg-neutral-50 rounded-lg p-6 border border-neutral-200">
        <h3 class="text-lg font-semibold text-neutral-900 mb-4">Sources & References:</h3>
        <ul class="space-y-2 mb-6">
          ${guide.eeat.sources.map(source => `
            <li>
              <a href="${source.url}" target="_blank" rel="noopener noreferrer" class="text-primary-600 hover:text-primary-800 hover:underline">
                ${source.name}
              </a>
              <span class="text-xs text-neutral-500 ml-2">(${source.credibility})</span>
            </li>
          `).join('')}
        </ul>

        ${guide.eeat.expertQuotes && guide.eeat.expertQuotes.length > 0 ? `
          <div class="mb-6">
            <h3 class="text-lg font-semibold text-neutral-900 mb-3">Expert Opinions:</h3>
            ${guide.eeat.expertQuotes.map(quote => `
              <blockquote class="border-l-4 border-neutral-300 pl-4 mb-4 italic text-neutral-700">
                "${quote.quote}"
                <footer class="text-sm text-neutral-600 mt-2">
                  — ${quote.expert}, ${quote.title} at ${quote.organization}
                </footer>
              </blockquote>
            `).join('')}
          </div>
        ` : ''}

        ${guide.eeat.disclaimer ? `
          <div class="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded">
            <p class="text-sm text-neutral-700"><strong>Disclaimer:</strong> ${guide.eeat.disclaimer}</p>
          </div>
        ` : ''}

        <p class="text-xs text-neutral-500 mt-4">Last Updated: ${new Date(guide.eeat.lastUpdated).toLocaleDateString()}</p>
      </div>
    </section>
  `;

  return html;
}

