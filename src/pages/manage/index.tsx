import { Box, Center, Flex, HStack, useColorModeValue } from "@hope-ui/solid"
import { FullLoading, SwitchColorMode, SwitchLanguageWhite } from "~/components"
import { useRouter, useT, useTitle } from "~/hooks"
import { Header } from "./Header"
import { SideMenu } from "./SideMenu"
import { side_menu_items } from "./sidemenu_items"
import { Route, Routes } from "@solidjs/router"
import { For, Suspense } from "solid-js"
import { routes } from "./routes"
import { UserMethods } from "~/types"
import { me } from "~/store"

const Manage = () => {
  const t = useT()
  const { to } = useRouter()
  useTitle(() => t("manage.title"))
  if (UserMethods.is_general(me()) || UserMethods.is_guest(me())) {
    return to("/")
  }
  return (
    <Box
      css={{
        "--hope-colors-background": "var(--hope-colors-loContrast)",
      }}
      bgColor="$background"
      w="$full"
    >
      <Header />
      <Flex w="$full" h="calc(100vh - 64px)">
        <Box
          display={{ "@initial": "none", "@sm": "block" }}
          w="$56"
          h="$full"
          shadow="$md"
          bgColor={useColorModeValue("$background", "$neutral2")()}
          overflowY="auto"
        >
          <SideMenu items={side_menu_items} />
          {/* <Center>
            <HStack spacing="$4" p="$2" color="$neutral11">
              <SwitchLanguageWhite />
              <SwitchColorMode />
            </HStack>
          </Center> */}
        </Box>
        <Box
          w={{
            "@initial": "$full",
            "@sm": "calc(100% - 14rem)",
          }}
          p="$4"
          overflowY="auto"
        >
          <Routes>
            <For each={routes}>
              {(route) => {
                return <Route path={route.to!} component={route.component} />
              }}
            </For>
          </Routes>
        </Box>
      </Flex>
    </Box>
  )
}

export default Manage
