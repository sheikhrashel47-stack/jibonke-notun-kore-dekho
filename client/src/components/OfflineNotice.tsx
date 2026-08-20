/* JIBON PWA status: a quiet, accessible notice that explains the local-first fallback without overpromising cached PDF access. */
import { CloudOff, Wifi } from "lucide-react";
import { useEffect, useState } from "react";

export function OfflineNotice() {
  const [online, setOnline] = useState(() => navigator.onLine);
  useEffect(() => {
    const goOnline = () => setOnline(true);
    const goOffline = () => setOnline(false);
    window.addEventListener("online", goOnline);
    window.addEventListener("offline", goOffline);
    return () => { window.removeEventListener("online", goOnline); window.removeEventListener("offline", goOffline); };
  }, []);
  if (online) return null;
  return <div className="jibon-offline-notice" role="status"><CloudOff className="size-4" /><span><b>তুমি এখন offline</b> — আগে খোলা app screen ও তোমার notes এই device-এ থাকবে। PDF পড়তে আবার internet লাগবে।</span><Wifi className="size-4" aria-hidden="true" /></div>;
}
