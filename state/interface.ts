//create a zustand store for a token of a user
import { create } from 'zustand';
import { SignUpStep } from './signUpSteps';
import { mountStoreDevtool } from 'simple-zustand-devtools';

type InterfaceState = {
  currentSignUpStep: number;
  setCurrentSignUpStep: (step: SignUpStep) => void;
  advanceToNextSignUpStep: () => void;
  goBackToPreviousSignUpStep: () => void;
  isGoingToPreviousStep: boolean;

  signUpUserFormValues: any;
  setSignUpUserFormValues: (values: any) => void;

  signUpProfileFormValues: any;
  setSignUpProfileFormValues: (values: any) => void;

  paymentMethod: string;
  setPaymentMethod: (method: string) => void;

  signUpPaymentFormValues: any;
  setSignUpPaymentFormValues: (values: any) => void;

  signUpErrorDetected: boolean;
  setSignUpErrorDetected: (value: boolean) => void;

  selectFeature: (feature: any) => void;
  removeFeature: (feature: any) => void;

  features: any[];

  redirectName: string | undefined;
  setRedirectName: (path: string | undefined) => void;
};

export const useInterfaceStore = create<InterfaceState>(
  (set: any, get: any) => ({
    currentSignUpStep: 2,
    setCurrentSignUpStep: (step: SignUpStep) => {
      set({ currentSignUpStep: step });
    },
    isGoingToPreviousStep: false,

    advanceToNextSignUpStep: () => {
      set((state: any) => {
        return {
          signUpErrorDetected: true,
          currentSignUpStep: state.currentSignUpStep + 1,
          isGoingToPreviousStep: false,
        };
      });
    },
    goBackToPreviousSignUpStep: () => {
      set((state: any) => {
        return {
          signUpErrorDetected: true,

          currentSignUpStep: state.currentSignUpStep - 1,
          isGoingToPreviousStep: true,
        };
      });
    },

    signUpUserFormValues: {},
    setSignUpUserFormValues: (values: any) => {
      set({ signUpUserFormValues: values });
    },

    signUpProfileFormValues: {},
    setSignUpProfileFormValues: (values: any) => {
      set({ signUpProfileFormValues: values });
    },

    signUpErrorDetected: true,
    setSignUpErrorDetected: (value: any) => {
      set({ signUpErrorDetected: value });
    },

    paymentMethod: '',
    setPaymentMethod: (method: string) => {
      set({ paymentMethod: method });
    },

    signUpPaymentFormValues: {},
    setSignUpPaymentFormValues: (values: any) => {
      set({ signUpPaymentFormValues: values });
    },

    features: [],
    selectFeature: (feature: any) => {
      const newFeatures = get().features.filter(
        (f: any) => f._id !== feature._id
      );
      newFeatures.push(feature);
      set({ features: newFeatures });
    },
    removeFeature: (feature: any) => {
      const newFeatures = get().features.filter(
        (f: any) => f._id !== feature._id && f.reliesOn !== feature._id
      );
      set({ features: newFeatures });
    },

    redirectName: undefined,
    setRedirectName: (name: any) => {
      set({ redirectName: name });
    },
  })
);

if (process.env.NODE_ENV === 'development') {
  mountStoreDevtool('Store', useInterfaceStore);
}
