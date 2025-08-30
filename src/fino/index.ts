// Fino Finance Chat System - Main Export File
// This file provides clean imports for all Fino-related components and services

// Components
export { default as FinoChat } from './components/FinoChat';
export { default as FinoHome } from './pages/FinoHome';

// Services
export * from './services/finoApi';

// Types (if we add them later)
// export * from './types';

// Constants
export const FINO_ROUTES = {
  CHAT: '/fino',
  HOME: '/fino-home'
} as const;

export const FINO_FEATURES = {
  VOICE_INPUT: true,
  MULTI_LANGUAGE: true,
  REAL_TIME_DATA: true,
  CHARTS: true,
  DARK_MODE: true,
  NO_LOGIN: true
} as const;

// Version info
export const FINO_VERSION = '1.0.0';
export const FINO_DESCRIPTION = 'AI-powered finance chat system for the Indian market';
