import Page from "@/layouts/Page.layout";
import SignUpView from "@/screens/signUp/SignUp.view";
import { useInterfaceStore } from "@/state/interface";

export default function Home() {
  // pull the current registration step from state
  return (
    <Page
      meta={{
        title: `Shepherd's Registration`,
        keywords: [
          "Shepherd's CMS",
          "Church management software",
          "Free church management software",
          "Cloud-based church software",
          "Church administration tool",
          "Church database management",
          "SaaS church software",
          "Church membership management",
          "Volunteer management software",
          "Church communication tool",
          "Online church directory",
          "Church event registration",
          "Church finance management",
          "Church attendance tracking",
          "Church donation management",
          "Small church software",
          "Church leadership tool",
          "Church analytics software",
          "Church software solutions",
          "Web-based church software",
        ],
      }}
    >
      <SignUpView />
    </Page>
  );
}
