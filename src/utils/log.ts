import pino from "pino"
const transport = pino.transport({
    targets: [
      {
        level: "trace",
        target: "pino-pretty",
        options: {},
      },
    ],
  })
  
  export const logger = pino({}, transport)
  