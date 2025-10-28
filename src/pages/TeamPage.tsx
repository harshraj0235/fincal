import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Mail, 
  Facebook, 
  Instagram, 
  Twitter, 
  Linkedin,
  BookOpen,
  Award,
  TrendingUp,
  Users
} from 'lucide-react';
import SEOHelmet from '../components/SEOHelmet';
import { teamProfiles } from '../data/teamProfiles';

const TeamPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-50 to-white">
      <SEOHelmet
        title="Meet Our Team - MoneyCal Research Writers | à¤®à¤¨à¥€à¤•à¥ˆà¤² à¤Ÿà¥€à¤®"
        description="Get to know the passionate research team behind MoneyCal.in. Final year graduation students dedicated to providing well-researched financial content for Indian readers."
        keywords="moneycal team, financial writers india, finance research team, harsh raj, raushan kumar, vikram kumar, saurabh kumar"
        url="/team"
      />

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary-600 to-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <Users className="h-12 w-12 mr-3" />
              <h1 className="text-4xl md:text-5xl font-bold">
                Meet Our Team
              </h1>
            </div>
            <p className="text-xl text-white/90 mb-2">à¤®à¤¨à¥€à¤•à¥ˆà¤² à¤°à¤¿à¤¸à¤°à¥à¤š à¤Ÿà¥€à¤® à¤¸à¥‡ à¤®à¤¿à¤²à¥‡à¤‚</p>
            <p className="text-lg text-white/80 max-w-3xl mx-auto">
              Passionate final-year graduation students committed to providing well-researched, 
              accurate financial content for Indian readers. We love finance and share our knowledge 
              based on thorough research.
            </p>
            <p className="text-sm text-white/70 mt-4 max-w-2xl mx-auto">
              <strong>Disclaimer:</strong> Our team members are not certified financial experts or advisors. 
              All content is research-based and for educational purposes only.
            </p>
          </div>
        </div>
      </div>

      {/* Team Stats */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mb-3">
              <BookOpen className="h-6 w-6 text-green-600" />
            </div>
            <div className="text-3xl font-bold text-neutral-900">800+</div>
            <div className="text-neutral-600">Articles Published</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-3">
              <TrendingUp className="h-6 w-6 text-blue-600" />
            </div>
            <div className="text-3xl font-bold text-neutral-900">50K+</div>
            <div className="text-neutral-600">Monthly Readers</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 rounded-full mb-3">
              <Award className="h-6 w-6 text-purple-600" />
            </div>
            <div className="text-3xl font-bold text-neutral-900">4</div>
            <div className="text-neutral-600">Dedicated Researchers</div>
          </div>
        </div>
      </div>

      {/* Team Members Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {teamProfiles.map((member, idx) => {
            const colors = [
              { gradient: 'from-blue-600 to-purple-600', tag: 'bg-blue-100 text-blue-700', border: 'border-blue-200' },
              { gradient: 'from-green-600 to-teal-600', tag: 'bg-green-100 text-green-700', border: 'border-green-200' },
              { gradient: 'from-orange-600 to-red-600', tag: 'bg-orange-100 text-orange-700', border: 'border-orange-200' },
              { gradient: 'from-purple-600 to-pink-600', tag: 'bg-purple-100 text-purple-700', border: 'border-purple-200' }
            ];
            const colorScheme = colors[idx % colors.length];

            return (
              <div key={member.id} className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all transform hover:-translate-y-1">
                {/* Profile Header - Colorful Gradient */}
                <div className={`bg-gradient-to-r ${colorScheme.gradient} p-8 text-white relative overflow-hidden`}>
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12"></div>
                  
                  <div className="relative flex items-start gap-5">
                    <div className="w-28 h-28 bg-white rounded-2xl flex items-center justify-center overflow-hidden shadow-2xl ring-4 ring-white/30">
                      <div className="text-5xl font-bold bg-gradient-to-br from-primary-600 to-blue-600 bg-clip-text text-transparent">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </div>
                    </div>
                    <div className="flex-1 pt-2">
                      <h2 className="text-3xl font-bold mb-2 drop-shadow-lg">{member.name}</h2>
                      <p className="text-lg text-white/95 font-medium mb-1">{member.nameHindi}</p>
                      <div className="mt-3 space-y-1">
                        <p className="text-white/90 font-medium text-base">{member.role}</p>
                        <p className="text-white/80 text-sm">{member.roleHindi}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Profile Content */}
                <div className="p-8">
                  {/* Education - Highlighted */}
                  <div className={`mb-6 p-4 border-l-4 ${colorScheme.border} bg-gradient-to-r from-neutral-50 to-white rounded-r-lg`}>
                    <div className="flex items-center gap-2 mb-2">
                      <Award className="h-5 w-5 text-primary-600" />
                      <span className="text-base font-bold text-neutral-900">à¤¶à¤¿à¤•à¥à¤·à¤¾ / Education:</span>
                    </div>
                    <p className="text-neutral-900 font-semibold text-base">{member.education}</p>
                    <p className="text-neutral-700 text-sm mt-1">{member.educationHindi}</p>
                  </div>

                  {/* Bio - Improved Readability */}
                  <div className="mb-6">
                    <h3 className="text-base font-bold text-neutral-900 mb-3">About / à¤ªà¤°à¤¿à¤šà¤¯:</h3>
                    <p className="text-neutral-800 text-base leading-relaxed mb-3">{member.bio}</p>
                    <p className="text-neutral-700 text-sm leading-relaxed">{member.bioHindi}</p>
                  </div>

                  {/* Expertise Tags - Colorful */}
                  <div className="mb-6">
                    <h3 className="text-base font-bold text-neutral-900 mb-3">à¤µà¤¿à¤¶à¥‡à¤·à¤œà¥à¤žà¤¤à¤¾ / Expertise:</h3>
                    <div className="flex flex-wrap gap-2">
                      {member.expertise.map((exp, index) => (
                        <span 
                          key={index}
                          className={`px-4 py-2 ${colorScheme.tag} rounded-full text-sm font-semibold shadow-sm`}
                        >
                          {exp}
                        </span>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {member.expertiseHindi.map((exp, index) => (
                        <span 
                          key={index}
                          className="px-3 py-1 bg-neutral-100 text-neutral-700 rounded-full text-xs font-medium"
                        >
                          {exp}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Stats - Eye-catching */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className={`text-center p-4 bg-gradient-to-br from-primary-50 to-blue-50 rounded-xl border ${colorScheme.border}`}>
                      <div className="text-3xl font-bold text-primary-600">{member.articlesCount}</div>
                      <div className="text-sm text-neutral-700 font-medium">Articles Published</div>
                      <div className="text-xs text-neutral-600">à¤ªà¥à¤°à¤•à¤¾à¤¶à¤¿à¤¤ à¤²à¥‡à¤–</div>
                    </div>
                    <div className={`text-center p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border ${colorScheme.border}`}>
                      <div className="text-3xl font-bold text-green-600">
                        {new Date().getFullYear() - new Date(member.joinedDate).getFullYear()}+
                      </div>
                      <div className="text-sm text-neutral-700 font-medium">Years Experience</div>
                      <div className="text-xs text-neutral-600">à¤µà¤°à¥à¤·à¥‹à¤‚ à¤•à¤¾ à¤…à¤¨à¥à¤­à¤µ</div>
                    </div>
                  </div>

                  {/* Social Links - Enhanced */}
                  {Object.keys(member.socialProfiles).length > 0 && (
                    <div className="border-t pt-5">
                      <h3 className="text-base font-bold text-neutral-900 mb-3">Connect / à¤œà¥à¤¡à¤¼à¥‡à¤‚:</h3>
                      <div className="flex gap-3">
                        {member.socialProfiles.facebook && (
                          <a
                            href={member.socialProfiles.facebook}
                            target="_blank"
                            rel="noopener noreferrer nofollow"
                            className="flex-1 flex items-center justify-center gap-2 p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all shadow-md hover:shadow-lg"
                            aria-label={`${member.name} Facebook Profile`}
                          >
                            <Facebook className="h-5 w-5" />
                            <span className="font-medium text-sm">Facebook</span>
                          </a>
                        )}
                        {member.socialProfiles.instagram && (
                          <a
                            href={member.socialProfiles.instagram}
                            target="_blank"
                            rel="noopener noreferrer nofollow"
                            className="flex-1 flex items-center justify-center gap-2 p-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-lg transition-all shadow-md hover:shadow-lg"
                            aria-label={`${member.name} Instagram Profile`}
                          >
                            <Instagram className="h-5 w-5" />
                            <span className="font-medium text-sm">Instagram</span>
                          </a>
                        )}
                      </div>
                      {member.socialProfiles.twitter && (
                        <a
                          href={member.socialProfiles.twitter}
                          target="_blank"
                          rel="noopener noreferrer nofollow"
                          className="mt-2 flex items-center justify-center gap-2 p-3 bg-sky-500 hover:bg-sky-600 text-white rounded-lg transition-all shadow-md hover:shadow-lg w-full"
                          aria-label={`${member.name} Twitter Profile`}
                        >
                          <Twitter className="h-5 w-5" />
                          <span className="font-medium text-sm">Twitter / X</span>
                        </a>
                      )}
                      {member.socialProfiles.linkedin && (
                        <a
                          href={member.socialProfiles.linkedin}
                          target="_blank"
                          rel="noopener noreferrer nofollow"
                          className="mt-2 flex items-center justify-center gap-2 p-3 bg-blue-700 hover:bg-blue-800 text-white rounded-lg transition-all shadow-md hover:shadow-lg w-full"
                          aria-label={`${member.name} LinkedIn Profile`}
                        >
                          <Linkedin className="h-5 w-5" />
                          <span className="font-medium text-sm">LinkedIn</span>
                        </a>
                      )}
                    </div>
                  )}

                  {/* Verification Badge */}
                  <div className="mt-5 p-3 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center gap-2 text-green-700">
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-sm font-semibold">Verified Team Member</span>
                    </div>
                    <p className="text-xs text-green-600 mt-1">à¤¸à¤¤à¥à¤¯à¤¾à¤ªà¤¿à¤¤ à¤Ÿà¥€à¤® à¤¸à¤¦à¤¸à¥à¤¯ - à¤®à¤¨à¥€à¤•à¥ˆà¤² à¤•à¥€ à¤†à¤§à¤¿à¤•à¤¾à¤°à¤¿à¤• à¤Ÿà¥€à¤® à¤•à¤¾ à¤¹à¤¿à¤¸à¥à¤¸à¤¾</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Disclaimer Section */}
      <div className="bg-yellow-50 border-t border-yellow-200 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-neutral-900 mb-4 text-center">
            ðŸ“¢ Important Disclaimer | à¤®à¤¹à¤¤à¥à¤µà¤ªà¥‚à¤°à¥à¤£ à¤…à¤¸à¥à¤µà¥€à¤•à¤°à¤£
          </h2>
          <div className="prose prose-sm max-w-none text-neutral-700">
            <p className="mb-3">
              <strong>English:</strong> All MoneyCal team members are final-year graduation students passionate 
              about financial research and content creation. None of our writers are SEBI-registered financial advisors, 
              certified financial planners (CFP), or chartered accountants (CA). All content published on MoneyCal.in 
              is based on thorough research from authoritative sources but should be used for educational and 
              informational purposes only. We strongly recommend consulting with certified financial professionals 
              before making any investment or financial decisions.
            </p>
            <p>
              <strong>à¤¹à¤¿à¤‚à¤¦à¥€:</strong> à¤¸à¤­à¥€ à¤®à¤¨à¥€à¤•à¥ˆà¤² à¤Ÿà¥€à¤® à¤¸à¤¦à¤¸à¥à¤¯ à¤…à¤‚à¤¤à¤¿à¤® à¤µà¤°à¥à¤· à¤•à¥‡ à¤¸à¥à¤¨à¤¾à¤¤à¤• à¤›à¤¾à¤¤à¥à¤° à¤¹à¥ˆà¤‚ à¤œà¥‹ à¤µà¤¿à¤¤à¥à¤¤à¥€à¤¯ à¤¶à¥‹à¤§ 
              à¤”à¤° à¤¸à¤¾à¤®à¤—à¥à¤°à¥€ à¤¨à¤¿à¤°à¥à¤®à¤¾à¤£ à¤•à¥‡ à¤ªà¥à¤°à¤¤à¤¿ à¤œà¥à¤¨à¥‚à¤¨à¥€ à¤¹à¥ˆà¤‚à¥¤ à¤¹à¤®à¤¾à¤°à¥‡ à¤•à¤¿à¤¸à¥€ à¤­à¥€ à¤²à¥‡à¤–à¤• SEBI-à¤ªà¤‚à¤œà¥€à¤•à¥ƒà¤¤ à¤µà¤¿à¤¤à¥à¤¤à¥€à¤¯ à¤¸à¤²à¤¾à¤¹à¤•à¤¾à¤°, 
              à¤ªà¥à¤°à¤®à¤¾à¤£à¤¿à¤¤ à¤µà¤¿à¤¤à¥à¤¤à¥€à¤¯ à¤¯à¥‹à¤œà¤¨à¤¾à¤•à¤¾à¤° (CFP), à¤¯à¤¾ à¤šà¤¾à¤°à¥à¤Ÿà¤°à¥à¤¡ à¤…à¤•à¤¾à¤‰à¤‚à¤Ÿà¥‡à¤‚à¤Ÿ (CA) à¤¨à¤¹à¥€à¤‚ à¤¹à¥ˆà¤‚à¥¤ à¤®à¤¨à¥€à¤•à¥ˆà¤².à¤‡à¤¨ à¤ªà¤° à¤ªà¥à¤°à¤•à¤¾à¤¶à¤¿à¤¤ 
              à¤¸à¤­à¥€ à¤¸à¤¾à¤®à¤—à¥à¤°à¥€ à¤†à¤§à¤¿à¤•à¤¾à¤°à¤¿à¤• à¤¸à¥à¤°à¥‹à¤¤à¥‹à¤‚ à¤¸à¥‡ à¤—à¤¹à¤¨ à¤¶à¥‹à¤§ à¤ªà¤° à¤†à¤§à¤¾à¤°à¤¿à¤¤ à¤¹à¥ˆ à¤²à¥‡à¤•à¤¿à¤¨ à¤•à¥‡à¤µà¤² à¤¶à¥ˆà¤•à¥à¤·à¤¿à¤• à¤”à¤° à¤¸à¥‚à¤šà¤¨à¤¾à¤¤à¥à¤®à¤• 
              à¤‰à¤¦à¥à¤¦à¥‡à¤¶à¥à¤¯à¥‹à¤‚ à¤•à¥‡ à¤²à¤¿à¤ à¤‰à¤ªà¤¯à¥‹à¤— à¤•à¥€ à¤œà¤¾à¤¨à¥€ à¤šà¤¾à¤¹à¤¿à¤à¥¤ à¤¹à¤® à¤¦à¥ƒà¤¢à¤¼à¤¤à¤¾ à¤¸à¥‡ à¤…à¤¨à¥à¤¶à¤‚à¤¸à¤¾ à¤•à¤°à¤¤à¥‡ à¤¹à¥ˆà¤‚ à¤•à¤¿ à¤•à¤¿à¤¸à¥€ à¤­à¥€ à¤¨à¤¿à¤µà¥‡à¤¶ à¤¯à¤¾ 
              à¤µà¤¿à¤¤à¥à¤¤à¥€à¤¯ à¤¨à¤¿à¤°à¥à¤£à¤¯ à¤²à¥‡à¤¨à¥‡ à¤¸à¥‡ à¤ªà¤¹à¤²à¥‡ à¤ªà¥à¤°à¤®à¤¾à¤£à¤¿à¤¤ à¤µà¤¿à¤¤à¥à¤¤à¥€à¤¯ à¤ªà¥‡à¤¶à¥‡à¤µà¤°à¥‹à¤‚ à¤¸à¥‡ à¤ªà¤°à¤¾à¤®à¤°à¥à¤¶ à¤²à¥‡à¤‚à¥¤
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-primary-600 to-blue-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Want to Work With Us?</h2>
          <p className="text-white/90 mb-6">
            We're always looking for passionate researchers and writers who love finance and want to help 
            millions of Indian users make informed financial decisions.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center px-8 py-3 bg-white text-primary-600 rounded-lg hover:bg-neutral-100 transition-all font-semibold"
          >
            <Mail className="h-5 w-5 mr-2" />
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TeamPage;

