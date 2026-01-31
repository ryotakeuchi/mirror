"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Persona } from "@/lib/personas";

export interface DiagnosisAnswers {
  vibe: string | null;
  effort: string | null;
  focus: string | null;
  style: string | null;
  generation: string | null;
}

interface AppContextType {
  isOnboarded: boolean;
  hasCompletedDiagnosis: boolean;
  selectedPersona: Persona | null;
  diagnosisAnswers: DiagnosisAnswers;
  setOnboarded: (value: boolean) => void;
  setCompletedDiagnosis: (value: boolean) => void;
  setSelectedPersona: (persona: Persona | null) => void;
  updateDiagnosisAnswer: (category: keyof DiagnosisAnswers, value: any) => void;
  resetApp: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [isOnboarded, setIsOnboarded] = useState(false);
  const [hasCompletedDiagnosis, setHasCompletedDiagnosis] = useState(false);
  const [selectedPersona, setSelectedPersona] = useState<Persona | null>(null);
  const [diagnosisAnswers, setDiagnosisAnswers] = useState<DiagnosisAnswers>({
    vibe: null,
    effort: null,
    focus: null,
    style: null,
    generation: null,
  });

  useEffect(() => {
    // Load from localStorage
    const stored = localStorage.getItem("mirror-app-state");
    if (stored) {
      try {
        const state = JSON.parse(stored);
        setIsOnboarded(state.isOnboarded || false);
        setHasCompletedDiagnosis(state.hasCompletedDiagnosis || false);
        setDiagnosisAnswers(state.diagnosisAnswers || {
          vibe: null,
          effort: null,
          focus: null,
          style: null,
          generation: null,
        });
        if (state.selectedPersona) {
          setSelectedPersona(state.selectedPersona);
        }
      } catch (e) {
        console.error("Failed to load app state:", e);
      }
    }
  }, []);

  useEffect(() => {
    // Save to localStorage
    const state = {
      isOnboarded,
      hasCompletedDiagnosis,
      selectedPersona,
      diagnosisAnswers,
    };
    localStorage.setItem("mirror-app-state", JSON.stringify(state));
  }, [isOnboarded, hasCompletedDiagnosis, selectedPersona, diagnosisAnswers]);

  const updateDiagnosisAnswer = (
    category: keyof DiagnosisAnswers,
    value: any
  ) => {
    setDiagnosisAnswers((prev) => ({
      ...prev,
      [category]: value,
    }));
  };

  const resetApp = () => {
    setIsOnboarded(false);
    setHasCompletedDiagnosis(false);
    setSelectedPersona(null);
    setDiagnosisAnswers({
      vibe: null,
      effort: null,
      focus: null,
      style: null,
      generation: null,
    });
    localStorage.removeItem("mirror-app-state");
  };

  return (
    <AppContext.Provider
      value={{
        isOnboarded,
        hasCompletedDiagnosis,
        selectedPersona,
        diagnosisAnswers,
        setOnboarded: setIsOnboarded,
        setCompletedDiagnosis: setHasCompletedDiagnosis,
        setSelectedPersona,
        updateDiagnosisAnswer,
        resetApp,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}
