import React, { useMemo, useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowRight, BookOpen, ChevronRight, Filter, Home, Search, Shuffle, Star, Target, Users, Globe, Sparkles, CheckCircle, List } from 'lucide-react';
import SEOHelmet from '../components/SEOHelmet';
import { gkCategories } from '../data/gkData';

type GKQuestion = {
  id: number;
  question: string;
  options: string[];
  answer: string;
  category: string;
  level: 'easy' | 'medium' | 'hard';
  language: 'hi' | 'en';
};

type GKTopic = {
  title: string;
  slug: string;
  group: string;
  description: string;
  seoTitle: string;
  seoDescription: string;
  categories?: string[];
  levels?: Array<'easy' | 'medium' | 'hard'>;
  language?: 'hi' | 'en';
  limit?: number;
};

const gkQuestionsPart1: GKQuestion[] = [
  { id: 1, question: 'भारत की राजधानी क्या है?', options: ['नई दिल्ली', 'मुंबई', 'कोलकाता', 'चेन्नई'], answer: 'नई दिल्ली', category: 'general', level: 'easy', language: 'hi' },
  { id: 2, question: 'एक सप्ताह में कितने दिन होते हैं?', options: ['5', '6', '7', '8'], answer: '7', category: 'general', level: 'easy', language: 'hi' },
  { id: 3, question: 'सौरमंडल का केंद्र कौन है?', options: ['पृथ्वी', 'सूर्य', 'चंद्रमा', 'मंगल'], answer: 'सूर्य', category: 'general', level: 'easy', language: 'hi' },
  { id: 4, question: 'दुनिया का सबसे बड़ा महाद्वीप कौन सा है?', options: ['अफ्रीका', 'यूरोप', 'एशिया', 'ऑस्ट्रेलिया'], answer: 'एशिया', category: 'general', level: 'easy', language: 'hi' },
  { id: 5, question: 'दुनिया का सबसे बड़ा महासागर कौन सा है?', options: ['हिंद महासागर', 'अटलांटिक महासागर', 'प्रशांत महासागर', 'आर्कटिक महासागर'], answer: 'प्रशांत महासागर', category: 'general', level: 'easy', language: 'hi' },
  { id: 6, question: 'मानव शरीर में कुल कितनी हड्डियाँ होती हैं?', options: ['196', '206', '216', '226'], answer: '206', category: 'general', level: 'medium', language: 'hi' },
  { id: 7, question: 'विश्व जनसंख्या दिवस कब मनाया जाता है?', options: ['5 जून', '11 जुलाई', '15 अगस्त', '2 अक्टूबर'], answer: '11 जुलाई', category: 'general', level: 'medium', language: 'hi' },
  { id: 8, question: 'भारत के तिरंगे का अनुपात क्या है?', options: ['2:3', '3:2', '1:2', '4:3'], answer: '3:2', category: 'general', level: 'medium', language: 'hi' },
  { id: 9, question: 'भारतीय ध्वज में कितने रंग होते हैं?', options: ['2', '3', '4', '5'], answer: '3', category: 'general', level: 'easy', language: 'hi' },
  { id: 10, question: 'जीवित प्राणियों की मूलभूत इकाई क्या कहलाती है?', options: ['ऊतक', 'अंग', 'कोशिका', 'प्रणाली'], answer: 'कोशिका', category: 'general', level: 'easy', language: 'hi' },
  { id: 11, question: 'भारतीय संसद के कितने सदन होते हैं?', options: ['1', '2', '3', '4'], answer: '2', category: 'india', level: 'easy', language: 'hi' },
  { id: 12, question: 'भारत का सर्वोच्च न्यायालय कहाँ स्थित है?', options: ['मुंबई', 'नई दिल्ली', 'चेन्नई', 'कोलकाता'], answer: 'नई दिल्ली', category: 'india', level: 'easy', language: 'hi' },
  { id: 13, question: 'भारत की मुद्रा क्या है?', options: ['डॉलर', 'रुपया', 'पाउंड', 'येन'], answer: 'रुपया', category: 'india', level: 'easy', language: 'hi' },
  { id: 14, question: 'क्षेत्रफल के आधार पर भारत का सबसे बड़ा राज्य कौन सा है?', options: ['मध्य प्रदेश', 'राजस्थान', 'महाराष्ट्र', 'उत्तर प्रदेश'], answer: 'राजस्थान', category: 'india', level: 'easy', language: 'hi' },
  { id: 15, question: 'जनसंख्या के आधार पर भारत का सबसे बड़ा राज्य कौन सा है?', options: ['उत्तर प्रदेश', 'बिहार', 'महाराष्ट्र', 'राजस्थान'], answer: 'उत्तर प्रदेश', category: 'india', level: 'easy', language: 'hi' },
  { id: 16, question: 'भारत में सबसे लंबी तटरेखा किस राज्य की है?', options: ['गुजरात', 'केरल', 'तमिलनाडु', 'आंध्र प्रदेश'], answer: 'गुजरात', category: 'india', level: 'medium', language: 'hi' },
  { id: 17, question: 'भारत का संविधान कब लागू हुआ?', options: ['15 अगस्त 1947', '26 जनवरी 1950', '2 अक्टूबर 1949', '1 जनवरी 1951'], answer: '26 जनवरी 1950', category: 'india', level: 'easy', language: 'hi' },
  { id: 18, question: 'भारत के पहले राष्ट्रपति कौन थे?', options: ['डॉ. राजेंद्र प्रसाद', 'जवाहरलाल नेहरू', 'सर्वपल्ली राधाकृष्णन', 'बी. आर. अंबेडकर'], answer: 'डॉ. राजेंद्र प्रसाद', category: 'india', level: 'medium', language: 'hi' },
  { id: 19, question: 'भारत का सबसे ऊँचा बांध कौन सा है?', options: ['भाखड़ा नांगल', 'सरदार सरोवर', 'टिहरी', 'हीराकुंड'], answer: 'टिहरी', category: 'india', level: 'medium', language: 'hi' },
  { id: 20, question: 'भारत का राष्ट्रीय पशु कौन है?', options: ['हाथी', 'बाघ', 'शेर', 'हिरण'], answer: 'बाघ', category: 'india', level: 'easy', language: 'hi' },
  { id: 21, question: 'मौर्य वंश का संस्थापक कौन था?', options: ['समुद्रगुप्त', 'चंद्रगुप्त मौर्य', 'हर्षवर्धन', 'अशोक'], answer: 'चंद्रगुप्त मौर्य', category: 'history', level: 'medium', language: 'hi' },
  { id: 22, question: 'गुप्त वंश का महान शासक कौन था?', options: ['समुद्रगुप्त', 'राजेंद्र चोल', 'अकबर', 'बाबर'], answer: 'समुद्रगुप्त', category: 'history', level: 'medium', language: 'hi' },
  { id: 23, question: 'पानीपत की पहली लड़ाई कब हुई थी?', options: ['1526', '1556', '1761', '1857'], answer: '1526', category: 'history', level: 'medium', language: 'hi' },
  { id: 24, question: 'प्लासी का युद्ध कब हुआ था?', options: ['1757', '1764', '1772', '1857'], answer: '1757', category: 'history', level: 'medium', language: 'hi' },
  { id: 25, question: 'सिपाही विद्रोह किस वर्ष हुआ था?', options: ['1757', '1857', '1905', '1942'], answer: '1857', category: 'history', level: 'medium', language: 'hi' },
  { id: 26, question: 'भारत छोड़ो आंदोलन कब शुरू हुआ था?', options: ['1919', '1930', '1942', '1947'], answer: '1942', category: 'history', level: 'medium', language: 'hi' },
  { id: 27, question: 'अशोक ने कलिंग युद्ध के बाद कौन सा धर्म अपनाया?', options: ['जैन धर्म', 'बौद्ध धर्म', 'हिंदू धर्म', 'सिख धर्म'], answer: 'बौद्ध धर्म', category: 'history', level: 'medium', language: 'hi' },
  { id: 28, question: 'ताजमहल किसने बनवाया था?', options: ['अकबर', 'शाहजहां', 'जहांगीर', 'बाबर'], answer: 'शाहजहां', category: 'history', level: 'easy', language: 'hi' },
  { id: 29, question: 'हड़प्पा सभ्यता किस नदी के किनारे विकसित हुई?', options: ['गंगा', 'सिंधु', 'यमुना', 'ब्रह्मपुत्र'], answer: 'सिंधु', category: 'history', level: 'medium', language: 'hi' },
  { id: 30, question: 'ब्रह्म समाज की स्थापना किसने की?', options: ['राजा राममोहन राय', 'स्वामी विवेकानंद', 'दयानंद सरस्वती', 'ईश्वरचंद्र विद्यासागर'], answer: 'राजा राममोहन राय', category: 'history', level: 'medium', language: 'hi' },
  { id: 31, question: 'गंगा नदी का उद्गम स्थान क्या है?', options: ['यमुनोत्री', 'गोमुख', 'नैनीताल', 'प्रयागराज'], answer: 'गोमुख', category: 'geography', level: 'medium', language: 'hi' },
  { id: 32, question: 'थार रेगिस्तान किस राज्य में स्थित है?', options: ['गुजरात', 'राजस्थान', 'हरियाणा', 'मध्य प्रदेश'], answer: 'राजस्थान', category: 'geography', level: 'easy', language: 'hi' },
  { id: 33, question: 'भूमध्य रेखा किस अक्षांश पर स्थित है?', options: ['0°', '23.5°', '66.5°', '90°'], answer: '0°', category: 'geography', level: 'easy', language: 'hi' },
  { id: 34, question: 'मानसून पवनें मुख्य रूप से किस महासागर से आती हैं?', options: ['अटलांटिक', 'प्रशांत', 'हिंद महासागर', 'आर्कटिक'], answer: 'हिंद महासागर', category: 'geography', level: 'medium', language: 'hi' },
  { id: 35, question: 'दुनिया की सबसे ऊँची चोटी कौन सी है?', options: ['के2', 'कंचनजंगा', 'एवरेस्ट', 'नंदा देवी'], answer: 'एवरेस्ट', category: 'geography', level: 'easy', language: 'hi' },
  { id: 36, question: 'भारत का सबसे बड़ा डेल्टा कौन सा है?', options: ['गोडावरी डेल्टा', 'सुंदरबन डेल्टा', 'कावेरी डेल्टा', 'नर्मदा डेल्टा'], answer: 'सुंदरबन डेल्टा', category: 'geography', level: 'medium', language: 'hi' },
  { id: 37, question: 'पृथ्वी का लगभग कितना प्रतिशत भाग जल से ढका है?', options: ['51%', '61%', '71%', '81%'], answer: '71%', category: 'geography', level: 'easy', language: 'hi' },
  { id: 38, question: 'कर्क रेखा भारत के कितने राज्यों से होकर गुजरती है?', options: ['6', '7', '8', '9'], answer: '8', category: 'geography', level: 'medium', language: 'hi' },
  { id: 39, question: 'अरावली पर्वतमाला की दिशा क्या है?', options: ['उत्तर-दक्षिण', 'पूर्व-पश्चिम', 'दक्षिण-पश्चिम से उत्तर-पूर्व', 'दक्षिण-पूर्व से उत्तर-पश्चिम'], answer: 'दक्षिण-पश्चिम से उत्तर-पूर्व', category: 'geography', level: 'medium', language: 'hi' },
  { id: 40, question: 'हिमालय किस प्रकार के पर्वत हैं?', options: ['पुराने पर्वत', 'युवा मोड़दार पर्वत', 'ज्वालामुखीय पर्वत', 'समतल पर्वत'], answer: 'युवा मोड़दार पर्वत', category: 'geography', level: 'medium', language: 'hi' },
  { id: 41, question: 'प्रकाश का वेग लगभग कितना है?', options: ['3×10⁶ मी/से', '3×10⁸ मी/से', '3×10¹⁰ मी/से', '3×10⁴ मी/से'], answer: '3×10⁸ मी/से', category: 'science', level: 'medium', language: 'hi' },
  { id: 42, question: 'जल का रासायनिक सूत्र क्या है?', options: ['H2O', 'CO2', 'O2', 'NaCl'], answer: 'H2O', category: 'science', level: 'easy', language: 'hi' },
  { id: 43, question: 'बल की SI इकाई क्या है?', options: ['जूल', 'न्यूटन', 'वाट', 'पास्कल'], answer: 'न्यूटन', category: 'science', level: 'easy', language: 'hi' },
  { id: 44, question: 'रक्त का लाल रंग किससे होता है?', options: ['हिमोग्लोबिन', 'प्लाज्मा', 'लिम्फ', 'कैल्शियम'], answer: 'हिमोग्लोबिन', category: 'science', level: 'easy', language: 'hi' },
  { id: 45, question: 'सामान्य मानव शरीर का तापमान कितना होता है?', options: ['35°C', '36°C', '37°C', '38°C'], answer: '37°C', category: 'science', level: 'easy', language: 'hi' },
  { id: 46, question: 'प्रकाश संश्लेषण कहाँ होता है?', options: ['माइटोकॉन्ड्रिया', 'क्लोरोप्लास्ट', 'न्यूक्लियस', 'राइबोसोम'], answer: 'क्लोरोप्लास्ट', category: 'science', level: 'medium', language: 'hi' },
  { id: 47, question: 'ऊर्जा की SI इकाई क्या है?', options: ['न्यूटन', 'जूल', 'वोल्ट', 'कैल्विन'], answer: 'जूल', category: 'science', level: 'easy', language: 'hi' },
  { id: 48, question: 'विद्युत धारा की SI इकाई क्या है?', options: ['एम्पीयर', 'ओम', 'वोल्ट', 'वाट'], answer: 'एम्पीयर', category: 'science', level: 'easy', language: 'hi' },
  { id: 49, question: 'ध्वनि किस माध्यम में नहीं चल सकती?', options: ['ठोस', 'द्रव', 'गैस', 'निर्वात'], answer: 'निर्वात', category: 'science', level: 'easy', language: 'hi' },
  { id: 50, question: 'ग्रहों की गति के नियम किसने दिए?', options: ['न्यूटन', 'गैलीलियो', 'केप्लर', 'आइंस्टीन'], answer: 'केप्लर', category: 'science', level: 'medium', language: 'hi' },
  { id: 51, question: 'फ्रांस की राजधानी क्या है?', options: ['रोम', 'पेरिस', 'लंदन', 'मैड्रिड'], answer: 'पेरिस', category: 'world', level: 'easy', language: 'hi' },
  { id: 52, question: 'संयुक्त राज्य अमेरिका की राजधानी क्या है?', options: ['न्यूयॉर्क', 'वाशिंगटन डीसी', 'लॉस एंजिलिस', 'शिकागो'], answer: 'वाशिंगटन डीसी', category: 'world', level: 'easy', language: 'hi' },
  { id: 53, question: 'जापान की मुद्रा क्या है?', options: ['युआन', 'येन', 'वॉन', 'रुपया'], answer: 'येन', category: 'world', level: 'easy', language: 'hi' },
  { id: 54, question: 'संयुक्त राष्ट्र का मुख्यालय कहाँ है?', options: ['लंदन', 'पेरिस', 'न्यूयॉर्क', 'जिनेवा'], answer: 'न्यूयॉर्क', category: 'world', level: 'easy', language: 'hi' },
  { id: 55, question: 'विश्व का सबसे बड़ा गर्म मरुस्थल कौन सा है?', options: ['सहारा', 'गोबी', 'थार', 'कालीहारी'], answer: 'सहारा', category: 'world', level: 'medium', language: 'hi' },
  { id: 56, question: 'ब्राजील की राजधानी क्या है?', options: ['रियो डी जेनेरियो', 'ब्रासीलिया', 'साओ पाउलो', 'लिस्बन'], answer: 'ब्रासीलिया', category: 'world', level: 'medium', language: 'hi' },
  { id: 57, question: 'रूस की राजधानी क्या है?', options: ['मॉस्को', 'सेंट पीटर्सबर्ग', 'कीव', 'मिन्स्क'], answer: 'मॉस्को', category: 'world', level: 'easy', language: 'hi' },
  { id: 58, question: 'ऑस्ट्रेलिया की राजधानी क्या है?', options: ['सिडनी', 'मेलबर्न', 'कैनबरा', 'ब्रिस्बेन'], answer: 'कैनबरा', category: 'world', level: 'medium', language: 'hi' },
  { id: 59, question: 'विश्व व्यापार संगठन (WTO) का मुख्यालय कहाँ है?', options: ['न्यूयॉर्क', 'जिनेवा', 'पेरिस', 'टोक्यो'], answer: 'जिनेवा', category: 'world', level: 'medium', language: 'hi' },
  { id: 60, question: 'चीन की महान दीवार किस देश में है?', options: ['जापान', 'चीन', 'कोरिया', 'मंगोलिया'], answer: 'चीन', category: 'world', level: 'easy', language: 'hi' },
  { id: 61, question: 'सौरमंडल का सबसे बड़ा ग्रह कौन सा है?', options: ['पृथ्वी', 'शुक्र', 'बृहस्पति', 'शनि'], answer: 'बृहस्पति', category: 'space', level: 'easy', language: 'hi' },
  { id: 62, question: 'लाल ग्रह किसे कहा जाता है?', options: ['शुक्र', 'मंगल', 'बृहस्पति', 'बुध'], answer: 'मंगल', category: 'space', level: 'easy', language: 'hi' },
  { id: 63, question: 'सौरमंडल का सबसे छोटा ग्रह कौन सा है?', options: ['बुध', 'मंगल', 'पृथ्वी', 'शुक्र'], answer: 'बुध', category: 'space', level: 'medium', language: 'hi' },
  { id: 64, question: 'पृथ्वी का प्राकृतिक उपग्रह कौन सा है?', options: ['मंगल', 'चंद्रमा', 'टाइटन', 'फोबोस'], answer: 'चंद्रमा', category: 'space', level: 'easy', language: 'hi' },
  { id: 65, question: 'ISRO का मुख्यालय कहाँ है?', options: ['श्रीहरिकोटा', 'बेंगलुरु', 'हैदराबाद', 'त्रिवेंद्रम'], answer: 'बेंगलुरु', category: 'space', level: 'medium', language: 'hi' },
  { id: 66, question: 'पहला भारतीय अंतरिक्ष यात्री कौन थे?', options: ['राकेश शर्मा', 'कल्पना चावला', 'विक्रम साराभाई', 'सतीश धवन'], answer: 'राकेश शर्मा', category: 'space', level: 'easy', language: 'hi' },
  { id: 67, question: 'चंद्रयान-1 मिशन किस वर्ष लॉन्च हुआ था?', options: ['2005', '2008', '2010', '2012'], answer: '2008', category: 'space', level: 'medium', language: 'hi' },
  { id: 68, question: 'सूर्य की बाहरी परत को क्या कहते हैं?', options: ['कोर', 'फोटोस्फियर', 'क्रोमोस्फियर', 'कोरोना'], answer: 'कोरोना', category: 'space', level: 'medium', language: 'hi' },
  { id: 69, question: 'सूर्य की ऊर्जा किस प्रक्रिया से उत्पन्न होती है?', options: ['विखंडन', 'संलयन', 'दहन', 'वाष्पीकरण'], answer: 'संलयन', category: 'space', level: 'hard', language: 'hi' },
  { id: 70, question: 'पहला मानव अंतरिक्ष यात्री कौन था?', options: ['नील आर्मस्ट्रॉन्ग', 'यूरी गागरिन', 'बज़ एल्ड्रिन', 'एलन शेपर्ड'], answer: 'यूरी गागरिन', category: 'space', level: 'medium', language: 'hi' },
  { id: 71, question: 'दुनिया का सबसे बड़ा स्तनपायी कौन सा है?', options: ['हाथी', 'नीली व्हेल', 'हिप्पो', 'गैंडा'], answer: 'नीली व्हेल', category: 'animals', level: 'easy', language: 'hi' },
  { id: 72, question: 'सबसे तेज़ स्थल जीव कौन सा है?', options: ['चीता', 'शेर', 'घोड़ा', 'कंगारू'], answer: 'चीता', category: 'animals', level: 'easy', language: 'hi' },
  { id: 73, question: 'दुनिया का सबसे बड़ा पक्षी कौन सा है?', options: ['शुतुरमुर्ग', 'मोर', 'गरुड़', 'बतख'], answer: 'शुतुरमुर्ग', category: 'animals', level: 'easy', language: 'hi' },
  { id: 74, question: 'ऊँट को किस नाम से जाना जाता है?', options: ['पर्वत का जहाज', 'रेगिस्तान का जहाज', 'वन का रक्षक', 'समुद्र का घोड़ा'], answer: 'रेगिस्तान का जहाज', category: 'animals', level: 'easy', language: 'hi' },
  { id: 75, question: 'पांडा का मुख्य भोजन क्या है?', options: ['मछली', 'घास', 'बाँस', 'फल'], answer: 'बाँस', category: 'animals', level: 'easy', language: 'hi' },
  { id: 76, question: 'दुनिया का सबसे छोटा पक्षी कौन सा है?', options: ['हमिंगबर्ड', 'गौरैया', 'तोता', 'मैना'], answer: 'हमिंगबर्ड', category: 'animals', level: 'medium', language: 'hi' },
  { id: 77, question: 'कछुआ किस वर्ग का प्राणी है?', options: ['स्तनपायी', 'पक्षी', 'सरीसृप', 'उभयचर'], answer: 'सरीसृप', category: 'animals', level: 'medium', language: 'hi' },
  { id: 78, question: 'मधुमक्खी शहद किससे बनाती है?', options: ['फूलों का मकरंद', 'पेड़ों का रस', 'फल का रस', 'बारिश का पानी'], answer: 'फूलों का मकरंद', category: 'animals', level: 'medium', language: 'hi' },
  { id: 79, question: 'गिर के जंगल किस पशु के लिए प्रसिद्ध हैं?', options: ['बाघ', 'एशियाई शेर', 'हाथी', 'गैंडा'], answer: 'एशियाई शेर', category: 'animals', level: 'medium', language: 'hi' },
  { id: 80, question: 'डॉल्फिन किस वर्ग की होती है?', options: ['मछली', 'स्तनपायी', 'सरीसृप', 'उभयचर'], answer: 'स्तनपायी', category: 'animals', level: 'medium', language: 'hi' },
  { id: 81, question: 'टेलीफोन का आविष्कार किसने किया?', options: ['एडिसन', 'ग्राहम बेल', 'मार्कोनी', 'न्यूटन'], answer: 'ग्राहम बेल', category: 'inventions', level: 'easy', language: 'hi' },
  { id: 82, question: 'बल्ब का आविष्कार किसने किया?', options: ['थॉमस एडीसन', 'निकोल टेस्ला', 'जेम्स वॉट', 'राइट बंधु'], answer: 'थॉमस एडीसन', category: 'inventions', level: 'easy', language: 'hi' },
  { id: 83, question: 'रेडियो का आविष्कार किसने किया?', options: ['मार्कोनी', 'ग्राहम बेल', 'फ्लेमिंग', 'क्यूरी'], answer: 'मार्कोनी', category: 'inventions', level: 'medium', language: 'hi' },
  { id: 84, question: 'हवाई जहाज का आविष्कार किसने किया?', options: ['राइट बंधु', 'एडिसन', 'गैलीलियो', 'डार्विन'], answer: 'राइट बंधु', category: 'inventions', level: 'easy', language: 'hi' },
  { id: 85, question: 'कंप्यूटर का जनक किसे माना जाता है?', options: ['चार्ल्स बैबेज', 'एलन ट्यूरिंग', 'टिम बर्नर्स-ली', 'बिल गेट्स'], answer: 'चार्ल्स बैबेज', category: 'inventions', level: 'easy', language: 'hi' },
  { id: 86, question: 'पेनिसिलिन की खोज किसने की?', options: ['अलेक्जेंडर फ्लेमिंग', 'लुई पाश्चर', 'रॉबर्ट कोच', 'न्यूटन'], answer: 'अलेक्जेंडर फ्लेमिंग', category: 'inventions', level: 'medium', language: 'hi' },
  { id: 87, question: 'भाप इंजन का विकास किसने किया?', options: ['जेम्स वॉट', 'मार्कोनी', 'एडिसन', 'टेस्ला'], answer: 'जेम्स वॉट', category: 'inventions', level: 'medium', language: 'hi' },
  { id: 88, question: 'प्रिंटिंग प्रेस का आविष्कार किसने किया?', options: ['गुटेनबर्ग', 'ग्राहम बेल', 'आइंस्टीन', 'न्यूटन'], answer: 'गुटेनबर्ग', category: 'inventions', level: 'medium', language: 'hi' },
  { id: 89, question: 'टेलीविजन का आविष्कार किसने किया?', options: ['जॉन लॉगी बेयर्ड', 'एडिसन', 'राइट बंधु', 'टेस्ला'], answer: 'जॉन लॉगी बेयर्ड', category: 'inventions', level: 'medium', language: 'hi' },
  { id: 90, question: 'डायनामाइट का आविष्कार किसने किया?', options: ['अल्फ्रेड नोबेल', 'एडिसन', 'ग्राहम बेल', 'फ्लेमिंग'], answer: 'अल्फ्रेड नोबेल', category: 'inventions', level: 'medium', language: 'hi' },
  { id: 91, question: 'भारत का राष्ट्रीय पशु कौन है?', options: ['बाघ', 'हाथी', 'गाय', 'शेर'], answer: 'बाघ', category: 'symbols', level: 'easy', language: 'hi' },
  { id: 92, question: 'भारत का राष्ट्रीय पक्षी कौन है?', options: ['मोर', 'तोता', 'कौआ', 'चील'], answer: 'मोर', category: 'symbols', level: 'easy', language: 'hi' },
  { id: 93, question: 'भारत का राष्ट्रीय फूल कौन सा है?', options: ['गुलाब', 'कमल', 'गेंदा', 'सूरजमुखी'], answer: 'कमल', category: 'symbols', level: 'easy', language: 'hi' },
  { id: 94, question: 'भारत का राष्ट्रीय वृक्ष कौन सा है?', options: ['नीम', 'पीपल', 'बरगद', 'आम'], answer: 'बरगद', category: 'symbols', level: 'medium', language: 'hi' },
  { id: 95, question: 'भारत का राष्ट्रीय फल कौन सा है?', options: ['केला', 'आम', 'सेब', 'अमरूद'], answer: 'आम', category: 'symbols', level: 'easy', language: 'hi' },
  { id: 96, question: 'भारत का राष्ट्रीय जलीय जीव कौन है?', options: ['डॉल्फिन', 'कछुआ', 'मगरमच्छ', 'शार्क'], answer: 'डॉल्फिन', category: 'symbols', level: 'medium', language: 'hi' },
  { id: 97, question: 'भारत का राष्ट्रगीत क्या है?', options: ['जन गण मन', 'सारे जहाँ से अच्छा', 'वंदे मातरम्', 'अय मेरे वतन के लोगों'], answer: 'वंदे मातरम्', category: 'symbols', level: 'medium', language: 'hi' },
  { id: 98, question: 'भारत के राष्ट्रगान के रचयिता कौन हैं?', options: ['बंकिमचंद्र चट्टोपाध्याय', 'रवींद्रनाथ टैगोर', 'तुलसीदास', 'महात्मा गांधी'], answer: 'रवींद्रनाथ टैगोर', category: 'symbols', level: 'medium', language: 'hi' },
  { id: 99, question: 'अशोक चक्र में कितनी तीलियाँ हैं?', options: ['20', '22', '24', '26'], answer: '24', category: 'symbols', level: 'medium', language: 'hi' },
  { id: 100, question: 'राष्ट्रीय खेल दिवस कब मनाया जाता है?', options: ['15 अगस्त', '29 अगस्त', '2 अक्टूबर', '26 जनवरी'], answer: '29 अगस्त', category: 'symbols', level: 'medium', language: 'hi' }
];

const gkQuestionsPart2: GKQuestion[] = [
  { id: 101, question: 'ओलंपिक खेल कितने वर्षों में आयोजित होते हैं?', options: ['2', '3', '4', '5'], answer: '4', category: 'sports', level: 'easy', language: 'hi' },
  { id: 102, question: 'पी. वी. सिंधु किस खेल से संबंधित हैं?', options: ['बैडमिंटन', 'टेनिस', 'क्रिकेट', 'हॉकी'], answer: 'बैडमिंटन', category: 'sports', level: 'easy', language: 'hi' },
  { id: 103, question: 'सचिन तेंदुलकर किस खेल से संबंधित हैं?', options: ['फुटबॉल', 'हॉकी', 'क्रिकेट', 'टेनिस'], answer: 'क्रिकेट', category: 'sports', level: 'easy', language: 'hi' },
  { id: 104, question: 'हॉकी टीम में खिलाड़ियों की संख्या कितनी होती है?', options: ['9', '10', '11', '12'], answer: '11', category: 'sports', level: 'easy', language: 'hi' },
  { id: 105, question: 'फुटबॉल टीम में खिलाड़ियों की संख्या कितनी होती है?', options: ['9', '10', '11', '12'], answer: '11', category: 'sports', level: 'easy', language: 'hi' },
  { id: 106, question: 'टेनिस में ग्रैंड स्लैम की संख्या कितनी है?', options: ['3', '4', '5', '6'], answer: '4', category: 'sports', level: 'medium', language: 'hi' },
  { id: 107, question: 'कबड्डी टीम में खिलाड़ियों की संख्या कितनी होती है?', options: ['5', '6', '7', '8'], answer: '7', category: 'sports', level: 'medium', language: 'hi' },
  { id: 108, question: 'क्रिकेट में एक ओवर में कितनी गेंदें होती हैं?', options: ['4', '5', '6', '8'], answer: '6', category: 'sports', level: 'easy', language: 'hi' },
  { id: 109, question: 'भारत ने पहला ओलंपिक हॉकी स्वर्ण किस वर्ष जीता?', options: ['1928', '1932', '1952', '1960'], answer: '1928', category: 'sports', level: 'medium', language: 'hi' },
  { id: 110, question: 'डेविस कप किस खेल से जुड़ा है?', options: ['क्रिकेट', 'टेनिस', 'हॉकी', 'बैडमिंटन'], answer: 'टेनिस', category: 'sports', level: 'medium', language: 'hi' },
  { id: 111, question: 'संविधान सभा के अध्यक्ष कौन थे?', options: ['डॉ. राजेंद्र प्रसाद', 'जवाहरलाल नेहरू', 'बी. आर. अंबेडकर', 'सुभाष चंद्र बोस'], answer: 'डॉ. राजेंद्र प्रसाद', category: 'polity', level: 'medium', language: 'hi' },
  { id: 112, question: 'संविधान मसौदा समिति के अध्यक्ष कौन थे?', options: ['डॉ. राजेंद्र प्रसाद', 'बी. आर. अंबेडकर', 'सरदार पटेल', 'राजगोपालाचारी'], answer: 'बी. आर. अंबेडकर', category: 'polity', level: 'medium', language: 'hi' },
  { id: 113, question: 'भारत के राष्ट्रपति का कार्यकाल कितने वर्ष का होता है?', options: ['4', '5', '6', '7'], answer: '5', category: 'polity', level: 'easy', language: 'hi' },
  { id: 114, question: 'भारत के उपराष्ट्रपति का कार्यकाल कितने वर्ष का होता है?', options: ['4', '5', '6', '7'], answer: '5', category: 'polity', level: 'easy', language: 'hi' },
  { id: 115, question: 'लोकसभा की अधिकतम अवधि कितने वर्षों की होती है?', options: ['4', '5', '6', '7'], answer: '5', category: 'polity', level: 'easy', language: 'hi' },
  { id: 116, question: 'राज्यसभा का स्वरूप क्या है?', options: ['अस्थायी', 'स्थायी', 'दोनों', 'कोई नहीं'], answer: 'स्थायी', category: 'polity', level: 'easy', language: 'hi' },
  { id: 117, question: 'राज्यसभा के एक-तिहाई सदस्य कितने वर्षों में सेवानिवृत्त होते हैं?', options: ['1', '2', '3', '4'], answer: '2', category: 'polity', level: 'medium', language: 'hi' },
  { id: 118, question: 'भारत में मौलिक अधिकार कितने हैं?', options: ['5', '6', '7', '8'], answer: '6', category: 'polity', level: 'medium', language: 'hi' },
  { id: 119, question: 'भारत में मौलिक कर्तव्य कितने हैं?', options: ['10', '11', '12', '13'], answer: '11', category: 'polity', level: 'medium', language: 'hi' },
  { id: 120, question: 'भारत की न्यायपालिका का प्रमुख कौन होता है?', options: ['प्रधानमंत्री', 'मुख्य न्यायाधीश', 'लोकसभा अध्यक्ष', 'राज्यपाल'], answer: 'मुख्य न्यायाधीश', category: 'polity', level: 'easy', language: 'hi' },
  { id: 121, question: 'भारतीय रिजर्व बैंक (RBI) की स्थापना कब हुई?', options: ['1921', '1935', '1947', '1950'], answer: '1935', category: 'economy', level: 'medium', language: 'hi' },
  { id: 122, question: 'भारत का केंद्रीय बैंक कौन सा है?', options: ['SBI', 'RBI', 'ICICI', 'NABARD'], answer: 'RBI', category: 'economy', level: 'easy', language: 'hi' },
  { id: 123, question: 'GDP का पूर्ण रूप क्या है?', options: ['Gross Domestic Product', 'Global Domestic Product', 'Gross Development Product', 'General Domestic Product'], answer: 'Gross Domestic Product', category: 'economy', level: 'medium', language: 'hi' },
  { id: 124, question: 'मुद्रास्फीति का अर्थ क्या है?', options: ['कीमतों में गिरावट', 'कीमतों में स्थिरता', 'कीमतों का सामान्य बढ़ना', 'आय में गिरावट'], answer: 'कीमतों का सामान्य बढ़ना', category: 'economy', level: 'medium', language: 'hi' },
  { id: 125, question: 'भारत का बजट कौन प्रस्तुत करता है?', options: ['प्रधानमंत्री', 'वित्त मंत्री', 'राष्ट्रपति', 'राज्यपाल'], answer: 'वित्त मंत्री', category: 'economy', level: 'easy', language: 'hi' },
  { id: 126, question: 'GST भारत में किस वर्ष लागू हुआ?', options: ['2015', '2016', '2017', '2018'], answer: '2017', category: 'economy', level: 'medium', language: 'hi' },
  { id: 127, question: 'आयकर किस प्रकार का कर है?', options: ['प्रत्यक्ष कर', 'अप्रत्यक्ष कर', 'स्थानीय कर', 'सेवा कर'], answer: 'प्रत्यक्ष कर', category: 'economy', level: 'medium', language: 'hi' },
  { id: 128, question: 'SEBI किस क्षेत्र का नियामक है?', options: ['बैंकिंग', 'शेयर बाजार', 'बीमा', 'टेलीकॉम'], answer: 'शेयर बाजार', category: 'economy', level: 'medium', language: 'hi' },
  { id: 129, question: 'भारतीय रुपए का प्रतीक क्या है?', options: ['$', '€', '₹', '¥'], answer: '₹', category: 'economy', level: 'easy', language: 'hi' },
  { id: 130, question: 'भारत में वित्तीय वर्ष कब से कब तक होता है?', options: ['जनवरी-दिसंबर', 'अप्रैल-मार्च', 'जुलाई-जून', 'सितंबर-अगस्त'], answer: 'अप्रैल-मार्च', category: 'economy', level: 'medium', language: 'hi' },
  { id: 131, question: 'वायुमंडल में सबसे अधिक मात्रा किस गैस की है?', options: ['ऑक्सीजन', 'नाइट्रोजन', 'कार्बन डाइऑक्साइड', 'हीलियम'], answer: 'नाइट्रोजन', category: 'environment', level: 'easy', language: 'hi' },
  { id: 132, question: 'ओजोन परत मुख्य रूप से किस गैस से बनी है?', options: ['O2', 'O3', 'CO2', 'CH4'], answer: 'O3', category: 'environment', level: 'medium', language: 'hi' },
  { id: 133, question: 'ग्लोबल वार्मिंग का मुख्य कारण कौन सा गैस है?', options: ['कार्बन डाइऑक्साइड', 'ऑक्सीजन', 'नाइट्रोजन', 'हाइड्रोजन'], answer: 'कार्बन डाइऑक्साइड', category: 'environment', level: 'easy', language: 'hi' },
  { id: 134, question: 'विश्व पर्यावरण दिवस कब मनाया जाता है?', options: ['22 अप्रैल', '5 जून', '16 सितंबर', '1 दिसंबर'], answer: '5 जून', category: 'environment', level: 'easy', language: 'hi' },
  { id: 135, question: 'नवीकरणीय ऊर्जा का उदाहरण कौन सा है?', options: ['कोयला', 'पेट्रोल', 'सौर ऊर्जा', 'डीजल'], answer: 'सौर ऊर्जा', category: 'environment', level: 'easy', language: 'hi' },
  { id: 136, question: 'जल प्रदूषण का प्रमुख कारण क्या है?', options: ['औद्योगिक अपशिष्ट', 'हवा', 'धूप', 'बर्फ'], answer: 'औद्योगिक अपशिष्ट', category: 'environment', level: 'medium', language: 'hi' },
  { id: 137, question: 'समुद्र स्तर बढ़ने का मुख्य कारण क्या है?', options: ['ज्वालामुखी', 'जलवायु परिवर्तन', 'भूकंप', 'वन कटाई'], answer: 'जलवायु परिवर्तन', category: 'environment', level: 'medium', language: 'hi' },
  { id: 138, question: 'राष्ट्रीय उद्यान मुख्य रूप से किसके संरक्षण के लिए होते हैं?', options: ['खनन', 'जैव विविधता', 'शहरीकरण', 'उद्योग'], answer: 'जैव विविधता', category: 'environment', level: 'medium', language: 'hi' },
  { id: 139, question: 'क्या प्लास्टिक जैव-अवक्षयशील होता है?', options: ['हाँ', 'नहीं', 'केवल कुछ', 'केवल गर्मी में'], answer: 'नहीं', category: 'environment', level: 'easy', language: 'hi' },
  { id: 140, question: 'पेड़ लगाने से वायुमंडल में क्या बढ़ता है?', options: ['कार्बन डाइऑक्साइड', 'ऑक्सीजन', 'मीथेन', 'नाइट्रोजन'], answer: 'ऑक्सीजन', category: 'environment', level: 'easy', language: 'hi' },
  { id: 141, question: 'भरतनाट्यम किस राज्य का नृत्य है?', options: ['केरल', 'तमिलनाडु', 'महाराष्ट्र', 'पंजाब'], answer: 'तमिलनाडु', category: 'art', level: 'easy', language: 'hi' },
  { id: 142, question: 'कथक किस राज्य से जुड़ा है?', options: ['उत्तर प्रदेश', 'तमिलनाडु', 'केरल', 'मणिपुर'], answer: 'उत्तर प्रदेश', category: 'art', level: 'medium', language: 'hi' },
  { id: 143, question: 'कथकली किस राज्य का नृत्य है?', options: ['केरल', 'ओडिशा', 'असम', 'राजस्थान'], answer: 'केरल', category: 'art', level: 'easy', language: 'hi' },
  { id: 144, question: 'ओडिसी किस राज्य से संबंधित है?', options: ['बिहार', 'ओडिशा', 'पश्चिम बंगाल', 'गुजरात'], answer: 'ओडिशा', category: 'art', level: 'easy', language: 'hi' },
  { id: 145, question: 'कुचिपुड़ी किस राज्य का नृत्य है?', options: ['आंध्र प्रदेश', 'कर्नाटक', 'महाराष्ट्र', 'गुजरात'], answer: 'आंध्र प्रदेश', category: 'art', level: 'medium', language: 'hi' },
  { id: 146, question: 'मणिपुरी नृत्य किस राज्य से संबंधित है?', options: ['मणिपुर', 'असम', 'सिक्किम', 'मिजोरम'], answer: 'मणिपुर', category: 'art', level: 'easy', language: 'hi' },
  { id: 147, question: 'मोहिनीअट्टम किस राज्य का नृत्य है?', options: ['केरल', 'तमिलनाडु', 'ओडिशा', 'पंजाब'], answer: 'केरल', category: 'art', level: 'medium', language: 'hi' },
  { id: 148, question: 'सत्रिया नृत्य किस राज्य से संबंधित है?', options: ['असम', 'ओडिशा', 'बिहार', 'झारखंड'], answer: 'असम', category: 'art', level: 'medium', language: 'hi' },
  { id: 149, question: 'मधुबनी चित्रकला किस राज्य से जुड़ी है?', options: ['बिहार', 'गुजरात', 'राजस्थान', 'केरल'], answer: 'बिहार', category: 'art', level: 'easy', language: 'hi' },
  { id: 150, question: 'वारली कला किस राज्य की लोककला है?', options: ['महाराष्ट्र', 'गुजरात', 'पंजाब', 'केरल'], answer: 'महाराष्ट्र', category: 'art', level: 'medium', language: 'hi' },
  { id: 151, question: 'रामचरितमानस के लेखक कौन हैं?', options: ['तुलसीदास', 'वाल्मीकि', 'वेदव्यास', 'कबीर'], answer: 'तुलसीदास', category: 'literature', level: 'easy', language: 'hi' },
  { id: 152, question: 'गीतांजलि के लेखक कौन हैं?', options: ['रवींद्रनाथ टैगोर', 'हरिवंश राय बच्चन', 'जयशंकर प्रसाद', 'महादेवी वर्मा'], answer: 'रवींद्रनाथ टैगोर', category: 'literature', level: 'easy', language: 'hi' },
  { id: 153, question: 'महाभारत के रचयिता कौन हैं?', options: ['वाल्मीकि', 'वेदव्यास', 'तुलसीदास', 'कालिदास'], answer: 'वेदव्यास', category: 'literature', level: 'easy', language: 'hi' },
  { id: 154, question: 'रामायण के रचयिता कौन हैं?', options: ['वाल्मीकि', 'तुलसीदास', 'वेदव्यास', 'कबीर'], answer: 'वाल्मीकि', category: 'literature', level: 'easy', language: 'hi' },
  { id: 155, question: 'पंचतंत्र के रचयिता कौन हैं?', options: ['विष्णु शर्मा', 'कालिदास', 'जयदेव', 'सूरदास'], answer: 'विष्णु शर्मा', category: 'literature', level: 'medium', language: 'hi' },
  { id: 156, question: 'सूरसागर के लेखक कौन हैं?', options: ['सूरदास', 'तुलसीदास', 'कबीर', 'रहीम'], answer: 'सूरदास', category: 'literature', level: 'medium', language: 'hi' },
  { id: 157, question: 'मधुशाला के लेखक कौन हैं?', options: ['हरिवंश राय बच्चन', 'रवींद्रनाथ टैगोर', 'महादेवी वर्मा', 'सुभद्रा कुमारी चौहान'], answer: 'हरिवंश राय बच्चन', category: 'literature', level: 'medium', language: 'hi' },
  { id: 158, question: 'भगवद्गीता किस ग्रंथ का हिस्सा है?', options: ['रामायण', 'महाभारत', 'अथर्ववेद', 'ऋग्वेद'], answer: 'महाभारत', category: 'literature', level: 'medium', language: 'hi' },
  { id: 159, question: 'कबीर के दोहे मुख्यतः किस भाषा में लिखे गए हैं?', options: ['संस्कृत', 'हिंदी', 'तमिल', 'उर्दू'], answer: 'हिंदी', category: 'literature', level: 'medium', language: 'hi' },
  { id: 160, question: 'कालिदास की प्रसिद्ध रचना कौन सी है?', options: ['शकुंतला', 'मधुशाला', 'रामचरितमानस', 'सूरसागर'], answer: 'शकुंतला', category: 'literature', level: 'medium', language: 'hi' },
  { id: 161, question: 'CPU का पूर्ण रूप क्या है?', options: ['Central Processing Unit', 'Control Process Unit', 'Central Power Unit', 'Core Processing Utility'], answer: 'Central Processing Unit', category: 'computer', level: 'easy', language: 'hi' },
  { id: 162, question: 'RAM का पूर्ण रूप क्या है?', options: ['Random Access Memory', 'Read Access Memory', 'Rapid Access Module', 'Random Active Memory'], answer: 'Random Access Memory', category: 'computer', level: 'easy', language: 'hi' },
  { id: 163, question: 'कंप्यूटर का दिमाग किसे कहा जाता है?', options: ['मॉनिटर', 'CPU', 'कीबोर्ड', 'माउस'], answer: 'CPU', category: 'computer', level: 'easy', language: 'hi' },
  { id: 164, question: 'इनपुट डिवाइस कौन सा है?', options: ['प्रिंटर', 'मॉनिटर', 'कीबोर्ड', 'स्पीकर'], answer: 'कीबोर्ड', category: 'computer', level: 'easy', language: 'hi' },
  { id: 165, question: 'आउटपुट डिवाइस कौन सा है?', options: ['माउस', 'कीबोर्ड', 'मॉनिटर', 'स्कैनर'], answer: 'मॉनिटर', category: 'computer', level: 'easy', language: 'hi' },
  { id: 166, question: 'इंटरनेट प्रोटोकॉल का उदाहरण कौन सा है?', options: ['USB', 'TCP/IP', 'HDMI', 'VGA'], answer: 'TCP/IP', category: 'computer', level: 'medium', language: 'hi' },
  { id: 167, question: 'कंप्यूटर में 0 और 1 किस प्रणाली को दर्शाते हैं?', options: ['दशमलव', 'बाइनरी', 'अष्टाधारी', 'षोडशाधारी'], answer: 'बाइनरी', category: 'computer', level: 'easy', language: 'hi' },
  { id: 168, question: 'ऑपरेटिंग सिस्टम का उदाहरण कौन सा है?', options: ['Windows', 'Excel', 'PowerPoint', 'Chrome'], answer: 'Windows', category: 'computer', level: 'easy', language: 'hi' },
  { id: 169, question: 'हार्ड डिस्क किस प्रकार का उपकरण है?', options: ['इनपुट', 'आउटपुट', 'स्टोरेज', 'प्रोसेसिंग'], answer: 'स्टोरेज', category: 'computer', level: 'medium', language: 'hi' },
  { id: 170, question: 'ईमेल में उपयोग होने वाला विशेष चिन्ह कौन सा है?', options: ['#', '@', '&', '%'], answer: '@', category: 'computer', level: 'easy', language: 'hi' },
  { id: 171, question: '2 + 2 = ?', options: ['3', '4', '5', '6'], answer: '4', category: 'math', level: 'easy', language: 'hi' },
  { id: 172, question: '5 × 6 = ?', options: ['20', '25', '30', '35'], answer: '30', category: 'math', level: 'easy', language: 'hi' },
  { id: 173, question: '49 का वर्गमूल क्या है?', options: ['5', '6', '7', '8'], answer: '7', category: 'math', level: 'easy', language: 'hi' },
  { id: 174, question: 'त्रिभुज के कोणों का योग कितना होता है?', options: ['90°', '120°', '180°', '360°'], answer: '180°', category: 'math', level: 'easy', language: 'hi' },
  { id: 175, question: 'π का मान लगभग कितना है?', options: ['2.14', '3.14', '4.14', '5.14'], answer: '3.14', category: 'math', level: 'easy', language: 'hi' },
  { id: 176, question: '1 किलोमीटर में कितने मीटर होते हैं?', options: ['100', '500', '1000', '1500'], answer: '1000', category: 'math', level: 'easy', language: 'hi' },
  { id: 177, question: '10 का वर्ग कितना होता है?', options: ['20', '50', '100', '200'], answer: '100', category: 'math', level: 'easy', language: 'hi' },
  { id: 178, question: 'प्रतिशत का चिन्ह क्या है?', options: ['#', '%', '$', '&'], answer: '%', category: 'math', level: 'easy', language: 'hi' },
  { id: 179, question: 'आयत का परिमाप सूत्र क्या है?', options: ['l × b', '2(l + b)', 'l + b', 'l - b'], answer: '2(l + b)', category: 'math', level: 'medium', language: 'hi' },
  { id: 180, question: 'समांतर रेखाएँ कैसी होती हैं?', options: ['मिलती हैं', 'कभी नहीं मिलतीं', 'हमेशा काटती हैं', 'केवल लंबवत मिलती हैं'], answer: 'कभी नहीं मिलतीं', category: 'math', level: 'easy', language: 'hi' },
  { id: 181, question: 'उत्तर दिशा के विपरीत कौन सी दिशा होती है?', options: ['पूर्व', 'पश्चिम', 'दक्षिण', 'उत्तर-पूर्व'], answer: 'दक्षिण', category: 'reasoning', level: 'easy', language: 'hi' },
  { id: 182, question: '2, 4, 6, 8, ? श्रेणी में अगली संख्या क्या होगी?', options: ['9', '10', '11', '12'], answer: '10', category: 'reasoning', level: 'easy', language: 'hi' },
  { id: 183, question: 'दिन के बाद क्या आता है?', options: ['सुबह', 'रात', 'दोपहर', 'शाम'], answer: 'रात', category: 'reasoning', level: 'easy', language: 'hi' },
  { id: 184, question: 'यदि सोमवार के बाद दूसरा दिन हो तो कौन सा दिन होगा?', options: ['मंगलवार', 'बुधवार', 'गुरुवार', 'शुक्रवार'], answer: 'बुधवार', category: 'reasoning', level: 'medium', language: 'hi' },
  { id: 185, question: 'अंग्रेज़ी वर्णमाला में कुल कितने अक्षर होते हैं?', options: ['24', '25', '26', '28'], answer: '26', category: 'reasoning', level: 'easy', language: 'hi' },
  { id: 186, question: 'यदि 5 पेंसिल की कीमत 25 रुपये है, तो 1 पेंसिल की कीमत क्या होगी?', options: ['3', '4', '5', '6'], answer: '5', category: 'reasoning', level: 'easy', language: 'hi' },
  { id: 187, question: 'घड़ी में 12 बजे घंटे की सुई कहाँ होती है?', options: ['3', '6', '9', '12'], answer: '12', category: 'reasoning', level: 'easy', language: 'hi' },
  { id: 188, question: 'त्रिभुज की कितनी भुजाएँ होती हैं?', options: ['2', '3', '4', '5'], answer: '3', category: 'reasoning', level: 'easy', language: 'hi' },
  { id: 189, question: 'यदि सप्ताह सोमवार से शुरू हो तो सातवाँ दिन कौन सा होगा?', options: ['शनिवार', 'रविवार', 'शुक्रवार', 'गुरुवार'], answer: 'रविवार', category: 'reasoning', level: 'medium', language: 'hi' },
  { id: 190, question: '1, 3, 5, 7, ? श्रेणी में अगली संख्या क्या होगी?', options: ['8', '9', '10', '11'], answer: '9', category: 'reasoning', level: 'easy', language: 'hi' },
  { id: 191, question: 'संज्ञा किसे कहते हैं?', options: ['कार्य बताने वाले शब्द', 'नाम बताने वाले शब्द', 'गुण बताने वाले शब्द', 'संबंध बताने वाले शब्द'], answer: 'नाम बताने वाले शब्द', category: 'hindi-grammar', level: 'easy', language: 'hi' },
  { id: 192, question: 'सर्वनाम का उदाहरण कौन सा है?', options: ['वह', 'लाल', 'दौड़ना', 'सुंदर'], answer: 'वह', category: 'hindi-grammar', level: 'easy', language: 'hi' },
  { id: 193, question: 'विशेषण का कार्य क्या है?', options: ['कार्य बताना', 'गुण बताना', 'नाम बताना', 'काल बताना'], answer: 'गुण बताना', category: 'hindi-grammar', level: 'easy', language: 'hi' },
  { id: 194, question: 'क्रिया किसे कहते हैं?', options: ['नाम बताने वाला शब्द', 'गुण बताने वाला शब्द', 'कार्य बताने वाला शब्द', 'स्थान बताने वाला शब्द'], answer: 'कार्य बताने वाला शब्द', category: 'hindi-grammar', level: 'easy', language: 'hi' },
  { id: 195, question: 'हिंदी में काल कितने होते हैं?', options: ['2', '3', '4', '5'], answer: '3', category: 'hindi-grammar', level: 'easy', language: 'hi' },
  { id: 196, question: 'हिंदी में लिंग के कितने भेद होते हैं?', options: ['1', '2', '3', '4'], answer: '2', category: 'hindi-grammar', level: 'easy', language: 'hi' },
  { id: 197, question: 'हिंदी में वचन के कितने भेद होते हैं?', options: ['1', '2', '3', '4'], answer: '2', category: 'hindi-grammar', level: 'easy', language: 'hi' },
  { id: 198, question: 'संधि का अर्थ क्या है?', options: ['शब्दों का संक्षेप', 'वर्णों का मेल', 'वाक्य का विभाजन', 'अर्थ का विरोध'], answer: 'वर्णों का मेल', category: 'hindi-grammar', level: 'medium', language: 'hi' },
  { id: 199, question: 'समास का अर्थ क्या है?', options: ['अक्षरों का मेल', 'शब्दों का संक्षेप', 'वाक्य का विस्तार', 'उच्चारण का नियम'], answer: 'शब्दों का संक्षेप', category: 'hindi-grammar', level: 'medium', language: 'hi' },
  { id: 200, question: 'उपसर्ग का उदाहरण कौन सा है?', options: ['प्रगति', 'दौड़ना', 'सुंदर', 'किताब'], answer: 'प्रगति', category: 'hindi-grammar', level: 'medium', language: 'hi' }
];

const gkQuestionsPart3: GKQuestion[] = [
  { id: 201, question: 'भारत का संविधान कितने भागों में विभाजित है?', options: ['22', '23', '24', '25'], answer: '25', category: 'polity', level: 'medium', language: 'hi' },
  { id: 202, question: 'भारतीय संविधान में कुल कितनी अनुसूचियाँ हैं?', options: ['10', '12', '14', '16'], answer: '12', category: 'polity', level: 'medium', language: 'hi' },
  { id: 203, question: 'भारतीय रिजर्व बैंक का मुख्यालय कहाँ है?', options: ['नई दिल्ली', 'मुंबई', 'कोलकाता', 'चेन्नई'], answer: 'मुंबई', category: 'economy', level: 'easy', language: 'hi' },
  { id: 204, question: 'नीति आयोग का गठन किस वर्ष हुआ था?', options: ['2014', '2015', '2016', '2017'], answer: '2015', category: 'economy', level: 'medium', language: 'hi' },
  { id: 205, question: 'मानव शरीर की सबसे बड़ी ग्रंथि कौन सी है?', options: ['अग्न्याशय', 'यकृत', 'थायरॉइड', 'हृदय'], answer: 'यकृत', category: 'science', level: 'easy', language: 'hi' },
  { id: 206, question: 'DNA की डबल हेलिक्स संरचना किसने बताई थी?', options: ['न्यूटन', 'डार्विन', 'वॉटसन और क्रिक', 'मेंडल'], answer: 'वॉटसन और क्रिक', category: 'science', level: 'medium', language: 'hi' },
  { id: 207, question: 'नर्मदा नदी किस सागर में गिरती है?', options: ['अरब सागर', 'बंगाल की खाड़ी', 'हिंद महासागर', 'भूमध्य सागर'], answer: 'अरब सागर', category: 'geography', level: 'medium', language: 'hi' },
  { id: 208, question: 'दक्षिण गंगा किस नदी को कहा जाता है?', options: ['कावेरी', 'गोदावरी', 'नर्मदा', 'ताप्ती'], answer: 'गोदावरी', category: 'geography', level: 'easy', language: 'hi' },
  { id: 209, question: '1857 के विद्रोह की शुरुआत कहाँ से हुई थी?', options: ['लखनऊ', 'मेरठ', 'दिल्ली', 'कानपुर'], answer: 'मेरठ', category: 'history', level: 'medium', language: 'hi' },
  { id: 210, question: 'साइमन कमीशन भारत कब आया था?', options: ['1927', '1928', '1930', '1932'], answer: '1928', category: 'history', level: 'medium', language: 'hi' },
  { id: 211, question: 'ओजोन परत वायुमंडल की किस परत में पाई जाती है?', options: ['क्षोभमंडल', 'समताप मंडल', 'मध्य मंडल', 'आयन मंडल'], answer: 'समताप मंडल', category: 'environment', level: 'medium', language: 'hi' },
  { id: 212, question: 'ग्रीनहाउस प्रभाव का प्रमुख गैस कौन सा है?', options: ['ऑक्सीजन', 'नाइट्रोजन', 'कार्बन डाइऑक्साइड', 'हाइड्रोजन'], answer: 'कार्बन डाइऑक्साइड', category: 'environment', level: 'easy', language: 'hi' },
  { id: 213, question: 'CPU का पूर्ण रूप क्या है?', options: ['Central Processing Unit', 'Control Processing Unit', 'Computer Processing Unit', 'Central Program Utility'], answer: 'Central Processing Unit', category: 'computer', level: 'easy', language: 'hi' },
  { id: 214, question: 'URL का पूर्ण रूप क्या है?', options: ['Uniform Resource Locator', 'Universal Resource Link', 'United Resource Locator', 'Uniform Result Link'], answer: 'Uniform Resource Locator', category: 'computer', level: 'easy', language: 'hi' },
  { id: 215, question: 'भारत का पहला उपग्रह कौन सा था?', options: ['आर्यभट्ट', 'रोहिणी', 'भास्कर', 'इनसैट'], answer: 'आर्यभट्ट', category: 'space', level: 'easy', language: 'hi' },
  { id: 216, question: 'चंद्रयान-1 का प्रक्षेपण किस वर्ष हुआ था?', options: ['2007', '2008', '2009', '2010'], answer: '2008', category: 'space', level: 'medium', language: 'hi' },
  { id: 217, question: 'फुटबॉल विश्व कप कितने वर्षों में आयोजित होता है?', options: ['2', '3', '4', '5'], answer: '4', category: 'sports', level: 'easy', language: 'hi' },
  { id: 218, question: 'क्रिकेट पिच के बीच की दूरी कितनी होती है?', options: ['20 गज', '21 गज', '22 गज', '23 गज'], answer: '22 गज', category: 'sports', level: 'medium', language: 'hi' },
  { id: 219, question: '3, 6, 9, 12, ? श्रेणी में अगली संख्या क्या होगी?', options: ['13', '14', '15', '16'], answer: '15', category: 'reasoning', level: 'easy', language: 'hi' },
  { id: 220, question: '200 का 20% कितना होगा?', options: ['20', '30', '40', '50'], answer: '40', category: 'math', level: 'easy', language: 'hi' },
  { id: 221, question: 'आयत का क्षेत्रफल सूत्र क्या है?', options: ['l × b', '2(l + b)', 'l + b', 'l - b'], answer: 'l × b', category: 'math', level: 'easy', language: 'hi' },
  { id: 222, question: 'यक्षगान किस राज्य की नृत्य शैली है?', options: ['केरल', 'कर्नाटक', 'ओडिशा', 'बिहार'], answer: 'कर्नाटक', category: 'art', level: 'medium', language: 'hi' },
  { id: 223, question: 'गरबा किस राज्य का लोकनृत्य है?', options: ['राजस्थान', 'गुजरात', 'पंजाब', 'असम'], answer: 'गुजरात', category: 'art', level: 'easy', language: 'hi' },
  { id: 224, question: 'गीतगोविंद के लेखक कौन हैं?', options: ['जयदेव', 'तुलसीदास', 'कबीर', 'कालिदास'], answer: 'जयदेव', category: 'literature', level: 'medium', language: 'hi' },
  { id: 225, question: 'कामायनी के लेखक कौन हैं?', options: ['जयशंकर प्रसाद', 'सूरदास', 'रवींद्रनाथ टैगोर', 'महादेवी वर्मा'], answer: 'जयशंकर प्रसाद', category: 'literature', level: 'medium', language: 'hi' },
  { id: 226, question: 'जनसंख्या के आधार पर भारत का सबसे बड़ा राज्य कौन सा है?', options: ['उत्तर प्रदेश', 'महाराष्ट्र', 'बिहार', 'राजस्थान'], answer: 'उत्तर प्रदेश', category: 'india', level: 'easy', language: 'hi' },
  { id: 227, question: 'विश्व जल दिवस कब मनाया जाता है?', options: ['22 मार्च', '5 जून', '2 अक्टूबर', '11 जुलाई'], answer: '22 मार्च', category: 'general', level: 'easy', language: 'hi' },
  { id: 228, question: 'ध्वनि की तीव्रता की इकाई क्या है?', options: ['हर्ट्ज', 'डेसिबल', 'न्यूटन', 'जूल'], answer: 'डेसिबल', category: 'science', level: 'medium', language: 'hi' },
  { id: 229, question: 'लोकसभा में अधिकतम कितने सदस्य होते हैं?', options: ['525', '545', '565', '585'], answer: '545', category: 'polity', level: 'medium', language: 'hi' },
  { id: 230, question: 'भारतीय रुपये के नोट कौन जारी करता है?', options: ['वित्त मंत्रालय', 'रिजर्व बैंक ऑफ इंडिया', 'SEBI', 'नीति आयोग'], answer: 'रिजर्व बैंक ऑफ इंडिया', category: 'economy', level: 'easy', language: 'hi' }
];

const gkQuestions: GKQuestion[] = [...gkQuestionsPart1, ...gkQuestionsPart2, ...gkQuestionsPart3];

const gkTopics: GKTopic[] = [
  {
    title: 'Best GK Question In Hindi - Best GK In Hindi',
    slug: 'best-gk-question-in-hindi-best-gk-in-hindi',
    group: 'general',
    description: 'सबसे भरोसेमंद और परीक्षा केंद्रित हिंदी GK प्रश्नों का चयनित संग्रह।',
    seoTitle: 'Best GK Question In Hindi - Best GK In Hindi | MoneyCal GK',
    seoDescription: '200+ हिंदी GK प्रश्न, क्विज़ मोड, स्मार्ट फिल्टर और टॉपिक-वाइज स्लग के साथ सर्वश्रेष्ठ GK संग्रह।',
    categories: ['general', 'india', 'history', 'geography', 'science', 'polity', 'economy'],
    levels: ['easy', 'medium']
  },
  {
    title: 'General Knowledge in Hindi',
    slug: 'general-knowledge-in-hindi',
    group: 'general',
    description: 'बेसिक से लेकर एडवांस तक सामान्य ज्ञान के आसान और उपयोगी प्रश्न।',
    seoTitle: 'General Knowledge in Hindi - Hindi GK Questions',
    seoDescription: 'सामान्य ज्ञान के हिंदी प्रश्न, स्कूल और प्रतियोगी परीक्षा के लिए भरोसेमंद अभ्यास।',
    categories: ['general'],
    levels: ['easy', 'medium']
  },
  {
    title: 'India GK Questions in Hindi',
    slug: 'india-gk-questions-in-hindi',
    group: 'general',
    description: 'भारत से जुड़े महत्वपूर्ण GK प्रश्न — राज्य, राजधानी, प्रतीक और संविधान।',
    seoTitle: 'India GK Questions in Hindi | Bharat GK',
    seoDescription: 'भारत जीके के लिए हिंदी प्रश्न, क्विज़ मोड और टॉपिक फिल्टर के साथ।',
    categories: ['india', 'symbols', 'polity'],
    levels: ['easy', 'medium']
  },
  {
    title: 'Kids GK in Hindi',
    slug: 'kids-gk-in-hindi',
    group: 'school',
    description: 'बच्चों के लिए आसान और मज़ेदार GK प्रश्न — जानवर, सामान्य ज्ञान और गणित।',
    seoTitle: 'Kids GK in Hindi | आसान GK प्रश्न',
    seoDescription: 'किड्स GK के लिए आसान हिंदी प्रश्न और क्विज़ मोड।',
    categories: ['general', 'animals', 'symbols', 'math'],
    levels: ['easy']
  },
  {
    title: 'Class 6 GK Questions in Hindi',
    slug: 'class-6-gk-questions-in-hindi',
    group: 'school',
    description: 'कक्षा 6 के लिए स्कूल लेवल GK प्रश्न — विज्ञान, भारत और भूगोल।',
    seoTitle: 'Class 6 GK Questions in Hindi',
    seoDescription: 'कक्षा 6 GK के लिए हिंदी प्रश्नों का आसान संग्रह।',
    categories: ['general', 'india', 'science', 'geography'],
    levels: ['easy']
  },
  {
    title: 'Class 7 GK Questions in Hindi',
    slug: 'class-7-gk-questions-in-hindi',
    group: 'school',
    description: 'कक्षा 7 के लिए हिंदी GK प्रश्न — इतिहास, विज्ञान और सामान्य ज्ञान।',
    seoTitle: 'Class 7 GK Questions in Hindi',
    seoDescription: 'कक्षा 7 छात्रों के लिए विषय आधारित हिंदी GK प्रश्न।',
    categories: ['general', 'history', 'science'],
    levels: ['easy', 'medium']
  },
  {
    title: 'Class 8 GK Questions in Hindi',
    slug: 'class-8-gk-questions-in-hindi',
    group: 'school',
    description: 'कक्षा 8 के लिए विस्तृत GK प्रश्न — विज्ञान, भूगोल और भारत।',
    seoTitle: 'Class 8 GK Questions in Hindi',
    seoDescription: 'कक्षा 8 छात्रों के लिए हिंदी GK प्रश्नों का अभ्यास सेट।',
    categories: ['general', 'india', 'geography', 'science'],
    levels: ['easy', 'medium']
  },
  {
    title: 'Class 9 GK Questions in Hindi',
    slug: 'class-9-gk-questions-in-hindi',
    group: 'school',
    description: 'कक्षा 9 के लिए परीक्षा केंद्रित GK — इतिहास, विज्ञान और तर्क।',
    seoTitle: 'Class 9 GK Questions in Hindi',
    seoDescription: 'कक्षा 9 के लिए हिंदी GK प्रश्नों का स्मार्ट संग्रह।',
    categories: ['history', 'science', 'reasoning'],
    levels: ['medium']
  },
  {
    title: 'Class 10 GK Questions in Hindi',
    slug: 'class-10-gk-questions-in-hindi',
    group: 'school',
    description: 'कक्षा 10 के लिए प्रतियोगी परीक्षा की तैयारी वाला GK सेट।',
    seoTitle: 'Class 10 GK Questions in Hindi',
    seoDescription: 'कक्षा 10 के लिए हिंदी GK प्रश्न, क्विज़ मोड और फ़िल्टर के साथ।',
    categories: ['india', 'history', 'polity', 'economy'],
    levels: ['medium']
  },
  {
    title: 'Competitive Exam GK in Hindi',
    slug: 'competitive-exam-gk-in-hindi',
    group: 'competitive',
    description: 'SSC, बैंक, रेलवे और UPSC जैसी परीक्षाओं के लिए GK प्रश्न।',
    seoTitle: 'Competitive Exam GK in Hindi | परीक्षा GK',
    seoDescription: 'प्रतियोगी परीक्षा के लिए हिंदी GK प्रश्न, टॉपिक-वाइज फ़िल्टर और क्विज़ मोड।',
    categories: ['polity', 'economy', 'history', 'geography', 'science'],
    levels: ['medium', 'hard']
  },
  {
    title: 'SSC GK Questions in Hindi',
    slug: 'ssc-gk-questions-in-hindi',
    group: 'competitive',
    description: 'SSC परीक्षाओं के लिए आवश्यक GK प्रश्न और टॉपिक कवरेज।',
    seoTitle: 'SSC GK Questions in Hindi',
    seoDescription: 'SSC GK तैयारी के लिए हिंदी प्रश्नों का भरोसेमंद संग्रह।',
    categories: ['polity', 'history', 'geography', 'science'],
    levels: ['medium', 'hard']
  },
  {
    title: 'Railway GK Questions in Hindi',
    slug: 'railway-gk-questions-in-hindi',
    group: 'competitive',
    description: 'रेलवे परीक्षाओं के लिए तेज़ रिविजन वाला GK संग्रह।',
    seoTitle: 'Railway GK Questions in Hindi',
    seoDescription: 'रेलवे परीक्षा के लिए हिंदी GK प्रश्न और क्विज़ मोड।',
    categories: ['general', 'india', 'science', 'math'],
    levels: ['easy', 'medium']
  },
  {
    title: 'Banking GK Questions in Hindi',
    slug: 'banking-gk-questions-in-hindi',
    group: 'competitive',
    description: 'बैंकिंग परीक्षाओं के लिए अर्थव्यवस्था और सामान्य ज्ञान।',
    seoTitle: 'Banking GK Questions in Hindi',
    seoDescription: 'बैंकिंग परीक्षा के लिए हिंदी GK और अर्थव्यवस्था प्रश्न।',
    categories: ['economy', 'polity', 'general'],
    levels: ['medium', 'hard']
  },
  {
    title: 'UPSC GK Questions in Hindi',
    slug: 'upsc-gk-questions-in-hindi',
    group: 'competitive',
    description: 'UPSC तैयारी के लिए व्यापक GK — इतिहास, भूगोल, अर्थव्यवस्था और राजनीति।',
    seoTitle: 'UPSC GK Questions in Hindi',
    seoDescription: 'UPSC के लिए हिंदी GK प्रश्न और टॉपिक-वाइज स्लग।',
    categories: ['history', 'geography', 'polity', 'economy', 'science'],
    levels: ['medium', 'hard']
  },
  {
    title: 'State PCS GK Questions in Hindi',
    slug: 'state-pcs-gk-questions-in-hindi',
    group: 'competitive',
    description: 'राज्य PCS परीक्षाओं के लिए हिंदी GK प्रश्नों का संग्रह।',
    seoTitle: 'State PCS GK Questions in Hindi',
    seoDescription: 'राज्य PCS के लिए हिंदी GK प्रश्न और अभ्यास मोड।',
    categories: ['polity', 'history', 'geography', 'economy'],
    levels: ['medium', 'hard']
  },
  {
    title: 'Defence GK Questions in Hindi',
    slug: 'defence-gk-questions-in-hindi',
    group: 'competitive',
    description: 'NDA, CDS और रक्षा परीक्षाओं के लिए GK अभ्यास।',
    seoTitle: 'Defence GK Questions in Hindi',
    seoDescription: 'रक्षा परीक्षाओं के लिए हिंदी GK प्रश्न और क्विज़ मोड।',
    categories: ['general', 'science', 'math', 'reasoning'],
    levels: ['easy', 'medium']
  },
  {
    title: 'Indian Polity GK',
    slug: 'indian-polity-gk-in-hindi',
    group: 'subject',
    description: 'संविधान, संसद, न्यायपालिका और मौलिक अधिकारों पर आधारित GK।',
    seoTitle: 'Indian Polity GK in Hindi',
    seoDescription: 'भारतीय राजनीति पर आधारित हिंदी GK प्रश्नों का संग्रह।',
    categories: ['polity'],
    levels: ['easy', 'medium', 'hard']
  },
  {
    title: 'Indian History GK',
    slug: 'indian-history-gk-in-hindi',
    group: 'subject',
    description: 'प्राचीन, मध्यकालीन और आधुनिक इतिहास के महत्वपूर्ण प्रश्न।',
    seoTitle: 'Indian History GK in Hindi',
    seoDescription: 'इतिहास GK के हिंदी प्रश्न और परीक्षा केंद्रित अभ्यास।',
    categories: ['history'],
    levels: ['easy', 'medium', 'hard']
  },
  {
    title: 'Indian Geography GK',
    slug: 'indian-geography-gk-in-hindi',
    group: 'subject',
    description: 'भारत के भूगोल, नदियाँ, पर्वत और जलवायु पर आधारित GK।',
    seoTitle: 'Indian Geography GK in Hindi',
    seoDescription: 'भारतीय भूगोल GK के लिए हिंदी प्रश्नों का सेट।',
    categories: ['geography', 'india'],
    levels: ['easy', 'medium']
  },
  {
    title: 'World GK Questions in Hindi',
    slug: 'world-gk-questions-in-hindi',
    group: 'subject',
    description: 'विश्व के देश, राजधानी, संस्थाएँ और सामान्य ज्ञान के प्रश्न।',
    seoTitle: 'World GK Questions in Hindi',
    seoDescription: 'वर्ल्ड GK के हिंदी प्रश्न, क्विज़ मोड और टॉपिक स्लग।',
    categories: ['world'],
    levels: ['easy', 'medium']
  },
  {
    title: 'Science GK Questions in Hindi',
    slug: 'science-gk-questions-in-hindi',
    group: 'subject',
    description: 'भौतिकी, रसायन और जीवविज्ञान आधारित विज्ञान GK।',
    seoTitle: 'Science GK Questions in Hindi',
    seoDescription: 'विज्ञान GK के हिंदी प्रश्न और आसान अभ्यास मोड।',
    categories: ['science'],
    levels: ['easy', 'medium']
  },
  {
    title: 'Space GK and ISRO',
    slug: 'space-gk-and-isro-in-hindi',
    group: 'subject',
    description: 'सौरमंडल, ग्रह, उपग्रह और ISRO से जुड़े GK प्रश्न।',
    seoTitle: 'Space GK and ISRO in Hindi',
    seoDescription: 'स्पेस GK के लिए हिंदी प्रश्न और क्विज़ मोड।',
    categories: ['space', 'science'],
    levels: ['easy', 'medium']
  },
  {
    title: 'Computer GK in Hindi',
    slug: 'computer-gk-in-hindi',
    group: 'subject',
    description: 'कंप्यूटर बेसिक्स, इंटरनेट और टेक से जुड़े GK प्रश्न।',
    seoTitle: 'Computer GK in Hindi',
    seoDescription: 'कंप्यूटर GK के हिंदी प्रश्न और अभ्यास मोड।',
    categories: ['computer'],
    levels: ['easy', 'medium']
  },
  {
    title: 'Environment GK in Hindi',
    slug: 'environment-gk-in-hindi',
    group: 'subject',
    description: 'पर्यावरण, प्रदूषण और जलवायु से जुड़े GK प्रश्न।',
    seoTitle: 'Environment GK in Hindi',
    seoDescription: 'पर्यावरण GK के हिंदी प्रश्न और प्रतियोगी परीक्षा फोकस।',
    categories: ['environment'],
    levels: ['easy', 'medium']
  },
  {
    title: 'Sports GK in Hindi',
    slug: 'sports-gk-in-hindi',
    group: 'subject',
    description: 'खेल और खिलाड़ियों से जुड़े GK प्रश्नों का संग्रह।',
    seoTitle: 'Sports GK in Hindi',
    seoDescription: 'खेल GK के हिंदी प्रश्न और क्विज़ मोड।',
    categories: ['sports'],
    levels: ['easy', 'medium']
  },
  {
    title: 'Economy GK in Hindi',
    slug: 'economy-gk-in-hindi',
    group: 'subject',
    description: 'अर्थव्यवस्था, बजट और बैंकिंग से जुड़े GK प्रश्न।',
    seoTitle: 'Economy GK in Hindi',
    seoDescription: 'अर्थव्यवस्था GK के हिंदी प्रश्न और परीक्षा केंद्रित अभ्यास।',
    categories: ['economy'],
    levels: ['medium', 'hard']
  },
  {
    title: 'Math GK in Hindi',
    slug: 'math-gk-in-hindi',
    group: 'subject',
    description: 'गणित के बेसिक फॉर्मूले और तेज़ प्रश्नों का अभ्यास।',
    seoTitle: 'Math GK in Hindi',
    seoDescription: 'Math GK के हिंदी प्रश्न और क्विज़ मोड।',
    categories: ['math'],
    levels: ['easy', 'medium']
  },
  {
    title: 'Reasoning GK in Hindi',
    slug: 'reasoning-gk-in-hindi',
    group: 'subject',
    description: 'तर्कशक्ति और लॉजिकल प्रश्नों का स्मार्ट अभ्यास।',
    seoTitle: 'Reasoning GK in Hindi',
    seoDescription: 'रीज़निंग GK के हिंदी प्रश्न और परीक्षा फोकस।',
    categories: ['reasoning'],
    levels: ['easy', 'medium']
  },
  {
    title: 'Hindi Grammar GK',
    slug: 'hindi-grammar-gk',
    group: 'language',
    description: 'हिंदी व्याकरण के मूल नियमों और प्रश्नों का संग्रह।',
    seoTitle: 'Hindi Grammar GK in Hindi',
    seoDescription: 'हिंदी व्याकरण GK प्रश्न और स्कूल लेवल अभ्यास।',
    categories: ['hindi-grammar'],
    levels: ['easy', 'medium']
  },
  {
    title: 'National Symbols GK',
    slug: 'national-symbols-gk-in-hindi',
    group: 'general',
    description: 'राष्ट्रीय प्रतीक, ध्वज और राष्ट्रगान से जुड़े प्रश्न।',
    seoTitle: 'National Symbols GK in Hindi',
    seoDescription: 'राष्ट्रीय प्रतीक GK प्रश्नों का सरल संग्रह।',
    categories: ['symbols', 'india'],
    levels: ['easy', 'medium']
  },
  {
    title: 'Inventions GK in Hindi',
    slug: 'inventions-gk-in-hindi',
    group: 'subject',
    description: 'आविष्कार, वैज्ञानिक और महत्वपूर्ण खोजों पर आधारित GK।',
    seoTitle: 'Inventions GK in Hindi',
    seoDescription: 'आविष्कार GK के हिंदी प्रश्न और क्विज़ मोड।',
    categories: ['inventions'],
    levels: ['easy', 'medium']
  },
  {
    title: 'Art & Culture GK in Hindi',
    slug: 'art-and-culture-gk-in-hindi',
    group: 'subject',
    description: 'नृत्य, कला, लोकसंस्कृति और भारतीय परंपराओं पर आधारित GK।',
    seoTitle: 'Art & Culture GK in Hindi',
    seoDescription: 'कला और संस्कृति GK के हिंदी प्रश्न और क्विज़ मोड।',
    categories: ['art'],
    levels: ['easy', 'medium']
  },
  {
    title: 'Literature GK in Hindi',
    slug: 'literature-gk-in-hindi',
    group: 'subject',
    description: 'हिंदी साहित्य, लेखक और प्रसिद्ध रचनाओं पर आधारित GK।',
    seoTitle: 'Literature GK in Hindi',
    seoDescription: 'साहित्य GK के हिंदी प्रश्न और आसान अभ्यास मोड।',
    categories: ['literature'],
    levels: ['easy', 'medium']
  },
  {
    title: 'Animals GK in Hindi',
    slug: 'animals-gk-in-hindi',
    group: 'school',
    description: 'जानवरों से जुड़े आसान और रोचक GK प्रश्न।',
    seoTitle: 'Animals GK in Hindi',
    seoDescription: 'जानवरों पर आधारित हिंदी GK प्रश्न और किड्स फ्रेंडली क्विज़।',
    categories: ['animals'],
    levels: ['easy', 'medium']
  },
  {
    title: 'Quick Revision GK for Exams',
    slug: 'quick-revision-gk-for-exams',
    group: 'competitive',
    description: 'परीक्षा से पहले तेज़ रिविजन के लिए चयनित प्रश्न।',
    seoTitle: 'Quick Revision GK for Exams in Hindi',
    seoDescription: 'तेज़ रिविजन के लिए हिंदी GK प्रश्न और टॉपिक-वाइज स्लग।',
    categories: ['general', 'polity', 'economy', 'history', 'geography'],
    levels: ['medium']
  },
  {
    title: 'Daily GK Quiz in Hindi',
    slug: 'daily-gk-quiz-in-hindi',
    group: 'general',
    description: 'हर दिन अभ्यास के लिए आसान GK क्विज़ सेट।',
    seoTitle: 'Daily GK Quiz in Hindi',
    seoDescription: 'डेली GK क्विज़ के लिए हिंदी प्रश्न और मोबाइल फ्रेंडली मोड।',
    categories: ['general', 'science', 'world'],
    levels: ['easy', 'medium']
  }
];

const topicGroups: Array<{ id: string; title: string; description: string }> = [
  { id: 'general', title: 'General GK', description: 'बेसिक और ऑल-राउंड GK टॉपिक्स' },
  { id: 'school', title: 'School GK', description: 'कक्षा 6 से 10 तक के लिए' },
  { id: 'competitive', title: 'Competitive Exams', description: 'SSC, बैंक, रेलवे और UPSC' },
  { id: 'subject', title: 'Subject Wise GK', description: 'इतिहास, भूगोल, विज्ञान और अर्थव्यवस्था' },
  { id: 'language', title: 'Language GK', description: 'हिंदी व्याकरण और भाषा आधारित प्रश्न' }
];

const categoryHighlights = [
  {
    title: 'Polity GK',
    slug: 'indian-polity-gk-in-hindi',
    description: 'संविधान, संसद और अधिकारों पर आधारित प्रश्न।'
  },
  {
    title: 'History GK',
    slug: 'indian-history-gk-in-hindi',
    description: 'प्राचीन से आधुनिक इतिहास के महत्वपूर्ण प्रश्न।'
  },
  {
    title: 'Geography GK',
    slug: 'indian-geography-gk-in-hindi',
    description: 'नदियाँ, पर्वत, जलवायु और मानचित्र आधारित प्रश्न।'
  },
  {
    title: 'Science GK',
    slug: 'science-gk-questions-in-hindi',
    description: 'भौतिकी, रसायन और जीवविज्ञान के बेसिक प्रश्न।'
  },
  {
    title: 'Economy GK',
    slug: 'economy-gk-in-hindi',
    description: 'बजट, बैंकिंग और आर्थिक अवधारणाओं पर GK।'
  },
  {
    title: 'Space GK',
    slug: 'space-gk-and-isro-in-hindi',
    description: 'ISRO, ग्रहों और अंतरिक्ष से जुड़े प्रश्न।'
  },
  {
    title: 'Art & Culture GK',
    slug: 'art-and-culture-gk-in-hindi',
    description: 'नृत्य, लोककला और संस्कृति से जुड़े प्रश्न।'
  },
  {
    title: 'Literature GK',
    slug: 'literature-gk-in-hindi',
    description: 'हिंदी साहित्य, लेखक और रचनाओं के प्रश्न।'
  }
];

const MoneycalGK: React.FC = () => {
  const { categorySlug, topicSlug } = useParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [showAnswers, setShowAnswers] = useState(false);
  const [quizMode, setQuizMode] = useState(false);
  const [shuffleMode, setShuffleMode] = useState(false);
  const [quizIndex, setQuizIndex] = useState(0);
  const [externalQuestions, setExternalQuestions] = useState<GKQuestion[]>([]);
  const [selectedOptions, setSelectedOptions] = useState<Record<number, string>>({});
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(50);

  const topic = useMemo(() => gkTopics.find((item) => item.slug === topicSlug), [topicSlug]);

  const baseQuestions = useMemo(() => {
    let list = externalQuestions.length > 0 ? externalQuestions : gkQuestions;
    if (topic?.categories && topic.categories.length > 0) {
      list = list.filter((q: GKQuestion) => topic.categories?.includes(q.category));
    }
    if (topic?.levels && topic.levels.length > 0) {
      list = list.filter((q: GKQuestion) => topic.levels?.includes(q.level));
    }
    if (topic?.language) {
      list = list.filter((q: GKQuestion) => q.language === topic.language);
    }
    return list;
  }, [topic]);

  const filteredQuestions = useMemo(() => {
    let list = baseQuestions;
    if (selectedCategory !== 'all') {
      list = list.filter((q: GKQuestion) => q.category === selectedCategory);
    }
    if (selectedLevel !== 'all') {
      list = list.filter((q: GKQuestion) => q.level === selectedLevel);
    }
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      list = list.filter((q: GKQuestion) =>
        q.question.toLowerCase().includes(term) ||
        q.answer.toLowerCase().includes(term) ||
        q.options.some((opt: string) => opt.toLowerCase().includes(term))
      );
    }
    if (topic?.limit) {
      list = list.slice(0, topic.limit);
    }
    return list;
  }, [baseQuestions, selectedCategory, selectedLevel, searchTerm, topic]);

  const shuffledQuestions = useMemo(() => {
    if (!shuffleMode) return filteredQuestions;
    const copy = [...filteredQuestions];
    for (let i = copy.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }, [filteredQuestions, shuffleMode]);

  const totalShuffled = shuffledQuestions.length;
  const activeQuestions = useMemo(() => {
    if (pageSize === -1) return shuffledQuestions;
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    return shuffledQuestions.slice(start, end);
  }, [shuffledQuestions, page, pageSize]);
  const quizQuestion = activeQuestions[quizIndex];

  useEffect(() => {
    setQuizIndex(0);
    setPage(1);
  }, [searchTerm, selectedCategory, selectedLevel, topicSlug, categorySlug, shuffleMode, topic]);

  useEffect(() => {
    if (!topicSlug) {
      setExternalQuestions([]);
      return;
    }
    const controller = new AbortController();
    const load = async () => {
      try {
        const merged: GKQuestion[] = [];
        let maxParts = 8;
        let base = topicSlug;
        try {
          const manifestRes = await fetch('/gk/manifest.json', { signal: controller.signal });
          if (manifestRes.ok) {
            const manifest = await manifestRes.json();
            const entry = manifest && manifest[topicSlug];
            if (entry !== undefined) {
              if (typeof entry === 'number') {
                const parts = Number(entry);
                if (!Number.isNaN(parts) && parts > 0) maxParts = parts;
                base = topicSlug;
              } else if (typeof entry === 'object') {
                const parts = Number(entry.parts);
                if (!Number.isNaN(parts) && parts > 0) maxParts = parts;
                if (typeof entry.base === 'string' && entry.base.length > 0) base = entry.base;
              }
            } else {
              base = topicSlug;
            }
          }
        } catch {
          base = topicSlug;
        }
        let partsFound = 0;
        // Prefetch first part to render quickly
        try {
          const firstRes = await fetch(`/gk/${base}-part1.json`, { signal: controller.signal });
          if (firstRes.ok) {
            const firstData = await firstRes.json();
            if (Array.isArray(firstData) && firstData.length > 0) {
              merged.push(...firstData);
              partsFound = 1;
              setExternalQuestions([...merged]);
              // Load remaining parts sequentially
              for (let i = 2; i <= maxParts; i += 1) {
                try {
                  const r = await fetch(`/gk/${base}-part${i}.json`, { signal: controller.signal });
                  if (!r.ok) break;
                  const d = await r.json();
                  if (Array.isArray(d) && d.length > 0) {
                    merged.push(...d);
                    setExternalQuestions([...merged]);
                  } else {
                    break;
                  }
                } catch {
                  break;
                }
              }
            }
          }
        } catch {
          setExternalQuestions([]);
        }
        if (partsFound === 0) {
          const res = await fetch(`/gk/${base}.json`, { signal: controller.signal });
          if (res.ok) {
            const data = await res.json();
            if (Array.isArray(data) && data.length > 0) {
              merged.push(...data);
              setExternalQuestions([...merged]);
            }
          }
        }
      } catch {
        setExternalQuestions([]);
      }
    };
    load();
    return () => controller.abort();
  }, [topicSlug]);

  const pageTitle = topic ? topic.seoTitle : 'Best GK Question In Hindi - Best GK In Hindi | MoneyCal GK';
  const pageDescription = topic ? topic.seoDescription : '200+ हिंदी GK प्रश्नों का सबसे बड़ा संग्रह। आसान, परीक्षा केंद्रित और मोबाइल फ्रेंडली GK क्विज़ के साथ।';
  const pageUrl = topic ? `/gk/${topic.slug}` : '/gk';

  const breadcrumbs = topic
    ? [
        { name: 'Home', url: '/' },
        { name: 'MoneyCal GK', url: '/gk' },
        { name: topic.title, url: `/gk/${topic.slug}` }
      ]
    : [
        { name: 'Home', url: '/' },
        { name: 'MoneyCal GK', url: '/gk' }
      ];

  const faqData = [
    { question: 'MoneyCal GK सेक्शन में कितने प्रश्न हैं?', answer: 'यहाँ 200+ हिंदी GK प्रश्न मिलते हैं जिन्हें आप क्विज़ मोड में अभ्यास कर सकते हैं।' },
    { question: 'क्या सभी प्रश्नों के उत्तर दिए गए हैं?', answer: 'हाँ, हर प्रश्न के साथ सही उत्तर और विकल्प दिए गए हैं।' },
    { question: 'क्या यह बच्चों और प्रतियोगी परीक्षाओं दोनों के लिए है?', answer: 'हाँ, हमने बच्चों, स्कूल स्तर और प्रतियोगी परीक्षा स्तर के लिए अलग-अलग टॉपिक्स बनाए हैं।' },
    { question: 'क्या मैं टॉपिक्स के हिसाब से प्रश्न फ़िल्टर कर सकता हूँ?', answer: 'हाँ, आप टॉपिक पेज और फ़िल्टर का उपयोग करके प्रश्न चुन सकते हैं।' },
    { question: 'क्या क्विज़ मोड मोबाइल पर काम करता है?', answer: 'हाँ, यह सेक्शन मोबाइल फ्रेंडली और तेज़ लोडिंग के लिए डिज़ाइन किया गया है।' }
  ];

  const relatedTools = [
    { name: 'EMI Calculator', url: '/calculators/emi-calculator' },
    { name: 'SIP Calculator', url: '/calculators/sip-calculator' },
    { name: 'Income Tax Calculator', url: '/calculators/income-tax-calculator' },
    { name: 'GST Calculator', url: '/calculators/gst-calculator' },
    { name: 'Home Loan Calculator', url: '/calculators/home-loan-calculator' },
    { name: 'Retirement Calculator', url: '/calculators/retirement-calculator' }
  ];

  const categories = [
    { value: 'all', label: 'All Topics' },
    { value: 'general', label: 'General' },
    { value: 'india', label: 'India' },
    { value: 'history', label: 'History' },
    { value: 'geography', label: 'Geography' },
    { value: 'science', label: 'Science' },
    { value: 'world', label: 'World' },
    { value: 'space', label: 'Space' },
    { value: 'animals', label: 'Animals' },
    { value: 'inventions', label: 'Inventions' },
    { value: 'symbols', label: 'National Symbols' },
    { value: 'sports', label: 'Sports' },
    { value: 'polity', label: 'Polity' },
    { value: 'economy', label: 'Economy' },
    { value: 'environment', label: 'Environment' },
    { value: 'computer', label: 'Computer' },
    { value: 'math', label: 'Math' },
    { value: 'reasoning', label: 'Reasoning' },
    { value: 'hindi-grammar', label: 'Hindi Grammar' },
    { value: 'art', label: 'Art & Culture' },
    { value: 'literature', label: 'Literature' }
  ];

  const levels = [
    { value: 'all', label: 'All Levels' },
    { value: 'easy', label: 'Easy' },
    { value: 'medium', label: 'Medium' },
    { value: 'hard', label: 'Hard' }
  ];

  const itemListData = useMemo(() => {
    if (!topic) return undefined;
    const items = baseQuestions.slice(0, 20).map((q: any, idx: number) => ({
      "@type": "ListItem",
      "position": idx + 1,
      "name": q.question.length > 120 ? `${q.question.slice(0, 117)}...` : q.question,
      "item": (() => {
        const u = pageUrl.startsWith('http') ? pageUrl : `https://moneycal.in${pageUrl}`;
        try {
          const parsed = new URL(u);
          parsed.pathname = parsed.pathname.replace(/^\/moneycal\.in(?=\/|$)/i, '') || '/';
          return parsed.toString();
        } catch { return u; }
      })()
    }));
    return {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "itemListElement": items
    };
  }, [topic, baseQuestions, pageUrl]);

  const qaPageData = useMemo(() => {
    if (!topic) return undefined;
    const qaItems = baseQuestions.slice(0, 10).map((q: any) => ({
      "@type": "Question",
      "name": q.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": q.answer
      }
    }));
    return {
      "@context": "https://schema.org",
      "@type": "QAPage",
      "mainEntity": qaItems
    };
  }, [topic, baseQuestions]);

  const wordCount = useMemo(() => {
    const qWords = baseQuestions.reduce((acc: number, q: any) => {
      const qw = q.question.split(/\s+/).filter(Boolean).length;
      const aw = q.answer.split(/\s+/).filter(Boolean).length;
      return acc + qw + aw;
    }, 0);
    const introWords = (topic?.description || '').split(/\s+/).filter(Boolean).length;
    return qWords + introWords;
  }, [baseQuestions, topic]);

  return (
    <>
      <SEOHelmet
        title={pageTitle}
        description={pageDescription}
        keywords="GK questions in Hindi, GK questions with answers, best GK questions, daily GK quiz, GK for exams, UPSC GK, SSC GK, bank exam GK, GK questions list, Hindi GK"
        url={pageUrl}
        type="website"
        noIndex={true}
        noFollow={true}
        structuredData={itemListData && qaPageData ? [itemListData, qaPageData] : (itemListData || qaPageData)}
        breadcrumbs={breadcrumbs}
        faqData={faqData}
        wordCount={wordCount}
        calculatorData={{
          name: topic ? `MoneyCal GK: ${topic.title}` : 'MoneyCal GK Quiz Hub',
          description: pageDescription,
          category: 'Education',
          features: ['200+ GK questions', 'Quiz mode', 'Topic filters', 'Hindi GK coverage', 'Mobile friendly'],
          authorName: 'MoneyCal Editorial Team'
        }}
      />

      <div className="min-h-screen bg-slate-50">
        <div className="bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <div className="flex items-center text-sm text-slate-600">
              <Link to="/" className="hover:text-blue-600 transition-colors flex items-center">
                <Home className="w-4 h-4 mr-1" />
                Home
              </Link>
              <ChevronRight className="w-4 h-4 mx-2" />
              <Link to="/gk" className="hover:text-blue-600 transition-colors">MoneyCal GK</Link>
              {topic && (
                <>
                  <ChevronRight className="w-4 h-4 mx-2" />
                  <span className="text-blue-600 font-medium">{topic.title}</span>
                </>
              )}
            </div>
          </div>
        </div>

        <section className="bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold uppercase tracking-wide mb-4">
                  <Sparkles className="h-4 w-4" />
                  MoneyCal GK Hub
                </div>
                <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
                  {topic ? topic.title : 'Best GK Question In Hindi - Best GK In Hindi'}
                </h1>
                <p className="text-lg text-slate-600 mb-6">
                  {topic ? topic.description : '200+ GK प्रश्न, स्मार्ट फिल्टर, क्विज़ मोड और हर टॉपिक के लिए अलग स्लग। हिंदी में तैयार।'}
                </p>
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => setQuizMode((prev: boolean) => !prev)}
                    className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold transition-all ${quizMode ? 'bg-blue-600 text-white' : 'bg-white border border-slate-200 text-slate-700 hover:border-blue-300'}`}
                  >
                    <Target className="h-4 w-4" />
                    {quizMode ? 'List Mode' : 'Quiz Mode'}
                  </button>
                  <button
                    onClick={() => setShowAnswers((prev: boolean) => !prev)}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 font-semibold hover:border-blue-300 transition-all"
                  >
                    <CheckCircle className="h-4 w-4" />
                    {showAnswers ? 'Hide Answers' : 'Show Answers'}
                  </button>
                  <Link
                    to="/gk"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 text-white font-semibold hover:bg-slate-800 transition-all"
                  >
                    <BookOpen className="h-4 w-4" />
                    All GK Topics
                  </Link>
                </div>
              </div>
              <div className="bg-white rounded-3xl shadow-xl p-6 border border-slate-100">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-50 rounded-2xl p-4">
                    <div className="text-2xl font-bold text-slate-900">{gkQuestions.length}+</div>
                    <div className="text-sm text-slate-600">GK प्रश्न</div>
                  </div>
                  <div className="bg-slate-50 rounded-2xl p-4">
                    <div className="text-2xl font-bold text-slate-900">{gkTopics.length}</div>
                    <div className="text-sm text-slate-600">टॉपिक स्लग</div>
                  </div>
                  <div className="bg-slate-50 rounded-2xl p-4">
                    <div className="text-2xl font-bold text-slate-900">Hindi GK</div>
                    <div className="text-sm text-slate-600">लोकल ऑडियंस फोकस</div>
                  </div>
                  <div className="bg-slate-50 rounded-2xl p-4">
                    <div className="text-2xl font-bold text-slate-900">Mobile</div>
                    <div className="text-sm text-slate-600">फ्रेंडली UI</div>
                  </div>
                </div>
                <div className="mt-6 grid grid-cols-2 gap-3 text-sm text-slate-600">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-blue-500" />
                    Kids + Students
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-yellow-500" />
                    Exam Ready
                  </div>
                  <div className="flex items-center gap-2">
                    <Globe className="h-4 w-4 text-emerald-500" />
                    All Topics
                  </div>
                  <div className="flex items-center gap-2">
                    <List className="h-4 w-4 text-purple-500" />
                    Quiz + List
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {topic?.slug === 'hindi-grammar-gk' && (
          <section className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="bg-white rounded-3xl p-6 shadow-xl border border-slate-100">
                <h2 className="text-2xl font-bold text-slate-900 mb-3">Hindi Grammar GK: पूरा गाइड</h2>
                <p className="text-slate-700 mb-4">हिंदी व्याकरण में संज्ञा, सर्वनाम, विशेषण, क्रिया, काल, वचन, लिंग, संधि, समास, उपसर्ग–प्रत्यय, अलंकार और विराम–चिह्न जैसे मूल विषय आते हैं। परीक्षा में प्रश्न कॉन्सेप्ट, परिभाषा, उदाहरण और अपवाद पर आधारित होते हैं।</p>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">मूल विषय</h3>
                <ul className="list-disc pl-6 text-slate-700 space-y-1 mb-4">
                  <li>संज्ञा: व्यक्तिवाचक, जातिवाचक, भाववाचक; लिंग और वचन परिवर्तन</li>
                  <li>सर्वनाम: पुरुषवाचक, निजवाचक, आत्मवाचक; कारक और प्रयोग</li>
                  <li>विशेषण: गुणवाचक, परिमाणवाचक, संबंधवाचक; समानार्थी–विलोम</li>
                  <li>क्रिया: सकर्मक–अकर्मक, वाच्य (कर्तृ, कर्म, भाव), काल</li>
                  <li>काल: वर्तमान, भूत, भविष्य; अपूर्ण, पूर्ण, संधि–विच्छेद</li>
                  <li>लिंग–वचन: पुल्लिंग/स्त्रीलिंग रूपांतरण, एकवचन–बहुवचन नियम</li>
                  <li>संधि: स्वर, व्यंजन, विसर्ग; सामान्य अपवाद और उदाहरण</li>
                  <li>समास: द्वंद्व, तत्पुरुष, बहुव्रीहि, कर्मधारय; विग्रह</li>
                  <li>अलंकार: शाब्दिक (अनुप्रास), अर्थालंकार (रूपक, उपमा, मानवीकरण)</li>
                  <li>विराम–चिह्न: पूर्ण विराम, अल्प विराम, अर्द्ध विराम, प्रश्नवाचक</li>
                </ul>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">परीक्षा पैटर्न</h3>
                <ul className="list-disc pl-6 text-slate-700 space-y-1 mb-4">
                  <li>परिभाषा पहचान: “यह कौन-सा समास है?”</li>
                  <li>संधि–विच्छेद: सही विकल्प चुनें</li>
                  <li>रूपांतरण: लिंग/वचन/काल परिवर्तन</li>
                  <li>त्रुटि सुधार: वर्तनी/व्याकरण दोष</li>
                  <li>पर्यायवाची–विलोम–मुहावरे: संदर्भ अनुसार चयन</li>
                </ul>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">त्वरित सुझाव</h3>
                <ul className="list-disc pl-6 text-slate-700 space-y-1 mb-4">
                  <li>नियमों के साथ उदाहरण याद करें</li>
                  <li>दैनिक 10–15 प्रश्न क्विज़ मोड में</li>
                  <li>अपवादों की अलग नोटबुक बनाएं</li>
                  <li>त्रुटि सुधार के लिए वाक्य अभ्यास</li>
                </ul>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">अभ्यास लिंक</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Link to="/gk/ssc-gk-questions-in-hindi" className="text-blue-600 text-sm">SSC GK In Hindi</Link>
                  <Link to="/gk/banking-gk-questions-in-hindi" className="text-blue-600 text-sm">Banking GK In Hindi</Link>
                  <Link to="/gk/railway-gk-questions-in-hindi" className="text-blue-600 text-sm">Railway GK In Hindi</Link>
                  <Link to="/gk/upsc-gk-questions-in-hindi" className="text-blue-600 text-sm">UPSC GK In Hindi</Link>
                </div>
              </div>
            </div>
          </section>
        )}

        {!topic && (
          <section className="py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">GK Topics by Category</h2>
                  <p className="text-slate-600">हर टॉपिक का अपना स्लग और SEO-फ्रेंडली पेज।</p>
                </div>
                <Link to="/gk/best-gk-question-in-hindi-best-gk-in-hindi" className="inline-flex items-center gap-2 text-blue-600 font-semibold">
                  Start with Best GK
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {topicGroups.map((group) => (
                  <div key={group.id} className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100">
                    <h3 className="text-lg font-semibold text-slate-900 mb-2">{group.title}</h3>
                    <p className="text-sm text-slate-600 mb-4">{group.description}</p>
                    <div className="space-y-2">
                      {gkTopics.filter((item) => item.group === group.id).slice(0, 4).map((item) => (
                        <Link key={item.slug} to={`/gk/${item.slug}`} className="flex items-center justify-between text-sm text-slate-700 hover:text-blue-600">
                          <span>{item.title}</span>
                          <ArrowRight className="h-3 w-3" />
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {!topic && (
          <section className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">Category-wise GK Hub</h2>
                  <p className="text-slate-600">सबसे ज्यादा सर्च होने वाले GK कैटेगरी स्लग।</p>
                </div>
                <Link to="/gk/best-gk-question-in-hindi-best-gk-in-hindi" className="inline-flex items-center gap-2 text-blue-600 font-semibold">
                  Explore Best GK
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {categoryHighlights.map((item) => (
                  <Link
                    key={item.slug}
                    to={`/gk/${item.slug}`}
                    className="group bg-white rounded-2xl p-6 shadow-lg border border-slate-100 hover:border-blue-200 transition-all"
                  >
                    <h3 className="text-lg font-semibold text-slate-900 group-hover:text-blue-600 mb-2">{item.title}</h3>
                    <p className="text-sm text-slate-600 mb-4">{item.description}</p>
                    <div className="inline-flex items-center gap-2 text-sm text-blue-600 font-semibold">
                      Open {item.title}
                      <ArrowRight className="h-3 w-3" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-3xl p-6 shadow-xl border border-slate-100">
              <div className="flex flex-col lg:flex-row lg:items-center gap-4 justify-between">
                <div className="flex items-center gap-2 text-slate-700 font-semibold">
                  <Filter className="h-4 w-4" />
                  GK Filters
                </div>
                <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
                  <div className="relative flex-1 min-w-[220px]">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
                      placeholder="Search GK questions..."
                      className="w-full border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
                    />
                  </div>
                  <select
                    value={selectedCategory}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSelectedCategory(e.target.value)}
                    className="border border-slate-200 rounded-xl px-3 py-2 text-sm"
                  >
                    {categories.map((item) => (
                      <option key={item.value} value={item.value}>{item.label}</option>
                    ))}
                  </select>
                  <select
                    value={selectedLevel}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSelectedLevel(e.target.value)}
                    className="border border-slate-200 rounded-xl px-3 py-2 text-sm"
                  >
                    {levels.map((item) => (
                      <option key={item.value} value={item.value}>{item.label}</option>
                    ))}
                  </select>
                  <button
                    onClick={() => setShuffleMode((prev: boolean) => !prev)}
                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold ${shuffleMode ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700'}`}
                  >
                    <Shuffle className="h-4 w-4" />
                    Shuffle
                  </button>
                </div>
              </div>
              <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-slate-600">
                <span>Showing {activeQuestions.length} of {totalShuffled} GK questions</span>
                <div className="flex items-center gap-2">
                  <span>Page</span>
                  <input
                    type="number"
                    min={1}
                    max={Math.max(1, Math.ceil(totalShuffled / pageSize))}
                    value={page}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPage(Math.max(1, Math.min(Math.ceil(totalShuffled / pageSize), Number(e.target.value) || 1)))}
                    className="w-16 border border-slate-200 rounded-xl px-2 py-1 text-sm"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <span>Page size</span>
                  <select
                    value={pageSize}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setPageSize(Number(e.target.value))}
                    className="border border-slate-200 rounded-xl px-2 py-1 text-sm"
                  >
                    <option value={25}>25</option>
                    <option value={50}>50</option>
                    <option value={100}>100</option>
                    <option value={200}>200</option>
                    <option value={-1}>All</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="pb-14">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {quizMode && quizQuestion ? (
              <div className="bg-white rounded-3xl p-8 shadow-xl border border-slate-100">
                <div className="flex items-center justify-between mb-6">
                  <span className="text-sm text-slate-500">Question {quizIndex + 1} of {activeQuestions.length}</span>
                  <span className="text-xs uppercase tracking-wide px-3 py-1 rounded-full bg-blue-100 text-blue-700">{quizQuestion.level}</span>
                </div>
                <h2 className="text-2xl font-semibold text-slate-900 mb-6">{quizQuestion.question}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {quizQuestion.options.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => {
                        setSelectedOptions((prev: any) => ({ ...prev, [quizQuestion.id]: opt }));
                      }}
                      className={[
                        'text-left border rounded-2xl px-4 py-3 transition-all',
                        selectedOptions[quizQuestion.id]
                          ? opt === selectedOptions[quizQuestion.id] && opt === quizQuestion.answer
                            ? 'border-emerald-300 bg-emerald-50 text-emerald-700'
                            : opt === selectedOptions[quizQuestion.id] && opt !== quizQuestion.answer
                              ? 'border-red-300 bg-red-50 text-red-700'
                              : 'border-slate-200'
                          : 'border-slate-200 hover:border-blue-300 hover:bg-blue-50'
                      ].join(' ')}
                      disabled={Boolean(selectedOptions[quizQuestion.id])}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
                {(showAnswers || selectedOptions[quizQuestion.id]) && (
                  <div className="mt-6 bg-emerald-50 border border-emerald-200 text-emerald-700 px-4 py-3 rounded-2xl">
                    सही उत्तर: {quizQuestion.answer}
                    {selectedOptions[quizQuestion.id] && (
                      <div className="mt-2 text-slate-700">
                        आपका चयन: {selectedOptions[quizQuestion.id]} {selectedOptions[quizQuestion.id] === quizQuestion.answer ? '(सही)' : '(गलत)'}
                      </div>
                    )}
                  </div>
                )}
                <div className="mt-8 flex flex-wrap gap-3">
                  <button
                    onClick={() => setQuizIndex((prev: number) => Math.max(0, prev - 1))}
                    disabled={quizIndex === 0}
                    className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-semibold disabled:opacity-50"
                  >
                    Previous
                  </button>
                  <button
                    onClick={() => setQuizIndex((prev: number) => Math.min(activeQuestions.length - 1, prev + 1))}
                    disabled={quizIndex === activeQuestions.length - 1}
                    className="px-4 py-2 rounded-xl bg-blue-600 text-white font-semibold disabled:opacity-50"
                  >
                    Next
                  </button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {activeQuestions.map((q) => (
                  <div key={q.id} className="bg-white rounded-3xl p-6 shadow-lg border border-slate-100">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs uppercase tracking-wide px-3 py-1 rounded-full bg-slate-100 text-slate-600">{q.category}</span>
                      <span className="text-xs uppercase tracking-wide px-3 py-1 rounded-full bg-blue-100 text-blue-700">{q.level}</span>
                    </div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-4">{q.question}</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {q.options.map((opt) => {
                        const selected = selectedOptions[q.id];
                        const isSelected = selected === opt;
                        const isCorrectSelection = isSelected && opt === q.answer;
                        const isWrongSelection = isSelected && opt !== q.answer;
                        return (
                          <button
                            key={opt}
                            onClick={() => {
                              setSelectedOptions((prev: any) => ({ ...prev, [q.id]: opt }));
                            }}
                            className={[
                              'text-left border rounded-2xl px-3 py-2 text-sm transition-all',
                              selected
                                ? isCorrectSelection
                                  ? 'border-emerald-300 bg-emerald-50 text-emerald-700'
                                  : isWrongSelection
                                    ? 'border-red-300 bg-red-50 text-red-700'
                                    : 'border-slate-200'
                                : 'border-slate-200 text-slate-700 hover:border-blue-300 hover:bg-blue-50'
                            ].join(' ')}
                            disabled={Boolean(selected)}
                          >
                            {opt}
                          </button>
                        );
                      })}
                    </div>
                    {(showAnswers || selectedOptions[q.id]) && (
                      <div className="mt-4 bg-emerald-50 border border-emerald-200 text-emerald-700 px-4 py-2 rounded-2xl text-sm font-semibold">
                        सही उत्तर: {q.answer}
                        {selectedOptions[q.id] && (
                          <span className="ml-2 text-slate-700 font-normal">
                            आपका चयन: {selectedOptions[q.id]} {selectedOptions[q.id] === q.answer ? '(सही)' : '(गलत)'}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        <section className="py-12 bg-white border-t border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">GK तैयारी का स्मार्ट तरीका</h2>
                <p className="text-slate-600 mb-4">
                  MoneyCal GK सेक्शन को इस तरह बनाया गया है कि हर टॉपिक का अपना स्लग और साफ-सुथरा पेज हो। इससे Google को कंटेंट स्ट्रक्चर
                  समझ में आता है और यूज़र को सही टॉपिक जल्दी मिलता है। Best GK Question In Hindi - Best GK In Hindi जैसे प्रमुख कीवर्ड के साथ
                  टॉपिक-वाइज पेज तैयार किए गए हैं ताकि यूज़र और सर्च इंजन दोनों को स्पष्ट संकेत मिले। हमारे लिए लक्ष्य सिर्फ प्रश्न देना नहीं है,
                  बल्कि एक ऐसा GK हब बनाना है जो स्कूल स्टूडेंट्स, प्रतियोगी परीक्षा की तैयारी कर रहे उम्मीदवार और डेली GK प्रैक्टिस करने वाले
                  सभी यूज़र्स को एक ही जगह पर मदद करे।
                </p>
                <p className="text-slate-600 mb-4">
                  हिंदी GK के साथ English GK को भी जोड़कर हमने स्कूल लेवल, प्रतियोगी परीक्षा और डेली क्विज़ तीनों जरूरतें कवर की हैं। फ़िल्टर,
                  सर्च और क्विज़ मोड से तैयारी तेजी से होती है। आप चाहें तो केवल आसान प्रश्नों से शुरुआत कर सकते हैं या सीधे medium और hard
                  लेवल पर जा सकते हैं। क्विज़ मोड मोबाइल पर तेज़ चलता है, जिससे आप सफर में भी अभ्यास कर सकते हैं। हर प्रश्न के साथ विकल्प साफ
                  तरीके से दिखाए जाते हैं और शो आंसर मोड में तुरंत उत्तर दिखाई देता है, जिससे रिवीजन करने में समय नहीं लगता।
                </p>
                <p className="text-slate-600 mb-4">
                  हमने 30+ GK टॉपिक्स बनाए हैं ताकि हर सबकैटेगरी का अपना स्लग बने। उदाहरण के लिए India GK, History GK, Geography GK, Science GK,
                  Polity GK, Economy GK, Computer GK, Environment GK, Sports GK, Reasoning GK, Hindi Grammar GK, Animals GK, Inventions GK, National
                  Symbols GK और Space GK जैसे टॉपिक्स अलग-अलग पेज पर खुलते हैं। इससे पढ़ने वाले व्यक्ति को ठीक वही टॉपिक मिलता है जिसकी उसे तलाश
                  थी और Google को भी अलग-अलग विषयों के लिए स्पष्ट कंटेंट मिल जाता है।
                </p>
                <p className="text-slate-600 mb-4">
                  प्रतियोगी परीक्षाओं में सफलता के लिए नियमित रिविजन जरूरी है। इसलिए हमने SSC, Banking, Railway, UPSC, State PCS, Defence जैसी
                  परीक्षाओं के लिए अलग GK टॉपिक्स बनाए हैं। ये टॉपिक्स उन्हीं क्षेत्रों को कवर करते हैं जो वास्तविक परीक्षा में सबसे ज्यादा
                  पूछे जाते हैं। अलग-अलग स्लग होने का फायदा यह है कि आप सीधे उस परीक्षा से जुड़े प्रश्नों पर पहुंच सकते हैं और अनावश्यक खोज में
                  समय न गवाएं। परीक्षा केंद्रित GK में भारतीय संविधान, इतिहास, भूगोल, अर्थव्यवस्था और विज्ञान जैसे कोर सेक्शन का संतुलित मिश्रण
                  मिलता है।
                </p>
                <p className="text-slate-600 mb-4">
                  स्कूल लेवल GK के लिए हमने कक्षा 6 से 10 तक के लिए अलग पेज तैयार किए हैं। बच्चे या उनके अभिभावक सीधे Class 6 GK, Class 7 GK,
                  Class 8 GK, Class 9 GK और Class 10 GK पेज पर जा सकते हैं। यह संरचना बच्चों को आयु के अनुसार सीखने में मदद करती है। छोटे बच्चों
                  के लिए Kids GK अलग से उपलब्ध है जिसमें जानवर, सामान्य ज्ञान, राष्ट्रीय प्रतीक और बेसिक गणित के प्रश्न शामिल हैं। यह कंटेंट सरल
                  भाषा में है, जिससे बच्चे पढ़ने के साथ-साथ याद भी आसानी से कर सकते हैं।
                </p>
                <p className="text-slate-600 mb-4">
                  विषय आधारित पढ़ाई के लिए अलग-अलग विषय पेज बनाए गए हैं। History GK में प्राचीन, मध्यकालीन और आधुनिक इतिहास के प्रश्न हैं ताकि
                  आप किसी एक कालखंड पर ध्यान दे सकें। Geography GK में भारत के भूगोल के साथ विश्व भूगोल भी शामिल है। Science GK में फिजिक्स,
                  केमिस्ट्री और बायोलॉजी के बेसिक प्रश्न दिए गए हैं ताकि साइंस का कॉन्सेप्ट मजबूत हो सके। Polity GK संविधान और शासन व्यवस्था के
                  मूल बिंदुओं को स्पष्ट करता है जबकि Economy GK बजट, RBI, GDP, मुद्रास्फीति जैसे मुख्य विषयों को कवर करता है।
                </p>
                <p className="text-slate-600 mb-4">
                  आज की पढ़ाई में टेक्नोलॉजी की भूमिका बढ़ गई है, इसलिए Computer GK और Space GK को अलग से शामिल किया गया है। Computer GK में
                  हार्डवेयर, सॉफ्टवेयर, इंटरनेट और बेसिक नेटवर्किंग जैसे विषय हैं। Space GK में ग्रह, उपग्रह, सौरमंडल, ISRO और अंतरिक्ष से जुड़ी
                  सामान्य जानकारी मिलती है। Environment GK में जलवायु परिवर्तन, प्रदूषण, नवीकरणीय ऊर्जा और पर्यावरण दिवस जैसे प्रश्न शामिल हैं।
                  यह सेक्शन उन छात्रों के लिए खास है जो पर्यावरण और विज्ञान से जुड़े टॉपिक्स को बेहतर तरीके से समझना चाहते हैं।
                </p>
                <p className="text-slate-600 mb-4">
                  Sports GK, National Symbols GK और Inventions GK ऐसे टॉपिक्स हैं जो अक्सर अचानक पूछे जाते हैं। Sports GK में खेलों के नियम,
                  प्रमुख खिलाड़ी और टूर्नामेंट से जुड़े प्रश्न शामिल हैं। National Symbols GK में राष्ट्रीय पशु, पक्षी, ध्वज, चिह्न और राष्ट्रगान
                  से जुड़े प्रश्न दिए गए हैं। Inventions GK में महत्वपूर्ण आविष्कार और वैज्ञानिकों के नाम हैं। यह टॉपिक्स छोटे प्रश्नों के रूप में
                  आते हैं लेकिन परीक्षा में महत्वपूर्ण अंक दिलाते हैं, इसलिए हमने उन्हें अलग-अलग स्लग पर रखा है।
                </p>
                <p className="text-slate-600 mb-4">
                  Reasoning GK और Math GK सेक्शन उन छात्रों के लिए उपयोगी हैं जो लॉजिकल सोच और बेसिक गणित मजबूत करना चाहते हैं। Reasoning में
                  आसान श्रृंखला, दिशा ज्ञान और सरल तर्क प्रश्न दिए गए हैं। Math GK में प्रतिशत, क्षेत्रफल, परिमाप और बेसिक फॉर्मूले शामिल हैं
                  ताकि स्कूल और प्रतियोगी परीक्षा दोनों स्तर पर मदद मिल सके। Hindi Grammar GK में संज्ञा, सर्वनाम, विशेषण, क्रिया, काल, लिंग,
                  वचन, संधि और समास जैसे जरूरी टॉपिक्स शामिल हैं जो हिंदी भाषा की पकड़ मजबूत बनाते हैं।
                </p>
                <p className="text-slate-600 mb-4">
                  MoneyCal GK का इंटरनल लिंक स्ट्रक्चर यूज़र को एक पेज से दूसरे पेज तक नेविगेट करने में मदद करता है। आप Best GK प्रश्न वाले पेज
                  से सीधे India GK या Science GK पर जा सकते हैं, और अगर आप किसी प्रतियोगी परीक्षा की तैयारी कर रहे हैं तो SSC GK, Banking GK या
                  Railway GK से संबंधित टॉपिक में स्विच कर सकते हैं। इस तरह का आंतरिक लिंकिंग पैटर्न Google Discover के लिए भी फायदेमंद है क्योंकि
                  यह संबंधित कंटेंट को संगठित तरीके से दिखाता है।
                </p>
                <p className="text-slate-600 mb-4">
                  प्रत्येक टॉपिक पेज में आप फिल्टर का उपयोग करके लेवल और कैटेगरी चुन सकते हैं। उदाहरण के लिए, अगर आपको केवल आसान प्रश्न चाहिए तो
                  Easy लेवल चुनें; यदि आपको परीक्षा के अनुसार कठिन प्रश्न चाहिए तो Medium या Hard मोड का उपयोग करें। इसी तरह, कैटेगरी फिल्टर से
                  आप सीधे Polity, Economy, Science, History या Geography जैसे सेक्शन चुन सकते हैं। यह सुविधा आपको समय बचाने और लक्ष्य पर केंद्रित
                  अभ्यास करने में मदद करती है।
                </p>
                <p className="text-slate-600 mb-4">
                  इस GK हब का उद्देश्य सिर्फ प्रश्नों की सूची देना नहीं बल्कि एक स्मार्ट तैयारी प्रणाली देना है। क्विज़ मोड से आप खुद को टेस्ट कर
                  सकते हैं, जबकि लिस्ट मोड से आप आराम से पढ़ सकते हैं। Shuffle मोड का उपयोग करने से आपको अलग क्रम में प्रश्न मिलते हैं जिससे
                  रिविजन के दौरान नई चुनौती मिलती है। यह तरीका दिमाग को सक्रिय रखता है और बार-बार वही क्रम याद होने से बचाता है।
                </p>
                <p className="text-slate-600 mb-4">
                  हमने कंटेंट को मोबाइल फ्रेंडली डिजाइन के साथ तैयार किया है ताकि आप किसी भी स्क्रीन साइज़ पर पढ़ सकें। कार्ड-बेस्ड लेआउट, साफ
                  टाइपोग्राफी और तेज़ लोडिंग यह सुनिश्चित करते हैं कि पढ़ाई के दौरान ध्यान भंग न हो। calculator.net-style UI की प्रेरणा से हमने
                  एक ऐसा डिज़ाइन बनाया है जो सरल, उपयोगी और भरोसेमंद लगता है। यही कारण है कि उपयोगकर्ता लंबे समय तक पेज पर टिके रहते हैं और
                  सर्च इंजन भी इसे उपयोगी कंटेंट मानते हैं।
                </p>
                <p className="text-slate-600 mb-4">
                  अगर आप GK की शुरुआत कर रहे हैं तो General GK या Kids GK पेज से शुरुआत करें। यदि आप परीक्षा की तैयारी कर रहे हैं तो Competitive
                  Exam GK या Quick Revision GK पेज आपके लिए बेहतर रहेंगे। Science या Computer जैसे विषय पढ़ने हों तो संबंधित विषय पेज चुनें। इस
                  तरह का विकल्प आपको भटकने से बचाता है और सीखने की गति बढ़ाता है। हर टॉपिक पेज में वही प्रश्न दिखाए जाते हैं जो उस विषय से जुड़े
                  हैं, इसलिए तैयारी केंद्रित रहती है।
                </p>
                <p className="text-slate-600 mb-4">
                  MoneyCal GK के प्रश्न हिंदी में तैयार किए गए हैं ताकि भारतीय उपयोगकर्ता आसानी से समझ सकें। भाषा सरल रखी गई है लेकिन प्रश्नों की
                  गुणवत्ता परीक्षा स्तर की है। हमने प्रश्नों को वास्तविक पैटर्न के अनुसार चुना है ताकि ये सीधे प्रतियोगी परीक्षा या स्कूल
                  क्विज़ में काम आएं। इसी वजह से यह कंटेंट Google पर “Best GK Question in Hindi” और “Hindi GK Questions with Answers” जैसे
                  कीवर्ड्स के लिए उपयोगी है।
                </p>
                <p className="text-slate-600 mb-4">
                  GK की तैयारी में निरंतरता सबसे ज्यादा जरूरी है। इसलिए हमने Daily GK Quiz पेज बनाया है ताकि आप रोज़ाना अभ्यास कर सकें। इसके साथ
                  ही हमने Quick Revision पेज जोड़ा है जो परीक्षा से ठीक पहले आपके लिए काम आता है। ये दोनों पेज आपको समय के अनुसार अभ्यास करने का
                  मौका देते हैं और आपकी तैयारी को तेज़ बनाते हैं। इसी तरह, अलग-अलग टॉपिक्स को लिंक करके हमने एक मजबूत सीखने का रास्ता तैयार किया
                  है।
                </p>
                <p className="text-slate-600 mb-4">
                  अलग-अलग स्तर के उपयोगकर्ताओं के लिए कंटेंट तैयार होने से आपको सही कठिनाई स्तर मिलता है। Easy प्रश्न नए छात्रों के लिए बेहतरीन हैं,
                  Medium प्रश्न प्रतियोगी परीक्षा की तैयारी में मदद करते हैं और Hard स्तर उन छात्रों के लिए हैं जो इंटरव्यू या उच्च स्तर की परीक्षा
                  की तैयारी कर रहे हैं। लेवल आधारित स्ट्रक्चर से आपका अभ्यास संतुलित रहता है और कमजोर विषयों की पहचान करना आसान हो जाता है।
                </p>
                <p className="text-slate-600 mb-4">
                  हमारा उद्देश्य एक ऐसा प्लेटफॉर्म बनाना है जहां GK सिर्फ पढ़ा न जाए बल्कि समझा जाए। इसलिए प्रत्येक प्रश्न को स्पष्ट विकल्पों के साथ
                  रखा गया है और सही उत्तर एक क्लिक में दिख जाता है। इस प्रकार आप अपने उत्तर की जांच तुरंत कर सकते हैं। यह फीचर छात्रों को आत्मविश्वास
                  देता है और वे तेजी से सीख पाते हैं। साथ ही, हम आंतरिक लिंक के जरिए अन्य MoneyCal टूल्स से जोड़ते हैं ताकि उपयोगकर्ता वित्तीय
                  ज्ञान के साथ सामान्य ज्ञान भी बढ़ा सके।
                </p>
                <p className="text-slate-600 mb-4">
                  भविष्य में नए प्रश्न जोड़ने की गुंजाइश रखने के लिए हमने इस सेक्शन की संरचना स्केलेबल रखी है। नए स्लग जोड़ना आसान है और हर टॉपिक
                  के लिए अलग-अलग SEO टाइटल और डिस्क्रिप्शन दिए गए हैं। इससे जब नए प्रश्न जोड़े जाएंगे तो उनके लिए अलग-अलग पेज तैयार होंगे और
                  वेबसाइट की ऑर्गेनिक पहुंच बढ़ेगी। यह दीर्घकालिक रणनीति है जो Google Discover और सर्च दोनों में मदद करेगी।
                </p>
                <p className="text-slate-600 mb-4">
                  यदि आप अभी शुरुआत कर रहे हैं तो All GK Topics सेक्शन में जाएं और अपनी जरूरत के अनुसार विषय चुनें। हर टॉपिक कार्ड पर मुख्य
                  टॉपिक्स की सूची है जिससे आप जल्दी तय कर सकते हैं कि आपको कौन सा पेज पढ़ना है। यह अनुभव उपयोगकर्ता को नियंत्रण देता है और अध्ययन
                  की योजना बनाने में मदद करता है। इसी वजह से MoneyCal GK सेक्शन सिर्फ प्रश्नों की सूची नहीं बल्कि एक पूरा लर्निंग गाइड है।
                </p>
                <p className="text-slate-600">
                  हम मानते हैं कि सही रणनीति से कोई भी छात्र GK में मजबूत हो सकता है। इसलिए हमने कंटेंट को सरल, साफ और मोबाइल फ्रेंडली रखा है। यह
                  सेक्शन Google के लिए स्ट्रक्चर्ड है और यूज़र के लिए सरल। अगर आप “Best GK Question In Hindi” या “GK questions with answers” जैसे
                  कीवर्ड्स ढूंढ रहे हैं तो यह पेज आपके लिए सबसे विश्वसनीय स्रोत बन सकता है। MoneyCal GK के साथ आपकी तैयारी तेज़, व्यवस्थित और
                  परिणामोन्मुख बनेगी।
                </p>
              </div>
              <div className="bg-slate-50 rounded-3xl p-6 border border-slate-200">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Internal Links</h3>
                <div className="space-y-3">
                  {relatedTools.map((tool) => (
                    <Link key={tool.url} to={tool.url} className="flex items-center justify-between text-sm text-slate-700 hover:text-blue-600">
                      <span>{tool.name}</span>
                      <ArrowRight className="h-3 w-3" />
                    </Link>
                  ))}
                </div>
                <div className="mt-6">
                  <Link to="/sitemap" className="inline-flex items-center gap-2 text-blue-600 font-semibold">
                    Explore full sitemap
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default MoneycalGK;
