import {
  Button,
  HStack,
  IconButton,
  Menu,
  MenuContent,
  MenuItem,
  MenuTrigger,
} from "@hope-ui/solid"
import { changeColor } from "seemly"
import { BiRegularLogInCircle } from "solid-icons/bi"
import { BsGridFill, BsCardImage } from "solid-icons/bs"
import { FaSolidListUl } from "solid-icons/fa"
import { IoExit, IoSettings } from "solid-icons/io"
import { For, Show } from "solid-js"
import { Dynamic } from "solid-js/web"
import { useFetch, useRouter, useT } from "~/hooks"
import { getMainColor, LayoutType, layout, setLayout, me } from "~/store"
import { PResp, UserMethods } from "~/types"
import { changeToken, handleResp, notify, r } from "~/utils"

const [logOutReqLoading, logOutReq] = useFetch(
  (): PResp<any> => r.get("/auth/logout"),
)

const layouts = {
  list: FaSolidListUl,
  grid: BsGridFill,
  image: BsCardImage,
} as const

export const Layout = () => {
  const { to } = useRouter()
  const t = useT()
  const logOut = async () => {
    handleResp(await logOutReq(), () => {
      changeToken()
      notify.success(t("manage.logout_success"))
      to(`/@login`)
    })
  }
  return (
    <Menu>
      {/* <MenuTrigger
        as={IconButton}
        color={getMainColor()}
        bgColor={changeColor(getMainColor(), { alpha: 0.15 })}
        _hover={{
          bgColor: changeColor(getMainColor(), { alpha: 0.2 }),
        }}
        aria-label="switch layout"
        compact
        size="lg"
        icon={
          <Switch>
            <Match when={layout() === "list"}>
              <FaSolidListUl />
            </Match>
            <Match when={layout() === "grid"}>
              <BsGridFill />
            </Match>
            <Match when={layout() === "image"}>
              <BsCardImage />
            </Match>
          </Switch>
        }
      ></MenuTrigger> */}
      <HStack spacing="$1">
        <Show when={UserMethods.is_admin(me())}>
          <Button
            loading={logOutReqLoading()}
            onClick={() => {
              to("/@manage")
            }}
            colorScheme="accent"
            size="sm"
          >
            Admin
          </Button>
        </Show>
        <Show when={UserMethods.is_general(me()) || UserMethods.is_admin(me())}>
          <Button
            loading={logOutReqLoading()}
            onClick={logOut}
            colorScheme="primary"
            size="sm"
          >
            Logout
          </Button>
        </Show>
        <Show when={UserMethods.is_guest(me())}>
          <Button
            onClick={() => {
              to("/@login")
            }}
            colorScheme="primary"
            size="sm"
          >
            Login
          </Button>
          <Button
            onClick={() => {
              to("/@register")
            }}
            colorScheme="success"
            size="sm"
          >
            Register
          </Button>
        </Show>
      </HStack>
      <MenuContent>
        <For each={Object.entries(layouts)}>
          {(item) => (
            <MenuItem
              icon={<Dynamic component={item[1]} />}
              onSelect={() => {
                setLayout(item[0] as LayoutType)
              }}
            >
              {t(`home.layouts.${item[0]}`)}
            </MenuItem>
          )}
        </For>
      </MenuContent>
    </Menu>
  )
}
// function to(arg0: string) {
//   throw new Error("Function not implemented.")
// }
