import type { TActivate2FaSuccess } from "@/types/api.types";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Verify2FA from "./Verify2FA";
import Activate2FA from "./Activate2FA";
import RecoveryCodes from "./RecoveryCodes";

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

  // server to find stage of user
  const activate2FaAPI = async (): Promise<TActivate2FaSuccess> => {
    const url = "http://localhost:3000/api/v1/user/activate-2fa";

    const res = await fetch(url, {
      method: "post",
      credentials: "include",
    });

    const resData = (await res.json()) as TActivate2FaSuccess;
    return resData;
  };

  // checkc user already activated or which stage on verify or activation
  const handle2FA = async () => {
    const res2Fa = await activate2FaAPI();

    if (res2Fa.success) {
      setIs2FaActivated((prev) => ({
        ...prev,
        activated: false,
        loading: false,
        QRurl: res2Fa.data.qrDataUrl,
        secret: res2Fa.data.secret,
      }));
    } else {
      // send unauthorized user to homepage
      if (res2Fa.message === "Unauthorized") {
        toast.error(res2Fa.message);
        navigate("/");
      }

      if (res2Fa.data?.activated) {
        setIs2FaActivated((prev) => ({
          ...prev,
          activated: true,
          loading: false,
        }));
      }
    }
  };

  useEffect(() => {
    handle2FA();
  }, []);

  const addRecoveryCode = (codes: string[]) => {
    setReoveryCodes({ codes, show: true });
  };

  return (
    <>
      {isReoveryCodes.show ? (
        <RecoveryCodes recoveryCodes={isReoveryCodes.codes} />
      ) : (
        <div className="min-h-screen bg-linear-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center px-4 py-12">
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
