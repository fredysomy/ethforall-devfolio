import { extendTheme } from "@chakra-ui/react"

const theme = extendTheme({
    styles: {
      global: {
        'html, body': {
          fontSize: "16px",
          fontFamily: "Montserrat",
          marginX: "0",
          color: "#252525",
          background: "1f1f1f"
        },
        a: {
          color: 'blue',
        },
      },
    },
  })

  export default theme