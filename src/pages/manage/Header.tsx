import {
  Box,
  Button,
  Center,
  createDisclosure,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Heading,
  HStack,
  Image,
  IconButton,
  useColorModeValue,
} from "@hope-ui/solid"
import svgLogo from "../../../images/logo_svg.svg"
import { TiThMenu } from "solid-icons/ti"
import { IoExit } from "solid-icons/io"
import {
  CenterLoading,
  SwitchColorMode,
  SwitchLanguageWhite,
} from "~/components"
import { useFetch, useRouter, useT } from "~/hooks"
import { SideMenu } from "./SideMenu"
import { side_menu_items } from "./sidemenu_items"
import { changeToken, handleResp, notify, r } from "~/utils"
import { PResp } from "~/types"
const { isOpen, onOpen, onClose } = createDisclosure()
const [logOutReqLoading, logOutReq] = useFetch(
  (): PResp<any> => r.get("/auth/logout"),
)

const Header = () => {
  const t = useT()
  const { to } = useRouter()
  const logOut = async () => {
    handleResp(await logOutReq(), () => {
      changeToken()
      notify.success(t("manage.logout_success"))
      to(`/@login`)
    })
  }
  return (
    <Box
      as="header"
      position="sticky"
      top="0"
      left="0"
      right="0"
      zIndex="$sticky"
      height="64px"
      flexShrink={0}
      shadow="$md"
      p="$4"
      bgColor={useColorModeValue("$background", "$neutral2")()}
    >
      <Flex alignItems="center" justifyContent="space-between" h="$full">
        <HStack spacing="$2">
          <IconButton
            aria-label="menu"
            icon={<TiThMenu />}
            display={{ "@sm": "none" }}
            onClick={onOpen}
            size="sm"
          />
          <HStack class="header-left" h="44px">
            <Image
              src={svgLogo}
              h="$full"
              w="auto"
              fallback={<CenterLoading />}
            />
            {}
          </HStack>
        </HStack>
        <HStack spacing="$1">
          <IconButton
            aria-label="logout"
            icon={<IoExit />}
            fontSize="$xl"
            loading={logOutReqLoading()}
            onClick={logOut}
            size="md"
          />
        </HStack>
      </Flex>
      <Drawer opened={isOpen()} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader color="$info9">{t("manage.title")}</DrawerHeader>
          <DrawerBody>
            <SideMenu items={side_menu_items} />
            <Center>
              <HStack spacing="$4" p="$2" color="$neutral11">
                <SwitchLanguageWhite />
                <SwitchColorMode />
              </HStack>
            </Center>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  )
}

export { Header, onClose }
