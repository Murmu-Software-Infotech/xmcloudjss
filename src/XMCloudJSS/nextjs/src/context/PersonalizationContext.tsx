/**
 * Personalization Context
 * Manages user personalization data including category preferences,
 * purchase history, and personalization rules
 */

import { createContext, useContext, useState, ReactNode, useCallback } from 'react';

export interface PersonalizationData {
  userId: string;
  category?: string;
  previousPurchases: string[];
  isNewUser: boolean;
  visitCount: number;
  lastVisit?: Date;
  personalizationRules: PersonalizationRule[];
}

export interface PersonalizationRule {
  id: string;
  name: string;
  condition: (data: PersonalizationData) => boolean;
  variant: 'premium' | 'standard' | 'budget' | 'new-user' | 'returning-customer';
}

interface PersonalizationContextType {
  data: PersonalizationData;
  updateUserCategory: (category: string) => void;
  addPurchase: (productId: string) => void;
  removePurchase: (productId: string) => void;
  getApplicableRules: () => PersonalizationRule[];
  getCurrentVariant: () => string;
  resetPersonalization: () => void;
}

const PersonalizationContext = createContext<PersonalizationContextType | undefined>(undefined);

// Default personalization rules
const DEFAULT_RULES: PersonalizationRule[] = [
  {
    id: 'rule-new-user',
    name: 'New User',
    condition: (data) => data.isNewUser && data.visitCount <= 2,
    variant: 'new-user'
  },
  {
    id: 'rule-returning-customer',
    name: 'Returning Customer',
    condition: (data) => !data.isNewUser && data.visitCount > 5,
    variant: 'returning-customer'
  },
  {
    id: 'rule-premium-buyer',
    name: 'Premium Buyer',
    condition: (data) => data.previousPurchases.length > 3,
    variant: 'premium'
  },
  {
    id: 'rule-budget-conscious',
    name: 'Budget Conscious',
    condition: (data) => data.category === 'Accessories' || data.previousPurchases.length <= 1,
    variant: 'budget'
  }
];

export function PersonalizationProvider({ children }: { children: ReactNode }) {
  // Initialize from localStorage if available
  const [data, setData] = useState<PersonalizationData>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('personalization_data');
      if (stored) {
        return JSON.parse(stored);
      }
    }

    return {
      userId: `user_${Math.random().toString(36).substr(2, 9)}`,
      category: undefined,
      previousPurchases: [],
      isNewUser: true,
      visitCount: 1,
      lastVisit: new Date(),
      personalizationRules: DEFAULT_RULES
    };
  });

  // Persist to localStorage whenever data changes
  const updateData = useCallback((newData: PersonalizationData) => {
    setData(newData);
    if (typeof window !== 'undefined') {
      localStorage.setItem('personalization_data', JSON.stringify(newData));
    }
  }, []);

  const updateUserCategory = useCallback((category: string) => {
    updateData({
      ...data,
      category
    });
  }, [data, updateData]);

  const addPurchase = useCallback((productId: string) => {
    if (!data.previousPurchases.includes(productId)) {
      updateData({
        ...data,
        previousPurchases: [...data.previousPurchases, productId],
        isNewUser: false
      });
    }
  }, [data, updateData]);

  const removePurchase = useCallback((productId: string) => {
    updateData({
      ...data,
      previousPurchases: data.previousPurchases.filter(id => id !== productId)
    });
  }, [data, updateData]);

  const getApplicableRules = useCallback((): PersonalizationRule[] => {
    return data.personalizationRules.filter(rule => rule.condition(data));
  }, [data]);

  const getCurrentVariant = useCallback((): string => {
    const applicableRules = getApplicableRules();
    
    // Priority order of variants
    const variantPriority: Record<string, number> = {
      'premium': 1,
      'new-user': 2,
      'returning-customer': 3,
      'budget': 4,
      'standard': 5
    };

    if (applicableRules.length === 0) return 'standard';

    return applicableRules.reduce((current, rule) => {
      const currentPriority = variantPriority[current] || 5;
      const rulePriority = variantPriority[rule.variant] || 5;
      return rulePriority < currentPriority ? rule.variant : current;
    }, 'standard');
  }, [getApplicableRules]);

  const resetPersonalization = useCallback(() => {
    updateData({
      userId: `user_${Math.random().toString(36).substr(2, 9)}`,
      category: undefined,
      previousPurchases: [],
      isNewUser: true,
      visitCount: 1,
      lastVisit: new Date(),
      personalizationRules: DEFAULT_RULES
    });
  }, [updateData]);

  const value: PersonalizationContextType = {
    data,
    updateUserCategory,
    addPurchase,
    removePurchase,
    getApplicableRules,
    getCurrentVariant,
    resetPersonalization
  };

  return (
    <PersonalizationContext.Provider value={value}>
      {children}
    </PersonalizationContext.Provider>
  );
}

export function usePersonalization(): PersonalizationContextType {
  const context = useContext(PersonalizationContext);
  if (!context) {
    throw new Error('usePersonalization must be used within PersonalizationProvider');
  }
  return context;
}

