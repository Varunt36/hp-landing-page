// src/store/registrationStore.ts
import { create } from 'zustand'
import { type MemberDetail } from '../api/registrations'

// Re-export so components can get MemberDetail from either layer without a circular dep
export type { MemberDetail }

interface GroupInfo {
  country:     string
  karyakarta:  string
  memberCount: number
}

interface RegistrationState {
  currentStep:   number
  groupInfo:     GroupInfo
  members:       MemberDetail[]
  termsAccepted: boolean
  confirmRef:    string

  setStep:       (step: number) => void
  setGroupInfo:  (info: GroupInfo) => void
  setMember:     (index: number, data: MemberDetail) => void
  setTerms:      (accepted: boolean) => void
  setConfirmRef: (ref: string) => void
  reset:         () => void
}

const defaultGroupInfo: GroupInfo = {
  country:     'DE',
  karyakarta:  '',
  memberCount: 1,
}

export const useRegistrationStore = create<RegistrationState>((set) => ({
  currentStep:   1,
  groupInfo:     defaultGroupInfo,
  members:       [],
  termsAccepted: false,
  confirmRef:    '',

  setStep:       (step) => set({ currentStep: step }),
  setGroupInfo:  (info) => set({ groupInfo: info }),
  setMember:     (index, data) =>
    set((state) => {
      const updated = [...state.members]
      updated[index] = data
      return { members: updated }
    }),
  setTerms:      (accepted) => set({ termsAccepted: accepted }),
  setConfirmRef: (ref) => set({ confirmRef: ref }),
  reset:         () => set({
    currentStep:   1,
    groupInfo:     defaultGroupInfo,
    members:       [],
    termsAccepted: false,
    confirmRef:    '',
  }),
}))
