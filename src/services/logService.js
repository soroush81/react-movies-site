import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";
import Raven from 'raven-js'

function init(){
// Sentry.init({
//   dsn: "https://4644e42fa81c47469254a8554d38504b@o762373.ingest.sentry.io/5793364",
//   integrations: [new Integrations.BrowserTracing()],
//   tracesSampleRate: 1.0,
// });
}

function log(error)
{
  //Raven.captureException(error)
  console.error(error)
}

export default {init,log}
