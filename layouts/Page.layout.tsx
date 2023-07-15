import { useLogin } from "@/state/serverState/auth";
import styles from "./Page.module.scss";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useUserStore } from "@/state/user";
import Loader from "@/components/loader/Loader.component";
import { Modal } from "antd";
import { useInterfaceStore } from "@/state/interface";

type Props = {
  children: React.ReactNode;
};

const AuthPage = (props: Props) => {
  const router = useRouter();
  const { token, logout } = useUserStore((state) => state);
  const { setRedirectName, redirectName } = useInterfaceStore((state) => state);

  const redirect = router.query.redirect as string;
  const shouldLogout = router.query.logout == "true";

  const performRedirect = (to: string) => {
    console.log("We're redirecting to", to);

    window.location.href = to as any;
  };

  useEffect(() => {
    if (!router.isReady) return;

    if (token) {
      if (redirect) return performRedirect(redirect);

      // if we are in production, redirect to the main site
      // othwerwise, redirect to the local site
      const isProduction = process.env.NODE_ENV === "production";
      return performRedirect(isProduction ? `https://shepherdscms.org/${token ? `?token=${token}` : ""}` : `http://localhost:3000/${token ? `?token=${token}` : ""}`);
    }
  }, [token, redirect]);

  useEffect(() => {
    if (shouldLogout) logout();
    if (!redirect) return setRedirectName("ShepherdsCMS");
    setRedirectName(redirect?.split(/[/.]/)[2][0].toUpperCase() + redirect?.split(/[/.]/)[2].slice(1).toLowerCase());
  }, [router]);

  return (
    <div className={styles.wrapper}>
      <Modal open={!!token} centered footer={null} closable={false} maskClosable={false}>
        <div className={styles.redirectModal}>
          <Loader />
          <h4>
            Taking you to <br />
            <span>{redirectName}</span>
          </h4>
        </div>
      </Modal>

      <div className={styles.container}>
        <div className={styles.featured}>
          <p className={styles.message}>
            Shepherd's CMS is a free, open-source, and self-hosted content management system for churches. It is
            designed to be simple, easy to use, and powerful.
          </p>
        </div>
        <div className={styles.auth}>
          <div className={styles.banner}>{redirectName}</div>
          {props.children}
        </div>
      </div>
    </div>
  );
};

export default AuthPage;