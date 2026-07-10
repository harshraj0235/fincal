import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Palette, Search, Filter, Wand2, Image, Paintbrush, Sparkles,
  Home, ChevronRight, X, Star, TrendingUp, Camera, FileImage,
  Type, Layers, Layout, Shapes, Instagram, Video, MessageCircle,
  Gift, Briefcase, Globe, ArrowRight, Zap, Music, QrCode, Crop,
  Download, Hash, Award, Smile, Film, Mic, Package
} from 'lucide-react';
import SEOHelmet from '../components/SEOHelmet';

interface DesignTool {
  id: string;
  name: string;
  description: string;
  icon: any;
  category: string;
  keywords: string[];
  url: string;
  popular?: boolean;
  trending?: boolean;
}

const DesignCreatorTools: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  const categories = [
    { id: 'all', name: 'All Tools', icon: Palette, count: 65 },
    { id: 'posters', name: 'Posters & Banners', icon: FileImage, count: 15 },
    { id: 'cards', name: 'Cards & Invitations', icon: Gift, count: 10 },
    { id: 'social', name: 'Social Media', icon: Instagram, count: 12 },
    { id: 'ai-design', name: 'AI Design Tools', icon: Wand2, count: 15 },
    { id: 'business', name: 'Business & Branding', icon: Briefcase, count: 8 },
    { id: 'graphics', name: 'Graphics & Art', icon: Layers, count: 5 }
  ];

  const designTools: DesignTool[] = [
    // Posters & Banners
    {
      id: 'ai-poster-generator',
      name: 'AI Festival Poster Generator',
      description: 'Create stunning festival posters with AI in seconds',
      icon: Wand2,
      category: 'posters',
      keywords: ['ai', 'poster', 'generator', 'festival'],
      url: '/design-tools/ai-poster-generator',
      popular: true,
      trending: true
    },
    {
      id: 'diwali-banner-maker',
      name: 'Diwali Banner Maker (YouTube/Instagram)',
      description: 'Create Diwali banners for all social platforms',
      icon: Layout,
      category: 'posters',
      keywords: ['diwali', 'banner', 'youtube', 'instagram'],
      url: '/design-tools/diwali-banner-maker',
      popular: true,
      trending: true
    },
    {
      id: 'navratri-poster-maker',
      name: 'Navratri Dance Event Poster Maker',
      description: 'Design attractive Navratri garba event posters',
      icon: FileImage,
      category: 'posters',
      keywords: ['navratri', 'garba', 'poster', 'dance event'],
      url: '/design-tools/navratri-poster-maker',
      popular: true
    },
    {
      id: 'karwa-chauth-poster',
      name: 'Karwa Chauth Poster Template',
      description: 'Beautiful Karwa Chauth celebration poster templates',
      icon: FileImage,
      category: 'posters',
      keywords: ['karwa chauth', 'poster', 'template', 'festival'],
      url: '/design-tools/karwa-chauth-poster'
    },
    {
      id: 'festival-flyer-shops',
      name: 'Festival Flyer Generator for Shops',
      description: 'Create promotional flyers for shop festivals',
      icon: Briefcase,
      category: 'posters',
      keywords: ['flyer', 'shop', 'business', 'promotional'],
      url: '/design-tools/festival-flyer-shops'
    },
    {
      id: 'business-poster-generator',
      name: 'Business Festival Poster Generator',
      description: 'Professional festival posters for businesses',
      icon: Briefcase,
      category: 'posters',
      keywords: ['business', 'poster', 'professional', 'festival'],
      url: '/design-tools/business-poster-generator'
    },
    {
      id: 'ecommerce-offer-banner',
      name: 'Offer Banner Maker for E-commerce',
      description: 'Create sale and offer banners for online stores',
      icon: Package,
      category: 'posters',
      keywords: ['ecommerce', 'offer', 'banner', 'sale'],
      url: '/design-tools/ecommerce-offer-banner',
      trending: true
    },
    {
      id: 'ganesh-idol-poster',
      name: 'Ganesh Chaturthi Idol Poster Generator',
      description: 'Create beautiful Ganpati festival posters',
      icon: Sparkles,
      category: 'posters',
      keywords: ['ganesh', 'ganpati', 'idol', 'poster'],
      url: '/design-tools/ganesh-idol-poster'
    },
    {
      id: 'goddess-lakshmi-poster',
      name: 'Goddess Lakshmi Digital Poster',
      description: 'Divine Lakshmi poster designs for Diwali',
      icon: Sparkles,
      category: 'posters',
      keywords: ['lakshmi', 'goddess', 'poster', 'diwali'],
      url: '/design-tools/goddess-lakshmi-poster'
    },
    {
      id: 'festival-brochure',
      name: 'Festival Brochure Maker',
      description: 'Design multi-page festival brochures',
      icon: FileImage,
      category: 'posters',
      keywords: ['brochure', 'maker', 'multi-page', 'festival'],
      url: '/design-tools/festival-brochure'
    },
    {
      id: 'ecommerce-product-banner',
      name: 'E-commerce Product Banner Maker',
      description: 'Product banners for festival sales',
      icon: Package,
      category: 'posters',
      keywords: ['product', 'banner', 'ecommerce', 'festival'],
      url: '/design-tools/ecommerce-product-banner'
    },
    {
      id: 'youtube-thumbnail',
      name: 'Festive YouTube Thumbnail Generator',
      description: 'Eye-catching thumbnails for festival videos',
      icon: Video,
      category: 'posters',
      keywords: ['youtube', 'thumbnail', 'video', 'festive'],
      url: '/design-tools/youtube-thumbnail'
    },
    {
      id: 'fb-linkedin-cover',
      name: 'Festival Cover Photo Maker (FB/LinkedIn)',
      description: 'Cover photos for social media profiles',
      icon: Image,
      category: 'posters',
      keywords: ['cover photo', 'facebook', 'linkedin', 'festival'],
      url: '/design-tools/fb-linkedin-cover'
    },
    {
      id: 'email-header-designer',
      name: 'Festival Email Header Designer',
      description: 'Professional email headers for festival campaigns',
      icon: Layout,
      category: 'posters',
      keywords: ['email', 'header', 'designer', 'campaign'],
      url: '/design-tools/email-header-designer'
    },
    {
      id: 'happy-diwali-animation',
      name: 'Happy Diwali Text Animation Maker',
      description: 'Animated text greetings for Diwali',
      icon: Zap,
      category: 'posters',
      keywords: ['animation', 'text', 'diwali', 'animated'],
      url: '/design-tools/happy-diwali-animation'
    },

    // Cards & Invitations
    {
      id: 'ai-greeting-card',
      name: 'AI Greeting Card Generator',
      description: 'AI-powered personalized greeting card creation',
      icon: Gift,
      category: 'cards',
      keywords: ['ai', 'greeting card', 'generator', 'personalized'],
      url: '/design-tools/ai-greeting-card',
      popular: true,
      trending: true
    },
    {
      id: 'rakhi-invitation',
      name: 'Rakhi Invitation Card Creator',
      description: 'Beautiful Raksha Bandhan invitation cards',
      icon: Gift,
      category: 'cards',
      keywords: ['rakhi', 'invitation', 'card', 'raksha bandhan'],
      url: '/design-tools/rakhi-invitation',
      popular: true
    },
    {
      id: 'whatsapp-greeting',
      name: 'Personalized WhatsApp Greeting Maker',
      description: 'Custom WhatsApp festival greetings',
      icon: MessageCircle,
      category: 'cards',
      keywords: ['whatsapp', 'greeting', 'personalized', 'maker'],
      url: '/design-tools/whatsapp-greeting',
      popular: true
    },
    {
      id: 'qr-code-wishes',
      name: 'QR Code with Wishes Generator',
      description: 'Generate QR codes with embedded festival wishes',
      icon: QrCode,
      category: 'cards',
      keywords: ['qr code', 'wishes', 'generator', 'festival'],
      url: '/design-tools/qr-code-wishes'
    },
    {
      id: 'thank-you-card',
      name: 'Thank You Card Generator',
      description: 'Elegant thank you cards for post-festival',
      icon: Gift,
      category: 'cards',
      keywords: ['thank you', 'card', 'generator', 'gratitude'],
      url: '/design-tools/thank-you-card'
    },
    {
      id: 'employee-wish-card',
      name: 'Wish Your Employees Card Generator',
      description: 'Corporate festival wishes for team members',
      icon: Briefcase,
      category: 'cards',
      keywords: ['employee', 'corporate', 'wishes', 'card'],
      url: '/design-tools/employee-wish-card'
    },
    {
      id: 'handmade-greeting-mockup',
      name: 'Handmade Greeting Mockup Creator',
      description: 'Create mockups of handmade greeting cards',
      icon: Paintbrush,
      category: 'cards',
      keywords: ['handmade', 'mockup', 'greeting', 'card'],
      url: '/design-tools/handmade-greeting-mockup'
    },
    {
      id: 'business-greeting-template',
      name: 'Business Greeting Template Generator',
      description: 'Professional business festival greeting templates',
      icon: Briefcase,
      category: 'cards',
      keywords: ['business', 'greeting', 'template', 'professional'],
      url: '/design-tools/business-greeting-template'
    },
    {
      id: 'branded-greeting-image',
      name: 'Branded Greeting Image Generator',
      description: 'Add your brand logo to festival greetings',
      icon: Award,
      category: 'cards',
      keywords: ['branded', 'logo', 'greeting', 'business'],
      url: '/design-tools/branded-greeting-image'
    },
    {
      id: 'ecard-bulk-scheduler',
      name: 'E-card Scheduler for Bulk Wishes',
      description: 'Schedule bulk e-cards for customers/employees',
      icon: Package,
      category: 'cards',
      keywords: ['ecard', 'bulk', 'scheduler', 'wishes'],
      url: '/design-tools/ecard-bulk-scheduler'
    },

    // Social Media Tools
    {
      id: 'instagram-story-template',
      name: 'Festival Instagram Story Template',
      description: 'Ready-to-use Instagram story templates',
      icon: Instagram,
      category: 'social',
      keywords: ['instagram', 'story', 'template', 'festival'],
      url: '/design-tools/instagram-story-template',
      popular: true,
      trending: true
    },
    {
      id: 'reel-caption-generator',
      name: 'Festival Reel Caption Generator',
      description: 'Engaging captions for Instagram Reels',
      icon: MessageCircle,
      category: 'social',
      keywords: ['reel', 'caption', 'instagram', 'generator'],
      url: '/design-tools/reel-caption-generator',
      popular: true
    },
    {
      id: 'reel-script-generator',
      name: 'AI Reel Script Generator (Festival Wishes)',
      description: 'AI-generated scripts for festival Reels',
      icon: Film,
      category: 'social',
      keywords: ['reel', 'script', 'ai', 'generator'],
      url: '/design-tools/reel-script-generator',
      trending: true
    },
    {
      id: 'reel-hashtag-generator',
      name: 'Festival Reel Hashtag Generator',
      description: 'Generate trending hashtags for festival Reels',
      icon: Hash,
      category: 'social',
      keywords: ['reel', 'hashtag', 'generator', 'trending'],
      url: '/design-tools/reel-hashtag-generator'
    },
    {
      id: 'short-video-wishes',
      name: 'Short Video Maker for Wishes',
      description: 'Create quick festival wish videos',
      icon: Video,
      category: 'social',
      keywords: ['video', 'wishes', 'short', 'maker'],
      url: '/design-tools/short-video-wishes'
    },
    {
      id: 'voiceover-reel',
      name: 'Voice-over Festival Reel Generator',
      description: 'Add voice-over to festival video greetings',
      icon: Mic,
      category: 'social',
      keywords: ['voiceover', 'reel', 'video', 'audio'],
      url: '/design-tools/voiceover-reel'
    },
    {
      id: 'whatsapp-sticker',
      name: 'AI Sticker Maker for WhatsApp',
      description: 'Create custom festival stickers for WhatsApp',
      icon: Smile,
      category: 'social',
      keywords: ['whatsapp', 'sticker', 'ai', 'custom'],
      url: '/design-tools/whatsapp-sticker',
      trending: true
    },
    {
      id: 'festival-caption-brands',
      name: 'Festival Caption Generator for Brands',
      description: 'Professional captions for brand social media',
      icon: Briefcase,
      category: 'social',
      keywords: ['caption', 'brands', 'professional', 'social'],
      url: '/design-tools/festival-caption-brands'
    },
    {
      id: 'gif-maker-wishes',
      name: 'GIF Maker for Festival Wishes',
      description: 'Create animated GIFs for greetings',
      icon: Film,
      category: 'social',
      keywords: ['gif', 'animated', 'wishes', 'maker'],
      url: '/design-tools/gif-maker-wishes'
    },
    {
      id: 'festival-avatar',
      name: 'Festival Avatar Creator',
      description: 'Create festive profile avatars',
      icon: Camera,
      category: 'social',
      keywords: ['avatar', 'profile', 'festive', 'creator'],
      url: '/design-tools/festival-avatar'
    },
    {
      id: 'text-to-speech-wishes',
      name: 'Text-to-Speech Festival Wishes',
      description: 'Convert text wishes to speech audio',
      icon: Mic,
      category: 'social',
      keywords: ['text to speech', 'tts', 'audio', 'wishes'],
      url: '/design-tools/text-to-speech-wishes'
    },
    {
      id: 'reusable-template-library',
      name: 'Reusable Template Library for Festivals',
      description: 'Download and reuse professional templates',
      icon: Download,
      category: 'social',
      keywords: ['template', 'library', 'reusable', 'download'],
      url: '/design-tools/reusable-template-library'
    },

    // AI Design Tools
    {
      id: 'festival-logo-generator',
      name: 'Festival Logo Generator',
      description: 'AI-powered logo creation for festival events',
      icon: Wand2,
      category: 'ai-design',
      keywords: ['logo', 'generator', 'ai', 'festival'],
      url: '/design-tools/festival-logo-generator',
      popular: true
    },
    {
      id: 'ai-mandala-art',
      name: 'AI Mandala Art Generator',
      description: 'Generate intricate mandala designs with AI',
      icon: Sparkles,
      category: 'ai-design',
      keywords: ['mandala', 'ai', 'art', 'generator'],
      url: '/design-tools/ai-mandala-art',
      trending: true
    },
    {
      id: 'rangoli-pattern-creator',
      name: 'Rangoli Pattern Creator',
      description: 'Design custom rangoli patterns with AI',
      icon: Palette,
      category: 'ai-design',
      keywords: ['rangoli', 'pattern', 'ai', 'design'],
      url: '/design-tools/rangoli-pattern-creator',
      popular: true
    },
    {
      id: 'ganesha-portrait',
      name: 'Ganesha AI Portrait Generator',
      description: 'AI-generated artistic Ganesha portraits',
      icon: Wand2,
      category: 'ai-design',
      keywords: ['ganesha', 'ai', 'portrait', 'art'],
      url: '/design-tools/ganesha-portrait'
    },
    {
      id: 'ai-fireworks-background',
      name: 'AI-based Fireworks Background Generator',
      description: 'Create stunning firework backgrounds',
      icon: Sparkles,
      category: 'ai-design',
      keywords: ['fireworks', 'background', 'ai', 'generator'],
      url: '/design-tools/ai-fireworks-background'
    },
    {
      id: 'ai-lamp-diya-art',
      name: 'AI Lamp & Diya Art Generator',
      description: 'Generate artistic diya and lamp designs',
      icon: Sparkles,
      category: 'ai-design',
      keywords: ['lamp', 'diya', 'ai', 'art'],
      url: '/design-tools/ai-lamp-diya-art'
    },
    {
      id: '3d-festival-logo',
      name: '3D Festival Logo Generator',
      description: 'Create 3D festival logos with depth',
      icon: Layers,
      category: 'ai-design',
      keywords: ['3d', 'logo', 'festival', 'generator'],
      url: '/design-tools/3d-festival-logo'
    },
    {
      id: '3d-firework-logo',
      name: '3D Firework Logo Creator',
      description: '3D logos with firework effects',
      icon: Sparkles,
      category: 'ai-design',
      keywords: ['3d', 'firework', 'logo', 'creator'],
      url: '/design-tools/3d-firework-logo'
    },
    {
      id: 'ai-festival-wallpapers',
      name: 'AI-generated Festival Wallpapers',
      description: 'High-quality AI wallpapers for all festivals',
      icon: Image,
      category: 'ai-design',
      keywords: ['wallpaper', 'ai', 'festival', 'hd'],
      url: '/design-tools/ai-festival-wallpapers',
      trending: true
    },
    {
      id: 'festival-animation-creator',
      name: 'Festival Animation Creator',
      description: 'Create animated festival greetings',
      icon: Zap,
      category: 'ai-design',
      keywords: ['animation', 'creator', 'festival', 'animated'],
      url: '/design-tools/festival-animation-creator'
    },
    {
      id: 'ai-scene-generator',
      name: 'AI Scene Generator (Temple, Diyas, Rangoli)',
      description: 'Generate complete festival scenes with AI',
      icon: Wand2,
      category: 'ai-design',
      keywords: ['scene', 'ai', 'temple', 'diya', 'rangoli'],
      url: '/design-tools/ai-scene-generator'
    },
    {
      id: 'ai-background-remover',
      name: 'AI Background Remover for Festival Photos',
      description: 'Remove backgrounds from festival photos',
      icon: Crop,
      category: 'ai-design',
      keywords: ['background remover', 'ai', 'photo', 'festival'],
      url: '/design-tools/ai-background-remover'
    },
    {
      id: 'ai-vector-generator',
      name: 'AI Vector Generator for Decorations',
      description: 'Generate scalable vector festival graphics',
      icon: Shapes,
      category: 'ai-design',
      keywords: ['vector', 'ai', 'svg', 'decorations'],
      url: '/design-tools/ai-vector-generator'
    },
    {
      id: 'ai-music-videos',
      name: 'AI Music for Festival Videos',
      description: 'AI-generated background music for videos',
      icon: Music,
      category: 'ai-design',
      keywords: ['music', 'ai', 'video', 'background'],
      url: '/design-tools/ai-music-videos'
    },
    {
      id: 'transparent-png-icons',
      name: 'Transparent PNG Festival Icon Library',
      description: 'Download transparent festival icons',
      icon: Download,
      category: 'ai-design',
      keywords: ['png', 'transparent', 'icons', 'library'],
      url: '/design-tools/transparent-png-icons'
    },

    // Business & Branding Tools
    {
      id: 'personalized-name-logo',
      name: 'Personalized Name in Festival Logo',
      description: 'Add custom names to festival logo designs',
      icon: Type,
      category: 'business',
      keywords: ['personalized', 'name', 'logo', 'custom'],
      url: '/design-tools/personalized-name-logo'
    },
    {
      id: 'wish-with-logo',
      name: 'Wish with Your Logo Generator',
      description: 'Add company logo to festival wishes',
      icon: Award,
      category: 'business',
      keywords: ['logo', 'business', 'wishes', 'branding'],
      url: '/design-tools/wish-with-logo',
      popular: true
    },
    {
      id: 'festival-font-pairing',
      name: 'Festival Font Pairing Tool',
      description: 'Find perfect font combinations for designs',
      icon: Type,
      category: 'business',
      keywords: ['font', 'pairing', 'typography', 'design'],
      url: '/design-tools/festival-font-pairing'
    },
    {
      id: 'festival-typography',
      name: 'Festival Typography Generator',
      description: 'Create beautiful typography designs',
      icon: Type,
      category: 'business',
      keywords: ['typography', 'font', 'design', 'text'],
      url: '/design-tools/festival-typography'
    },
    {
      id: 'custom-festival-font',
      name: 'Custom Font for Festivals Generator',
      description: 'Generate custom fonts for festival projects',
      icon: Type,
      category: 'business',
      keywords: ['custom font', 'generator', 'festival', 'typography'],
      url: '/design-tools/custom-festival-font'
    },
    {
      id: 'gradient-color-generator',
      name: 'Gradient Color Generator for Festival Theme',
      description: 'Create beautiful gradient color schemes',
      icon: Palette,
      category: 'business',
      keywords: ['gradient', 'color', 'theme', 'generator'],
      url: '/design-tools/gradient-color-generator'
    },
    {
      id: 'festival-color-palette',
      name: 'Festival Color Palette Picker',
      description: 'Pick perfect color palettes for festivals',
      icon: Palette,
      category: 'business',
      keywords: ['color palette', 'picker', 'festival', 'theme'],
      url: '/design-tools/festival-color-palette'
    },
    {
      id: 'regional-language-translator',
      name: 'Regional Language Greeting Translator',
      description: 'Translate wishes to regional Indian languages',
      icon: Globe,
      category: 'business',
      keywords: ['translator', 'regional', 'language', 'multilingual'],
      url: '/design-tools/regional-language-translator'
    },

    // Graphics & Art Tools
    {
      id: 'holi-color-splash',
      name: 'Holi Color Splash Background Generator',
      description: 'Vibrant Holi color splash backgrounds',
      icon: Paintbrush,
      category: 'graphics',
      keywords: ['holi', 'color splash', 'background', 'vibrant'],
      url: '/design-tools/holi-color-splash',
      trending: true
    },
    {
      id: 'holi-photo-frame',
      name: 'Holi Photo Frame Editor',
      description: 'Add colorful frames to Holi photos',
      icon: Camera,
      category: 'graphics',
      keywords: ['holi', 'photo frame', 'editor', 'colorful'],
      url: '/design-tools/holi-photo-frame',
      popular: true
    },
    {
      id: 'pooja-frame-maker',
      name: 'Custom Frame Maker for Pooja Photos',
      description: 'Beautiful frames for puja ceremony photos',
      icon: Camera,
      category: 'graphics',
      keywords: ['frame', 'pooja', 'photo', 'custom'],
      url: '/design-tools/pooja-frame-maker'
    },
    {
      id: 'canva-template-downloader',
      name: 'Festival Canva Template Downloader',
      description: 'Download ready-made Canva-style templates',
      icon: Download,
      category: 'graphics',
      keywords: ['canva', 'template', 'download', 'festival'],
      url: '/design-tools/canva-template-downloader'
    },
    {
      id: 'multilingual-poster',
      name: 'Wishes in My Language Poster Maker',
      description: 'Create posters in any Indian language',
      icon: Globe,
      category: 'graphics',
      keywords: ['multilingual', 'language', 'poster', 'wishes'],
      url: '/design-tools/multilingual-poster'
    }
  ];

  const filteredTools = useMemo(() => {
    let filtered = designTools;

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(tool => tool.category === selectedCategory);
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(tool =>
        tool.name.toLowerCase().includes(query) ||
        tool.description.toLowerCase().includes(query) ||
        tool.keywords.some(keyword => keyword.toLowerCase().includes(query))
      );
    }

    return filtered;
  }, [searchQuery, selectedCategory]);

  const popularTools = designTools.filter(tool => tool.popular);
  const trendingTools = designTools.filter(tool => tool.trending);

  return (
    <>
      <SEOHelmet
        title="Festival Design & Creator Tools 2025 | Poster Maker, Diwali Banner, Navratri Invitation"
        description="65+ festival design tools: AI poster generator, Diwali banner maker, Navratri invitation creator, social media templates, greeting cards. Create stunning festival content!"
        keywords="festival poster maker, diwali banner, navratri invitation, social media post maker, ai card generator, greeting card maker, rangoli design, festival logo maker"
        url="/design-tools"
        type="website"
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Festival Tools', url: '/festival-tools' },
          { name: 'Design & Creator', url: '/design-tools' }
        ]}
        structuredData={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Festival Design & Creator Tools",
          description: "Tools and templates for posters, invitations, social posts, and branding.",
          mainEntity: {
            "@type": "ItemList",
            numberOfItems: designTools.length
          }
        }}
      />

      <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-blue-50 to-purple-50">
        {/* Breadcrumb */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 py-3">
            <div className="flex items-center text-sm text-gray-600">
              <Link to="/" className="hover:text-cyan-600 transition-colors flex items-center">
                <Home className="w-4 h-4 mr-1" />
                Home
              </Link>
              <ChevronRight className="w-4 h-4 mx-2" />
              <Link to="/festival-tools" className="hover:text-cyan-600 transition-colors">
                Festival Tools
              </Link>
              <ChevronRight className="w-4 h-4 mx-2" />
              <span className="text-cyan-600 font-medium">Design & Creator</span>
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <section className="relative py-16 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-purple-500/10"></div>
          <div className="max-w-7xl mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-cyan-600 to-purple-600 text-white px-6 py-2 rounded-full mb-6">
                <Palette className="w-5 h-5" />
                <span className="font-semibold">65+ Design & Creator Tools</span>
              </div>

              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
                Festival Design & Creator Tools
              </h1>

              <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto leading-relaxed">
                Create stunning festival content! Design Diwali banners, Navratri invitations, greeting cards, social media posts, AI posters, rangoli patterns - all with professional tools and templates.
              </p>

              {/* Search Bar */}
              <div className="max-w-2xl mx-auto">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search tools... (e.g., poster maker, banner, invitation)"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-12 py-4 text-lg rounded-2xl border-2 border-gray-200 focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-200 transition-all shadow-lg"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  )}
                </div>

                <div className="flex flex-wrap gap-2 mt-4 justify-center">
                  <span className="text-sm text-gray-600">Popular:</span>
                  {['Poster Maker', 'Diwali Banner', 'Invitation Card', 'AI Design'].map((term) => (
                    <button
                      key={term}
                      onClick={() => setSearchQuery(term)}
                      className="px-3 py-1 bg-white hover:bg-cyan-50 border border-cyan-200 rounded-full text-sm text-cyan-600 font-medium transition-colors"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>
        <section className="py-10 bg-white border-y border-gray-200">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="border rounded-xl p-4">
                <h3 className="font-semibold text-gray-900 mb-2">How to use</h3>
                <p className="text-gray-700 text-sm">Pick a category, open a template, customize colors and text, then export for social or print.</p>
              </div>
              <div className="border rounded-xl p-4">
                <h3 className="font-semibold text-gray-900 mb-2">Decision pathways</h3>
                <p className="text-gray-700 text-sm">Posters → events and offers. Cards → greetings/invitations. Social → reels, thumbnails, covers.</p>
              </div>
              <div className="border rounded-xl p-4">
                <h3 className="font-semibold text-gray-900 mb-2">Examples</h3>
                <p className="text-gray-700 text-sm">Navratri poster → share on Instagram. Diwali banner → website hero. WhatsApp greeting → send to contacts.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Category Filters */}
        <section className="py-8 bg-white border-y border-gray-200 sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900">Browse by Category</h2>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden flex items-center space-x-2 px-4 py-2 bg-cyan-100 text-cyan-600 rounded-lg"
              >
                <Filter className="w-4 h-4" />
                <span>Filters</span>
              </button>
            </div>

            <div className={`flex flex-wrap gap-3 ${!showFilters ? 'hidden lg:flex' : ''}`}>
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all ${
                    selectedCategory === category.id
                      ? 'bg-gradient-to-r from-cyan-600 to-purple-600 text-white shadow-lg scale-105'
                      : 'bg-white border-2 border-gray-200 text-gray-700 hover:border-cyan-300 hover:shadow-md'
                  }`}
                >
                  <category.icon className="w-4 h-4" />
                  <span>{category.name}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    selectedCategory === category.id ? 'bg-white/20' : 'bg-gray-100'
                  }`}>
                    {category.count}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Popular & Trending Section */}
        {selectedCategory === 'all' && !searchQuery && (
          <section className="py-12">
            <div className="max-w-7xl mx-auto px-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                {/* Popular Tools */}
                <div>
                  <div className="flex items-center space-x-2 mb-6">
                    <Star className="w-6 h-6 text-cyan-600" />
                    <h2 className="text-2xl font-bold text-gray-900">Most Popular</h2>
                  </div>
                  <div className="space-y-4">
                    {popularTools.map((tool, index) => (
                      <motion.div
                        key={tool.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Link
                          to={tool.url}
                          className="block bg-white p-4 rounded-xl shadow-md hover:shadow-xl transition-all border-l-4 border-cyan-500 hover:border-cyan-600 group"
                        >
                          <div className="flex items-start space-x-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                              <tool.icon className="w-6 h-6 text-white" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="font-bold text-gray-900 group-hover:text-cyan-600 transition-colors mb-1">
                                {tool.name}
                              </h3>
                              <p className="text-sm text-gray-600 line-clamp-2">{tool.description}</p>
                            </div>
                            <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-cyan-600 group-hover:translate-x-1 transition-all flex-shrink-0" />
                          </div>
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Trending Tools */}
                <div>
                  <div className="flex items-center space-x-2 mb-6">
                    <TrendingUp className="w-6 h-6 text-purple-600" />
                    <h2 className="text-2xl font-bold text-gray-900">Trending Now</h2>
                  </div>
                  <div className="space-y-4">
                    {trendingTools.map((tool, index) => (
                      <motion.div
                        key={tool.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Link
                          to={tool.url}
                          className="block bg-white p-4 rounded-xl shadow-md hover:shadow-xl transition-all border-l-4 border-purple-500 hover:border-purple-600 group"
                        >
                          <div className="flex items-start space-x-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                              <tool.icon className="w-6 h-6 text-white" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="font-bold text-gray-900 group-hover:text-purple-600 transition-colors mb-1">
                                {tool.name}
                              </h3>
                              <p className="text-sm text-gray-600 line-clamp-2">{tool.description}</p>
                            </div>
                            <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-purple-600 group-hover:translate-x-1 transition-all flex-shrink-0" />
                          </div>
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* All Tools Grid */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-gray-900">
                {searchQuery ? `Search Results (${filteredTools.length})` : 
                 selectedCategory !== 'all' ? `${categories.find(c => c.id === selectedCategory)?.name} (${filteredTools.length})` :
                 `All Tools (${filteredTools.length})`}
              </h2>
            </div>

            {filteredTools.length === 0 ? (
              <div className="text-center py-16">
                <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-600 mb-2">No tools found</h3>
                <p className="text-gray-500 mb-6">Try adjusting your search or filter criteria</p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('all');
                  }}
                  className="px-6 py-3 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTools.map((tool, index) => (
                  <motion.div
                    key={tool.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link
                      to={tool.url}
                      className="group block bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all overflow-hidden border border-gray-100 hover:border-cyan-300 h-full"
                    >
                      <div className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="w-14 h-14 bg-gradient-to-br from-cyan-500 to-purple-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                            <tool.icon className="w-7 h-7 text-white" />
                          </div>
                          {tool.popular && (
                            <span className="px-2 py-1 bg-cyan-100 text-cyan-600 text-xs font-bold rounded-full">
                              Popular
                            </span>
                          )}
                          {tool.trending && (
                            <span className="px-2 py-1 bg-purple-100 text-purple-600 text-xs font-bold rounded-full flex items-center">
                              <TrendingUp className="w-3 h-3 mr-1" />
                              Trending
                            </span>
                          )}
                        </div>

                        <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-cyan-600 transition-colors">
                          {tool.name}
                        </h3>
                        
                        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                          {tool.description}
                        </p>

                        <div className="flex items-center text-cyan-600 font-semibold text-sm group-hover:gap-2 transition-all">
                          Create Now
                          <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* SEO Content Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="prose prose-lg max-w-none">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Complete Guide to Festival Design & Creator Tools</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Why Use Festival Design Tools?</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Create professional-quality festival content without design skills:
                  </p>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start">
                      <span className="text-cyan-600 mr-2">✓</span>
                      Design Diwali banners for YouTube and Instagram
                    </li>
                    <li className="flex items-start">
                      <span className="text-cyan-600 mr-2">✓</span>
                      Create Navratri invitation cards instantly
                    </li>
                    <li className="flex items-start">
                      <span className="text-cyan-600 mr-2">✓</span>
                      Generate AI-powered festival posters
                    </li>
                    <li className="flex items-start">
                      <span className="text-cyan-600 mr-2">✓</span>
                      Make social media posts that stand out
                    </li>
                    <li className="flex items-start">
                      <span className="text-cyan-600 mr-2">✓</span>
                      Design greeting cards with personalization
                    </li>
                    <li className="flex items-start">
                      <span className="text-cyan-600 mr-2">✓</span>
                      Create branded festival content for business
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Top Design Tool Queries</h3>
                  <div className="bg-cyan-50 p-6 rounded-2xl">
                    <ul className="space-y-3 text-gray-700">
                      <li className="flex items-center">
                        <FileImage className="w-5 h-5 text-cyan-600 mr-2" />
                        <span className="font-semibold">Festival poster maker online free</span>
                      </li>
                      <li className="flex items-center">
                        <Layout className="w-5 h-5 text-blue-600 mr-2" />
                        <span className="font-semibold">Diwali banner design for YouTube</span>
                      </li>
                      <li className="flex items-center">
                        <Gift className="w-5 h-5 text-purple-600 mr-2" />
                        <span className="font-semibold">Navratri invitation card maker</span>
                      </li>
                      <li className="flex items-center">
                        <Instagram className="w-5 h-5 text-pink-600 mr-2" />
                        <span className="font-semibold">Instagram festival post template</span>
                      </li>
                      <li className="flex items-center">
                        <Wand2 className="w-5 h-5 text-indigo-600 mr-2" />
                        <span className="font-semibold">AI greeting card generator free</span>
                      </li>
                      <li className="flex items-center">
                        <Palette className="w-5 h-5 text-teal-600 mr-2" />
                        <span className="font-semibold">Rangoli design maker AI</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-4">Festival Design Best Practices</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-gradient-to-br from-cyan-50 to-blue-50 p-6 rounded-2xl">
                  <Palette className="w-10 h-10 text-cyan-600 mb-3" />
                  <h4 className="font-bold text-gray-900 mb-2">Choose Right Colors</h4>
                  <p className="text-sm text-gray-700">Use traditional festival colors: red/gold for Diwali, vibrant rainbow for Holi, purple/pink for Navratri.</p>
                </div>
                <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-2xl">
                  <Type className="w-10 h-10 text-blue-600 mb-3" />
                  <h4 className="font-bold text-gray-900 mb-2">Typography Matters</h4>
                  <p className="text-sm text-gray-700">Use our Font Pairing Tool to combine traditional and modern fonts for eye-catching designs.</p>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-2xl">
                  <Wand2 className="w-10 h-10 text-purple-600 mb-3" />
                  <h4 className="font-bold text-gray-900 mb-2">Leverage AI</h4>
                  <p className="text-sm text-gray-700">AI tools create unique designs instantly. Perfect for when you need professional results without design experience.</p>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-4">Design Tool Categories</h3>
              <div className="space-y-4 mb-8">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-bold text-gray-900 mb-2">Posters & Banners (15 tools)</h4>
                  <p className="text-gray-700 text-sm">AI poster generators, Diwali banners, Navratri event posters, flyers, business posters, e-commerce banners, and YouTube thumbnails.</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-bold text-gray-900 mb-2">Cards & Invitations (10 tools)</h4>
                  <p className="text-gray-700 text-sm">AI greeting cards, Rakhi invitations, WhatsApp greetings, QR code wishes, thank you cards, and employee wish generators.</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-bold text-gray-900 mb-2">Social Media (12 tools)</h4>
                  <p className="text-gray-700 text-sm">Instagram story templates, Reel captions, scripts, hashtags, video makers, stickers, and GIF creators.</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-bold text-gray-900 mb-2">AI Design Tools (15 tools)</h4>
                  <p className="text-gray-700 text-sm">AI logos, mandala art, rangoli patterns, Ganesha portraits, firework backgrounds, wallpapers, animations, and scene generators.</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-bold text-gray-900 mb-2">Business & Branding (8 tools)</h4>
                  <p className="text-gray-700 text-sm">Branded logos, fonts, typography, color palettes, multilingual translators, and business templates.</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-bold text-gray-900 mb-2">Graphics & Art (5 tools)</h4>
                  <p className="text-gray-700 text-sm">Holi color splash, photo frames, Canva templates, and multilingual posters.</p>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-4">How to Create Festival Designs</h3>
              <ol className="list-decimal list-inside space-y-3 text-gray-700 mb-6">
                <li><strong>Choose Your Tool:</strong> Select from posters, cards, social media, or AI design tools.</li>
                <li><strong>Pick a Template:</strong> Browse pre-made templates or start from scratch.</li>
                <li><strong>Customize:</strong> Add your text, images, colors, and personal touches.</li>
                <li><strong>Use AI Features:</strong> Let AI suggest designs, generate art, or write captions.</li>
                <li><strong>Preview & Adjust:</strong> Review your design and make final adjustments.</li>
                <li><strong>Download & Share:</strong> Export in high quality and share on social media.</li>
              </ol>

              <h3 className="text-2xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h3>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-bold text-gray-900 mb-2">How to make Diwali banner for YouTube channel?</h4>
                  <p className="text-gray-700 text-sm">Use our Diwali Banner Maker which has YouTube-optimized dimensions (2560x1440px). Choose from templates, add your channel name, customize colors, and download in HD quality.</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-bold text-gray-900 mb-2">Can I create Navratri invitation cards for free?</h4>
                  <p className="text-gray-700 text-sm">Yes! Our Rakhi Invitation Card Creator and Navratri Poster Maker are 100% free. Create unlimited invitations with beautiful templates and download without watermarks.</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-bold text-gray-900 mb-2">What's the best tool for festival poster making?</h4>
                  <p className="text-gray-700 text-sm">Our AI Festival Poster Generator is the most popular choice. It uses AI to create unique designs based on your inputs. For templates, try our Festival Flyer Generator or Business Poster Generator.</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-bold text-gray-900 mb-2">Can I add my business logo to festival greetings?</h4>
                  <p className="text-gray-700 text-sm">Absolutely! Use our "Wish with Your Logo" Generator or Branded Greeting Image Generator to add company logos, create professional business greetings, and maintain brand consistency.</p>
                </div>
              </div>

              <div className="mt-12 bg-gradient-to-r from-cyan-600 to-purple-600 text-white p-8 rounded-2xl">
                <h3 className="text-2xl font-bold mb-4">Start Creating Beautiful Festival Designs Today!</h3>
                <p className="mb-6 text-white/90">
                  Design posters, banners, invitations, and social media content with our 65+ professional design tools. No design experience needed!
                </p>
                <Link
                  to="/festival-tools"
                  className="inline-flex items-center px-6 py-3 bg-white text-cyan-600 rounded-lg font-bold hover:bg-gray-100 transition-colors"
                >
                  Explore All Festival Tools
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default DesignCreatorTools;

