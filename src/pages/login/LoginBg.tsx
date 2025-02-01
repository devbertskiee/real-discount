import { Box, useColorModeValue } from "@hope-ui/solid"
import CornerBottom from "./CornerBottom"
import CornerTop from "./CornerTop"

const LoginBg = () => {
  return (
    <Box
      pos="fixed"
      top="0"
      left="0"
      overflow="hidden"
      zIndex="-1"
      w="100vw"
      h="100vh"
    ></Box>
  )
}

export default LoginBg
