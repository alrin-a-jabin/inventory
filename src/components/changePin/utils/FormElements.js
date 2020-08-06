export const FormElements = {
  pin: {
      name: "pin",
      placeholder: "pin",
      label: "pin",
      width: "sm",
      regex: /^[0-9' -]*$/,
      ismandatory: true
    },
    newPin: {
      name: "newPin",
      placeholder: "New Pin",
      label: "New Pin",
      width: "sm",
      regex: /^[0-9' -]*$/,
      ismandatory: true
    },
    confirmPin: {
      name: "confirmPin",
      placeholder: "Confirm Pin",
      label: "Confirm Pin",
      width: "sm",
      regex: /^[0-9' -]*$/,
      ismandatory: true
    },
    senderMsisdn: {
      name: "senderMsisdn",
      placeholder: "Sender Msisdn",
      label: "Sender Msisdn",
      width: "sm",
      ismandatory: false
    }
  }