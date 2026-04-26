/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { 
  Home, 
  Lightbulb, 
  Users, 
  Calendar, 
  BarChart3, 
  Settings, 
  FileText, 
  Shield, 
  Rocket,
  TrendingUp,
  Cpu,
  Target
} from 'lucide-react';
import { UserRole } from './lib/firebase';

export const STAGES = [
  { id: 0, name: 'Stage 0: Awareness & Pipeline', description: 'Pipeline building and ecosystem awareness.' },
  { id: 1, name: 'Stage 1: Ideation', description: 'Conceptualizing and refining the initial idea.' },
  { id: 2, name: 'Stage 2: Validation', description: 'Problem-solution fit and market validation.' },
  { id: 3, name: 'Stage 3: POC / Tech Dev', description: 'Proof of concept and technology development.' },
  { id: 4, name: 'Stage 4: Pilot Testing', description: 'Real-world testing and user feedback.' },
  { id: 5, name: 'Stage 5: Commercialisation', description: 'Market entry and scaling.' },
];

export const SECTORS = [
  'Agri-Tech',
  'Social Innovation',
  'Smart Digital',
  'Green Energy',
  'FinTech',
  'HealthTech',
  'Manufacturing',
  'Education',
];

export const NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: Home, roles: ['ADMIN', 'COORDINATOR', 'INNOVATOR', 'MENTOR', 'FUNDER', 'MANAGER'] },
  { id: 'innovations', label: 'Innovations', icon: Lightbulb, roles: ['ADMIN', 'COORDINATOR', 'INNOVATOR', 'MENTOR', 'MANAGER'] },
  { id: 'programmes', label: 'Programmes', icon: Shield, roles: ['ADMIN', 'COORDINATOR', 'MANAGER', 'FUNDER'] },
  { id: 'mentorship', label: 'Mentorship', icon: Users, roles: ['ADMIN', 'COORDINATOR', 'MENTOR', 'INNOVATOR'] },
  { id: 'impact', label: 'Impact & KPIs', icon: BarChart3, roles: ['ADMIN', 'COORDINATOR', 'FUNDER', 'MANAGER'] },
  { id: 'documents', label: 'Documents', icon: FileText, roles: ['ADMIN', 'COORDINATOR', 'INNOVATOR', 'MENTOR'] },
  { id: 'settings', label: 'Settings', icon: Settings, roles: ['ADMIN'] },
];

export const ROLE_LABELS: Record<UserRole, string> = {
  ADMIN: 'System Admin',
  COORDINATOR: 'Programme Coordinator',
  INNOVATOR: 'Innovator',
  MENTOR: 'Expert Mentor',
  FUNDER: 'Stakeholder / Funder',
  MANAGER: 'Line Manager',
};
