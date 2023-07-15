export type SignUpStep = {
  id: number;
  title: string;
  component: JSX.Element;
  nextButtonText: string;
  headerText: string;
  icon: JSX.Element;
  subHeaderText: string;
  nextButtonDisabled: boolean;
  hideBackButton: boolean;
  nextButtonAction: () => void;
  previousButtonAction?: () => void;
};
