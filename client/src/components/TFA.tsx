import type { TActivate2FaSuccess } from "@/types/api.types";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Verify2FA from "./Verify2FA";
import Activate2FA from "./Activate2FA";
import RecoveryCodes from "./RecoveryCodes";
import { API_ROUTES } from "@/const/api.const";
import { sendRequest } from "@/utils/api.utils";
import LoadingScreen from "./Loading";

function TFA() {
  const navigate = useNavigate();

  const [is2FaActivated, setIs2FaActivated] = useState<{
    activated: boolean | null;
    loading: boolean;
    QRurl: string;
    secret: string;
  }>({ activated: null, loading: true, QRurl: "", secret: "" });

  const [isReoveryCodes, setReoveryCodes] = useState<{
    show: boolean;
    codes: string[];
  }>({ show: false, codes: [] });

  // check user already activated and check whatis stage of user is verify or activation
  const handle2FA = useCallback(async () => {
    const res2Fa = (await sendRequest(
      API_ROUTES.ACTIVATE_TFA.url,
      {},
      {
        method: API_ROUTES.ACTIVATE_TFA.method,
        credentials: "include",
      }
    )) as TActivate2FaSuccess;

    // api res success if user not activated and cookie recived suucessfully
    if (res2Fa.success) {
      setIs2FaActivated((prev) => ({
        ...prev,
        activated: false,
        loading: false,
        QRurl: res2Fa.data.qrDataUrl,
        secret: res2Fa.data.secret,
      }));
    } else {
      // if user already activated then show verification components
      if (res2Fa.data?.activated) {
        setIs2FaActivated((prev) => ({
          ...prev,
          activated: true,
          loading: false,
        }));
        return;
      }

      // send unauthorized user to homepage
      if (res2Fa.message === "Unauthorized") {
        toast.error(res2Fa.message);
        navigate("/");
        return;
      }

      toast.error(res2Fa.message);
    }
  }, [navigate]);

  useEffect(() => {
    (async () => handle2FA())();
  }, [handle2FA]);

  const addRecoveryCode = (codes: string[]) => {
    setReoveryCodes({ codes, show: true });
  };

  return (
    <>
      {isReoveryCodes.show ? (
        <RecoveryCodes recoveryCodes={isReoveryCodes.codes} />
      ) : (
        <div className="min-h-screen bg-linear-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center px-4 py-12">
          {is2FaActivated.loading && (
            <LoadingScreen type="2fa-setup" fullScreen={false} />
          )}
          {is2FaActivated.activated !== null &&
            (is2FaActivated.activated ? (
              // verify stage
              <Verify2FA
                isActivated={is2FaActivated.activated}
                addRecoverCodes={addRecoveryCode}
              />
            ) : (
              // activation stage
              <Activate2FA
                qrDataUrl={is2FaActivated.QRurl}
                secret={is2FaActivated.secret}
                addRecoverCodes={addRecoveryCode}
              />
            ))}
        </div>
      )}
    </>
  );
}

export default TFA;
