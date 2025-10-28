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
        title="Meet Our Team - MoneyCal Research Writers | मनीकैल टीम"
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
            <p className="text-xl text-white/90 mb-2">मनीकैल रिसर्च टीम से मिलें</p>
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {teamProfiles.map((member) => (
            <div key={member.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all">
              {/* Profile Header */}
              <div className="bg-gradient-to-r from-primary-600 to-blue-600 p-6 text-white">
                <div className="flex items-start gap-4">
                  <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center overflow-hidden">
                    <div className="text-4xl font-bold text-primary-600">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold mb-1">{member.name}</h2>
                    <p className="text-sm text-white/90 mb-1">{member.nameHindi}</p>
                    <p className="text-white/80 text-sm">{member.role}</p>
                    <p className="text-white/70 text-xs">{member.roleHindi}</p>
                  </div>
                </div>
              </div>

              {/* Profile Content */}
              <div className="p-6">
                {/* Education */}
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Award className="h-4 w-4 text-neutral-600" />
                    <span className="text-sm font-semibold text-neutral-700">Education:</span>
                  </div>
                  <p className="text-neutral-800">{member.education}</p>
                  <p className="text-sm text-neutral-600">{member.educationHindi}</p>
                </div>

                {/* Bio */}
                <div className="mb-4">
                  <p className="text-neutral-700 text-sm leading-relaxed mb-2">{member.bio}</p>
                  <p className="text-neutral-600 text-xs leading-relaxed">{member.bioHindi}</p>
                </div>

                {/* Expertise Tags */}
                <div className="mb-4">
                  <h3 className="text-sm font-semibold text-neutral-700 mb-2">Expertise:</h3>
                  <div className="flex flex-wrap gap-2">
                    {member.expertise.map((exp, index) => (
                      <span 
                        key={index}
                        className="px-3 py-1 bg-primary-50 text-primary-700 rounded-full text-xs font-medium"
                      >
                        {exp}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Stats */}
                <div className="flex items-center justify-between mb-4 p-3 bg-neutral-50 rounded-lg">
                  <div>
                    <div className="text-xl font-bold text-neutral-900">{member.articlesCount}</div>
                    <div className="text-xs text-neutral-600">Articles</div>
                  </div>
                  <div>
                    <div className="text-xl font-bold text-neutral-900">
                      {new Date(member.joinedDate).getFullYear()}
                    </div>
                    <div className="text-xs text-neutral-600">Joined</div>
                  </div>
                </div>

                {/* Social Links */}
                {Object.keys(member.socialProfiles).length > 0 && (
                  <div>
                    <h3 className="text-sm font-semibold text-neutral-700 mb-2">Connect:</h3>
                    <div className="flex gap-3">
                      {member.socialProfiles.facebook && (
                        <a
                          href={member.socialProfiles.facebook}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 bg-blue-100 hover:bg-blue-200 rounded-full transition-colors"
                          aria-label="Facebook Profile"
                        >
                          <Facebook className="h-5 w-5 text-blue-600" />
                        </a>
                      )}
                      {member.socialProfiles.instagram && (
                        <a
                          href={member.socialProfiles.instagram}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 bg-pink-100 hover:bg-pink-200 rounded-full transition-colors"
                          aria-label="Instagram Profile"
                        >
                          <Instagram className="h-5 w-5 text-pink-600" />
                        </a>
                      )}
                      {member.socialProfiles.twitter && (
                        <a
                          href={member.socialProfiles.twitter}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 bg-sky-100 hover:bg-sky-200 rounded-full transition-colors"
                          aria-label="Twitter Profile"
                        >
                          <Twitter className="h-5 w-5 text-sky-600" />
                        </a>
                      )}
                      {member.socialProfiles.linkedin && (
                        <a
                          href={member.socialProfiles.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 bg-blue-100 hover:bg-blue-200 rounded-full transition-colors"
                          aria-label="LinkedIn Profile"
                        >
                          <Linkedin className="h-5 w-5 text-blue-700" />
                        </a>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Disclaimer Section */}
      <div className="bg-yellow-50 border-t border-yellow-200 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-neutral-900 mb-4 text-center">
            📢 Important Disclaimer | महत्वपूर्ण अस्वीकरण
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
              <strong>हिंदी:</strong> सभी मनीकैल टीम सदस्य अंतिम वर्ष के स्नातक छात्र हैं जो वित्तीय शोध 
              और सामग्री निर्माण के प्रति जुनूनी हैं। हमारे किसी भी लेखक SEBI-पंजीकृत वित्तीय सलाहकार, 
              प्रमाणित वित्तीय योजनाकार (CFP), या चार्टर्ड अकाउंटेंट (CA) नहीं हैं। मनीकैल.इन पर प्रकाशित 
              सभी सामग्री आधिकारिक स्रोतों से गहन शोध पर आधारित है लेकिन केवल शैक्षिक और सूचनात्मक 
              उद्देश्यों के लिए उपयोग की जानी चाहिए। हम दृढ़ता से अनुशंसा करते हैं कि किसी भी निवेश या 
              वित्तीय निर्णय लेने से पहले प्रमाणित वित्तीय पेशेवरों से परामर्श लें।
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

